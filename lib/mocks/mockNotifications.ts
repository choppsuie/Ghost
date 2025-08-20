export interface MockNotification {
  id: string
  type: "info" | "warning" | "error" | "success"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired?: boolean
  action?: {
    label: string
    url: string
  }
}

export const mockNotifications: MockNotification[] = [
  {
    id: "notif-1",
    type: "warning",
    title: "Server Maintenance",
    message: "Toronto Shield server will undergo maintenance in 2 hours. Consider switching servers.",
    timestamp: "2024-12-19T14:30:00Z",
    read: false,
    actionRequired: true,
    action: {
      label: "Switch Server",
      url: "/dashboard/servers",
    },
  },
  {
    id: "notif-2",
    type: "success",
    title: "Connection Secured",
    message: "Successfully connected to Zurich Secure server. Your traffic is now encrypted.",
    timestamp: "2024-12-19T14:22:00Z",
    read: true,
  },
  {
    id: "notif-3",
    type: "info",
    title: "New Feature Available",
    message: "DNS leak protection is now available in your privacy settings.",
    timestamp: "2024-12-19T10:15:00Z",
    read: false,
    action: {
      label: "Learn More",
      url: "/dashboard/settings",
    },
  },
  {
    id: "notif-4",
    type: "error",
    title: "Connection Failed",
    message: "Failed to connect to Singapore Gateway. Trying alternative server...",
    timestamp: "2024-12-19T09:45:00Z",
    read: true,
  },
]

export const getUnreadNotifications = () => mockNotifications.filter((notif) => !notif.read)

export const getNotificationsByType = (type: MockNotification["type"]) =>
  mockNotifications.filter((notif) => notif.type === type)
