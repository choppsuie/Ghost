export interface MockBrowsingSession {
  id: string
  userId: string
  serverId: string
  startTime: string
  endTime?: string
  duration: number // minutes
  dataTransferred: {
    upload: string
    download: string
  }
  sitesVisited: number
  trackersBlocked: number
  status: "active" | "completed" | "interrupted"
}

export interface MockBrowsingHistory {
  id: string
  url: string
  title: string
  visitedAt: string
  favicon?: string
  category: "news" | "social" | "work" | "entertainment" | "shopping" | "other"
  blocked: boolean
  trackersBlocked: number
}

export const mockBrowsingSessions: MockBrowsingSession[] = [
  {
    id: "session-1",
    userId: "1",
    serverId: "switzerland-1",
    startTime: "2024-12-19T14:22:00Z",
    duration: 45,
    dataTransferred: {
      upload: "12.3 MB",
      download: "156.7 MB",
    },
    sitesVisited: 23,
    trackersBlocked: 47,
    status: "active",
  },
  {
    id: "session-2",
    userId: "1",
    serverId: "iceland-2",
    startTime: "2024-12-19T09:15:00Z",
    endTime: "2024-12-19T11:30:00Z",
    duration: 135,
    dataTransferred: {
      upload: "8.9 MB",
      download: "234.1 MB",
    },
    sitesVisited: 67,
    trackersBlocked: 123,
    status: "completed",
  },
  {
    id: "session-3",
    userId: "1",
    serverId: "netherlands-3",
    startTime: "2024-12-18T16:45:00Z",
    endTime: "2024-12-18T18:20:00Z",
    duration: 95,
    dataTransferred: {
      upload: "15.2 MB",
      download: "89.4 MB",
    },
    sitesVisited: 34,
    trackersBlocked: 78,
    status: "completed",
  },
]

export const mockBrowsingHistory: MockBrowsingHistory[] = [
  {
    id: "history-1",
    url: "https://signal.org",
    title: "Signal >> Home",
    visitedAt: "2024-12-19T14:45:00Z",
    favicon: "/signal-app-icon.png",
    category: "work",
    blocked: false,
    trackersBlocked: 0,
  },
  {
    id: "history-2",
    url: "https://protonmail.com",
    title: "ProtonMail - Secure Email",
    visitedAt: "2024-12-19T14:32:00Z",
    favicon: "/protonmail-icon.png",
    category: "work",
    blocked: false,
    trackersBlocked: 3,
  },
  {
    id: "history-3",
    url: "https://duckduckgo.com",
    title: "DuckDuckGo — Privacy, simplified.",
    visitedAt: "2024-12-19T14:28:00Z",
    favicon: "/duckduckgo-icon.png",
    category: "other",
    blocked: false,
    trackersBlocked: 0,
  },
  {
    id: "history-4",
    url: "https://facebook.com",
    title: "Facebook - Blocked by Sub Rosa",
    visitedAt: "2024-12-19T14:15:00Z",
    favicon: "/blocked-website-icon.png",
    category: "social",
    blocked: true,
    trackersBlocked: 15,
  },
]

export const getTodaysSessions = () => {
  const today = new Date().toISOString().split("T")[0]
  return mockBrowsingSessions.filter((session) => session.startTime.startsWith(today))
}

export const getActiveSession = () => mockBrowsingSessions.find((session) => session.status === "active")
