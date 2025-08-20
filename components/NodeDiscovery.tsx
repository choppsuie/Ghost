"use client"

import { useState, useEffect } from "react"
import { Search, Filter, RefreshCw, MapPin, Zap, Star, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SentinelNode } from "@/lib/sentinelClient"
import { toast } from "sonner"

interface NodeDiscoveryProps {
  onNodeSelect?: (node: SentinelNode) => void
  selectedNodeAddress?: string
}

export function NodeDiscovery({ onNodeSelect, selectedNodeAddress }: NodeDiscoveryProps) {
  const [nodes, setNodes] = useState<SentinelNode[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [countryFilter, setCountryFilter] = useState("all")
  const [sortBy, setSortBy] = useState<"reputation" | "price" | "bandwidth">("reputation")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadNodes()
  }, [sortBy, countryFilter])

  const loadNodes = async () => {
    setLoading(true)
    try {
      console.log("[v0] Loading nodes with filters")

      const params = new URLSearchParams()
      if (countryFilter !== "all") params.append("country", countryFilter)
      params.append("sortBy", sortBy)
      params.append("sortOrder", "desc")
      params.append("limit", "20")

      const response = await fetch(`/api/nodes?${params}`)
      const data = await response.json()

      if (data.success) {
        setNodes(data.nodes)
        console.log(`[v0] Loaded ${data.nodes.length} nodes`)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("[v0] Error loading nodes:", error)
      toast.error("Failed to load nodes")
    } finally {
      setLoading(false)
    }
  }

  const refreshNodes = async () => {
    setLoading(true)
    try {
      console.log("[v0] Refreshing node cache")

      const response = await fetch("/api/nodes", { method: "POST" })
      const data = await response.json()

      if (data.success) {
        setNodes(data.nodes)
        toast.success("Nodes refreshed successfully")
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("[v0] Error refreshing nodes:", error)
      toast.error("Failed to refresh nodes")
    } finally {
      setLoading(false)
    }
  }

  const filteredNodes = nodes.filter((node) => {
    if (!searchTerm) return true
    return (
      node.moniker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.location.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const formatPrice = (price: string) => {
    return (Number.parseInt(price) / 1000000).toFixed(3)
  }

  const getCountries = () => {
    const countries = [...new Set(nodes.map((node) => node.location.country))]
    return countries.sort()
  }

  return (
    <Card className="border border-subrosa-gray bg-subrosa-light">
      <CardHeader className="border-b border-subrosa-gray">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="text-subrosa-red" size={20} />
            <span>Node Discovery</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-400 hover:text-white"
            >
              <Filter size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshNodes}
              disabled={loading}
              className="text-gray-400 hover:text-white"
            >
              <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search nodes by name, country, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-subrosa-dark border-subrosa-gray"
            />
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-subrosa-dark rounded border border-subrosa-gray">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Country</label>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="bg-subrosa-light border-subrosa-gray">
                    <SelectValue placeholder="All countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All countries</SelectItem>
                    {getCountries().map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Sort by</label>
                <Select
                  value={sortBy}
                  onValueChange={(value: "reputation" | "price" | "bandwidth") => setSortBy(value)}
                >
                  <SelectTrigger className="bg-subrosa-light border-subrosa-gray">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reputation">Reputation</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="bandwidth">Bandwidth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Node List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="animate-spin mx-auto mb-2 text-subrosa-red" size={24} />
              <p className="text-gray-400">Loading nodes...</p>
            </div>
          ) : filteredNodes.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="mx-auto mb-2 text-gray-600" size={24} />
              <p className="text-gray-400">No nodes found</p>
            </div>
          ) : (
            filteredNodes.map((node) => (
              <div
                key={node.address}
                onClick={() => onNodeSelect?.(node)}
                className={`
                  p-4 rounded border cursor-pointer transition-all hover:border-gray-500
                  ${
                    selectedNodeAddress === node.address
                      ? "border-subrosa-red bg-subrosa-red bg-opacity-10"
                      : "border-subrosa-gray bg-subrosa-dark bg-opacity-50"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{node.moniker}</h3>
                    {selectedNodeAddress === node.address && (
                      <div className="px-2 py-1 rounded text-xs bg-subrosa-red text-white">Selected</div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} />
                    <span className="text-sm">{node.reputation}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>
                      {node.location.city}, {node.location.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={12} />
                    <span>{Math.min(node.bandwidth.upload, node.bandwidth.download)} Mbps</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-gray-500">{formatPrice(node.price)} DVPN/GB</span>
                  <span className="text-gray-500">
                    {node.peers} peers • {node.uptime.toFixed(1)}% uptime
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-subrosa-gray text-sm text-gray-400">
          <div className="flex justify-between">
            <span>Total nodes: {filteredNodes.length}</span>
            <span>
              Average reputation:{" "}
              {filteredNodes.length > 0
                ? Math.round(filteredNodes.reduce((sum, node) => sum + node.reputation, 0) / filteredNodes.length)
                : 0}
              %
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NodeDiscovery
