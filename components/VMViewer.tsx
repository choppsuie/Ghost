"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Server, Power, PowerOff, RefreshCw, Terminal, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Toast } from "./Toast"

export default function VMViewer() {
  const [status, setStatus] = useState("Stopped")
  const [loading, setLoading] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState([
    "> Initializing system...",
    "> Loading kernel modules...",
    "> Starting network services...",
    "> System ready.",
  ])
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleStartVM = async () => {
    setLoading(true)
    setError(null) // Clear any previous errors
    try {
      // Simulate API call to start VM
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update state
      setStatus("Running")

      // Add console output
      setConsoleOutput((prev) => [
        ...prev,
        "> Starting VM...",
        "> Booting Ubuntu 22.04 LTS...",
        "> Establishing secure connection...",
        "> Connection established through dVPN.",
        "> VM ready.",
      ])
    } catch (error) {
      console.error("Error starting VM:", error)
      setError("Failed to start VM. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleStopVM = async () => {
    setLoading(true)
    setError(null) // Clear any previous errors
    try {
      // Simulate API call to stop VM
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update state
      setStatus("Stopped")

      // Reset console output
      setConsoleOutput(["> Shutting down VM...", "> Closing secure connections...", "> VM stopped successfully."])
    } catch (error) {
      console.error("Error stopping VM:", error)
      setError("Failed to stop VM. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border border-subrosa-gray bg-subrosa-light">
        <CardHeader className="border-b border-subrosa-gray">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className={status === "Running" ? "text-subrosa-red" : "text-gray-400"} />
              <span>Virtual Machine</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                status === "Running" ? "bg-subrosa-red bg-opacity-20 text-subrosa-red" : "bg-gray-800 text-gray-400"
              }`}
            >
              {status}
            </div>
          </CardTitle>
          <CardDescription>Ubuntu 22.04 LTS • Secure Connection via dVPN</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-2">VM Specifications</h3>
              <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-400">CPU:</span>
                  <span>4 vCPU Cores</span>
                  <span className="text-gray-400">Memory:</span>
                  <span>8 GB RAM</span>
                  <span className="text-gray-400">Storage:</span>
                  <span>100 GB SSD</span>
                  <span className="text-gray-400">OS:</span>
                  <span>Ubuntu 22.04 LTS</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Connection Status</h3>
              <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-400">dVPN:</span>
                  <div className="flex items-center">
                    <span
                      className={`h-2 w-2 rounded-full ${status === "Running" ? "bg-subrosa-red animate-pulse" : "bg-gray-600"} mr-2`}
                    ></span>
                    <span>{status === "Running" ? "Active" : "Inactive"}</span>
                  </div>
                  <span className="text-gray-400">Encryption:</span>
                  <span>AES-256</span>
                  <span className="text-gray-400">Protocol:</span>
                  <span>WireGuard</span>
                  <span className="text-gray-400">IP Masking:</span>
                  <span>{status === "Running" ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Console Output */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <Terminal size={16} />
              <span>Console Output</span>
            </h3>
            <div className="bg-black rounded border border-subrosa-gray p-4 font-mono text-sm h-48 overflow-y-auto">
              {consoleOutput.map((line, index) => (
                <div key={index} className={`mb-1 ${line.includes("error") ? "text-subrosa-red" : "text-green-400"}`}>
                  {line}
                </div>
              ))}
              {status === "Running" && (
                <div className="flex items-center">
                  <span className="text-white">$</span>
                  <div className="w-2 h-4 bg-white ml-2 animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleStartVM}
              disabled={loading || status === "Running"}
              className={`
                px-6 py-3 rounded-md font-medium flex items-center gap-2
                ${
                  status === "Running"
                    ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                    : "bg-subrosa-red hover:bg-opacity-90 text-white"
                }
                transition-colors
              `}
            >
              {loading && status === "Stopped" ? <RefreshCw className="animate-spin" size={18} /> : <Power size={18} />}
              <span>Start VM</span>
            </button>

            <button
              onClick={handleStopVM}
              disabled={loading || status === "Stopped"}
              className={`
                px-6 py-3 rounded-md font-medium flex items-center gap-2
                ${
                  status === "Stopped"
                    ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }
                transition-colors
              `}
            >
              {loading && status === "Running" ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <PowerOff size={18} />
              )}
              <span>Stop VM</span>
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-subrosa-gray bg-subrosa-light">
        <CardHeader className="border-b border-subrosa-gray">
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-subrosa-red" />
            <span>Privacy Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
              <h3 className="font-medium mb-2">Fingerprint Spoofing</h3>
              <div
                className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${status === "Running" ? "bg-subrosa-red bg-opacity-20 text-subrosa-red" : "bg-gray-800 text-gray-400"}`}
              >
                {status === "Running" ? "Active" : "Inactive"}
              </div>
              <p className="text-sm text-gray-400 mt-2">Randomizes browser characteristics to prevent tracking.</p>
            </div>

            <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
              <h3 className="font-medium mb-2">Tracker Blocking</h3>
              <div
                className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${status === "Running" ? "bg-subrosa-red bg-opacity-20 text-subrosa-red" : "bg-gray-800 text-gray-400"}`}
              >
                {status === "Running" ? "Active" : "Inactive"}
              </div>
              <p className="text-sm text-gray-400 mt-2">Blocks third-party trackers from monitoring browsing habits.</p>
            </div>

            <div className="bg-subrosa-dark p-4 rounded border border-subrosa-gray">
              <h3 className="font-medium mb-2">Cookie Management</h3>
              <div
                className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${status === "Running" ? "bg-subrosa-red bg-opacity-20 text-subrosa-red" : "bg-gray-800 text-gray-400"}`}
              >
                {status === "Running" ? "Active" : "Inactive"}
              </div>
              <p className="text-sm text-gray-400 mt-2">Automatically limits or blocks cookies for enhanced privacy.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {error && <Toast message={error} type="error" />}
    </div>
  )
}
