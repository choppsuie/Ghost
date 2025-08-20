export interface MockUser {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  subscription: "free" | "premium" | "enterprise"
  joinedAt: string
  lastActive: string
  preferences: {
    theme: "dark" | "high-contrast" | "dark-contrast"
    autoConnect: boolean
    killSwitch: boolean
    dnsLeakProtection: boolean
    preferredServer?: string
  }
  stats: {
    totalSessions: number
    dataTransferred: string
    timeConnected: string
    countriesAccessed: number
  }
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "alice.cipher@protonmail.com",
    username: "alice_cipher",
    firstName: "Alice",
    lastName: "Cipher",
    avatar: "/professional-woman-avatar.png",
    subscription: "premium",
    joinedAt: "2024-01-15T10:30:00Z",
    lastActive: "2024-12-19T14:22:00Z",
    preferences: {
      theme: "dark",
      autoConnect: true,
      killSwitch: true,
      dnsLeakProtection: true,
      preferredServer: "switzerland-1",
    },
    stats: {
      totalSessions: 342,
      dataTransferred: "2.4 TB",
      timeConnected: "156 hours",
      countriesAccessed: 23,
    },
  },
  {
    id: "2",
    email: "ghost.protocol@tutanota.com",
    username: "ghost_protocol",
    firstName: "Marcus",
    lastName: "Shadow",
    subscription: "enterprise",
    joinedAt: "2023-11-08T09:15:00Z",
    lastActive: "2024-12-19T16:45:00Z",
    preferences: {
      theme: "high-contrast",
      autoConnect: true,
      killSwitch: true,
      dnsLeakProtection: true,
      preferredServer: "iceland-2",
    },
    stats: {
      totalSessions: 1247,
      dataTransferred: "8.7 TB",
      timeConnected: "523 hours",
      countriesAccessed: 45,
    },
  },
  {
    id: "3",
    email: "nova.anon@guerrillamail.com",
    username: "nova_anon",
    firstName: "Nova",
    lastName: "Anonymous",
    avatar: "/placeholder-xkg50.png",
    subscription: "free",
    joinedAt: "2024-12-01T18:20:00Z",
    lastActive: "2024-12-19T12:10:00Z",
    preferences: {
      theme: "dark-contrast",
      autoConnect: false,
      killSwitch: false,
      dnsLeakProtection: true,
    },
    stats: {
      totalSessions: 23,
      dataTransferred: "45 GB",
      timeConnected: "12 hours",
      countriesAccessed: 3,
    },
  },
]

export const getCurrentMockUser = (): MockUser => mockUsers[0]
