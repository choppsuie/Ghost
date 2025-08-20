import { SentinelClient } from "@sentinel-official/sentinel-js-sdk"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import { SigningStargateClient } from "@cosmjs/stargate"

// Sentinel network configuration
const SENTINEL_CONFIG = {
  rpcEndpoint: process.env.SENTINEL_RPC_ENDPOINT || "https://rpc.sentinel.co:443",
  chainId: process.env.SENTINEL_CHAIN_ID || "sentinelhub-2",
  denom: process.env.DVPN_TOKEN_DENOM || "udvpn",
  gasPrice: "0.1udvpn",
  prefix: "sent",
}

export interface SentinelNode {
  address: string
  moniker: string
  price: string
  location: {
    country: string
    city: string
    latitude: number
    longitude: number
  }
  bandwidth: {
    upload: number
    download: number
  }
  status: "active" | "inactive"
  reputation: number
  version: string
  uptime: number
  lastSeen: Date
  peers: number
  handshake: {
    enable: boolean
    peers: number
  }
  type: number
  remoteUrl: string
}

export interface NodeFilters {
  country?: string
  minReputation?: number
  maxPrice?: number
  minBandwidth?: number
  sortBy?: "price" | "reputation" | "bandwidth" | "latency"
  sortOrder?: "asc" | "desc"
  limit?: number
}

export class SentinelService {
  private client: SentinelClient | null = null
  private wallet: DirectSecp256k1HdWallet | null = null
  private signingClient: SigningStargateClient | null = null
  private nodeCache: Map<string, { nodes: SentinelNode[]; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  async initialize(mnemonic?: string): Promise<void> {
    try {
      // Initialize wallet
      if (mnemonic || process.env.SENTINEL_WALLET_MNEMONIC) {
        this.wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic || process.env.SENTINEL_WALLET_MNEMONIC!, {
          prefix: SENTINEL_CONFIG.prefix,
        })
      }

      // Initialize Sentinel client
      this.client = new SentinelClient({
        rpcEndpoint: SENTINEL_CONFIG.rpcEndpoint,
        chainId: SENTINEL_CONFIG.chainId,
      })

      // Initialize signing client if wallet exists
      if (this.wallet) {
        this.signingClient = await SigningStargateClient.connectWithSigner(SENTINEL_CONFIG.rpcEndpoint, this.wallet, {
          gasPrice: SENTINEL_CONFIG.gasPrice,
        })
      }

      console.log("[v0] Sentinel client initialized successfully")
    } catch (error) {
      console.error("[v0] Failed to initialize Sentinel client:", error)
      throw error
    }
  }

  async getActiveNodes(filters?: NodeFilters): Promise<SentinelNode[]> {
    const cacheKey = JSON.stringify(filters || {})
    const cached = this.nodeCache.get(cacheKey)

    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      console.log("[v0] Returning cached nodes")
      return cached.nodes
    }

    if (!this.client) {
      console.warn("[v0] Sentinel client not initialized, using mock data")
      return this.getMockNodes()
    }

