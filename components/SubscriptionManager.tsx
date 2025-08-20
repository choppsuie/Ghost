"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, CreditCard, Zap, Shield, Headphones } from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: string
  duration: number
  bandwidth: number
  features: string[]
  popular?: boolean
}

interface UserSubscription {
  id: string
  planId: string
  nodeAddress: string
  startDate: string
  endDate: string
  status: "active" | "expired" | "cancelled" | "pending"
  bandwidthUsed: number
  bandwidthLimit: number
  transactionHash: string
  autoRenew: boolean
}

interface PaymentHistory {
  id: string
  subscriptionId: string
  amount: string
  currency: string
  transactionHash: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  type: "subscription" | "renewal" | "bandwidth"
}

export default function SubscriptionManager({ userAddress }: { userAddress: string }) {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([])
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedNode, setSelectedNode] = useState<string>("")

  useEffect(() => {
    fetchPlans()
    fetchUserData()
  }, [userAddress])

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/subscription/plans")
      const data = await response.json()
      if (data.success) {
        setPlans(data.plans)
      }
    } catch (error) {
      console.error("[v0] Error fetching plans:", error)
    }
  }

  const fetchUserData = async () => {
    // Mock data for now - would fetch from API in real implementation
    setSubscriptions([])
    setPaymentHistory([])
  }

  const handleSubscribe = async (planId: string) => {
    if (!selectedNode) {
      alert("Please select a node first")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/subscription/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          nodeAddress: selectedNode,
          userAddress,
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert("Subscription created successfully!")
        fetchUserData()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("[v0] Error creating subscription:", error)
      alert("Failed to create subscription")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: string) => {
    const dvpn = Number.parseInt(price) / 1000000
    return `${dvpn} DVPN`
  }

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024)
    return `${gb.toFixed(1)} GB`
  }

  const getFeatureIcon = (feature: string) => {
    if (feature.includes("encryption")) return <Shield className="w-4 h-4" />
    if (feature.includes("support")) return <Headphones className="w-4 h-4" />
    if (feature.includes("bandwidth")) return <Zap className="w-4 h-4" />
    return <CheckCircle className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Subscription Management</h2>
          <p className="text-gray-400">Manage your DVPN subscriptions and billing</p>
        </div>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="plans" className="data-[state=active]:bg-red-600">
            Available Plans
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-red-600">
            Active Subscriptions
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-red-600">
            Payment History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-gray-800 border-gray-700 relative ${plan.popular ? "ring-2 ring-red-500" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  <div className="text-3xl font-bold text-red-400">{formatPrice(plan.price)}</div>
                  <div className="text-sm text-gray-400">per {plan.duration} days</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        {getFeatureIcon(feature)}
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading || !selectedNode}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    {loading ? "Creating..." : "Subscribe"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          {subscriptions.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Active Subscriptions</h3>
                <p className="text-gray-400">Subscribe to a plan to start using DVPN services</p>
              </CardContent>
            </Card>
          ) : (
            subscriptions.map((subscription) => (
              <Card key={subscription.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      {plans.find((p) => p.id === subscription.planId)?.name || "Unknown Plan"}
                    </CardTitle>
                    <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                      {subscription.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Start Date</div>
                      <div className="text-white">{new Date(subscription.startDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">End Date</div>
                      <div className="text-white">{new Date(subscription.endDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Bandwidth Usage</span>
                      <span className="text-white">
                        {formatBytes(subscription.bandwidthUsed)} / {formatBytes(subscription.bandwidthLimit)}
                      </span>
                    </div>
                    <Progress
                      value={(subscription.bandwidthUsed / subscription.bandwidthLimit) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`auto-renew-${subscription.id}`}
                        checked={subscription.autoRenew}
                        onCheckedChange={(checked) => {
                          // Handle auto-renew toggle
                          console.log("[v0] Auto-renew toggled:", checked)
                        }}
                      />
                      <Label htmlFor={`auto-renew-${subscription.id}`} className="text-gray-300">
                        Auto-renew
                      </Label>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {paymentHistory.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Payment History</h3>
                <p className="text-gray-400">Your payment history will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
                    >
                      <div className="space-y-1">
                        <div className="text-white font-medium">
                          {payment.type === "subscription"
                            ? "New Subscription"
                            : payment.type === "renewal"
                              ? "Subscription Renewal"
                              : "Bandwidth Purchase"}
                        </div>
                        <div className="text-sm text-gray-400">{new Date(payment.timestamp).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{formatPrice(payment.amount)}</div>
                        <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
