import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import DVPNStatus from "@/components/DVPNStatus"
import { Shield, Server, Settings, Activity } from "lucide-react"

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DVPNStatus userId={session.user.id} />

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

          <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
            <h2 className="text-xl font-bold mb-4">Privacy Statistics</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Trackers Blocked</span>
                  <span className="text-sm font-medium">1,248</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-subrosa-red h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Cookies Managed</span>
                  <span className="text-sm font-medium">3,567</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-subrosa-red h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Fingerprint Changes</span>
                  <span className="text-sm font-medium">142</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-subrosa-red h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
