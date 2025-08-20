"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bookmark, Search, Plus, Trash2, Folder, Star, ExternalLink } from "lucide-react"
import { sessionManager, type Bookmark as BookmarkType } from "@/lib/sessionManager"

interface BrowserBookmarksProps {
  userId: string
  onNavigate?: (url: string) => void
}

export function BrowserBookmarks({ userId, onNavigate }: BrowserBookmarksProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkType[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string>("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBookmark, setNewBookmark] = useState({
    title: "",
    url: "",
    folder: "General",
    tags: "",
  })

  useEffect(() => {
    loadBookmarks()
  }, [userId])

  useEffect(() => {
    filterBookmarks()
  }, [bookmarks, searchQuery, selectedFolder])

  const loadBookmarks = () => {
    const userBookmarks = sessionManager.getBookmarks(userId)
    setBookmarks(userBookmarks)
  }

  const filterBookmarks = () => {
    let filtered = bookmarks

    // Filter by folder
    if (selectedFolder !== "all") {
      filtered = filtered.filter((bookmark) => bookmark.folder === selectedFolder)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(query) ||
          bookmark.url.toLowerCase().includes(query) ||
          bookmark.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredBookmarks(filtered)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const results = sessionManager.searchBookmarks(userId, searchQuery)
      setFilteredBookmarks(results)
    } else {
      filterBookmarks()
    }
  }

  const addBookmark = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBookmark.title.trim() || !newBookmark.url.trim()) return

    const bookmark = sessionManager.addBookmark(userId, {
      title: newBookmark.title,
      url: newBookmark.url,
      folder: newBookmark.folder,
      tags: newBookmark.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    })

    setBookmarks((prev) => [bookmark, ...prev])
    setNewBookmark({ title: "", url: "", folder: "General", tags: "" })
    setShowAddForm(false)
  }

  const removeBookmark = (bookmarkId: string) => {
    sessionManager.removeBookmark(userId, bookmarkId)
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId))
  }

  const folders = Array.from(new Set(bookmarks.map((b) => b.folder)))

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="text-primary" />
            <span>Bookmarks</span>
          </div>
          <Button size="sm" onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
            <Plus size={16} />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Add Bookmark Form */}
        {showAddForm && (
          <Card className="mb-6 bg-muted/50 border-border">
            <CardContent className="p-4">
              <form onSubmit={addBookmark} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Bookmark title"
                    value={newBookmark.title}
                    onChange={(e) => setNewBookmark((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={newBookmark.url}
                    onChange={(e) => setNewBookmark((prev) => ({ ...prev, url: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newBookmark.folder}
                    onChange={(e) => setNewBookmark((prev) => ({ ...prev, folder: e.target.value }))}
                    className="px-3 py-2 bg-input border border-border rounded-md"
                  >
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Research">Research</option>
                  </select>
                  <Input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={newBookmark.tags}
                    onChange={(e) => setNewBookmark((prev) => ({ ...prev, tags: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="sm">
                    Add Bookmark
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>

          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm"
          >
            <option value="all">All folders</option>
            {folders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>

        {/* Bookmarks List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bookmark size={48} className="mx-auto mb-4 opacity-50" />
              <p>No bookmarks found</p>
              {searchQuery && <p className="text-sm mt-2">Try a different search term</p>}
            </div>
          ) : (
            filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
              >
                <div className="flex-shrink-0">
                  {bookmark.favicon ? (
                    <img src={bookmark.favicon || "/placeholder.svg"} alt="" className="w-4 h-4" />
                  ) : (
                    <Star size={16} className="text-primary" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{bookmark.title}</h4>
                    <button
                      onClick={() => onNavigate?.(bookmark.url)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink size={12} className="text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{bookmark.url}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Folder size={10} />
                      {bookmark.folder}
                    </span>
                    {bookmark.tags.length > 0 && <span>Tags: {bookmark.tags.join(", ")}</span>}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBookmark(bookmark.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BrowserBookmarks
