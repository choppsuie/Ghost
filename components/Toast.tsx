"use client"

import { useState, useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error"
  duration?: number
}

export function Toast({ message, type, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white z-50`}
    >
      {message}
    </div>
  )
}
