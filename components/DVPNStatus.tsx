"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Shield, ShieldOff, RefreshCw, Network, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DVPNStatus({ initialActive = false }) {
  const [active, setActive] = useState(initialActive)
  const [loading, setLoading] = useState(false)
  const [multiHopEnabled, setMultiHopEnabled] = useState(false)
  const [nodes, setNodes] = useState([
    { id: 1, name: "Node Alpha", location: "Singapore", latency: 45 },
    { id: 2, name: "Node Beta", location: "Netherlands", latency: 78 },
    { id: 3, name: "Node Gamma", location: "Canada", latency: 112 },
  ])
  const [selectedNode, setSelectedNode] = useState(1)
  const [secondaryNode, setSecondaryNode] = useState(2)
  const supabase = createClient()

  const toggleDVPN = async () => {
    setLoading(true)
    try {
      // Simulate API call to toggle dVPN
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update state
      setActive(!active)

      // If turning off, also disable multi-hop
      if (active) {
        setMultiHopEnabled(false)
      }

      // Show success message
      console.log(`dVPN ${!active ? "activated" : "deactivated"} successfully`)
    } catch (error) {
      console.error("Error toggling dVPN:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMultiHop = () => {
    if (!active) return // Can't enable multi-hop if dVPN is not active
    setMultiHopEnabled(!multiHopEnabled)
  }

  const selectNode = (nodeId) => {
    if (active) return // Can't change node while active
    if (nodeId === secondaryNode) {
      // If selecting the current secondary node, swap them
      setSecondaryNode(selectedNode)
    }
    setSelectedNode(nodeId)
  }

  const selectSecondaryNode = (nodeId) => {
    if (!active || !multiHopEnabled || nodeId === selectedNode) return
    setSecondaryNode(nodeId)
  }

  // Find the selected node objects safely
  const primaryNode = nodes.find((n) => n.id === selectedNode) || nodes[0]
  const secondNode = nodes.find((n) => n.id === secondaryNode) || nodes[1]

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
            {active ? "Enabled" : "Disabled"}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Multi-hop toggle */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Network size={16} className={active && multiHopEnabled ? "text-subrosa-red" : "text-gray-400"} />
              Multi-hop Routing
            </h3>
            <p className="text-xs text-gray-400 mt-1">Route through multiple nodes for enhanced privacy</p>
          </div>
          <button
            onClick={toggleMultiHop}
            disabled={!active}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              !active
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : multiHopEnabled
                  ? "bg-subrosa-red bg-opacity-20 text-subrosa-red"
                  : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {multiHopEnabled ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            {multiHopEnabled ? "Primary Node" : "Available Nodes"}
          </h3>
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

        {/* Secondary node selection (only visible when multi-hop is enabled) */}
        {multiHopEnabled && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Secondary Node</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {nodes
                .filter((node) => node.id !== selectedNode)
                .map((node) => (
                  <div
                    key={`secondary-${node.id}`}
                    onClick={() => selectSecondaryNode(node.id)}
                    className={`
                      p-3 rounded border cursor-pointer transition-all
                      ${
                        secondaryNode === node.id
                          ? "border-subrosa-red bg-subrosa-dark"
                          : "border-subrosa-gray bg-subrosa-dark bg-opacity-50 hover:border-gray-500"
                      }
                    `}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{node.name}</span>
                      {secondaryNode === node.id && (
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
        )}

        {/* Connection visualization */}
        {active && (
          <div className="mb-6 p-4 bg-subrosa-dark rounded border border-subrosa-gray">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Connection Path</h3>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Shield size={20} className="text-gray-400" />
                </div>
                <span className="text-xs mt-1">You</span>
              </div>

              <div className="w-16 h-0.5 bg-subrosa-red mx-2 animate-pulse"></div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center">
                  <Network size={20} className="text-subrosa-red" />
                </div>
                <span className="text-xs mt-1">{primaryNode.name}</span>
              </div>

              {multiHopEnabled && (
                <>
                  <div className="w-16 h-0.5 bg-subrosa-red mx-2 animate-pulse"></div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center">
                      <Network size={20} className="text-subrosa-red" />
                    </div>
                    <span className="text-xs mt-1">{secondNode.name}</span>
                  </div>
                </>
              )}

              <div className="w-16 h-0.5 bg-subrosa-red mx-2 animate-pulse"></div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Globe size={20} className="text-gray-400" />
                </div>
                <span className="text-xs mt-1">Internet</span>
              </div>
            </div>
          </div>
        )}

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
