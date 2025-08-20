export interface SecurityEvent {
  id: string
  type: "tracker_blocked" | "ad_blocked" | "malware_blocked" | "fingerprint_changed" | "vulnerability_detected"
  timestamp: Date
  details: {
    url?: string
    domain?: string
    threat_type?: string
    severity: "low" | "medium" | "high" | "critical"
  }
  userId: string
}

export interface SecurityMetrics {
  trackersBlocked: number
  adsBlocked: number
  malwareBlocked: number
  fingerprintChanges: number
  vulnerabilitiesDetected: number
  privacyScore: number
  lastUpdated: Date
}

export class SecurityIntegration {
  private static instance: SecurityIntegration
  private events: SecurityEvent[] = []
  private metrics: Map<string, SecurityMetrics> = new Map()
  private listeners: ((event: SecurityEvent) => void)[] = []

  static getInstance(): SecurityIntegration {
    if (!SecurityIntegration.instance) {
      SecurityIntegration.instance = new SecurityIntegration()
    }
    return SecurityIntegration.instance
  }

  // Record security events from browser
  recordSecurityEvent(event: Omit<SecurityEvent, "id" | "timestamp">): void {
    const securityEvent: SecurityEvent = {
      ...event,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }

    this.events.push(securityEvent)
    this.updateMetrics(event.userId, securityEvent)

    // Notify listeners
    this.listeners.forEach((listener) => listener(securityEvent))

    // Keep only last 1000 events
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000)
    }
  }

  // Update user metrics based on security events
  private updateMetrics(userId: string, event: SecurityEvent): void {
    const current = this.metrics.get(userId) || {
      trackersBlocked: 0,
      adsBlocked: 0,
      malwareBlocked: 0,
      fingerprintChanges: 0,
      vulnerabilitiesDetected: 0,
      privacyScore: 85,
      lastUpdated: new Date(),
    }

    switch (event.type) {
      case "tracker_blocked":
        current.trackersBlocked++
        break
      case "ad_blocked":
        current.adsBlocked++
        break
      case "malware_blocked":
        current.malwareBlocked++
        current.privacyScore = Math.min(100, current.privacyScore + 2)
        break
      case "fingerprint_changed":
        current.fingerprintChanges++
        current.privacyScore = Math.min(100, current.privacyScore + 1)
        break
      case "vulnerability_detected":
        current.vulnerabilitiesDetected++
        current.privacyScore = Math.max(0, current.privacyScore - 5)
        break
    }

    // Calculate privacy score based on activity
    const baseScore = 85
    const trackerBonus = Math.min(10, Math.floor(current.trackersBlocked / 100))
    const adBonus = Math.min(5, Math.floor(current.adsBlocked / 200))
    const vulnerabilityPenalty = current.vulnerabilitiesDetected * 5

    current.privacyScore = Math.max(0, Math.min(100, baseScore + trackerBonus + adBonus - vulnerabilityPenalty))

    current.lastUpdated = new Date()
    this.metrics.set(userId, current)
  }

  // Get current metrics for a user
  getMetrics(userId: string): SecurityMetrics {
    return (
      this.metrics.get(userId) || {
        trackersBlocked: 0,
        adsBlocked: 0,
        malwareBlocked: 0,
        fingerprintChanges: 0,
        vulnerabilitiesDetected: 0,
        privacyScore: 85,
        lastUpdated: new Date(),
      }
    )
  }

  // Get recent security events for a user
  getRecentEvents(userId: string, limit = 50): SecurityEvent[] {
    return this.events
      .filter((event) => event.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  }

  // Subscribe to security events
  subscribe(listener: (event: SecurityEvent) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  // Generate security alerts based on events
  generateAlerts(userId: string): Array<{
    type: "info" | "warning" | "danger"
    message: string
    timestamp: Date
  }> {
    const events = this.getRecentEvents(userId, 10)
    const alerts: Array<{
      type: "info" | "warning" | "danger"
      message: string
      timestamp: Date
    }> = []

    // Check for malware blocks
    const recentMalware = events.filter(
      (e) => e.type === "malware_blocked" && Date.now() - e.timestamp.getTime() < 60000, // Last minute
    )

    if (recentMalware.length > 0) {
      alerts.push({
        type: "danger",
        message: `Blocked ${recentMalware.length} malware attempt(s) in the last minute`,
        timestamp: new Date(),
      })
    }

    // Check for high tracker activity
    const recentTrackers = events.filter(
      (e) => e.type === "tracker_blocked" && Date.now() - e.timestamp.getTime() < 300000, // Last 5 minutes
    )

    if (recentTrackers.length > 20) {
      alerts.push({
        type: "warning",
        message: `High tracking activity detected: ${recentTrackers.length} trackers blocked recently`,
        timestamp: new Date(),
      })
    }

    // Check privacy score
    const metrics = this.getMetrics(userId)
    if (metrics.privacyScore < 60) {
      alerts.push({
        type: "warning",
        message: `Privacy score is low (${metrics.privacyScore}/100). Consider enabling additional protections.`,
        timestamp: new Date(),
      })
    }

    return alerts
  }
}

export const securityIntegration = SecurityIntegration.getInstance()
