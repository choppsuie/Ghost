import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"

// Initialize font outside of the component
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Sub Rosa - Privacy-First Browser with dVPN",
  description: "Browse securely with integrated decentralized VPN, tracker blocking, and fingerprint spoofing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
