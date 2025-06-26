import Link from "next/link"
import { cookies } from "next/headers"
import VMViewer from "@/components/VMViewer"
import { ArrowLeft } from "lucide-react"

export default async function VMPage() {
  // Check for mock authentication
  const cookieStore = cookies()
  const mockAuth = cookieStore.get("mock_auth")?.value === "true"
  const mockUserEmail = cookieStore.get("mock_user_email")?.value

  // If no mock auth, try to get session from Supabase
  let userId = "mock-user-id"
  let isAuthenticated = false

  if (mockAuth && mockUserEmail) {
    isAuthenticated = true
    // Use a deterministic user ID based on email for mock users
    userId = `mock-${mockUserEmail.replace(/[^a-zA-Z0-9]/g, "-")}`
  } else {
    try {
      // Try to use Supabase auth as fallback
      const { createServerComponentClient } = await import("@supabase/auth-helpers-nextjs")
      const supabase = createServerComponentClient({ cookies })
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        isAuthenticated = true
        userId = session.user.id
      }
    } catch (error) {
      console.error("Error checking authentication:", error)
      // Fall back to mock auth if Supabase fails
      if (process.env.MOCK_AUTH === "true" || mockAuth) {
        isAuthenticated = true
        userId = mockUserEmail ? `mock-${mockUserEmail.replace(/[^a-zA-Z0-9]/g, "-")}` : "mock-user-id"
      }
    }
  }

  // If not authenticated, this will be handled by middleware
  // But we'll add a fallback just in case
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-4">You need to be logged in to view this page.</p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {mockAuth && (
        <div className="mb-4 bg-yellow-900 bg-opacity-30 border border-yellow-800 text-yellow-500 px-4 py-2 rounded-md">
          <p className="text-sm font-medium">Demo Mode: You're using a demo account. Some features may be limited.</p>
        </div>
      )}

      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Virtual Machine Console</h1>
        <p className="text-gray-400">Manage and access your secure Ubuntu VM</p>
      </div>

      <VMViewer userId={userId} />
    </div>
  )
}
