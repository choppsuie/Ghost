import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock user database (in-memory for demo purposes)
const mockUsers = new Map()

export async function POST(request: Request) {
  console.log("Signup API route called - Using Mock Authentication")

  try {
    // 1. Parse request body
    let email, password
    try {
      const body = await request.json()
      email = body.email
      password = body.password

      console.log("Received signup request for email:", email?.substring(0, 3) + "***")
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    // 2. Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // 3. Check if user already exists
    if (mockUsers.has(email)) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // 4. Create mock user
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const user = {
      id: userId,
      email,
      created_at: new Date().toISOString(),
      // Store hashed password in a real implementation
      password,
    }

    // 5. Store user in mock database
    mockUsers.set(email, user)
    console.log(`Mock user created: ${email} (ID: ${userId})`)

    // 6. Set authentication cookie
    cookies().set("mock_auth", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    cookies().set("mock_user_email", email, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    // 7. Return success response
    return NextResponse.json({
      message: "Account created successfully! You can now log in.",
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      },
      mockMode: true,
    })
  } catch (error) {
    // 8. Handle unexpected errors
    console.error("Unexpected error during signup:", error)
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        message: error.message,
      },
      { status: 500 },
    )
  }
}
