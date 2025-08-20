import { NextResponse } from "next/server"
import { sentinelService } from "@/lib/sentinelClient"

export async function GET(request: Request) {
  try {
    console.log("[v0] Wallet balance API called")

    const address = await sentinelService.getWalletAddress()

    if (!address) {
      return NextResponse.json({ error: "Wallet not connected" }, { status: 400 })
    }

    const balance = await sentinelService.getBalance()

    console.log("[v0] Balance retrieved:", balance)

    return NextResponse.json({
      success: true,
      balance,
      address: address.substring(0, 8) + "..." + address.substring(address.length - 6),
    })
  } catch (error) {
    console.error("[v0] Balance fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch balance", details: error.message }, { status: 500 })
  }
}
