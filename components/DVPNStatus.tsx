"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Shield, ShieldOff, RefreshCw, Network, Globe, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sentinelService, type SentinelNode } from "@/lib/sentinelClient"
import { toast } from "sonner"

export function DVPNStatus({ initialActive = false, userId }: { initialActive?: boolean; userId?: string }) {
  const [active, setActive] = useState(initialActive)
  const [loading, setLoading] = useState(false)
  const [multiHopEnabled, setMultiHopEnabled] = useState(false)
  const [nodes, setNodes] = useState<SentinelNode[]>([])
  const [selectedNode, setSelectedNode] = useState<string>("")
  const [secondaryNode, setSecondaryNode] = useState<string>("")
  const [walletConnected, setWalletConnected] = useState(false)
  const [tunnelId, setTunnelId] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<string>("disconnected")
  const supabase = createClient()

  useEffect(() => {
    loadNodes()
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      const address = await sentinelService.getWalletAddress()
      setWalletConnected(!!address)
    } catch (error) {
      console.error("[v0] Error checking wallet:", error)
      setWalletConnected(false)
    }
  }

  const loadNodes = async () => {
    try {
      console.log("[v0] Loading Sentinel nodes")
      const sentinelNodes = await sentinelService.getActiveNodes()
      setNodes(sentinelNodes)

      if (sentinelNodes.length > 0) {
        setSelectedNode(sentinelNodes[0].address)
        if (sentinelNodes.length > 1) {
          setSecondaryNode(sentinelNodes[1].address)
        }
      }
    } catch (error) {
      console.error("[v0] Error loading nodes:", error)
      toast.error("Failed to load VPN nodes")
    }
  }

  const toggleDVPN = async () => {
    if (!walletConnected) {
      toast.error("Please connect your wallet first")
      return
    }

    setLoading(true)
    try {
      console.log("[v0] Toggling dVPN connection")

      if (!active) {
        const selectedNodeObj = nodes.find((n) => n.address === selectedNode)
        if (!selectedNodeObj) {
          throw new Error("No node selected")
        }

        setConnectionStatus("connecting")

        const deposit = "1000000udvpn" // 1 DVPN
        const txHash = await sentinelService.createSubscription(selectedNode, deposit)
        console.log("[v0] Subscription created:", txHash)

        const response = await fetch("/api/tunnel/connect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nodeAddress: selectedNode,
            userId: userId,
            config: {
              protocol: "wireguard",
              encryption: "ChaCha20",
              dnsServers: ["1.1.1.1", "1.0.0.1"],
              killSwitch: true,
              autoReconnect: true,
              mtu: 1420,
            },
          }),
        })

        const data = await response.json()
        if (data.success) {
          setTunnelId(data.connection.id)
          setConnectionStatus("connected")
          setActive(true)
          toast.success("Connected to dVPN node!")
        } else {
          throw new Error(data.error)
        }
      } else {
        setConnectionStatus("disconnecting")

        if (tunnelId) {
          const response = await fetch("/api/tunnel/disconnect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tunnelId }),
          })

          const data = await response.json()
          if (data.success) {
            setTunnelId(null)
            setConnectionStatus("disconnected")
            setActive(false)
            setMultiHopEnabled(false)
            toast.success("Disconnected from dVPN")
          } else {
            throw new Error(data.error)
          }
        }
      }
    } catch (error) {
      console.error("[v0] Error toggling dVPN:", error)
      setConnectionStatus("error")
      toast.error("Failed to toggle dVPN connection")
    } finally {
      setLoading(false)
    }
  }

  const toggleMultiHop = () => {
    if (!active) return // Can't enable multi-hop if dVPN is not active
    setMultiHopEnabled(!multiHopEnabled)
  }

  const selectNode = (nodeAddress: string) => {
    if (active) return // Can't change node while active
    if (nodeAddress === secondaryNode) {
      setSecondaryNode(selectedNode)
    }
    setSelectedNode(nodeAddress)
  }

  const selectSecondaryNode = (nodeAddress: string) => {
    if (!active || !multiHopEnabled || nodeAddress === selectedNode) return
    setSecondaryNode(nodeAddress)
  }

  const primaryNode = nodes.find((n) => n.address === selectedNode) || nodes[0]
  const secondNode = nodes.find((n) => n.address === secondaryNode) || nodes[1]

  const getConnectionStatusDisplay = () => {
    switch (connectionStatus) {
      case "connecting":
        return { text: "Connecting...", color: "text-yellow-400" }
      case "connected":
        return { text: "Connected", color: "text-green-400" }
      case "disconnecting":
        return { text: "Disconnecting...", color: "text-orange-400" }
      case "error":
        return { text: "Error", color: "text-red-400" }
      default:
        return { text: "Disconnected", color: "text-gray-400" }
    }
  }

  const statusDisplay = getConnectionStatusDisplay()

  return (
    <Card className="border border-subrosa-gray bg-subrosa-light">
      <CardHeader className="border-b border-subrosa-gray">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {active ? <Shield className="text-subrosa-red" /> : <ShieldOff className="text-gray-400" />}
            <span>Decentralized VPN</span>
          </div>
          <div className="flex items-center gap-2">
            {!walletConnected && (
              <div className="px-2 py-1 rounded-full text-xs bg-yellow-900 bg-opacity-30 text-yellow-400 border border-yellow-800 flex items-center gap-1">
                <Wallet size={12} />
                <span>Wallet Required</span>
              </div>
            )}
            <div
              className={`px-3 py-1 rounded-full text-sm bg-opacity-20 ${statusDisplay.color.replace("text-", "bg-").replace("-400", "-900")} ${statusDisplay.color}`}
            >
              {statusDisplay.text}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
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
                key={node.address}
                onClick={() => selectNode(node.address)}
                className={`
                  p-3 rounded border cursor-pointer transition-all
                  ${
                    selectedNode === node.address
                      ? "border-subrosa-red bg-subrosa-dark"
                      : "border-subrosa-gray bg-subrosa-dark bg-opacity-50 hover:border-gray-500"
                  }
                  ${active ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{node.moniker}</span>
                  {selectedNode === node.address && active && (
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-subrosa-red mr-1 animate-pulse"></span>
                      <span className="text-xs text-gray-400">Active</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>
                    {node.location.city}, {node.location.country}
                  </span>
                  <span className="text-green-400">{node.reputation}%</span>
                </div>
                <div className="text-xs text-gray-500">Price: {Number.parseInt(node.price) / 1000000} DVPN/GB</div>
              </div>
            ))}
          </div>
        </div>

        {multiHopEnabled && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Secondary Node</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {nodes
                .filter((node) => node.address !== selectedNode)
                .map((node) => (
                  <div
                    key={`secondary-${node.address}`}
                    onClick={() => selectSecondaryNode(node.address)}
                    className={`
                      p-3 rounded border cursor-pointer transition-all
                      ${
                        secondaryNode === node.address
                          ? "border-subrosa-red bg-subrosa-dark"
                          : "border-subrosa-gray bg-subrosa-dark bg-opacity-50 hover:border-gray-500"
                      }
                    `}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{node.moniker}</span>
                      {secondaryNode === node.address && (
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-subrosa-red mr-1 animate-pulse"></span>
                          <span className="text-xs text-gray-400">Active</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>
                        {node.location.city}, {node.location.country}
                      </span>
                      <span className="text-green-400">{node.reputation}%</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {active && primaryNode && (
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
                <span className="text-xs mt-1">{primaryNode.moniker}</span>
              </div>

              {multiHopEnabled && secondNode && (
                <>
                  <div className="w-16 h-0.5 bg-subrosa-red mx-2 animate-pulse"></div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center">
                      <Network size={20} className="text-subrosa-red" />
                    </div>
                    <span className="text-xs mt-1">{secondNode.moniker}</span>
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
            disabled={loading || !walletConnected}
            className={`
              relative px-6 py-3 rounded-md font-medium flex items-center gap-2
              ${active ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-subrosa-red hover:bg-opacity-90 text-white"}
              transition-colors
              ${loading || !walletConnected ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin" size={18} />
                <span>
                  {connectionStatus === "connecting"
                    ? "Connecting..."
                    : connectionStatus === "disconnecting"
                      ? "Disconnecting..."
                      : "Processing..."}
                </span>
              </>
            ) : (
              <>
                {active ? <ShieldOff size={18} /> : <Shield size={18} />}
                <span>{active ? "Disconnect" : "Connect"}</span>
              </>
            )}
          </button>
        </div>

        {tunnelId && <div className="mt-4 text-xs text-gray-500 text-center">Tunnel ID: {tunnelId}</div>}
      </CardContent>
    </Card>
  )
}

export default DVPNStatus
