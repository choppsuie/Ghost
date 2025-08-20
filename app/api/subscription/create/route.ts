import { type NextRequest, NextResponse } from "next/server"
import { subscriptionManager } from "@/lib/subscriptionManager"

export async function POST(request: NextRequest) {
  try {
    const { planId, nodeAddress, userAddress } = await request.json()

    if (!planId || !nodeAddress || !userAddress) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    console.log("[v0] Creating subscription:", { planId, nodeAddress, userAddress })

    const subscription = await subscriptionManager.createSubscription(planId, nodeAddress, userAddress)

    return NextResponse.json({
      success: true,
      subscription,
    })
  } catch (error) {
    console.error("[v0] Error creating subscription:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create subscription" },
      { status: 500 },
    )
  }
}
