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

    // Check for mock authentication cookie
    const mockAuth = req.cookies.get("mock_auth")?.value === "true"
    const mockUserEmail = req.cookies.get("mock_user_email")?.value

    // If using mock auth and trying to access protected routes, allow it
    if (mockAuth && mockUserEmail && url.startsWith("/dashboard")) {
      console.log("Mock authentication detected, allowing access to protected route")
      return res
    }

    // Check if protected routes require authentication
    if (url.startsWith("/dashboard") && (!mockAuth || !mockUserEmail)) {
      // Redirect to login if accessing protected routes without authentication
      return NextResponse.redirect(new URL("/login", req.url))
    }

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
