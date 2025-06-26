import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock user database (in-memory for demo purposes)
// In a real implementation, this would be a database
const mockUsers = new Map()

export async function POST(request: Request) {
  console.log("Login API route called - Using Mock Authentication")

  try {
    // 1. Parse request body
    let email, password
    try {
      const body = await request.json()
      email = body.email
      password = body.password

      console.log("Received login request for email:", email?.substring(0, 3) + "***")
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    // 2. Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // 3. Check if user exists
    const user = mockUsers.get(email)

    // If user doesn't exist in our mock DB, create one for demo purposes
    if (!user) {
      // In a real implementation, we would return an error
      // But for demo purposes, we'll create a user on the fly
      const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      const newUser = {
        id: userId,
        email,
        created_at: new Date().toISOString(),
        password,
      }
      mockUsers.set(email, newUser)
      console.log(`Mock user created during login: ${email} (ID: ${userId})`)
    } else {
      // In a real implementation, we would check the password
      // But for demo purposes, we'll accept any password
      console.log(`Mock user found: ${email}`)
    }

    // 4. Set authentication cookies
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

    // 5. Return success response
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: mockUsers.get(email).id,
        email,
        created_at: mockUsers.get(email).created_at,
      },
      mockMode: true,
    })
  } catch (error) {
    // 6. Handle unexpected errors
    console.error("Unexpected error during login:", error)
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        message: error.message,
      },
      { status: 500 },
    )
  }
}
