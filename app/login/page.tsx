"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Shield, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [diagnosticInfo, setDiagnosticInfo] = useState<any>(null)
  const [connectivityStatus, setConnectivityStatus] = useState<string | null>(null)
  const router = useRouter()

  // Check connectivity on mount
  useEffect(() => {
    const checkConnectivity = async () => {
      try {
        const response = await fetch("/api/supabase-connectivity", { cache: "no-store" })
        if (response.ok) {
          setConnectivityStatus("Connected to Supabase")
        } else {
          setConnectivityStatus("Cannot connect to Supabase")
        }
      } catch (err) {
        setConnectivityStatus("Network error checking Supabase connectivity")
      }
    }

    checkConnectivity()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setDiagnosticInfo(null)

    // Client-side validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    setLoading(true)

    try {
      // Use fetch API to call our login endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      })

      const data = await response.json()

      // Store diagnostic info for debugging
      if (data.diagnostics) {
        setDiagnosticInfo(data.diagnostics)
      }

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Success - redirect to dashboard
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/subrosa-icon.png"
                  alt="Sub Rosa Logo"
                  width={64}
                  height={64}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-400 mt-2">Sign in to your Sub Rosa account</p>
          </div>

          {connectivityStatus && (
            <div
              className={`mb-4 p-2 text-sm rounded flex items-center ${
                connectivityStatus.includes("Cannot") ? "bg-red-900/20 text-red-500" : "bg-green-900/20 text-green-500"
              }`}
            >
              {connectivityStatus.includes("Cannot") ? (
                <AlertCircle className="mr-2" size={16} />
              ) : (
                <CheckCircle className="mr-2" size={16} />
              )}
              {connectivityStatus}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-red-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded flex items-start">
                <AlertCircle className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-red-600 text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <Shield className="mr-2" size={18} />
                {loading ? "Signing In..." : "Sign In Securely"}
              </button>
            </div>
          </form>

          {diagnosticInfo && (
            <div className="mt-6 p-4 bg-gray-800 rounded-md border border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Diagnostic Information</h3>
              <pre className="text-xs text-gray-400 overflow-auto max-h-40">
                {JSON.stringify(diagnosticInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-red-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/api/supabase-connectivity"
              target="_blank"
              className="text-xs text-gray-500 hover:text-gray-400"
            >
              Check Supabase Connectivity
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image/Info */}
      <div className="hidden md:block w-1/2 bg-gray-900 p-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Privacy First Browsing</h2>
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src="/images/subrosa-icon.png"
              alt="Sub Rosa Logo"
              width={192}
              height={192}
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className="text-gray-300 mb-6">
            Sub Rosa provides a secure, private browsing experience with integrated dVPN technology. Your data stays
            private, your location remains hidden, and your browsing habits are yours alone.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-black bg-opacity-30 rounded-lg">
              <p className="text-red-600 font-bold text-xl">100%</p>
              <p className="text-sm text-gray-400">Tracker Blocking</p>
            </div>
            <div className="p-3 bg-black bg-opacity-30 rounded-lg">
              <p className="text-red-600 font-bold text-xl">P2P</p>
              <p className="text-sm text-gray-400">dVPN Network</p>
            </div>
            <div className="p-3 bg-black bg-opacity-30 rounded-lg">
              <p className="text-red-600 font-bold text-xl">AES-256</p>
              <p className="text-sm text-gray-400">Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
