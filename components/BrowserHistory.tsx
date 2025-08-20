"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { History, Search, Trash2, Clock, Shield, AlertTriangle, ExternalLink } from "lucide-react"
import { sessionManager, type HistoryEntry } from "@/lib/sessionManager"

interface BrowserHistoryProps {
  userId: string
  onNavigate?: (url: string) => void
}

export function BrowserHistory({ userId, onNavigate }: BrowserHistoryProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState<"all" | "day" | "week" | "month">("all")

  useEffect(() => {
    loadHistory()
  }, [userId])

  useEffect(() => {
    filterHistory()
  }, [history, searchQuery, selectedTimeRange])

  const loadHistory = () => {
    const userHistory = sessionManager.getHistory(userId, 500)
    setHistory(userHistory)
  }

  const filterHistory = () => {
    let filtered = history

    // Filter by time range
    if (selectedTimeRange !== "all") {
      const now = Date.now()
      let cutoff: number

      switch (selectedTimeRange) {
        case "day":
          cutoff = now - 24 * 60 * 60 * 1000
          break
        case "week":
          cutoff = now - 7 * 24 * 60 * 60 * 1000
          break
        case "month":
          cutoff = now - 30 * 24 * 60 * 60 * 1000
          break
        default:
          cutoff = 0
      }

      filtered = filtered.filter((entry) => entry.visitTime.getTime() > cutoff)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (entry) => entry.title.toLowerCase().includes(query) || entry.url.toLowerCase().includes(query),
      )
    }

    setFilteredHistory(filtered)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const results = sessionManager.searchHistory(userId, searchQuery, 100)
      setFilteredHistory(results)
    } else {
      filterHistory()
    }
  }

  const clearHistory = (timeRange: "hour" | "day" | "week" | "all") => {
    sessionManager.clearHistory(userId, timeRange)
    loadHistory()
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const getSecurityIcon = (level: "secure" | "warning" | "danger") => {
    switch (level) {
      case "secure":
        return <Shield size={14} className="text-green-500" />
      case "warning":
        return <AlertTriangle size={14} className="text-yellow-500" />
      case "danger":
        return <AlertTriangle size={14} className="text-red-500" />
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <History className="text-primary" />
          <span>Browsing History</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>

          <div className="flex gap-2">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value as any)}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm"
            >
              <option value="all">All time</option>
              <option value="day">Last day</option>
              <option value="week">Last week</option>
              <option value="month">Last month</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => clearHistory("all")}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {/* Clear History Options */}
        <div className="flex gap-2 mb-6 text-sm">
          <span className="text-muted-foreground">Clear:</span>
          <button onClick={() => clearHistory("hour")} className="text-primary hover:underline">
            Last hour
          </button>
          <button onClick={() => clearHistory("day")} className="text-primary hover:underline">
            Last day
          </button>
          <button onClick={() => clearHistory("week")} className="text-primary hover:underline">
            Last week
          </button>
        </div>

        {/* History List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <History size={48} className="mx-auto mb-4 opacity-50" />
              <p>No browsing history found</p>
              {searchQuery && <p className="text-sm mt-2">Try a different search term</p>}
            </div>
          ) : (
            filteredHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => onNavigate?.(entry.url)}
              >
                <div className="flex-shrink-0">
                  {entry.favicon ? (
                    <img src={entry.favicon || "/placeholder.svg"} alt="" className="w-4 h-4" />
                  ) : (
                    getSecurityIcon(entry.securityLevel)
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{entry.title}</h4>
                    <ExternalLink size={12} className="text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{entry.url}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(entry.visitTime)}
                    </span>
                    {entry.blocked.trackers > 0 && <span>{entry.blocked.trackers} trackers blocked</span>}
                    {entry.blocked.ads > 0 && <span>{entry.blocked.ads} ads blocked</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BrowserHistory
