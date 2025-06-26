"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Zap } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeSwitcher() {
  // Add a fallback in case useTheme() returns undefined
  const themeContext = useTheme() || { theme: "default", setTheme: () => {} }
  const { theme, setTheme } = themeContext

  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only show the theme switcher after component has mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-8 h-8"></div> // Placeholder with same dimensions
  }

  const themes = [
    { id: "default", name: "Default", icon: Sun },
    { id: "highContrast", name: "High Contrast", icon: Zap },
    { id: "darkContrast", name: "Dark Contrast", icon: Moon },
  ]

  // Find the current theme or default to the first theme
  const currentTheme = themes.find((t) => t.id === theme) || themes[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md bg-subrosa-dark hover:bg-subrosa-light transition-colors"
        aria-label="Change theme"
      >
        <currentTheme.icon size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-subrosa-dark border border-subrosa-gray rounded-md shadow-lg z-10">
          <div className="py-1">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => {
                  setTheme(themeOption.id as any)
                  setIsOpen(false)
                }}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-subrosa-light transition-colors ${
                  theme === themeOption.id ? "text-subrosa-red" : "text-white"
                }`}
              >
                <themeOption.icon size={16} className="mr-2" />
                {themeOption.name}
                {theme === themeOption.id && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher
