"use client"

import { useState, useEffect } from "react"
import { Shield, Lock, Eye, AlertTriangle, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { securityIntegration, type SecurityMetrics } from "@/lib/securityIntegration"

interface PrivacyScoreDashboardProps {
  userId?: string
}

export function PrivacyScoreDashboard({ userId = "demo-user" }: PrivacyScoreDashboardProps) {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    trackersBlocked: 1248,
    adsBlocked: 3567,
    malwareBlocked: 0,
    fingerprintChanges: 142,
    vulnerabilitiesDetected: 0,
    privacyScore: 85,
    lastUpdated: new Date(),
  })
  const [alerts, setAlerts] = useState<
    Array<{
      type: "info" | "warning" | "danger"
      message: string
      timestamp: Date
    }>
  >([])

  useEffect(() => {
    // Subscribe to security events
    const unsubscribe = securityIntegration.subscribe((event) => {
      if (event.userId === userId) {
        // Update metrics when new security events occur
        const updatedMetrics = securityIntegration.getMetrics(userId)
        setMetrics(updatedMetrics)

        // Update alerts
        const newAlerts = securityIntegration.generateAlerts(userId)
        setAlerts(newAlerts)
      }
    })

    // Initial load of metrics
    const initialMetrics = securityIntegration.getMetrics(userId)
    setMetrics(initialMetrics)

    const initialAlerts = securityIntegration.generateAlerts(userId)
    setAlerts(initialAlerts)

    // Simulate real-time updates for demo
    const interval = setInterval(() => {
      const currentMetrics = securityIntegration.getMetrics(userId)
      setMetrics(currentMetrics)
    }, 5000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [userId])

  return (
    <Card className="border border-subrosa-gray bg-subrosa-light">
      <CardHeader className="border-b border-subrosa-gray">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-subrosa-red" />
            <span>Privacy Score</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-subrosa-red">{metrics.privacyScore}</span>
            <span className="text-gray-400">/100</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Security Alerts */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded border text-sm ${
                  alert.type === "danger"
                    ? "bg-red-900 bg-opacity-20 border-red-800 text-red-400"
                    : alert.type === "warning"
                      ? "bg-yellow-900 bg-opacity-20 border-yellow-800 text-yellow-400"
                      : "bg-blue-900 bg-opacity-20 border-blue-800 text-blue-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>{alert.message}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visualization component */}
        <div className="mb-6">
          <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
            <div
              className="bg-subrosa-red h-4 rounded-full transition-all duration-500"
              style={{ width: `${metrics.privacyScore}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Vulnerable</span>
            <span>Protected</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="text-subrosa-red" size={16} />
              <h3 className="font-medium">Trackers Blocked</h3>
            </div>
            <p className="text-2xl font-bold">{metrics.trackersBlocked.toLocaleString()}</p>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div className="bg-subrosa-red h-1.5 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>

          <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="text-subrosa-red" size={16} />
              <h3 className="font-medium">Ads Blocked</h3>
            </div>
            <p className="text-2xl font-bold">{metrics.adsBlocked.toLocaleString()}</p>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div className="bg-subrosa-red h-1.5 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>

          <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-subrosa-red" size={16} />
              <h3 className="font-medium">Malware Blocked</h3>
            </div>
            <p className="text-2xl font-bold">{metrics.malwareBlocked.toLocaleString()}</p>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div
                className={`h-1.5 rounded-full ${metrics.malwareBlocked > 0 ? "bg-subrosa-red" : "bg-green-500"}`}
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-subrosa-red" size={16} />
              <h3 className="font-medium">Vulnerabilities</h3>
            </div>
            <p className="text-2xl font-bold">{metrics.vulnerabilitiesDetected}</p>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div
                className={`h-1.5 rounded-full ${metrics.vulnerabilitiesDetected > 0 ? "bg-red-500" : "bg-green-500"}`}
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Real-time Activity Indicator */}
        <div className="mt-6 p-4 bg-subrosa-dark rounded border border-subrosa-gray">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="text-subrosa-red" size={16} />
              <h3 className="font-medium">Real-time Protection</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-500">Active</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">Last updated: {metrics.lastUpdated.toLocaleTimeString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PrivacyScoreDashboard
