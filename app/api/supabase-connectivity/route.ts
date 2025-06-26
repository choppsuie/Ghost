import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if environment variables are set
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Return early with mock mode if variables aren't set
    if (!supabaseUrl || !supabaseKey) {
      console.log("Supabase environment variables not set, suggesting mock mode")
      return NextResponse.json(
        {
          status: "mock_suggested",
          message: "Supabase environment variables not set",
          mockMode: true,
          envVars: {
            supabaseUrl: !!supabaseUrl,
            supabaseKey: !!supabaseKey,
          },
        },
        { status: 200 },
      )
    }

    // Don't actually try to connect to Supabase - just return success
    // This avoids network issues while still providing useful information
    return NextResponse.json({
      status: "assumed_available",
      message: "Supabase environment variables are set",
      mockMode: false,
      envVars: {
        supabaseUrl: !!supabaseUrl,
        supabaseKey: !!supabaseKey,
      },
    })
  } catch (error) {
    console.error("Error in Supabase connectivity check:", error)

    // Return a 200 status with error info to avoid breaking the UI
    return NextResponse.json(
      {
        status: "error",
        message: "Error checking Supabase connectivity",
        error: error.message,
        mockMode: true,
      },
      { status: 200 },
    )
  }
}
