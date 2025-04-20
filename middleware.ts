import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    // Skip middleware for static assets
    const url = req.nextUrl.pathname
    if (url.startsWith("/_next") || url.startsWith("/images") || url.startsWith("/favicon.ico") || url.includes(".")) {
      return res
    }

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired
    await supabase.auth.getSession()

    return res
  } catch (error) {
    console.error("Middleware error:", error)
    return res
  }
}

// Limit middleware execution to specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
