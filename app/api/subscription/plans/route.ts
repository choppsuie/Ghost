import { NextResponse } from "next/server"
import { subscriptionManager } from "@/lib/subscriptionManager"

export async function GET() {
  try {
    const plans = subscriptionManager.getAvailablePlans()

    return NextResponse.json({
      success: true,
      plans,
    })
  } catch (error) {
    console.error("[v0] Error fetching subscription plans:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch subscription plans" }, { status: 500 })
  }
}
