import { sentinelService } from "./sentinelClient"

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: string // in udvpn
  duration: number // in days
  bandwidth: number // in GB
  features: string[]
  popular?: boolean
}

export interface UserSubscription {
  id: string
  planId: string
  nodeAddress: string
  startDate: Date
  endDate: Date
  status: "active" | "expired" | "cancelled" | "pending"
  bandwidthUsed: number
  bandwidthLimit: number
  transactionHash: string
  autoRenew: boolean
}

export interface PaymentHistory {
  id: string
  subscriptionId: string
  amount: string
  currency: string
  transactionHash: string
  timestamp: Date
  status: "completed" | "pending" | "failed"
  type: "subscription" | "renewal" | "bandwidth"
}

export class SubscriptionManager {
  private subscriptions: Map<string, UserSubscription> = new Map()
  private paymentHistory: PaymentHistory[] = []

  getAvailablePlans(): SubscriptionPlan[] {
    return [
      {
        id: "basic",
        name: "Basic Plan",
        description: "Perfect for light browsing and basic privacy needs",
        price: "1000000", // 1 DVPN
        duration: 30,
        bandwidth: 10, // 10GB
        features: ["10GB monthly bandwidth", "Basic encryption", "Email support"],
      },
      {
        id: "pro",
        name: "Pro Plan",
        description: "Ideal for regular users who need reliable privacy",
        price: "5000000", // 5 DVPN
        duration: 30,
        bandwidth: 100, // 100GB
        features: ["100GB monthly bandwidth", "Advanced encryption", "Multi-hop routing", "Priority support"],
        popular: true,
      },
      {
        id: "premium",
        name: "Premium Plan",
        description: "Maximum privacy and unlimited access",
        price: "15000000", // 15 DVPN
        duration: 30,
        bandwidth: 1000, // 1TB
        features: [
          "1TB monthly bandwidth",
          "Military-grade encryption",
          "Multi-hop routing",
          "24/7 support",
          "Custom nodes",
        ],
      },
    ]
  }

  async createSubscription(planId: string, nodeAddress: string, userAddress: string): Promise<UserSubscription> {
    const plan = this.getAvailablePlans().find((p) => p.id === planId)
    if (!plan) {
      throw new Error("Invalid subscription plan")
    }

    try {
      console.log("[v0] Creating subscription for plan:", planId)

      // Create subscription on Sentinel network
      const transactionHash = await sentinelService.createSubscription(nodeAddress, plan.price)

      const subscription: UserSubscription = {
        id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        planId,
        nodeAddress,
        startDate: new Date(),
        endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
        status: "active",
        bandwidthUsed: 0,
        bandwidthLimit: plan.bandwidth * 1024 * 1024 * 1024, // Convert GB to bytes
        transactionHash,
        autoRenew: false,
      }

      this.subscriptions.set(subscription.id, subscription)

      // Record payment
      const payment: PaymentHistory = {
        id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        subscriptionId: subscription.id,
        amount: plan.price,
        currency: "udvpn",
        transactionHash,
        timestamp: new Date(),
        status: "completed",
        type: "subscription",
      }

      this.paymentHistory.push(payment)
      console.log("[v0] Subscription created successfully:", subscription.id)

      return subscription
    } catch (error) {
      console.error("[v0] Error creating subscription:", error)
      throw error
    }
  }

  async renewSubscription(subscriptionId: string): Promise<void> {
    const subscription = this.subscriptions.get(subscriptionId)
    if (!subscription) {
      throw new Error("Subscription not found")
    }

    const plan = this.getAvailablePlans().find((p) => p.id === subscription.planId)
    if (!plan) {
      throw new Error("Plan not found")
    }

    try {
      console.log("[v0] Renewing subscription:", subscriptionId)

      // Create new subscription transaction
      const transactionHash = await sentinelService.createSubscription(subscription.nodeAddress, plan.price)

      // Update subscription
      subscription.endDate = new Date(subscription.endDate.getTime() + plan.duration * 24 * 60 * 60 * 1000)
      subscription.status = "active"
      subscription.bandwidthUsed = 0 // Reset bandwidth for new period

      // Record renewal payment
      const payment: PaymentHistory = {
        id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        subscriptionId,
        amount: plan.price,
        currency: "udvpn",
        transactionHash,
        timestamp: new Date(),
        status: "completed",
        type: "renewal",
      }

      this.paymentHistory.push(payment)
      console.log("[v0] Subscription renewed successfully")
    } catch (error) {
      console.error("[v0] Error renewing subscription:", error)
      throw error
    }
  }

  cancelSubscription(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId)
    if (!subscription) {
      throw new Error("Subscription not found")
    }

    subscription.status = "cancelled"
    subscription.autoRenew = false
    console.log("[v0] Subscription cancelled:", subscriptionId)
  }

  getUserSubscriptions(userAddress: string): UserSubscription[] {
    return Array.from(this.subscriptions.values())
  }

  getActiveSubscription(userAddress: string): UserSubscription | null {
    const subscriptions = this.getUserSubscriptions(userAddress)
    return subscriptions.find((sub) => sub.status === "active" && sub.endDate > new Date()) || null
  }

  getPaymentHistory(userAddress: string): PaymentHistory[] {
    return this.paymentHistory.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  updateBandwidthUsage(subscriptionId: string, bytesUsed: number): void {
    const subscription = this.subscriptions.get(subscriptionId)
    if (!subscription) return

    subscription.bandwidthUsed += bytesUsed

    // Check if bandwidth limit exceeded
    if (subscription.bandwidthUsed >= subscription.bandwidthLimit) {
      console.log("[v0] Bandwidth limit exceeded for subscription:", subscriptionId)
      subscription.status = "expired"
    }
  }

  getBandwidthUsage(subscriptionId: string): { used: number; limit: number; percentage: number } {
    const subscription = this.subscriptions.get(subscriptionId)
    if (!subscription) {
      return { used: 0, limit: 0, percentage: 0 }
    }

    const percentage = (subscription.bandwidthUsed / subscription.bandwidthLimit) * 100
    return {
      used: subscription.bandwidthUsed,
      limit: subscription.bandwidthLimit,
      percentage: Math.min(percentage, 100),
    }
  }

  setAutoRenew(subscriptionId: string, enabled: boolean): void {
    const subscription = this.subscriptions.get(subscriptionId)
    if (!subscription) {
      throw new Error("Subscription not found")
    }

    subscription.autoRenew = enabled
    console.log("[v0] Auto-renewal", enabled ? "enabled" : "disabled", "for subscription:", subscriptionId)
  }

  async processAutoRenewals(): Promise<void> {
    const now = new Date()
    const renewalThreshold = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours before expiry

    for (const subscription of this.subscriptions.values()) {
      if (subscription.autoRenew && subscription.status === "active" && subscription.endDate <= renewalThreshold) {
        try {
          await this.renewSubscription(subscription.id)
          console.log("[v0] Auto-renewed subscription:", subscription.id)
        } catch (error) {
          console.error("[v0] Failed to auto-renew subscription:", subscription.id, error)
          subscription.status = "expired"
        }
      }
    }
  }
}

// Singleton instance
export const subscriptionManager = new SubscriptionManager()
