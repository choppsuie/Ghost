"use client"

import { useState, useEffect } from "react"
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PrivacyScoreDashboard() {
  const [privacyScore, setPrivacyScore] = useState(85)
  const [metrics, setMetrics] = useState({
    trackersBlocked: 1248,
    cookiesManaged: 3567,
    fingerprintChanges: 142,
    multiHopEnabled: true,
    vulnerabilitiesDetected: 0,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        trackersBlocked: prev.trackersBlocked + Math.floor(Math.random() * 3),
        cookiesManaged: prev.cookiesManaged + Math.floor(Math.random() * 5),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border border-subrosa-gray bg-subrosa-light">
      <CardHeader className="border-b border-subrosa-gray">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-subrosa-red" />
            <span>Privacy Score</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-subrosa-red">{privacyScore}</span>
            <span className="text-gray-400">/100</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Visualization component */}
        <div className="mb-6">
          <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
            <div
              className="bg-subrosa-red h-4 rounded-full transition-all duration-500"
              style={{ width: `${privacyScore}%` }}
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
              <h3 className="font-medium">Fingerprint Changes</h3>
            </div>
            <p className="text-2xl font-bold">{metrics.fingerprintChanges.toLocaleString()}</p>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div className="bg-subrosa-red h-1.5 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>

          <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="text-subrosa-red" size={16} />
              <h3 className="font-medium">Cookies Managed</h3>
            </div>
            <p className="text-2xl font-bold">{metrics.cookiesManaged.toLocaleString()}</p>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div className="bg-subrosa-red h-1.5 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>

          <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-subrosa-red" size={16} />
              <h3 className="font-medium">Vulnerabilities</h3>
            </div>
            <p className="text-2xl font-bold">{metrics.vulnerabilitiesDetected}</p>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>

        {/* Multi-hop status */}
        <div className="mt-6 p-4 bg-subrosa-dark rounded border border-subrosa-gray">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="text-subrosa-red" size={16} />
              <h3 className="font-medium">Multi-hop Routing</h3>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs ${
                metrics.multiHopEnabled ? "bg-subrosa-red bg-opacity-20 text-subrosa-red" : "bg-gray-800 text-gray-400"
              }`}
            >
              {metrics.multiHopEnabled ? "Enabled" : "Disabled"}
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Your traffic is routed through multiple nodes for enhanced privacy and security.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PrivacyScoreDashboard
