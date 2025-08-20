"use client"

import { useState, useEffect } from "react"
import { Activity, Wifi, WifiOff, Zap, Download, Upload, Clock, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TunnelConnection } from "@/lib/tunnelManager"

interface TunnelMonitorProps {
  tunnelId?: string
  userId: string
}

export function TunnelMonitor({ tunnelId, userId }: TunnelMonitorProps) {
  const [connection, setConnection] = useState<TunnelConnection | null>(null)
  const [bandwidthUsage, setBandwidthUsage] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (tunnelId) {
      fetchTunnelStatus()
      const interval = setInterval(fetchTunnelStatus, 5000) // Update every 5 seconds
      return () => clearInterval(interval)
    }
  }, [tunnelId])

  const fetchTunnelStatus = async () => {
    if (!tunnelId) return

    try {
      const response = await fetch(`/api/tunnel/status?tunnelId=${tunnelId}&userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        setConnection(data.connection)
        if (data.bandwidthUsage) {
          setBandwidthUsage(data.bandwidthUsage)
        }
      }
    } catch (error) {
      console.error("[v0] Error fetching tunnel status:", error)
    }
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDuration = (startTime: Date): string => {
    const now = new Date()
    const diff = now.getTime() - startTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-400"
      case "connecting":
        return "text-yellow-400"
      case "disconnecting":
        return "text-orange-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Wifi className="text-green-400" size={16} />
      case "connecting":
        return <Activity className="text-yellow-400 animate-pulse" size={16} />
      case "disconnecting":
        return <WifiOff className="text-orange-400" size={16} />
      case "error":
        return <WifiOff className="text-red-400" size={16} />
      default:
        return <WifiOff className="text-gray-400" size={16} />
    }
  }

  if (!connection) {
    return (
      <Card className="border border-subrosa-gray bg-subrosa-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="text-gray-400" size={20} />
            <span>Tunnel Monitor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            <WifiOff size={48} className="mx-auto mb-2 opacity-50" />
            <p>No active tunnel connection</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-subrosa-gray bg-subrosa-light">
      <CardHeader className="border-b border-subrosa-gray">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-subrosa-red" size={20} />
            <span>Tunnel Monitor</span>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(connection.status)}
            <span className={`text-sm font-medium ${getStatusColor(connection.status)}`}>
              {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Connection Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Virtual IP</label>
              <div className="text-sm font-mono bg-subrosa-dark p-2 rounded border border-subrosa-gray">
                {connection.ipAddress || "Not assigned"}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Protocol</label>
              <div className="text-sm font-medium">
                {connection.protocol.toUpperCase()} / {connection.encryption}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">DNS Servers</label>
              <div className="text-sm font-mono">{connection.dnsServers.join(", ")}</div>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Security</label>
              <div className="flex items-center gap-2 text-sm">
                <Shield size={14} className="text-green-400" />
                <span>Kill Switch {connection.killSwitch ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        {connection.status === "connected" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-subrosa-dark p-3 rounded border border-subrosa-gray text-center">
              <div className="flex items-center justify-center mb-1">
                <Zap size={16} className="text-yellow-400 mr-1" />
                <span className="text-xs text-gray-400">Latency</span>
              </div>
              <div className="text-lg font-bold text-yellow-400">{connection.latency}ms</div>
            </div>

            <div className="bg-subrosa-dark p-3 rounded border border-subrosa-gray text-center">
              <div className="flex items-center justify-center mb-1">
                <Upload size={16} className="text-blue-400 mr-1" />
                <span className="text-xs text-gray-400">Upload</span>
              </div>
              <div className="text-lg font-bold text-blue-400">{formatBytes(connection.bytesTransferred.upload)}</div>
            </div>

            <div className="bg-subrosa-dark p-3 rounded border border-subrosa-gray text-center">
              <div className="flex items-center justify-center mb-1">
                <Download size={16} className="text-green-400 mr-1" />
                <span className="text-xs text-gray-400">Download</span>
              </div>
              <div className="text-lg font-bold text-green-400">
                {formatBytes(connection.bytesTransferred.download)}
              </div>
            </div>

            <div className="bg-subrosa-dark p-3 rounded border border-subrosa-gray text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock size={16} className="text-purple-400 mr-1" />
                <span className="text-xs text-gray-400">Duration</span>
              </div>
              <div className="text-lg font-bold text-purple-400">
                {connection.startTime ? formatDuration(connection.startTime) : "0s"}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {connection.status === "error" && connection.error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-800 text-red-400 p-3 rounded mb-4">
            <div className="flex items-center gap-2 mb-1">
              <WifiOff size={16} />
              <span className="font-medium">Connection Error</span>
            </div>
            <p className="text-sm">{connection.error}</p>
          </div>
        )}

        {/* Bandwidth Usage Summary */}
        {bandwidthUsage && (
          <div className="pt-4 border-t border-subrosa-gray">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Session Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Total Upload:</span>
                <div className="font-medium">{formatBytes(bandwidthUsage.upload)}</div>
              </div>
              <div>
                <span className="text-gray-400">Total Download:</span>
                <div className="font-medium">{formatBytes(bandwidthUsage.download)}</div>
              </div>
              <div>
                <span className="text-gray-400">Estimated Cost:</span>
                <div className="font-medium text-subrosa-red">{bandwidthUsage.cost.toFixed(6)} DVPN</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TunnelMonitor
