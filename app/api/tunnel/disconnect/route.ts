import { NextResponse } from "next/server"
import { tunnelManager } from "@/lib/tunnelManager"

export async function POST(request: Request) {
  try {
    console.log("[v0] Tunnel disconnect API called")

    const { tunnelId } = await request.json()

    if (!tunnelId) {
      return NextResponse.json({ error: "Tunnel ID is required" }, { status: 400 })
    }

    // Disconnect tunnel
    await tunnelManager.disconnectTunnel(tunnelId)

    console.log("[v0] Tunnel disconnected successfully:", tunnelId)

    return NextResponse.json({
      success: true,
      message: "Tunnel disconnected successfully",
    })
  } catch (error) {
    console.error("[v0] Tunnel disconnect error:", error)
    return NextResponse.json({ error: "Failed to disconnect tunnel", details: error.message }, { status: 500 })
  }
}
