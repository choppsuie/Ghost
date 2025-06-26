import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // If code is not present, redirect to login
  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Error exchanging code for session:", error)
      // Redirect to login with error
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url))
    }

    // Redirect to dashboard on success
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Unexpected error in auth callback:", error)
    return NextResponse.redirect(new URL("/login?error=An unexpected error occurred", request.url))
  }
}
