export interface BrowsingSession {
  id: string
  userId: string
  created: Date
  lastActivity: Date
  isPrivate: boolean
  tabs: SessionTab[]
  activeTabId: string
  history: HistoryEntry[]
  bookmarks: Bookmark[]
  downloads: Download[]
  settings: SessionSettings
}

export interface SessionTab {
  id: string
  title: string
  url: string
  favicon?: string
  isLoading: boolean
  securityLevel: "secure" | "warning" | "danger"
  blocked: {
    trackers: number
    ads: number
    malware: number
  }
  history: string[]
  historyIndex: number
  created: Date
  lastAccessed: Date
}

export interface HistoryEntry {
  id: string
  url: string
  title: string
  visitTime: Date
  securityLevel: "secure" | "warning" | "danger"
  blocked: {
    trackers: number
    ads: number
    malware: number
  }
  favicon?: string
}

export interface Bookmark {
  id: string
  title: string
  url: string
  folder: string
  created: Date
  tags: string[]
  favicon?: string
}

export interface Download {
  id: string
  filename: string
  url: string
  status: "pending" | "downloading" | "completed" | "failed"
  progress: number
  size: number
  downloadedSize: number
  created: Date
  completed?: Date
}

export interface SessionSettings {
  autoDeleteHistory: boolean
  historyRetentionDays: number
  blockTrackers: boolean
  blockAds: boolean
  blockMalware: boolean
  enableFingerprinting: boolean
  dnsServer: "default" | "cloudflare" | "quad9" | "custom"
  customDns?: string
  securityLevel: "paranoid" | "balanced" | "convenience"
  autoCleanCookies: boolean
  enableJavaScript: boolean
}

export class SessionManager {
  private static instance: SessionManager
  private sessions: Map<string, BrowsingSession> = new Map()
  private globalHistory: Map<string, HistoryEntry[]> = new Map()
  private globalBookmarks: Map<string, Bookmark[]> = new Map()

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  createSession(userId: string, isPrivate = false): BrowsingSession {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const session: BrowsingSession = {
      id: sessionId,
      userId,
      created: new Date(),
      lastActivity: new Date(),
      isPrivate,
      tabs: [
        {
          id: "tab_1",
          title: "New Tab",
          url: "",
          isLoading: false,
          securityLevel: "secure",
          blocked: { trackers: 0, ads: 0, malware: 0 },
          history: [],
          historyIndex: -1,
          created: new Date(),
          lastAccessed: new Date(),
        },
      ],
      activeTabId: "tab_1",
      history: [],
      bookmarks: this.getBookmarks(userId),
      downloads: [],
      settings: this.getDefaultSettings(),
    }

    this.sessions.set(sessionId, session)
    return session
  }

  getSession(sessionId: string): BrowsingSession | undefined {
    return this.sessions.get(sessionId)
  }

  updateSession(sessionId: string, updates: Partial<BrowsingSession>): void {
    const session = this.sessions.get(sessionId)
    if (session) {
      Object.assign(session, updates, { lastActivity: new Date() })
      this.sessions.set(sessionId, session)
    }
  }

