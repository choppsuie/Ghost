export interface MockVpnServer {
  id: string
  name: string
  country: string
  countryCode: string
  city: string
  flag: string
  load: number // 0-100 percentage
  ping: number // milliseconds
  bandwidth: string
  status: "online" | "maintenance" | "offline"
  premium: boolean
  features: string[]
  coordinates: {
    lat: number
    lng: number
  }
}

export const mockVpnServers: MockVpnServer[] = [
  {
    id: "switzerland-1",
    name: "Zurich Secure",
    country: "Switzerland",
    countryCode: "CH",
    city: "Zurich",
    flag: "🇨🇭",
    load: 23,
    ping: 45,
    bandwidth: "1 Gbps",
    status: "online",
    premium: true,
    features: ["No Logs", "P2P", "Streaming"],
    coordinates: { lat: 47.3769, lng: 8.5417 },
  },
  {
    id: "iceland-2",
    name: "Reykjavik Freedom",
    country: "Iceland",
    countryCode: "IS",
    city: "Reykjavik",
    flag: "🇮🇸",
    load: 12,
    ping: 67,
    bandwidth: "1 Gbps",
    status: "online",
    premium: true,
    features: ["No Logs", "P2P", "Streaming", "Tor"],
    coordinates: { lat: 64.1466, lng: -21.9426 },
  },
  {
    id: "netherlands-3",
    name: "Amsterdam Hub",
    country: "Netherlands",
    countryCode: "NL",
    city: "Amsterdam",
    flag: "🇳🇱",
    load: 56,
    ping: 32,
    bandwidth: "10 Gbps",
    status: "online",
    premium: false,
    features: ["No Logs", "P2P"],
    coordinates: { lat: 52.3676, lng: 4.9041 },
  },
  {
    id: "singapore-1",
    name: "Singapore Gateway",
    country: "Singapore",
    countryCode: "SG",
    city: "Singapore",
    flag: "🇸🇬",
    load: 78,
    ping: 156,
    bandwidth: "1 Gbps",
    status: "online",
    premium: true,
    features: ["No Logs", "Streaming"],
    coordinates: { lat: 1.3521, lng: 103.8198 },
  },
  {
    id: "canada-2",
    name: "Toronto Shield",
    country: "Canada",
    countryCode: "CA",
    city: "Toronto",
    flag: "🇨🇦",
    load: 34,
    ping: 89,
    bandwidth: "1 Gbps",
    status: "maintenance",
    premium: false,
    features: ["No Logs", "P2P"],
    coordinates: { lat: 43.6532, lng: -79.3832 },
  },
  {
    id: "japan-1",
    name: "Tokyo Express",
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    flag: "🇯🇵",
    load: 91,
    ping: 201,
    bandwidth: "1 Gbps",
    status: "online",
    premium: true,
    features: ["No Logs", "Streaming"],
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
]

export const getServersByCountry = () => {
  return mockVpnServers.reduce(
    (acc, server) => {
      if (!acc[server.country]) {
        acc[server.country] = []
      }
      acc[server.country].push(server)
      return acc
    },
    {} as Record<string, MockVpnServer[]>,
  )
}

export const getOnlineServers = () => mockVpnServers.filter((server) => server.status === "online")
export const getPremiumServers = () => mockVpnServers.filter((server) => server.premium)
