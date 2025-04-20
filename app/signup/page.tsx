"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Shield, Lock, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    // Client-side validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions")
      return
    }

    setLoading(true)

    try {
      // Dynamically import the Supabase client
      const { createClient } = await import("@/utils/supabase/client")
      const supabase = createClient()

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // Success
      setSuccessMessage("Account created! Check your email for the confirmation link.")

      // Optional: redirect after a delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      console.error("Signup error:", err)
      setError(err.message || "An error occurred during signup")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image/Info */}
      <div className="hidden md:block w-1/2 bg-gray-900 p-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Privacy Revolution</h2>
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
            Sub Rosa means "under the rose" - a symbol of secrecy and privacy. Join us in taking back control of your
            digital footprint with our decentralized VPN and privacy-first browser.
          </p>
          <div className="grid grid-cols-1 gap-4 text-left">
            <div className="flex items-start">
              <Shield className="text-red-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-medium">Decentralized VPN</h3>
                <p className="text-sm text-gray-400">Route all traffic through a secure, peer-to-peer network</p>
              </div>
            </div>
            <div className="flex items-start">
              <Lock className="text-red-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-medium">Enhanced Privacy</h3>
                <p className="text-sm text-gray-400">Block trackers, cookies, and fingerprinting attempts</p>
              </div>
            </div>
            <div className="flex items-start">
              <Eye className="text-red-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-medium">Fingerprint Spoofing</h3>
                <p className="text-sm text-gray-400">Randomize browser characteristics to prevent tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
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
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-gray-400 mt-2">Join Sub Rosa for private, secure browsing</p>
          </div>

          {successMessage ? (
            <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-500 px-4 py-3 rounded mb-6">
              {successMessage}
            </div>
          ) : (
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Create a strong password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters with a mix of letters, numbers, and symbols
                </p>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="h-4 w-4 border-gray-300 rounded text-red-600 focus:ring-red-600"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-red-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-red-600 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded">
                  {error}
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
                  {loading ? "Creating Account..." : "Create Secure Account"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-red-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
