import { NextResponse } from "next/server"
import { sentinelService, type NodeFilters } from "@/lib/sentinelClient"

export async function GET(request: Request) {
  try {
    console.log("[v0] Nodes API called")

    const { searchParams } = new URL(request.url)

    // Parse query parameters for filtering
    const filters: NodeFilters = {}

    if (searchParams.get("country")) {
      filters.country = searchParams.get("country")!
    }

    if (searchParams.get("minReputation")) {
      filters.minReputation = Number.parseInt(searchParams.get("minReputation")!)
    }

    if (searchParams.get("maxPrice")) {
      filters.maxPrice = Number.parseFloat(searchParams.get("maxPrice")!)
    }

    if (searchParams.get("minBandwidth")) {
      filters.minBandwidth = Number.parseInt(searchParams.get("minBandwidth")!)
    }

    if (searchParams.get("sortBy")) {
      filters.sortBy = searchParams.get("sortBy") as "price" | "reputation" | "bandwidth" | "latency"
    }

    if (searchParams.get("sortOrder")) {
      filters.sortOrder = searchParams.get("sortOrder") as "asc" | "desc"
    }

    if (searchParams.get("limit")) {
      filters.limit = Number.parseInt(searchParams.get("limit")!)
    }

    // Fetch nodes with filters
    const nodes = await sentinelService.getActiveNodes(filters)

    console.log(`[v0] Returning ${nodes.length} nodes`)

    return NextResponse.json({
      success: true,
      nodes,
      count: nodes.length,
      filters: filters,
    })
  } catch (error) {
    console.error("[v0] Nodes API error:", error)
    return NextResponse.json({ error: "Failed to fetch nodes", details: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log("[v0] Node refresh API called")

    // Clear node cache to force fresh data
    await sentinelService.refreshNodeCache()

    // Fetch fresh nodes
    const nodes = await sentinelService.getActiveNodes()

    return NextResponse.json({
      success: true,
      message: "Node cache refreshed",
      nodes,
      count: nodes.length,
    })
  } catch (error) {
    console.error("[v0] Node refresh error:", error)
    return NextResponse.json({ error: "Failed to refresh nodes", details: error.message }, { status: 500 })
  }
}
