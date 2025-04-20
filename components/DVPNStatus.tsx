"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Shield, ShieldOff, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DVPNStatus({ initialActive = false }) {
  const [active, setActive] = useState(initialActive)
  const [loading, setLoading] = useState(false)
  const [nodes, setNodes] = useState([
    { id: 1, name: "Node Alpha", location: "Singapore", latency: 45 },
    { id: 2, name: "Node Beta", location: "Netherlands", latency: 78 },
    { id: 3, name: "Node Gamma", location: "Canada", latency: 112 },
  ])
  const [selectedNode, setSelectedNode] = useState(1)
  const supabase = createClient()

  const toggleDVPN = async () => {
    setLoading(true)
    try {
      // Simulate API call to toggle dVPN
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update state
      setActive(!active)

      // Show success message
      console.log(`dVPN ${!active ? "activated" : "deactivated"} successfully`)
    } catch (error) {
      console.error("Error toggling dVPN:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectNode = (nodeId) => {
    if (active) return // Can't change node while active
    setSelectedNode(nodeId)
  }

  return (
    <Card className="border border-subrosa-gray bg-subrosa-light">
      <CardHeader className="border-b border-subrosa-gray">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {active ? <Shield className="text-subrosa-red" /> : <ShieldOff className="text-gray-400" />}
            <span>Decentralized VPN</span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm ${active ? "bg-subrosa-red bg-opacity-20 text-subrosa-red" : "bg-gray-800 text-gray-400"}`}
          >
            {active ? "Connected" : "Disconnected"}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Available Nodes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => selectNode(node.id)}
                className={`
                  p-3 rounded border cursor-pointer transition-all
                  ${
                    selectedNode === node.id
                      ? "border-subrosa-red bg-subrosa-dark"
                      : "border-subrosa-gray bg-subrosa-dark bg-opacity-50 hover:border-gray-500"
                  }
                  ${active ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{node.name}</span>
                  {selectedNode === node.id && active && (
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-subrosa-red mr-1 animate-pulse"></span>
                      <span className="text-xs text-gray-400">Active</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{node.location}</span>
                  <span>{node.latency} ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleDVPN}
            disabled={loading}
            className={`
              relative px-6 py-3 rounded-md font-medium flex items-center gap-2
              ${active ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-subrosa-red hover:bg-opacity-90 text-white"}
              transition-colors
              ${loading ? "opacity-80" : ""}
            `}
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin" size={18} />
                <span>{active ? "Disconnecting..." : "Connecting..."}</span>
              </>
            ) : (
              <>
                {active ? <ShieldOff size={18} /> : <Shield size={18} />}
                <span>{active ? "Disconnect" : "Connect"}</span>
              </>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default DVPNStatus