  addToHistory(sessionId: string, entry: Omit<HistoryEntry, "id">): void {
    const session = this.sessions.get(sessionId)
    if (!session || session.isPrivate) return // Don't save history in private mode

    const historyEntry: HistoryEntry = {
      ...entry,
      id: `history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    session.history.unshift(historyEntry)

    // Keep only last 1000 entries per session
    if (session.history.length > 1000) {
      session.history = session.history.slice(0, 1000)
    }

    // Add to global history
    const userHistory = this.globalHistory.get(session.userId) || []
    userHistory.unshift(historyEntry)

    // Apply retention policy
    const retentionMs = session.settings.historyRetentionDays * 24 * 60 * 60 * 1000
    const cutoff = new Date(Date.now() - retentionMs)
    const filteredHistory = userHistory.filter((h) => h.visitTime > cutoff)

    this.globalHistory.set(session.userId, filteredHistory.slice(0, 5000)) // Max 5000 entries
    this.sessions.set(sessionId, session)
  }

  getHistory(userId: string, limit = 100): HistoryEntry[] {
    const history = this.globalHistory.get(userId) || []
    return history.slice(0, limit)
  }

  searchHistory(userId: string, query: string, limit = 50): HistoryEntry[] {
    const history = this.globalHistory.get(userId) || []
    const lowerQuery = query.toLowerCase()

    return history
      .filter((entry) => entry.title.toLowerCase().includes(lowerQuery) || entry.url.toLowerCase().includes(lowerQuery))
      .slice(0, limit)
  }

  clearHistory(userId: string, timeRange?: "hour" | "day" | "week" | "all"): void {
    if (timeRange === "all") {
      this.globalHistory.set(userId, [])
      return
    }

    const history = this.globalHistory.get(userId) || []
    let cutoff: Date

    switch (timeRange) {
      case "hour":
        cutoff = new Date(Date.now() - 60 * 60 * 1000)
        break
      case "day":
        cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
        break
      case "week":
        cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        break
      default:
        return
    }

    const filteredHistory = history.filter((h) => h.visitTime < cutoff)
    this.globalHistory.set(userId, filteredHistory)
  }

  addBookmark(userId: string, bookmark: Omit<Bookmark, "id" | "created">): Bookmark {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created: new Date(),
    }

    const bookmarks = this.globalBookmarks.get(userId) || []
    bookmarks.unshift(newBookmark)
    this.globalBookmarks.set(userId, bookmarks)

    return newBookmark
  }

  getBookmarks(userId: string): Bookmark[] {
    return this.globalBookmarks.get(userId) || []
  }

  removeBookmark(userId: string, bookmarkId: string): void {
    const bookmarks = this.globalBookmarks.get(userId) || []
    const filtered = bookmarks.filter((b) => b.id !== bookmarkId)
    this.globalBookmarks.set(userId, filtered)
  }

  searchBookmarks(userId: string, query: string): Bookmark[] {
    const bookmarks = this.globalBookmarks.get(userId) || []
    const lowerQuery = query.toLowerCase()

    return bookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(lowerQuery) ||
        bookmark.url.toLowerCase().includes(lowerQuery) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }

  addDownload(sessionId: string, download: Omit<Download, "id" | "created">): Download {
    const session = this.sessions.get(sessionId)
    if (!session) throw new Error("Session not found")

    const newDownload: Download = {
      ...download,
      id: `download_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created: new Date(),
    }

    session.downloads.unshift(newDownload)
    this.sessions.set(sessionId, session)

    return newDownload
  }

  updateDownload(sessionId: string, downloadId: string, updates: Partial<Download>): void {
    const session = this.sessions.get(sessionId)
    if (!session) return

    const downloadIndex = session.downloads.findIndex((d) => d.id === downloadId)
    if (downloadIndex !== -1) {
      Object.assign(session.downloads[downloadIndex], updates)
      this.sessions.set(sessionId, session)
    }
  }

  getDownloads(sessionId: string): Download[] {
    const session = this.sessions.get(sessionId)
    return session?.downloads || []
  }

  updateSettings(sessionId: string, settings: Partial<SessionSettings>): void {
    const session = this.sessions.get(sessionId)
    if (!session) return

    Object.assign(session.settings, settings)
    this.sessions.set(sessionId, session)

    // Apply auto-cleanup if enabled
    if (settings.autoDeleteHistory && settings.historyRetentionDays) {
      this.cleanupHistory(session.userId, settings.historyRetentionDays)
    }
  }

  private cleanupHistory(userId: string, retentionDays: number): void {
    const history = this.globalHistory.get(userId) || []
    const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000)
    const filtered = history.filter((h) => h.visitTime > cutoff)
    this.globalHistory.set(userId, filtered)
  }

  private getDefaultSettings(): SessionSettings {
    return {
      autoDeleteHistory: false,
      historyRetentionDays: 30,
      blockTrackers: true,
      blockAds: true,
      blockMalware: true,
      enableFingerprinting: true,
      dnsServer: "cloudflare",
      securityLevel: "balanced",
      autoCleanCookies: true,
      enableJavaScript: true,
    }
  }

  // Cleanup old sessions
  cleanupSessions(maxAgeHours = 24): void {
    const cutoff = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000)

    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.lastActivity < cutoff) {
        this.sessions.delete(sessionId)
      }
    }
  }

  // Export session data for backup
  exportSessionData(userId: string): {
    history: HistoryEntry[]
    bookmarks: Bookmark[]
    settings: SessionSettings
  } {
    const history = this.globalHistory.get(userId) || []
    const bookmarks = this.globalBookmarks.get(userId) || []

    // Get settings from most recent session
    const userSessions = Array.from(this.sessions.values()).filter((s) => s.userId === userId)
    const settings = userSessions.length > 0 ? userSessions[0].settings : this.getDefaultSettings()

    return { history, bookmarks, settings }
  }
}

export const sessionManager = SessionManager.getInstance()
