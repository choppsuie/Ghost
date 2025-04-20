import Link from "next/link"
import Image from "next/image"
import { Shield, Lock, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-subrosa-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Browse <span className="text-red-600">Under the Rose</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300 max-w-lg">
                A privacy-first browser with integrated decentralized VPN. Reclaim your digital freedom and browse
                securely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-gray-900 border border-red-600 text-white rounded-md hover:bg-red-600 transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <Shield size={20} />
                  <span>Sign Up</span>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/images/subrosa-icon.png"
                  alt="Sub Rosa Logo"
                  width={320}
                  height={320}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Privacy-First <span className="text-red-600">Features</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Decentralized VPN</h3>
              <p className="text-gray-300">
                Route all traffic through a secure, peer-to-peer network that masks your location and identity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Lock size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enhanced Privacy</h3>
              <p className="text-gray-300">
                Block trackers, cookies, and fingerprinting attempts to keep your browsing habits private.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Globe size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Access Everywhere</h3>
              <p className="text-gray-300">
                Bypass geo-restrictions and censorship while maintaining complete privacy and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Browse <span className="text-red-600">Securely</span>?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join Sub Rosa today and experience the internet as it was meant to be: private, secure, and free from
            surveillance.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-md hover:bg-opacity-90 transition-colors text-lg font-medium"
          >
            <Shield className="mr-2" size={20} />
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
