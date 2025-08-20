import { NextResponse } from "next/server"
import { tunnelManager } from "@/lib/tunnelManager"
import { sentinelService } from "@/lib/sentinelClient"

export async function POST(request: Request) {
  try {
    console.log("[v0] Tunnel connect API called")

    const { nodeAddress, userId, config } = await request.json()

    if (!nodeAddress || !userId) {
      return NextResponse.json({ error: "Node address and user ID are required" }, { status: 400 })
    }

    // Check if wallet is connected
    const walletAddress = await sentinelService.getWalletAddress()
    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet not connected" }, { status: 400 })
    }

    // Use default config if not provided
    const tunnelConfig = config || tunnelManager.getDefaultConfig()

    // Establish tunnel connection
    const connection = await tunnelManager.establishTunnel(nodeAddress, tunnelConfig, userId)

    console.log("[v0] Tunnel connection established:", connection.id)

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        nodeAddress: connection.nodeAddress,
        status: connection.status,
        ipAddress: connection.ipAddress,
        protocol: connection.protocol,
        encryption: connection.encryption,
        dnsServers: connection.dnsServers,
      },
    })
  } catch (error) {
    console.error("[v0] Tunnel connect error:", error)
    return NextResponse.json({ error: "Failed to establish tunnel", details: error.message }, { status: 500 })
  }
}