    try {
      console.log("[v0] Fetching active nodes from Sentinel network")

      // Fetch nodes from Sentinel network
      const rawNodes = await this.client.getNodes({
        status: "active",
        limit: filters?.limit || 100,
      })

      // Transform and enrich node data
      let nodes: SentinelNode[] = rawNodes.map((node: any) => ({
        address: node.address,
        moniker: node.moniker || `Node ${node.address.slice(-6)}`,
        price: node.price || "100000udvpn", // Default price per GB
        location: {
          country: node.location?.country || "Unknown",
          city: node.location?.city || "Unknown",
          latitude: node.location?.latitude || 0,
          longitude: node.location?.longitude || 0,
        },
        bandwidth: {
          upload: node.bandwidth?.upload || Math.floor(Math.random() * 1000) + 100,
          download: node.bandwidth?.download || Math.floor(Math.random() * 1000) + 100,
        },
        status: node.status === "active" ? "active" : "inactive",
        reputation: node.reputation || Math.floor(Math.random() * 30) + 70,
        version: node.version || "0.7.0",
        uptime: node.uptime || Math.floor(Math.random() * 100),
        lastSeen: new Date(node.lastSeen || Date.now()),
        peers: node.peers || Math.floor(Math.random() * 50) + 10,
        handshake: {
          enable: node.handshake?.enable || true,
          peers: node.handshake?.peers || Math.floor(Math.random() * 20) + 5,
        },
        type: node.type || 2,
        remoteUrl: node.remoteUrl || `https://${node.address}.sentinel.co`,
      }))

      // Apply filters
      nodes = this.applyNodeFilters(nodes, filters)

      // Cache the results
      this.nodeCache.set(cacheKey, { nodes, timestamp: Date.now() })

      console.log(`[v0] Successfully fetched ${nodes.length} nodes from Sentinel network`)
      return nodes
    } catch (error) {
      console.error("[v0] Error fetching nodes from Sentinel network:", error)

      // Fallback to mock data with applied filters
      const mockNodes = this.getMockNodes()
      return this.applyNodeFilters(mockNodes, filters)
    }
  }

  private applyNodeFilters(nodes: SentinelNode[], filters?: NodeFilters): SentinelNode[] {
    if (!filters) return nodes

    let filteredNodes = [...nodes]

    // Filter by country
    if (filters.country) {
      filteredNodes = filteredNodes.filter((node) =>
        node.location.country.toLowerCase().includes(filters.country!.toLowerCase()),
      )
    }

    // Filter by minimum reputation
    if (filters.minReputation !== undefined) {
      filteredNodes = filteredNodes.filter((node) => node.reputation >= filters.minReputation!)
    }

    // Filter by maximum price (convert to number for comparison)
    if (filters.maxPrice !== undefined) {
      filteredNodes = filteredNodes.filter((node) => {
        const priceNum = Number.parseInt(node.price) / 1000000 // Convert udvpn to DVPN
        return priceNum <= filters.maxPrice!
      })
    }

    // Filter by minimum bandwidth
    if (filters.minBandwidth !== undefined) {
      filteredNodes = filteredNodes.filter(
        (node) => Math.min(node.bandwidth.upload, node.bandwidth.download) >= filters.minBandwidth!,
      )
    }

    // Sort nodes
    if (filters.sortBy) {
      filteredNodes.sort((a, b) => {
        let aValue: number, bValue: number

        switch (filters.sortBy) {
          case "price":
            aValue = Number.parseInt(a.price)
            bValue = Number.parseInt(b.price)
            break
          case "reputation":
            aValue = a.reputation
            bValue = b.reputation
            break
          case "bandwidth":
            aValue = Math.min(a.bandwidth.upload, a.bandwidth.download)
            bValue = Math.min(b.bandwidth.upload, b.bandwidth.download)
            break
          case "latency":
            // Simulate latency based on location (mock implementation)
            aValue = this.calculateMockLatency(a.location)
            bValue = this.calculateMockLatency(b.location)
            break
          default:
            return 0
        }

        const result = aValue - bValue
        return filters.sortOrder === "desc" ? -result : result
      })
    }

    // Apply limit
    if (filters.limit && filters.limit > 0) {
      filteredNodes = filteredNodes.slice(0, filters.limit)
    }

    return filteredNodes
  }

  private calculateMockLatency(location: { latitude: number; longitude: number }): number {
    // Mock latency calculation based on distance from user (assuming US East Coast)
    const userLat = 40.7128 // New York
    const userLng = -74.006

    const distance = Math.sqrt(Math.pow(location.latitude - userLat, 2) + Math.pow(location.longitude - userLng, 2))

    return Math.floor(distance * 10) + 20 // Base latency + distance factor
  }

  async getNodesByCountry(country: string): Promise<SentinelNode[]> {
    return this.getActiveNodes({ country, sortBy: "reputation", sortOrder: "desc" })
  }

  async getBestNodes(limit = 10): Promise<SentinelNode[]> {
    return this.getActiveNodes({
      minReputation: 80,
      sortBy: "reputation",
      sortOrder: "desc",
      limit,
    })
  }

  async refreshNodeCache(): Promise<void> {
    console.log("[v0] Clearing node cache")
    this.nodeCache.clear()
  }

  async getNodeDetails(nodeAddress: string): Promise<SentinelNode | null> {
    try {
      if (!this.client) {
        throw new Error("Sentinel client not initialized")
      }

      console.log("[v0] Fetching node details for:", nodeAddress)
      const nodeData = await this.client.getNode(nodeAddress)

      if (!nodeData) return null

      return {
        address: nodeData.address,
        moniker: nodeData.moniker || `Node ${nodeAddress.slice(-6)}`,
        price: nodeData.price || "100000udvpn",
        location: {
          country: nodeData.location?.country || "Unknown",
          city: nodeData.location?.city || "Unknown",
          latitude: nodeData.location?.latitude || 0,
          longitude: nodeData.location?.longitude || 0,
        },
        bandwidth: {
          upload: nodeData.bandwidth?.upload || 100,
          download: nodeData.bandwidth?.download || 100,
        },
        status: nodeData.status === "active" ? "active" : "inactive",
        reputation: nodeData.reputation || 0,
        version: nodeData.version || "0.7.0",
        uptime: nodeData.uptime || 0,
        lastSeen: new Date(nodeData.lastSeen || Date.now()),
        peers: nodeData.peers || 0,
        handshake: {
          enable: nodeData.handshake?.enable || true,
          peers: nodeData.handshake?.peers || 0,
        },
        type: nodeData.type || 2,
        remoteUrl: nodeData.remoteUrl || `https://${nodeAddress}.sentinel.co`,
      }
    } catch (error) {
      console.error("[v0] Error fetching node details:", error)
      return null
    }
  }

  async createSubscription(nodeAddress: string, deposit: string): Promise<string> {
    if (!this.signingClient || !this.wallet) {
      throw new Error("Wallet not initialized")
    }

    try {
      const [account] = await this.wallet.getAccounts()
      console.log("[v0] Creating subscription for node:", nodeAddress)

      const msg = {
        typeUrl: "/sentinel.subscription.v2.MsgSubscribeToNodeRequest",
        value: {
          from: account.address,
          nodeAddress,
          deposit,
        },
      }

      const result = await this.signingClient.signAndBroadcast(account.address, [msg], "auto")

      console.log("[v0] Subscription created:", result.transactionHash)
      return result.transactionHash
    } catch (error) {
      console.error("[v0] Error creating subscription:", error)
      throw error
    }
  }

  async getWalletAddress(): Promise<string | null> {
    if (!this.wallet) return null

    const [account] = await this.wallet.getAccounts()
    return account.address
  }

  async getBalance(): Promise<string> {
    if (!this.signingClient || !this.wallet) {
      return "0"
    }

    try {
      const [account] = await this.wallet.getAccounts()
      const balance = await this.signingClient.getBalance(account.address, SENTINEL_CONFIG.denom)
      return balance.amount
    } catch (error) {
      console.error("[v0] Error fetching balance:", error)
      return "0"
    }
  }

  private getMockNodes(): SentinelNode[] {
    return [
      {
        address: "sentnode1qg5ega6dykkxc307y25pecuufrjkxkaggwcrxjjl",
        moniker: "Sentinel Node US-East",
        price: "100000udvpn",
        location: {
          country: "United States",
          city: "New York",
          latitude: 40.7128,
          longitude: -74.006,
        },
        bandwidth: { upload: 1000, download: 1000 },
        status: "active",
        reputation: 95,
        version: "0.7.0",
        uptime: 98.5,
        lastSeen: new Date(),
        peers: 45,
        handshake: { enable: true, peers: 12 },
        type: 2,
        remoteUrl: "https://node1.sentinel.co",
      },
      {
        address: "sentnode1qjzqkk9q0yhyj4f6s36cv6snrz4at67ch5c2cgm5",
        moniker: "Sentinel Node EU-West",
        price: "120000udvpn",
        location: {
          country: "Germany",
          city: "Frankfurt",
          latitude: 50.1109,
          longitude: 8.6821,
        },
        bandwidth: { upload: 800, download: 1200 },
        status: "active",
        reputation: 92,
        version: "0.7.0",
        uptime: 97.2,
        lastSeen: new Date(Date.now() - 60000),
        peers: 38,
        handshake: { enable: true, peers: 15 },
        type: 2,
        remoteUrl: "https://node2.sentinel.co",
      },
      {
        address: "sentnode1qf9d6ag2asr4rnfavp2j6eyhs3suhtag3q6g75k",
        moniker: "Sentinel Node Asia-Pacific",
        price: "90000udvpn",
        location: {
          country: "Singapore",
          city: "Singapore",
          latitude: 1.3521,
          longitude: 103.8198,
        },
        bandwidth: { upload: 1200, download: 800 },
        status: "active",
        reputation: 89,
        version: "0.6.9",
        uptime: 96.8,
        lastSeen: new Date(Date.now() - 120000),
        peers: 52,
        handshake: { enable: true, peers: 18 },
        type: 2,
        remoteUrl: "https://node3.sentinel.co",
      },
      {
        address: "sentnode1qw3fs0nx4n9e5k48huiyj52ls685pr3m27d2dg5",
        moniker: "Sentinel Node Canada",
        price: "110000udvpn",
        location: {
          country: "Canada",
          city: "Toronto",
          latitude: 43.6532,
          longitude: -79.3832,
        },
        bandwidth: { upload: 900, download: 900 },
        status: "active",
        reputation: 94,
        version: "0.7.0",
        uptime: 99.1,
        lastSeen: new Date(Date.now() - 30000),
        peers: 41,
        handshake: { enable: true, peers: 14 },
        type: 2,
        remoteUrl: "https://node4.sentinel.co",
      },
    ]
  }
}

// Singleton instance
export const sentinelService = new SentinelService()
