import Link from "next/link"
import { cookies } from "next/headers"
import DVPNStatus from "@/components/DVPNStatus"
import PrivacyScoreDashboard from "@/components/PrivacyScoreDashboard"
import { Shield, Server, Settings, Activity } from "lucide-react"

export default async function Dashboard() {
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
      if (mockAuth && mockUserEmail) {
        isAuthenticated = true
        userId = `mock-${mockUserEmail.replace(/[^a-zA-Z0-9]/g, "-")}`
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sub Rosa Dashboard</h1>
        <p className="text-gray-400">Manage your privacy settings and VM connection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-subrosa-light p-4 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-2">
            <Shield className="text-subrosa-red mr-2" size={20} />
            <h2 className="text-lg font-medium">Privacy</h2>
          </div>
          <p className="text-2xl font-bold">Protected</p>
          <p className="text-sm text-gray-400">All connections secure</p>
        </div>

        <div className="bg-subrosa-light p-4 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-2">
            <Server className="text-subrosa-red mr-2" size={20} />
            <h2 className="text-lg font-medium">VM Status</h2>
          </div>
          <p className="text-2xl font-bold">Online</p>
          <p className="text-sm text-gray-400">Ubuntu 22.04 LTS</p>
        </div>

        <div className="bg-subrosa-light p-4 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-2">
            <Activity className="text-subrosa-red mr-2" size={20} />
            <h2 className="text-lg font-medium">Network</h2>
          </div>
          <p className="text-2xl font-bold">45 ms</p>
          <p className="text-sm text-gray-400">Current latency</p>
        </div>

        <div className="bg-subrosa-light p-4 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-2">
            <Settings className="text-subrosa-red mr-2" size={20} />
            <h2 className="text-lg font-medium">Settings</h2>
          </div>
          <Link href="/profile" className="text-subrosa-red hover:underline text-sm">
            Manage profile
          </Link>
          <p className="text-sm text-gray-400">Configure preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DVPNStatus userId={userId} />

        <div className="space-y-6">
          <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Server className="text-subrosa-red mr-2" />
              VM Quick Access
            </h2>
            <Link
              href="/dashboard/vm"
              className="block w-full py-3 bg-subrosa-red text-white rounded-md text-center hover:bg-opacity-90 transition-colors"
            >
              Open VM Viewer
            </Link>
          </div>
        </div>
      </div>

      {/* Add Privacy Score Dashboard */}
      <div className="mb-6">
        <PrivacyScoreDashboard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <h2 className="text-xl font-bold mb-4">Privacy Statistics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white">Trackers Blocked</span>
                <span className="text-sm font-medium text-white">1,249</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-subrosa-red h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white">Cookies Managed</span>
                <span className="text-sm font-medium text-white">3,569</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-subrosa-red h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white">Fingerprint Changes</span>
                <span className="text-sm font-medium text-white">142</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-subrosa-red h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white">Vulnerabilities</span>
                <span className="text-sm font-medium text-white">0</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
