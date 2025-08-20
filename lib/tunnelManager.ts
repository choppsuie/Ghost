export interface TunnelConnection {
  id: string
  nodeAddress: string
  status: "connecting" | "connected" | "disconnecting" | "disconnected" | "error"
  startTime?: Date
  endTime?: Date
  bytesTransferred: {
    upload: number
    download: number
  }
  latency: number
  ipAddress?: string
  dnsServers: string[]
  protocol: "wireguard" | "openvpn"
  encryption: string
  killSwitch: boolean
  error?: string
}

export interface TunnelConfig {
  protocol: "wireguard" | "openvpn"
  encryption: "AES-256" | "ChaCha20"
  dnsServers: string[]
  killSwitch: boolean
  autoReconnect: boolean
  mtu: number
  port?: number
}

export interface BandwidthUsage {
  timestamp: Date
  upload: number
  download: number
  totalCost: number
}

export class TunnelManager {
  private static instance: TunnelManager
  private connections: Map<string, TunnelConnection> = new Map()
  private bandwidthHistory: Map<string, BandwidthUsage[]> = new Map()
  private monitoringInterval: NodeJS.Timeout | null = null

  static getInstance(): TunnelManager {
    if (!TunnelManager.instance) {
      TunnelManager.instance = new TunnelManager()
    }
    return TunnelManager.instance
  }

  async establishTunnel(nodeAddress: string, config: TunnelConfig, userId: string): Promise<TunnelConnection> {
    const tunnelId = `tunnel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log("[v0] Establishing tunnel to node:", nodeAddress)

    const connection: TunnelConnection = {
      id: tunnelId,
      nodeAddress,
      status: "connecting",
      bytesTransferred: { upload: 0, download: 0 },
      latency: 0,
      dnsServers: config.dnsServers,
      protocol: config.protocol,
      encryption: config.encryption,
      killSwitch: config.killSwitch,
    }

    this.connections.set(tunnelId, connection)

    try {
      // Simulate tunnel establishment process
      await this.simulateTunnelSetup(connection, config)

      connection.status = "connected"
      connection.startTime = new Date()
      connection.ipAddress = this.generateVirtualIP()

      // Start bandwidth monitoring
      this.startBandwidthMonitoring(tunnelId, userId)

      console.log("[v0] Tunnel established successfully:", tunnelId)
      return connection
    } catch (error) {
      console.error("[v0] Failed to establish tunnel:", error)
      connection.status = "error"
      connection.error = error.message
      throw error
    }
  }

  async disconnectTunnel(tunnelId: string): Promise<void> {
    const connection = this.connections.get(tunnelId)
    if (!connection) {
      throw new Error("Tunnel not found")
    }

    console.log("[v0] Disconnecting tunnel:", tunnelId)
    connection.status = "disconnecting"

    try {
      // Simulate disconnection process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      connection.status = "disconnected"
      connection.endTime = new Date()

      // Stop bandwidth monitoring
      this.stopBandwidthMonitoring(tunnelId)

      console.log("[v0] Tunnel disconnected successfully:", tunnelId)
    } catch (error) {
      console.error("[v0] Error disconnecting tunnel:", error)
      connection.status = "error"
      connection.error = error.message
      throw error
    }
  }

  getTunnelConnection(tunnelId: string): TunnelConnection | undefined {
    return this.connections.get(tunnelId)
  }

  getActiveTunnels(): TunnelConnection[] {
    return Array.from(this.connections.values()).filter(
      (conn) => conn.status === "connected" || conn.status === "connecting",
    )
  }

  async testTunnelLatency(tunnelId: string): Promise<number> {
    const connection = this.connections.get(tunnelId)
    if (!connection || connection.status !== "connected") {
      throw new Error("Tunnel not connected")
    }

    console.log("[v0] Testing tunnel latency for:", tunnelId)

    // Simulate latency test
    const latency = Math.floor(Math.random() * 100) + 20
    connection.latency = latency

    return latency
  }

  getBandwidthUsage(tunnelId: string): BandwidthUsage[] {
    return this.bandwidthHistory.get(tunnelId) || []
  }

  getTotalBandwidthUsage(userId: string): { upload: number; download: number; cost: number } {
    let totalUpload = 0
    let totalDownload = 0
    let totalCost = 0

    for (const [tunnelId, usage] of this.bandwidthHistory.entries()) {
      const connection = this.connections.get(tunnelId)
      if (connection) {
        usage.forEach((entry) => {
          totalUpload += entry.upload
          totalDownload += entry.download
          totalCost += entry.totalCost
        })
      }
    }

    return { upload: totalUpload, download: totalDownload, cost: totalCost }
  }

  private async simulateTunnelSetup(connection: TunnelConnection, config: TunnelConfig): Promise<void> {
    // Simulate different setup phases
    const phases = [
      "Authenticating with node",
      "Negotiating encryption",
      "Establishing secure channel",
      "Configuring routing",
      "Testing connectivity",
    ]

    for (const phase of phases) {
      console.log(`[v0] ${phase}...`)
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    // Simulate potential connection failures
    if (Math.random() < 0.1) {
      // 10% chance of failure
      throw new Error("Failed to establish secure connection")
    }
  }

  private generateVirtualIP(): string {
    // Generate a virtual IP in the 10.x.x.x range
    const octet2 = Math.floor(Math.random() * 255)
    const octet3 = Math.floor(Math.random() * 255)
    const octet4 = Math.floor(Math.random() * 254) + 1
    return `10.${octet2}.${octet3}.${octet4}`
  }

  private startBandwidthMonitoring(tunnelId: string, userId: string): void {
    if (this.monitoringInterval) return

    this.monitoringInterval = setInterval(() => {
      const connection = this.connections.get(tunnelId)
      if (!connection || connection.status !== "connected") return

      // Simulate bandwidth usage
      const uploadDelta = Math.floor(Math.random() * 1000000) // bytes
      const downloadDelta = Math.floor(Math.random() * 5000000) // bytes

      connection.bytesTransferred.upload += uploadDelta
      connection.bytesTransferred.download += downloadDelta

      // Calculate cost (mock pricing)
      const totalBytes = uploadDelta + downloadDelta
      const costPerGB = 0.001 // DVPN per GB
      const cost = (totalBytes / (1024 * 1024 * 1024)) * costPerGB

      const usage: BandwidthUsage = {
        timestamp: new Date(),
        upload: uploadDelta,
        download: downloadDelta,
        totalCost: cost,
      }

      const history = this.bandwidthHistory.get(tunnelId) || []
      history.push(usage)

      // Keep only last 100 entries
      if (history.length > 100) {
        history.shift()
      }

      this.bandwidthHistory.set(tunnelId, history)
    }, 5000) // Update every 5 seconds
  }

  private stopBandwidthMonitoring(tunnelId: string): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
    }
  }

  // Cleanup old connections
  cleanup(): void {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago

    for (const [tunnelId, connection] of this.connections.entries()) {
      if (connection.endTime && connection.endTime < cutoff) {
        this.connections.delete(tunnelId)
        this.bandwidthHistory.delete(tunnelId)
      }
    }
  }

  // Get default tunnel configuration
  getDefaultConfig(): TunnelConfig {
    return {
      protocol: "wireguard",
      encryption: "ChaCha20",
      dnsServers: ["1.1.1.1", "1.0.0.1"], // Cloudflare DNS
      killSwitch: true,
      autoReconnect: true,
      mtu: 1420,
      port: 51820,
    }
  }
}

export const tunnelManager = TunnelManager.getInstance()
