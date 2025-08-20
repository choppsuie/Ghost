export interface SentinelNode {
  address: string
  moniker: string
  price: string
  hourlyPrice: string
  gigabytePrice: string
  country: string
  city: string
  latitude: number
  longitude: number
  status: "active" | "inactive"
  bandwidth: number
  peers: number
  version: string
  uptime: number
  reputation: number
}

export interface Subscription {
  id: string
  nodeAddress: string
  status: "active" | "inactive" | "expired"
  allocatedBytes: number
  consumedBytes: number
  expiresAt: Date
  price: string
}

export class MockSentinelClient {
  private rpcEndpoint: string
  private chainId: string

  constructor(rpcEndpoint: string, chainId: string) {
    this.rpcEndpoint = rpcEndpoint
    this.chainId = chainId
  }

  async getNodes(): Promise<SentinelNode[]> {
    // Mock implementation - in production this would query the Sentinel network
    return [
      {
        address: "sentnode1abc123",
        moniker: "SecureNode-US",
        price: "0.1",
        hourlyPrice: "0.001",
        gigabytePrice: "0.01",
        country: "United States",
        city: "New York",
        latitude: 40.7128,
        longitude: -74.006,
        status: "active",
        bandwidth: 1000,
        peers: 25,
        version: "0.7.0",
        uptime: 99.8,
        reputation: 4.8,
      },
      {
        address: "sentnode2def456",
        moniker: "PrivacyNode-DE",
        price: "0.08",
        hourlyPrice: "0.0008",
        gigabytePrice: "0.008",
        country: "Germany",
        city: "Berlin",
        latitude: 52.52,
        longitude: 13.405,
        status: "active",
        bandwidth: 800,
        peers: 18,
        version: "0.7.0",
        uptime: 99.9,
        reputation: 4.9,
      },
    ]
  }

  async createSubscription(nodeAddress: string, deposit: string): Promise<Subscription> {
    // Mock implementation
    return {
      id: `sub_${Date.now()}`,
      nodeAddress,
      status: "active",
      allocatedBytes: 10 * 1024 * 1024 * 1024, // 10GB
      consumedBytes: 0,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      price: deposit,
    }
  }

  async getSubscription(id: string): Promise<Subscription | null> {
    // Mock implementation
    return null
  }
}

export { MockSentinelClient as SentinelClient }
