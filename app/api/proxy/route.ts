import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Proxy API: Received request")

    const body = await request.json()
    console.log("[v0] Proxy API: Request body:", body)

    const { url, userId } = body

    if (!url || !userId) {
      console.log("[v0] Proxy API: Missing required fields - url:", !!url, "userId:", !!userId)
      return NextResponse.json({ error: "URL and userId are required" }, { status: 400 })
    }

    // Validate URL format
    let targetUrl: URL
    try {
      // Add protocol if missing
      const urlToValidate = url.startsWith("http") ? url : `https://${url}`
      targetUrl = new URL(urlToValidate)
      console.log("[v0] Proxy API: Validated URL:", targetUrl.toString())
    } catch (urlError) {
      console.log("[v0] Proxy API: Invalid URL format:", url, urlError)
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    console.log("[v0] Proxy API: Fetching from target URL:", targetUrl.toString())

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent": "SubRosa-SecureBrowser/1.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      },
      redirect: "follow",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    console.log("[v0] Proxy API: External fetch response status:", response.status)

    if (!response.ok) {
      console.log("[v0] Proxy API: External fetch failed:", response.status, response.statusText)
      return NextResponse.json(
        { error: `Failed to fetch: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const content = await response.text()
    const contentType = response.headers.get("content-type") || "text/html"
    console.log("[v0] Proxy API: Content fetched, length:", content.length, "type:", contentType)

    const securityAnalysis = analyzeContentSecurity(content, targetUrl.toString())
    console.log("[v0] Proxy API: Security analysis complete:", securityAnalysis)

    const title = extractTitle(content) || targetUrl.hostname
    const favicon = extractFavicon(content, targetUrl.toString())

    const result = {
      content,
      contentType,
      status: response.status,
      securityLevel: securityAnalysis.level,
      blocked: securityAnalysis.blocked,
      title,
      favicon,
    }

    console.log("[v0] Proxy API: Returning successful response")
    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Proxy API error:", error)

    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 408 })
    }

    if (error.message?.includes("fetch")) {
      return NextResponse.json({ error: "Failed to fetch external content" }, { status: 502 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function analyzeContentSecurity(content: string, url: string) {
  const blocked = { trackers: 0, ads: 0, malware: 0 }
  let level: "secure" | "warning" | "danger" = "secure"

  const trackerPatterns = [
    /google-analytics\.com/gi,
    /googletagmanager\.com/gi,
    /facebook\.net/gi,
    /doubleclick\.net/gi,
  ]

  const adPatterns = [/googlesyndication\.com/gi, /googleadservices\.com/gi, /amazon-adsystem\.com/gi]

  const malwarePatterns = [/eval\s*\(/gi, /document\.write\s*\(/gi, /onclick\s*=\s*["'][^"']*javascript:/gi]

  // Count blocked elements
  trackerPatterns.forEach((pattern) => {
    const matches = content.match(pattern)
    if (matches) blocked.trackers += matches.length
  })

  adPatterns.forEach((pattern) => {
    const matches = content.match(pattern)
    if (matches) blocked.ads += matches.length
  })

  malwarePatterns.forEach((pattern) => {
    const matches = content.match(pattern)
    if (matches) blocked.malware += matches.length
  })

  // Determine security level
  if (blocked.malware > 0) {
    level = "danger"
  } else if (blocked.trackers > 5 || blocked.ads > 3) {
    level = "warning"
  }

  return { level, blocked }
}

function extractTitle(content: string): string | null {
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i)
  return titleMatch ? titleMatch[1].trim() : null
}

function extractFavicon(content: string, baseUrl: string): string | null {
  const faviconMatch = content.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i)
  if (faviconMatch) {
    const href = faviconMatch[1]
    if (href.startsWith("http")) {
      return href
    } else if (href.startsWith("/")) {
      const url = new URL(baseUrl)
      return `${url.protocol}//${url.host}${href}`
    } else {
      const url = new URL(baseUrl)
      return `${url.protocol}//${url.host}/${href}`
    }
  }
  return null
}
