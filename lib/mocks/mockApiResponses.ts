export const mockApiResponses = {
  // Authentication responses
  auth: {
    login: {
      success: {
        user: {
          id: "1",
          email: "alice.cipher@protonmail.com",
          username: "alice_cipher",
        },
        token: "mock-jwt-token-12345",
        refreshToken: "mock-refresh-token-67890",
      },
      error: {
        message: "Invalid credentials",
        code: "AUTH_INVALID_CREDENTIALS",
      },
    },
    register: {
      success: {
        user: {
          id: "4",
          email: "newuser@example.com",
          username: "newuser",
        },
        message: "Account created successfully",
      },
      error: {
        message: "Email already exists",
        code: "AUTH_EMAIL_EXISTS",
      },
    },
  },

  // VPN connection responses
  vpn: {
    connect: {
      success: {
        serverId: "switzerland-1",
        serverName: "Zurich Secure",
        ipAddress: "185.159.158.234",
        status: "connected",
        connectedAt: new Date().toISOString(),
      },
      error: {
        message: "Failed to connect to server",
        code: "VPN_CONNECTION_FAILED",
      },
    },
    disconnect: {
      success: {
        status: "disconnected",
        disconnectedAt: new Date().toISOString(),
        sessionDuration: "45 minutes",
      },
    },
    status: {
      connected: {
        status: "connected",
        server: "switzerland-1",
        ipAddress: "185.159.158.234",
        uptime: "00:45:23",
        dataTransferred: {
          upload: "12.3 MB",
          download: "156.7 MB",
        },
      },
      disconnected: {
        status: "disconnected",
        lastConnected: "2024-12-19T11:30:00Z",
      },
    },
  },

  // User profile responses
  profile: {
    get: {
      success: {
        id: "1",
        email: "alice.cipher@protonmail.com",
        username: "alice_cipher",
        firstName: "Alice",
        lastName: "Cipher",
        subscription: "premium",
        preferences: {
          theme: "dark",
          autoConnect: true,
          killSwitch: true,
        },
      },
    },
    update: {
      success: {
        message: "Profile updated successfully",
      },
      error: {
        message: "Failed to update profile",
        code: "PROFILE_UPDATE_FAILED",
      },
    },
  },

  // Server list responses
  servers: {
    list: {
      success: {
        servers: [
          {
            id: "switzerland-1",
            name: "Zurich Secure",
            country: "Switzerland",
            load: 23,
            ping: 45,
            status: "online",
          },
        ],
      },
    },
  },
}

// Helper function to simulate API delay
export const mockApiCall = (response: any, delay = 1000): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), delay)
  })
}

// Simulate random API failures for testing error handling
export const mockApiCallWithFailure = (
  successResponse: any,
  errorResponse: any,
  failureRate = 0.1,
  delay = 1000,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(errorResponse)
      } else {
        resolve(successResponse)
      }
    }, delay)
  })
}
