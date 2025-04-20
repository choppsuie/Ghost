import { createServerSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { DVPNStatus } from '@/components/DVPNStatus'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: dvpnStatus, error: dvpnError } = await supabase
    .from('dvpn_status')
    .select('active')
    .single()

  if (dvpnError) {
    console.error('Error fetching dVPN status:', dvpnError)
  }

  const { data: vmData, error: vmError } = await supabase
    .from('vm_status')
    .select('status')
    .eq('user_id', session.user.id)
    .single()

  if (vmError) {
    console.error('Error fetching VM status:', vmError)
  }

  const vmStatus = vmData?.status || 'Unknown'

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
      <DVPNStatus initialActive={dvpnStatus?.active || false} />
      <p className="mb-4 text-lg">Your VM Status: <span className="font-semibold">{vmStatus}</span></p>
      <div className="flex space-x-4">
        <Link href="/dashboard/vm">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Open VM Viewer
          </button>
        </Link>
      </div>
    </div>
  )
}
