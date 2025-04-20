import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import VMViewer from "@/components/VMViewer"
import { ArrowLeft } from "lucide-react"

export default async function VMPage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

      <VMViewer userId={session.user.id} />
    </div>
  )
}
