import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"

// Initialize font outside of the component
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Sub Rosa - Under the rose (in secrecy, privately)",
  description:
    "Unlike traditional browsers, Sub Rosa doesn't just make you invisible—it makes you invincible. Browse securely with integrated decentralized VPN, tracker blocking, and fingerprint spoofing.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black text-white flex flex-col`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
