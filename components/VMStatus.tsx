'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function VMStatus({ userId }: { userId: string }) {
  const [status, setStatus] = useState('Unknown')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchVMStatus = async () => {
      const { data, error } = await supabase
        .from('vm_status')
        .select('status')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching VM status:', error)
      } else if (data) {
        setStatus(data.status)
      }
      setLoading(false)
    }

    fetchVMStatus()
  }, [supabase, userId])

  if (loading) return <div>Loading VM status...</div>

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">VM Status</h2>
      <p>Status: {status}</p>
    </div>
  )
}
