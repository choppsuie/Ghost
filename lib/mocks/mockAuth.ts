export interface MockAuthState {
  isAuthenticated: boolean
  user: any | null
  loading: boolean
  error: string | null
}

export const mockAuthStates = {
  loggedOut: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  loading: {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  },
  loggedIn: {
    isAuthenticated: true,
    user: {
      id: "1",
      email: "alice.cipher@protonmail.com",
      username: "alice_cipher",
      subscription: "premium",
    },
    loading: false,
    error: null,
  },
  error: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: "Authentication failed",
  },
}

// Mock authentication functions
export const mockAuthFunctions = {
  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email === "alice.cipher@protonmail.com" && password === "password123") {
      return { success: true, user: mockAuthStates.loggedIn.user }
    } else {
      throw new Error("Invalid credentials")
    }
  },

  register: async (email: string, password: string, username: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (email === "existing@example.com") {
      throw new Error("Email already exists")
    }

    return {
      success: true,
      user: { id: "4", email, username, subscription: "free" },
    }
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true }
  },

  getCurrentUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return mockAuthStates.loggedIn.user
  },
}

// Mock session storage for development
export const mockSessionStorage = {
  getToken: () => "mock-jwt-token-12345",
  setToken: (token: string) => console.log("[v0] Mock: Setting token:", token),
  removeToken: () => console.log("[v0] Mock: Removing token"),
  isTokenValid: () => true,
}
