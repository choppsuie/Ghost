import { NextResponse } from "next/server"
import { tunnelManager } from "@/lib/tunnelManager"

export async function GET(request: Request) {
  try {
    console.log("[v0] Tunnel status API called")

    const { searchParams } = new URL(request.url)
    const tunnelId = searchParams.get("tunnelId")
    const userId = searchParams.get("userId")

    if (tunnelId) {
      // Get specific tunnel status
      const connection = tunnelManager.getTunnelConnection(tunnelId)

      if (!connection) {
        return NextResponse.json({ error: "Tunnel not found" }, { status: 404 })
      }

      // Test latency if connected
      let latency = connection.latency
      if (connection.status === "connected") {
        try {
          latency = await tunnelManager.testTunnelLatency(tunnelId)
        } catch (error) {
          console.warn("[v0] Failed to test latency:", error)
        }
      }

      return NextResponse.json({
        success: true,
        connection: {
          ...connection,
          latency,
        },
      })
    } else {
      // Get all active tunnels
      const activeTunnels = tunnelManager.getActiveTunnels()

      // Get bandwidth usage if userId provided
      let bandwidthUsage = null
      if (userId) {
        bandwidthUsage = tunnelManager.getTotalBandwidthUsage(userId)
      }

      return NextResponse.json({
        success: true,
        activeTunnels,
        bandwidthUsage,
      })
    }
  } catch (error) {
    console.error("[v0] Tunnel status error:", error)
    return NextResponse.json({ error: "Failed to get tunnel status", details: error.message }, { status: 500 })
  }
}
