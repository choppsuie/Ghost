"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Shield, Lock, Menu, X } from "lucide-react"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to safely initialize client-side code
  useEffect(() => {
    setIsClient(true)

    // Safe import of Supabase client only on the client side
    const initializeAuth = async () => {
      try {
        // Dynamically import the createClient function
        const { createClient } = await import("@/utils/supabase/client")
        const supabase = createClient()

        // Setup auth state listener
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          setUser(session?.user ?? null)
        })

        return () => {
          data?.subscription?.unsubscribe?.()
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      }
    }

    initializeAuth()
  }, [])

  // Render a simpler version during SSR to avoid hydration issues
  if (!isClient) {
    return (
      <nav className="bg-subrosa-dark border-b border-subrosa-light">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                {/* Use a div placeholder during SSR */}
                <div className="w-10 h-10 bg-subrosa-dark"></div>
              </div>
              <span className="text-xl font-bold tracking-wider">SUB ROSA</span>
            </Link>
            <div className="hidden md:block">{/* Placeholder for nav items */}</div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-subrosa-dark border-b border-subrosa-light">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image src="/images/subrosa-icon.png" alt="Sub Rosa Logo" width={40} height={40} />
            </div>
            <span className="text-xl font-bold tracking-wider">SUB ROSA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-subrosa-red">
              <Shield size={18} />
              <span className="text-sm">dVPN {user ? "Active" : "Inactive"}</span>
            </div>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="nav-link red-outline px-3 py-1.5 rounded hover:bg-subrosa-light transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    try {
                      const { createClient } = await import("@/utils/supabase/client")
                      const supabase = createClient()
                      await supabase.auth.signOut()
                    } catch (error) {
                      console.error("Error signing out:", error)
                    }
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded border border-subrosa-red hover:bg-subrosa-red hover:text-white transition-colors"
                >
                  <Lock size={16} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="nav-link red-outline px-3 py-1.5 rounded hover:bg-subrosa-light transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-1 px-3 py-1.5 rounded bg-subrosa-red text-white hover:bg-opacity-90 transition-colors"
                >
                  <Shield size={16} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 border-t border-subrosa-light mt-3">
            <div className="flex items-center space-x-1 text-subrosa-red px-2">
              <Shield size={18} />
              <span className="text-sm">dVPN {user ? "Active" : "Inactive"}</span>
            </div>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-2 py-2 hover:bg-subrosa-light rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    try {
                      const { createClient } = await import("@/utils/supabase/client")
                      const supabase = createClient()
                      await supabase.auth.signOut()
                      setMobileMenuOpen(false)
                    } catch (error) {
                      console.error("Error signing out:", error)
                    }
                  }}
                  className="flex items-center space-x-1 w-full text-left px-2 py-2 hover:bg-subrosa-light rounded transition-colors"
                >
                  <Lock size={16} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-2 py-2 hover:bg-subrosa-light rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-1 px-2 py-2 text-subrosa-red hover:bg-subrosa-light rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield size={16} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
