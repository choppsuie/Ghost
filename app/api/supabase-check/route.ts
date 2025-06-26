import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Validate environment variables
    const issues = []
    if (!supabaseUrl) {
      issues.push("NEXT_PUBLIC_SUPABASE_URL is not set")
    } else if (!supabaseUrl.startsWith("https://")) {
      issues.push("NEXT_PUBLIC_SUPABASE_URL does not start with https://")
    }

    if (!supabaseAnonKey) {
      issues.push("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set")
    } else if (supabaseAnonKey.length < 20) {
      issues.push("NEXT_PUBLIC_SUPABASE_ANON_KEY appears to be invalid (too short)")
    }

    // Test connectivity to Supabase
    let connectivityStatus = "Unknown"
    let healthCheck = null

    if (supabaseUrl) {
      try {
        const healthCheckUrl = `${supabaseUrl}/rest/v1/`
        const response = await fetch(healthCheckUrl, {
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseAnonKey || "",
          },
        })

        healthCheck = {
          status: response.status,
          ok: response.ok,
        }

        connectivityStatus = response.ok ? "Connected" : `Failed with status ${response.status}`
      } catch (error) {
        connectivityStatus = `Connection error: ${error.message}`
      }
    }

    return NextResponse.json({
      environment: {
        supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 8)}...` : "Not set",
        supabaseAnonKey: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 5)}...` : "Not set",
        nodeEnv: process.env.NODE_ENV,
      },
      issues: issues.length > 0 ? issues : "No issues found with environment variables",
      connectivity: connectivityStatus,
      healthCheck,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error checking Supabase configuration",
        message: error.message,
      },
      { status: 500 },
    )
  }
}
