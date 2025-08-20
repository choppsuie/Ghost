import { NextResponse } from "next/server"
import { sentinelService } from "@/lib/sentinelClient"

export async function POST(request: Request) {
  try {
    console.log("[v0] Wallet connect API called")

    const { mnemonic, userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Initialize Sentinel service with provided mnemonic
    await sentinelService.initialize(mnemonic)

    // Get wallet address and balance
    const address = await sentinelService.getWalletAddress()
    const balance = await sentinelService.getBalance()

    if (!address) {
      return NextResponse.json({ error: "Failed to get wallet address" }, { status: 500 })
    }

    console.log("[v0] Wallet connected successfully:", address.substring(0, 8) + "...")

    return NextResponse.json({
      success: true,
      wallet: {
        address,
        balance,
        connected: true,
      },
    })
  } catch (error) {
    console.error("[v0] Wallet connect error:", error)
    return NextResponse.json({ error: "Failed to connect wallet", details: error.message }, { status: 500 })
  }
}
