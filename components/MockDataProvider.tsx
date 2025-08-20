"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { mockUsers, mockVpnServers } from "@/lib/mocks"
import type { MockUser, MockVpnServer, MockBrowsingSession } from "@/lib/mocks/mockUsers"

interface MockDataContextType {
  currentUser: MockUser | null
  connectedServer: MockVpnServer | null
  activeSession: MockBrowsingSession | null
  isConnected: boolean
  setConnectedServer: (server: MockVpnServer | null) => void
  setCurrentUser: (user: MockUser | null) => void
  toggleConnection: () => void
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null)
  const [connectedServer, setConnectedServer] = useState<MockVpnServer | null>(null)
  const [activeSession, setActiveSession] = useState<MockBrowsingSession | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initialize with first mock user
    setCurrentUser(mockUsers[0])
  }, [])

  useEffect(() => {
    // Update connection status based on connected server
    setIsConnected(!!connectedServer)

    if (connectedServer && currentUser) {
      // Create active session when connected
      const session: MockBrowsingSession = {
        id: `session-${Date.now()}`,
        userId: currentUser.id,
        serverId: connectedServer.id,
        startTime: new Date().toISOString(),
        duration: 0,
        dataTransferred: { upload: "0 MB", download: "0 MB" },
        sitesVisited: 0,
        trackersBlocked: 0,
        status: "active",
      }
      setActiveSession(session)
    } else {
      setActiveSession(null)
    }
  }, [connectedServer, currentUser])

  const toggleConnection = () => {
    if (isConnected) {
      setConnectedServer(null)
    } else {
      // Connect to first available server
      const availableServer = mockVpnServers.find((server) => server.status === "online")
      if (availableServer) {
        setConnectedServer(availableServer)
      }
    }
  }

  return (
    <MockDataContext.Provider
      value={{
        currentUser,
        connectedServer,
        activeSession,
        isConnected,
        setConnectedServer,
        setCurrentUser,
        toggleConnection,
      }}
    >
      {children}
    </MockDataContext.Provider>
  )
}

export function useMockData() {
  const context = useContext(MockDataContext)
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider")
  }
  return context
}
