"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/Skeleton"
import { AlertCircle } from "lucide-react"

interface VMViewerProps {
  userId: string
}

export default function VMViewer({ userId }: VMViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [vmStatus, setVmStatus] = useState<"running" | "stopped" | "loading">("loading")

  // Fetch VM status on component mount
  useEffect(() => {
    if (!userId) {
      setError("User ID is required")
      setIsLoading(false)
      return
    }

    const fetchVmStatus = async () => {
      try {
        // Simulate VM status fetch
        // Replace with actual API call
        setVmStatus("running")
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching VM status:", err)
        setError("Failed to load VM status. Please try again.")
        setIsLoading(false)
      }
    }

    fetchVmStatus()
  }, [userId])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-red-500">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-500 mb-4">
            <AlertCircle size={20} />
            <p className="font-medium">Error loading VM</p>
          </div>
          <p className="text-gray-400">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">VM Status: {vmStatus === "running" ? "Running" : "Stopped"}</h2>
            <p className="text-gray-400">Connected as: {userId.substring(0, 8)}...</p>
          </div>
          <Button
            variant={vmStatus === "running" ? "destructive" : "default"}
            onClick={() => setVmStatus(vmStatus === "running" ? "stopped" : "running")}
          >
            {vmStatus === "running" ? "Stop VM" : "Start VM"}
          </Button>
        </div>

        {vmStatus === "running" ? (
          <div className="bg-black rounded-lg p-4 h-64 flex items-center justify-center">
            <p className="text-green-500 font-mono">VM Console Connected</p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-4 h-64 flex items-center justify-center">
            <p className="text-gray-500">VM is currently stopped. Start the VM to access the console.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
