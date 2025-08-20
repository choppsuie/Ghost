export interface BrowserSession {
  id: string
  userId: string
  tabs: BrowserTab[]
  activeTabId: string
  created: Date
  lastActivity: Date
}

export interface BrowserTab {
  id: string
  title: string
  url: string
  favicon?: string
  isLoading: boolean
  securityLevel: "secure" | "warning" | "danger"
  history: string[]
  historyIndex: number
  blocked: {
    trackers: number
    ads: number
    malware: number
  }
}

export class BrowserAPI {
  private static instance: BrowserAPI
  private sessions: Map<string, BrowserSession> = new Map()

  static getInstance(): BrowserAPI {
    if (!BrowserAPI.instance) {
      BrowserAPI.instance = new BrowserAPI()
    }
    return BrowserAPI.instance
  }

  async fetchContent(
    url: string,
    userId: string,
  ): Promise<{
    content: string
    contentType: string
    status: number
    securityLevel: "secure" | "warning" | "danger"
    blocked: { trackers: number; ads: number; malware: number }
    title?: string
    favicon?: string
  }> {
    try {
      console.log("[v0] Browser API: Fetching content for URL:", url, "User:", userId)

      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, userId }),
      })

      console.log("[v0] Browser API: Proxy response status:", response.status)
      console.log("[v0] Browser API: Proxy response headers:", Object.fromEntries(response.headers.entries()))

      const contentType = response.headers.get("content-type") || ""

      if (!contentType.includes("application/json")) {
        const text = await response.text()
        console.log("[v0] Browser API: Non-JSON response received:", text.substring(0, 200))
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
      }

      if (!response.ok) {
        const error = await response.json()
        console.log("[v0] Browser API: Error response:", error)
        throw new Error(error.error || "Failed to fetch content")
      }

      const result = await response.json()
      console.log("[v0] Browser API: Successfully parsed JSON response")
      return result
    } catch (error) {
      console.error("[v0] Browser API error:", error)
      throw error
    }
  }

  createSession(userId: string): BrowserSession {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const session: BrowserSession = {
      id: sessionId,
      userId,
      tabs: [
        {
          id: "tab_1",
          title: "New Tab",
          url: "",
          isLoading: false,
          securityLevel: "secure",
          history: [],
          historyIndex: -1,
          blocked: { trackers: 0, ads: 0, malware: 0 },
        },
      ],
      activeTabId: "tab_1",
      created: new Date(),
      lastActivity: new Date(),
    }

    this.sessions.set(sessionId, session)
    return session
  }

  getSession(sessionId: string): BrowserSession | undefined {
    return this.sessions.get(sessionId)
  }

  updateSession(sessionId: string, updates: Partial<BrowserSession>): void {
    const session = this.sessions.get(sessionId)
    if (session) {
      Object.assign(session, updates, { lastActivity: new Date() })
      this.sessions.set(sessionId, session)
    }
  }

  addTabToSession(sessionId: string): BrowserTab | null {
    const session = this.sessions.get(sessionId)
    if (!session) return null

    const newTab: BrowserTab = {
      id: `tab_${Date.now()}`,
      title: "New Tab",
      url: "",
      isLoading: false,
      securityLevel: "secure",
      history: [],
      historyIndex: -1,
      blocked: { trackers: 0, ads: 0, malware: 0 },
    }

    session.tabs.push(newTab)
    session.activeTabId = newTab.id
    session.lastActivity = new Date()

    this.sessions.set(sessionId, session)
    return newTab
  }

  removeTabFromSession(sessionId: string, tabId: string): boolean {
    const session = this.sessions.get(sessionId)
    if (!session || session.tabs.length <= 1) return false

    const tabIndex = session.tabs.findIndex((tab) => tab.id === tabId)
    if (tabIndex === -1) return false

    session.tabs.splice(tabIndex, 1)

    // If we removed the active tab, switch to another tab
    if (session.activeTabId === tabId) {
      session.activeTabId = session.tabs[Math.max(0, tabIndex - 1)].id
    }

    session.lastActivity = new Date()
    this.sessions.set(sessionId, session)
    return true
  }

  // Clean up old sessions (call periodically)
  cleanupSessions(maxAgeHours = 24): void {
    const cutoff = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000)

    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.lastActivity < cutoff) {
        this.sessions.delete(sessionId)
      }
    }
  }
}

export const browserAPI = BrowserAPI.getInstance()
