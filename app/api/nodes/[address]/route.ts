import { NextResponse } from "next/server"
import { sentinelService } from "@/lib/sentinelClient"

export async function GET(request: Request, { params }: { params: { address: string } }) {
  try {
    console.log("[v0] Node details API called for:", params.address)

    const nodeDetails = await sentinelService.getNodeDetails(params.address)

    if (!nodeDetails) {
      return NextResponse.json({ error: "Node not found" }, { status: 404 })
    }

    console.log("[v0] Node details retrieved successfully")

    return NextResponse.json({
      success: true,
      node: nodeDetails,
    })
  } catch (error) {
    console.error("[v0] Node details API error:", error)
    return NextResponse.json({ error: "Failed to fetch node details", details: error.message }, { status: 500 })
  }
}
