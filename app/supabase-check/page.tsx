"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function SupabaseCheck() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [diagnostics, setDiagnostics] = useState<any>(null)

  useEffect(() => {
    async function checkSupabase() {
      try {
        const response = await fetch("/api/supabase-check")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setDiagnostics(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkSupabase()
  }, [])

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Supabase Configuration Check</h1>

      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {error && (
        <Card className="p-6 bg-red-500 bg-opacity-10 border-red-500">
          <div className="flex items-start">
            <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-red-500">Error checking Supabase configuration</h3>
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {diagnostics && (
        <div className="space-y-6">
          {/* Environment Variables */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">NEXT_PUBLIC_SUPABASE_URL</p>
                <p>{diagnostics.environment.supabaseUrl}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
                <p>{diagnostics.environment.supabaseAnonKey}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">NODE_ENV</p>
                <p>{diagnostics.environment.nodeEnv}</p>
              </div>
            </div>
          </Card>

          {/* Issues */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration Issues</h2>
            {Array.isArray(diagnostics.issues) ? (
              diagnostics.issues.length > 0 ? (
                <ul className="space-y-2">
                  {diagnostics.issues.map((issue, index) => (
                    <li key={index} className="flex items-start">
                      <XCircle className="text-red-500 mr-2 mt-0.5" size={18} />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  <span>No issues found with environment variables</span>
                </div>
              )
            ) : (
              <p>{diagnostics.issues}</p>
            )}
          </Card>

          {/* Connectivity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Connectivity</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex items-center mt-1">
                  {diagnostics.connectivity.includes("Connected") ? (
                    <>
                      <CheckCircle className="text-green-500 mr-2" size={18} />
                      <span>{diagnostics.connectivity}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-500 mr-2" size={18} />
                      <span>{diagnostics.connectivity}</span>
                    </>
                  )}
                </div>
              </div>

              {diagnostics.healthCheck && (
                <div>
                  <p className="text-sm text-gray-500">Health Check</p>
                  <div className="flex items-center mt-1">
                    {diagnostics.healthCheck.ok ? (
                      <>
                        <CheckCircle className="text-green-500 mr-2" size={18} />
                        <span>Status: {diagnostics.healthCheck.status}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-500 mr-2" size={18} />
                        <span>Status: {diagnostics.healthCheck.status}</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <ul className="space-y-2">
              {!diagnostics.environment.supabaseUrl.includes("...") && (
                <li className="flex items-start">
                  <AlertCircle className="text-amber-500 mr-2 mt-0.5" size={18} />
                  <span>Set the NEXT_PUBLIC_SUPABASE_URL environment variable</span>
                </li>
              )}
              {!diagnostics.environment.supabaseAnonKey.includes("...") && (
                <li className="flex items-start">
                  <AlertCircle className="text-amber-500 mr-2 mt-0.5" size={18} />
                  <span>Set the NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable</span>
                </li>
              )}
              {!diagnostics.connectivity.includes("Connected") && (
                <li className="flex items-start">
                  <AlertCircle className="text-amber-500 mr-2 mt-0.5" size={18} />
                  <span>Check network connectivity to Supabase</span>
                </li>
              )}
              <li className="flex items-start">
                <AlertCircle className="text-amber-500 mr-2 mt-0.5" size={18} />
                <span>Verify CORS settings in your Supabase project dashboard</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="text-amber-500 mr-2 mt-0.5" size={18} />
                <span>Ensure your Supabase project's Site URL is correctly set</span>
              </li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  )
}
