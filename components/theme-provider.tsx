"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "default" | "highContrast" | "darkContrast"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  setTheme: () => null,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default")

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("subrosa-theme") as Theme | null
    if (savedTheme && ["default", "highContrast", "darkContrast"].includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      // Check for system preference for high contrast
      const prefersHighContrast = window.matchMedia("(prefers-contrast: more)").matches
      if (prefersHighContrast) {
        setTheme("highContrast")
      }
    }
  }, [])

  useEffect(() => {
    // Apply theme classes to the document
    document.documentElement.classList.remove("theme-default", "theme-high-contrast", "theme-dark-contrast")

    // Fix: Ensure theme is a string before using split
    if (typeof theme === "string") {
      const themeClass = `theme-${theme.replace(/([A-Z])/g, "-$1").toLowerCase()}`
      document.documentElement.classList.add(themeClass)
    } else {
      // Fallback to default theme if theme is somehow not a string
      document.documentElement.classList.add("theme-default")
    }

    // Save theme preference
    localStorage.setItem("subrosa-theme", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
