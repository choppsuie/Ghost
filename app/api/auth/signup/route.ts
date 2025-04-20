import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const cookieStore = cookies()

  try {
    const formData = await request.formData()
    const email = formData.get("email")?.toString() || ""
    const password = formData.get("password")?.toString() || ""

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Create a Supabase client with explicit cookie store
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Sign up the user with minimal options
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error("Signup error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Check your email for the confirmation link",
        user: data.user,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Unexpected error during signup:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
