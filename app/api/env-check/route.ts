import { NextResponse } from "next/server"

export async function GET() {
  // Only return partial keys for security
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 15)}...`
      : undefined,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...`
      : undefined,
    NODE_ENV: process.env.NODE_ENV,
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    variables: envVars,
    hasRequiredVars: !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}
