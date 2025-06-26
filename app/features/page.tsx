import Link from "next/link"
import { ArrowLeft, Shield, Globe, Eye, Network, Zap, Fingerprint, Cookie, Clock } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Sub Rosa Features</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover the powerful privacy features that make Sub Rosa the most secure browser available.
        </p>
      </div>

      {/* Hero Feature */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <div className="inline-block px-3 py-1 bg-subrosa-red bg-opacity-20 text-subrosa-red rounded-full text-sm font-medium mb-4">
              Core Technology
            </div>
            <h2 className="text-3xl font-bold mb-4">Decentralized VPN</h2>
            <p className="text-gray-300 mb-4">
              Unlike traditional VPNs that route your traffic through a single server, Sub Rosa's decentralized VPN
              distributes your connection across multiple nodes in a peer-to-peer network.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Shield className="text-subrosa-red mr-2 mt-1 flex-shrink-0" size={18} />
                <span>No single point of failure or compromise</span>
              </li>
              <li className="flex items-start">
                <Shield className="text-subrosa-red mr-2 mt-1 flex-shrink-0" size={18} />
                <span>End-to-end encryption with AES-256</span>
              </li>
              <li className="flex items-start">
                <Shield className="text-subrosa-red mr-2 mt-1 flex-shrink-0" size={18} />
                <span>Multi-hop routing for enhanced anonymity</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-64 bg-subrosa-dark rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-xs">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                      <Shield size={24} className="text-subrosa-red" />
                    </div>
                    <div className="w-24 h-0.5 bg-subrosa-red"></div>
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                      <Network size={24} className="text-subrosa-red" />
                    </div>
                    <div className="w-24 h-0.5 bg-subrosa-red"></div>
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                      <Globe size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    <p>Your Device → dVPN Network → Internet</p>
                    <p className="mt-2 text-subrosa-red">Fully Encrypted Connection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Feature 1 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <Fingerprint size={24} className="text-subrosa-red" />
          </div>
          <h3 className="text-xl font-bold mb-2">Browser Fingerprint Spoofing</h3>
          <p className="text-gray-300 mb-4">
            Websites use browser fingerprinting to track you across the web. Sub Rosa randomizes your browser
            characteristics to make fingerprinting impossible.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Canvas fingerprint randomization</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>User agent rotation</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>WebRTC and WebGL protection</span>
            </li>
          </ul>
        </div>

        {/* Feature 2 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <Eye size={24} className="text-subrosa-red" />
          </div>
          <h3 className="text-xl font-bold mb-2">Tracker Blocking</h3>
          <p className="text-gray-300 mb-4">
            Sub Rosa aggressively blocks trackers, ads, and malicious scripts that monitor your browsing habits and
            compromise your privacy.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Blocks third-party trackers</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Prevents social media tracking</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Blocks malicious scripts and cryptominers</span>
            </li>
          </ul>
        </div>

        {/* Feature 3 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <Cookie size={24} className="text-subrosa-red" />
          </div>
          <h3 className="text-xl font-bold mb-2">Cookie Management</h3>
          <p className="text-gray-300 mb-4">
            Take control of cookies with Sub Rosa's advanced cookie management system that automatically blocks tracking
            cookies while preserving essential functionality.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Automatic tracking cookie deletion</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Granular cookie control per site</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Cookie isolation between sites</span>
            </li>
          </ul>
        </div>

        {/* Feature 4 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <Network size={24} className="text-subrosa-red" />
          </div>
          <h3 className="text-xl font-bold mb-2">Multi-hop Routing</h3>
          <p className="text-gray-300 mb-4">
            Route your traffic through multiple nodes for enhanced privacy, making it virtually impossible to trace your
            connection back to your device.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Route through up to 3 different nodes</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Automatic node selection optimization</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Geographic distribution for maximum privacy</span>
            </li>
          </ul>
        </div>

        {/* Feature 5 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <Zap size={24} className="text-subrosa-red" />
          </div>
          <h3 className="text-xl font-bold mb-2">Privacy Score Dashboard</h3>
          <p className="text-gray-300 mb-4">
            Monitor your privacy protection in real-time with our comprehensive Privacy Score Dashboard that shows you
            exactly how well you're protected.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Real-time privacy metrics</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Tracker blocking statistics</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Vulnerability detection and alerts</span>
            </li>
          </ul>
        </div>

        {/* Feature 6 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <Clock size={24} className="text-subrosa-red" />
          </div>
          <h3 className="text-xl font-bold mb-2">Automatic History Cleaning</h3>
          <p className="text-gray-300 mb-4">
            Sub Rosa automatically cleans your browsing history, cache, and other traces when you close the browser,
            leaving no digital footprint behind.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Automatic cache clearing</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>History and download records wiping</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs text-subrosa-red">✓</span>
              </div>
              <span>Customizable cleaning schedules</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience True Privacy?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands of privacy-conscious users who have made the switch to Sub Rosa. Your digital freedom starts
          here.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Sign Up Now
          </Link>
          <Link
            href="/documentation"
            className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
