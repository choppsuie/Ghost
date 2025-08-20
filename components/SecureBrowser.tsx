"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/Skeleton"
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  Shield,
  Lock,
  Globe,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { browserAPI } from "@/lib/browserApi"
import { securityIntegration } from "@/lib/securityIntegration"

interface Tab {
  id: string
  title: string
  url: string
  isActive: boolean
  isLoading: boolean
  securityLevel: "secure" | "warning" | "danger"
  blocked: {
    trackers: number
    ads: number
    malware: number
  }
  history: string[]
  historyIndex: number
}

interface SecureBrowserProps {
  userId: string
}

export default function SecureBrowser({ userId }: SecureBrowserProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "1",
      title: "New Tab",
      url: "",
      isActive: true,
      isLoading: false,
      securityLevel: "secure",
      blocked: { trackers: 0, ads: 0, malware: 0 },
      history: [],
      historyIndex: -1,
    },
  ])
  const [currentUrl, setCurrentUrl] = useState("")
  const [pageContent, setPageContent] = useState("")
  const [totalStats, setTotalStats] = useState({
    trackersBlocked: 0,
    adsBlocked: 0,
    malwareBlocked: 0,
  })

  useEffect(() => {
    if (!userId) {
      setError("User ID is required")
      setIsLoading(false)
      return
    }

    // Initialize browser session
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [userId])

  const activeTab = tabs.find((tab) => tab.isActive)
  const canGoBack = activeTab ? activeTab.historyIndex > 0 : false
  const canGoForward = activeTab ? activeTab.historyIndex < activeTab.history.length - 1 : false

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUrl.trim() || !activeTab) return

    // Add protocol if missing
    let formattedUrl = currentUrl
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`
    }

    // Update active tab to loading state
    setTabs((prev) =>
      prev.map((tab) => (tab.isActive ? { ...tab, url: formattedUrl, title: "Loading...", isLoading: true } : tab)),
    )

    try {
      // Fetch content through proxy
      const response = await browserAPI.fetchContent(formattedUrl, userId)

      if (response.blocked.trackers > 0) {
        for (let i = 0; i < response.blocked.trackers; i++) {
          securityIntegration.recordSecurityEvent({
            type: "tracker_blocked",
            userId,
            details: {
              url: formattedUrl,
              domain: new URL(formattedUrl).hostname,
              severity: "medium",
            },
          })
        }
      }

      if (response.blocked.ads > 0) {
        for (let i = 0; i < response.blocked.ads; i++) {
          securityIntegration.recordSecurityEvent({
            type: "ad_blocked",
            userId,
            details: {
              url: formattedUrl,
              domain: new URL(formattedUrl).hostname,
              severity: "low",
            },
          })
        }
      }

      if (response.blocked.malware > 0) {
        for (let i = 0; i < response.blocked.malware; i++) {
          securityIntegration.recordSecurityEvent({
            type: "malware_blocked",
            userId,
            details: {
              url: formattedUrl,
              domain: new URL(formattedUrl).hostname,
              threat_type: "malware",
              severity: "critical",
            },
          })
        }
      }

      // Record fingerprint change (simulate)
      if (Math.random() > 0.7) {
        securityIntegration.recordSecurityEvent({
          type: "fingerprint_changed",
          userId,
          details: {
            url: formattedUrl,
            severity: "low",
          },
        })
      }

      // Update tab with response data
      setTabs((prev) =>
        prev.map((tab) => {
          if (!tab.isActive) return tab

          // Update history
          const newHistory = [...tab.history.slice(0, tab.historyIndex + 1), formattedUrl]

          return {
            ...tab,
            title: response.title || new URL(formattedUrl).hostname,
            isLoading: false,
            securityLevel: response.securityLevel,
            blocked: response.blocked,
            history: newHistory,
            historyIndex: newHistory.length - 1,
          }
        }),
      )

      // Update page content
      setPageContent(response.content)

      // Update total stats
      setTotalStats((prev) => ({
        trackersBlocked: prev.trackersBlocked + response.blocked.trackers,
        adsBlocked: prev.adsBlocked + response.blocked.ads,
        malwareBlocked: prev.malwareBlocked + response.blocked.malware,
      }))
    } catch (error) {
      console.error("Failed to load page:", error)

      securityIntegration.recordSecurityEvent({
        type: "vulnerability_detected",
        userId,
        details: {
          url: formattedUrl,
          threat_type: "connection_failed",
          severity: "medium",
        },
      })

      // Update tab with error state
      setTabs((prev) =>
        prev.map((tab) =>
          tab.isActive
            ? {
                ...tab,
                title: "Error loading page",
                isLoading: false,
                securityLevel: "danger",
              }
            : tab,
        ),
      )

      setPageContent(`
        <div style="text-align: center; padding: 40px; font-family: sans-serif; background: #1f2937; color: #e5e7eb;">
          <h2 style="color: #b91c1c;">Failed to load page</h2>
          <p>Unable to securely fetch content from: ${formattedUrl}</p>
          <p style="color: #9ca3af; font-size: 14px;">${error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      `)
    }
  }

  const handleGoBack = () => {
    if (!activeTab || !canGoBack) return

    const newIndex = activeTab.historyIndex - 1
    const url = activeTab.history[newIndex]

    setTabs((prev) =>
      prev.map((tab) => (tab.isActive ? { ...tab, historyIndex: newIndex, url, isLoading: true } : tab)),
    )

    setCurrentUrl(url)
    // Re-fetch content for the URL
    handleUrlSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  const handleGoForward = () => {
    if (!activeTab || !canGoForward) return

    const newIndex = activeTab.historyIndex + 1
    const url = activeTab.history[newIndex]

    setTabs((prev) =>
      prev.map((tab) => (tab.isActive ? { ...tab, historyIndex: newIndex, url, isLoading: true } : tab)),
    )

    setCurrentUrl(url)
    // Re-fetch content for the URL
    handleUrlSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  const handleRefresh = () => {
    if (!activeTab?.url) return

    setTabs((prev) => prev.map((tab) => (tab.isActive ? { ...tab, isLoading: true } : tab)))

    // Re-fetch current page
    handleUrlSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  const addNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: "New Tab",
      url: "",
      isActive: true,
      isLoading: false,
      securityLevel: "secure",
      blocked: { trackers: 0, ads: 0, malware: 0 },
      history: [],
      historyIndex: -1,
    }

    setTabs((prev) => [...prev.map((tab) => ({ ...tab, isActive: false })), newTab])
    setCurrentUrl("")
    setPageContent("")
  }

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return // Don't close last tab

    setTabs((prev) => {
      const filtered = prev.filter((tab) => tab.id !== tabId)
      if (prev.find((tab) => tab.id === tabId)?.isActive && filtered.length > 0) {
        filtered[0].isActive = true
        setCurrentUrl(filtered[0].url)
      }
      return filtered
    })
  }

  const switchTab = (tabId: string) => {
    setTabs((prev) =>
      prev.map((tab) => ({
        ...tab,
        isActive: tab.id === tabId,
      })),
    )
    const tab = tabs.find((t) => t.id === tabId)
    if (tab) {
      setCurrentUrl(tab.url)
      // If tab has content, we might want to re-fetch or cache it
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-card border-destructive">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-destructive mb-4">
            <AlertTriangle size={20} />
            <p className="font-medium">Error loading secure browser</p>
          </div>
          <p className="text-muted-foreground">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-0">
        {/* Tab Bar */}
        <div className="flex items-center bg-sidebar border-b border-sidebar-border">
          <div className="flex-1 flex items-center">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-3 border-r border-sidebar-border cursor-pointer transition-colors ${
                  tab.isActive
                    ? "bg-card text-card-foreground"
                    : "bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent/10"
                }`}
                onClick={() => switchTab(tab.id)}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {tab.securityLevel === "secure" && <Shield size={14} className="text-green-500 flex-shrink-0" />}
                  {tab.securityLevel === "warning" && (
                    <AlertTriangle size={14} className="text-yellow-500 flex-shrink-0" />
                  )}
                  {tab.securityLevel === "danger" && (
                    <AlertTriangle size={14} className="text-destructive flex-shrink-0" />
                  )}
                  <span className="truncate text-sm max-w-32">{tab.isLoading ? "Loading..." : tab.title}</span>
                </div>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      closeTab(tab.id)
                    }}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={addNewTab} className="m-2">
            <Plus size={16} />
          </Button>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center gap-2 p-4 bg-background border-b border-border">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" disabled={!canGoBack} onClick={handleGoBack} className="p-2">
              <ArrowLeft size={16} />
            </Button>
            <Button variant="ghost" size="sm" disabled={!canGoForward} onClick={handleGoForward} className="p-2">
              <ArrowRight size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleRefresh} className="p-2">
              <RotateCcw size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Home size={16} />
            </Button>
          </div>

          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center gap-2">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock size={16} className="text-green-500" />
              </div>
              <Input
                type="text"
                placeholder="Enter URL or search term..."
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                className="pl-10 bg-input border-border text-foreground"
              />
            </div>
            <Button type="submit" size="sm">
              <Globe size={16} />
            </Button>
          </form>

          {/* Security Indicators */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield size={14} className="text-green-500" />
              <span>{totalStats.trackersBlocked}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle size={14} className="text-blue-500" />
              <span>{totalStats.adsBlocked}</span>
            </div>
            {totalStats.malwareBlocked > 0 && (
              <div className="flex items-center gap-1">
                <AlertTriangle size={14} className="text-destructive" />
                <span>{totalStats.malwareBlocked}</span>
              </div>
            )}
          </div>
        </div>

        {/* Browser Content Area */}
        <div className="h-96 bg-background border-b border-border overflow-auto">
          {activeTab?.isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading secure connection...</p>
              </div>
            </div>
          ) : activeTab?.url && pageContent ? (
            <div className="h-full">
              <iframe
                srcDoc={pageContent}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms"
                title="Secure Browser Content"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center">
                <Globe className="h-16 w-16 text-muted mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Sub Rosa Secure Browser</h2>
                <p className="text-muted-foreground mb-6">
                  Browse the web securely through our encrypted proxy network
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <Shield className="h-6 w-6 text-green-500 mb-2" />
                    <p className="font-medium">Privacy Protected</p>
                    <p className="text-muted-foreground">Your identity is anonymous</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <Lock className="h-6 w-6 text-blue-500 mb-2" />
                    <p className="font-medium">Encrypted Traffic</p>
                    <p className="text-muted-foreground">All data is secured</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-sidebar text-sidebar-foreground text-sm border-t border-sidebar-border">
          <div className="flex items-center gap-4">
            <span>Connected as: {userId.substring(0, 8)}...</span>
            <span className="text-green-500">• Secure</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Trackers blocked: {totalStats.trackersBlocked}</span>
            <span>Ads blocked: {totalStats.adsBlocked}</span>
            {totalStats.malwareBlocked > 0 && (
              <span className="text-destructive">Threats blocked: {totalStats.malwareBlocked}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
