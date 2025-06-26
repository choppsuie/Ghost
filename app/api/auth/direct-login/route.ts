import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    // Get Supabase credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Server configuration error: Missing Supabase credentials" }, { status: 500 })
    }

    // Parse request body
    const body = await request.json()
    const { email, password } = body

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Make direct request to Supabase Auth API
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        "X-Client-Info": "supabase-js/2.0.0",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    })

    // Handle API response
    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error_description || "Authentication failed",
          statusCode: response.status,
          supabaseError: data,
        },
        { status: response.status },
      )
    }

    // Set cookies for authentication
    const cookieStore = cookies()

    // Set access token cookie
    cookieStore.set("sb-access-token", data.access_token, {
      path: "/",
      maxAge: data.expires_in,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    // Set refresh token cookie
    cookieStore.set("sb-refresh-token", data.refresh_token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    // Return success response
    return NextResponse.json({
      message: "Successfully logged in",
      user: data.user,
    })
  } catch (error) {
    console.error("Unexpected error during direct login:", error)
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
