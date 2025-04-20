'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProfileForm({ userEmail }: { userEmail: string }) {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState(userEmail)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Update email
    if (email !== userEmail) {
      const { error: emailError } = await supabase.auth.updateUser({ email })
      if (emailError) return setMessage(emailError.message)
    }

    // Update password if provided
    if (password) {
      const { error: pwError } = await supabase.auth.updateUser({ password })
      if (pwError) return setMessage(pwError.message)
    }

    setMessage('Profile updated successfully!')
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">New Password (optional)</Label>
        <Input id="password" type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {message && <p className="text-sm text-green-600">{message}</p>}
      <Button type="submit" className="w-full">Update Profile</Button>
    </form>
  )
}
