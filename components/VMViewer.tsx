"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/Skeleton"
import { AlertCircle, Monitor, Globe } from "lucide-react"
import SecureBrowser from "./SecureBrowser"

interface VMViewerProps {
  userId: string
}

export default function VMViewer({ userId }: VMViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [vmStatus, setVmStatus] = useState<"running" | "stopped" | "loading">("loading")
  const [viewMode, setViewMode] = useState<"console" | "browser">("browser")

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
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-card border-destructive">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-destructive mb-4">
            <AlertCircle size={20} />
            <p className="font-medium">Error loading VM</p>
          </div>
          <p className="text-muted-foreground">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* VM Control Header */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                VM Status: {vmStatus === "running" ? "Running" : "Stopped"}
              </h2>
              <p className="text-muted-foreground">Connected as: {userId.substring(0, 8)}...</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "browser" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("browser")}
                  className="flex items-center gap-2"
                >
                  <Globe size={16} />
                  Browser
                </Button>
                <Button
                  variant={viewMode === "console" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("console")}
                  className="flex items-center gap-2"
                >
                  <Monitor size={16} />
                  Console
                </Button>
              </div>
              <Button
                variant={vmStatus === "running" ? "destructive" : "default"}
                onClick={() => setVmStatus(vmStatus === "running" ? "stopped" : "running")}
              >
                {vmStatus === "running" ? "Stop VM" : "Start VM"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* VM Interface */}
      {vmStatus === "running" ? (
        viewMode === "browser" ? (
          <SecureBrowser userId={userId} />
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="bg-black rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-green-500 font-mono">VM Console Connected</p>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="bg-muted rounded-lg p-4 h-64 flex items-center justify-center">
              <p className="text-muted-foreground">VM is currently stopped. Start the VM to access the console.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
