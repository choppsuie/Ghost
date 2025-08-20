"use client"

import { useState, useEffect } from "react"
import { Wallet, Copy, ExternalLink, RefreshCw, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sentinelService } from "@/lib/sentinelClient"
import { toast } from "sonner"

interface WalletManagerProps {
  userId: string
}

export function WalletManager({ userId }: WalletManagerProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>("0")
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      console.log("[v0] Checking wallet connection")
      const address = await sentinelService.getWalletAddress()

      if (address) {
        setWalletAddress(address)
        setIsConnected(true)
        await refreshBalance()
      } else {
        setIsConnected(false)
      }
    } catch (error) {
      console.error("[v0] Error checking wallet:", error)
      setError("Failed to check wallet connection")
    }
  }

  const connectWallet = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Connecting wallet")

      // For demo purposes, we'll use a mock mnemonic
      // In production, this would come from user input or secure storage
      const mockMnemonic =
        process.env.NEXT_PUBLIC_DEMO_MNEMONIC ||
        "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

      await sentinelService.initialize(mockMnemonic)

      const address = await sentinelService.getWalletAddress()
      if (address) {
        setWalletAddress(address)
        setIsConnected(true)
        await refreshBalance()
        toast.success("Wallet connected successfully!")
      }
    } catch (error) {
      console.error("[v0] Error connecting wallet:", error)
      setError("Failed to connect wallet")
      toast.error("Failed to connect wallet")
    } finally {
      setLoading(false)
    }
  }

  const refreshBalance = async () => {
    if (!isConnected) return

    try {
      console.log("[v0] Refreshing wallet balance")
      const newBalance = await sentinelService.getBalance()
      setBalance(newBalance)
    } catch (error) {
      console.error("[v0] Error refreshing balance:", error)
      setError("Failed to refresh balance")
    }
  }

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      toast.success("Address copied to clipboard!")
    }
  }

  const formatBalance = (balance: string) => {
    const balanceNum = Number.parseInt(balance) / 1000000 // Convert from udvpn to DVPN
    return balanceNum.toFixed(6)
  }

  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 8)}...${address.slice(-6)}`
  }

  return (
    <Card className="border border-subrosa-gray bg-subrosa-light">
      <CardHeader className="border-b border-subrosa-gray">
        <CardTitle className="flex items-center gap-2">
          <Wallet className="text-subrosa-red" size={20} />
          <span>Sentinel Wallet</span>
          {isConnected && (
            <div className="ml-auto px-2 py-1 rounded-full text-xs bg-green-900 bg-opacity-30 text-green-400 border border-green-800">
              Connected
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {error && (
          <div className="mb-4 p-3 rounded border border-red-800 bg-red-900 bg-opacity-30 text-red-400 flex items-center gap-2">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {!isConnected ? (
          <div className="text-center py-6">
            <div className="mb-4">
              <Wallet size={48} className="mx-auto text-gray-600 mb-2" />
              <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
              <p className="text-sm text-gray-400 mb-4">
                Connect your Sentinel wallet to access dVPN services and manage subscriptions
              </p>
            </div>
            <Button
              onClick={connectWallet}
              disabled={loading}
              className="bg-subrosa-red hover:bg-opacity-90 text-white"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin mr-2" size={16} />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2" size={16} />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Wallet Address */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Wallet Address</label>
              <div className="flex items-center gap-2 p-3 bg-subrosa-dark rounded border border-subrosa-gray">
                <code className="flex-1 text-sm font-mono">{formatAddress(walletAddress!)}</code>
                <Button variant="ghost" size="sm" onClick={copyAddress} className="text-gray-400 hover:text-white">
                  <Copy size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://explorer.sentinel.co/accounts/${walletAddress}`, "_blank")}
                  className="text-gray-400 hover:text-white"
                >
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>

            {/* Balance */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm text-gray-400">DVPN Balance</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshBalance}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <RefreshCw size={14} />
                </Button>
              </div>
              <div className="p-3 bg-subrosa-dark rounded border border-subrosa-gray">
                <div className="text-2xl font-bold text-subrosa-red">{formatBalance(balance)} DVPN</div>
                <div className="text-xs text-gray-400 mt-1">
                  ≈ ${(Number.parseFloat(formatBalance(balance)) * 0.001).toFixed(4)} USD
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-subrosa-gray hover:bg-subrosa-gray bg-transparent"
                onClick={() => window.open("https://app.osmosis.zone/", "_blank")}
              >
                Buy DVPN
              </Button>
              <Button
                variant="outline"
                className="border-subrosa-gray hover:bg-subrosa-gray bg-transparent"
                onClick={() => toast.info("Send feature coming soon!")}
              >
                Send DVPN
              </Button>
            </div>

            {/* Wallet Info */}
            <div className="text-xs text-gray-400 space-y-1">
              <div>Network: Sentinel Hub (sentinelhub-2)</div>
              <div>Provider: Cosmos SDK</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default WalletManager
