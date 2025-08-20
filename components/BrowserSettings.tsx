"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Settings, Shield, Clock, Download, Globe } from "lucide-react"
import { sessionManager, type SessionSettings } from "@/lib/sessionManager"

interface BrowserSettingsProps {
  sessionId: string
  userId: string
}

export function BrowserSettings({ sessionId, userId }: BrowserSettingsProps) {
  const [settings, setSettings] = useState<SessionSettings>({
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
  })

  useEffect(() => {
    const session = sessionManager.getSession(sessionId)
    if (session) {
      setSettings(session.settings)
    }
  }, [sessionId])

  const updateSetting = <K extends keyof SessionSettings>(key: K, value: SessionSettings[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    sessionManager.updateSettings(sessionId, { [key]: value })
  }

  const exportData = () => {
    const data = sessionManager.exportSessionData(userId)
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subrosa-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Settings className="text-primary" />
          <span>Browser Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Privacy & Security */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="text-primary" />
            Privacy & Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Security Level</label>
                <p className="text-sm text-muted-foreground">Choose your privacy protection level</p>
              </div>
              <select
                value={settings.securityLevel}
                onChange={(e) => updateSetting("securityLevel", e.target.value as any)}
                className="px-3 py-2 bg-input border border-border rounded-md"
              >
                <option value="convenience">Convenience</option>
                <option value="balanced">Balanced</option>
                <option value="paranoid">Paranoid</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Block Trackers</label>
                <p className="text-sm text-muted-foreground">Prevent websites from tracking you</p>
              </div>
              <input
                type="checkbox"
                checked={settings.blockTrackers}
                onChange={(e) => updateSetting("blockTrackers", e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Block Ads</label>
                <p className="text-sm text-muted-foreground">Remove advertisements from websites</p>
              </div>
              <input
                type="checkbox"
                checked={settings.blockAds}
                onChange={(e) => updateSetting("blockAds", e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Block Malware</label>
                <p className="text-sm text-muted-foreground">Protect against malicious websites</p>
              </div>
              <input
                type="checkbox"
                checked={settings.blockMalware}
                onChange={(e) => updateSetting("blockMalware", e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Fingerprint Protection</label>
                <p className="text-sm text-muted-foreground">Randomize browser fingerprint</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableFingerprinting}
                onChange={(e) => updateSetting("enableFingerprinting", e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Auto-clean Cookies</label>
                <p className="text-sm text-muted-foreground">Automatically delete cookies on session end</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoCleanCookies}
                onChange={(e) => updateSetting("autoCleanCookies", e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Enable JavaScript</label>
                <p className="text-sm text-muted-foreground">Allow websites to run JavaScript</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableJavaScript}
                onChange={(e) => updateSetting("enableJavaScript", e.target.checked)}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* History Management */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="text-primary" />
            History Management
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Auto-delete History</label>
                <p className="text-sm text-muted-foreground">Automatically remove old browsing history</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoDeleteHistory}
                onChange={(e) => updateSetting("autoDeleteHistory", e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            {settings.autoDeleteHistory && (
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Retention Period</label>
                  <p className="text-sm text-muted-foreground">Days to keep browsing history</p>
                </div>
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={settings.historyRetentionDays}
                  onChange={(e) => updateSetting("historyRetentionDays", Number.parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
            )}
          </div>
        </div>

        {/* Network Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="text-primary" />
            Network Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">DNS Server</label>
                <p className="text-sm text-muted-foreground">Choose your DNS provider</p>
              </div>
              <select
                value={settings.dnsServer}
                onChange={(e) => updateSetting("dnsServer", e.target.value as any)}
                className="px-3 py-2 bg-input border border-border rounded-md"
              >
                <option value="default">Default</option>
                <option value="cloudflare">Cloudflare (1.1.1.1)</option>
                <option value="quad9">Quad9 (9.9.9.9)</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {settings.dnsServer === "custom" && (
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Custom DNS</label>
                  <p className="text-sm text-muted-foreground">Enter custom DNS server address</p>
                </div>
                <Input
                  type="text"
                  placeholder="8.8.8.8"
                  value={settings.customDns || ""}
                  onChange={(e) => updateSetting("customDns", e.target.value)}
                  className="w-32"
                />
              </div>
            )}
          </div>
        </div>

        {/* Data Management */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Download className="text-primary" />
            Data Management
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Export Data</label>
                <p className="text-sm text-muted-foreground">Download your browsing data and settings</p>
              </div>
              <Button onClick={exportData} variant="outline" size="sm">
                Export
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Clear All Data</label>
                <p className="text-sm text-muted-foreground">Remove all history, bookmarks, and settings</p>
              </div>
              <Button
                onClick={() => {
                  if (confirm("Are you sure? This will delete all your browsing data.")) {
                    sessionManager.clearHistory(userId, "all")
                    // Clear bookmarks and reset settings would go here
                  }
                }}
                variant="destructive"
                size="sm"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BrowserSettings
