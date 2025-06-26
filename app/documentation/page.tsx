import Link from "next/link"
import { ArrowLeft, Book, Code, Shield, Settings, Download, HelpCircle } from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Comprehensive guides and resources to help you get the most out of Sub Rosa.
        </p>
      </div>

      {/* Documentation Overview */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <div className="inline-block px-3 py-1 bg-subrosa-red bg-opacity-20 text-subrosa-red rounded-full text-sm font-medium mb-4">
              Documentation
            </div>
            <h2 className="text-3xl font-bold mb-4">Getting Started with Sub Rosa</h2>
            <p className="text-gray-300 mb-4">
              Welcome to the Sub Rosa documentation. Here you'll find everything you need to know about using Sub Rosa,
              from basic setup to advanced privacy features.
            </p>
            <p className="text-gray-300">
              Our documentation is designed to be accessible to users of all technical levels, with step-by-step guides
              and detailed explanations.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
              <div className="flex items-center mb-4">
                <Book size={20} className="text-subrosa-red mr-2" />
                <h3 className="font-bold">Quick Links</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link href="/documentation/installation" className="text-gray-300 hover:text-white transition-colors">
                    Installation Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation/getting-started"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation/privacy-features"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation/troubleshooting"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Troubleshooting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Category 1 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <Download size={24} className="text-subrosa-red mr-3" />
            <h3 className="text-xl font-bold">Installation & Setup</h3>
          </div>
          <ul className="space-y-2 mb-4">
            <li>
              <Link
                href="/documentation/installation/windows"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Windows Installation
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/installation/macos"
                className="text-gray-300 hover:text-white transition-colors"
              >
                macOS Installation
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/installation/linux"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Linux Installation
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/installation/first-time-setup"
                className="text-gray-300 hover:text-white transition-colors"
              >
                First-time Setup
              </Link>
            </li>
          </ul>
          <Link
            href="/documentation/installation"
            className="inline-flex items-center text-subrosa-red hover:underline"
          >
            View all installation guides
          </Link>
        </div>

        {/* Category 2 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <Shield size={24} className="text-subrosa-red mr-3" />
            <h3 className="text-xl font-bold">Privacy Features</h3>
          </div>
          <ul className="space-y-2 mb-4">
            <li>
              <Link href="/documentation/privacy/dvpn" className="text-gray-300 hover:text-white transition-colors">
                Decentralized VPN
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/privacy/fingerprinting"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Fingerprint Spoofing
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/privacy/tracker-blocking"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Tracker Blocking
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/privacy/cookie-management"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Cookie Management
              </Link>
            </li>
          </ul>
          <Link href="/documentation/privacy" className="inline-flex items-center text-subrosa-red hover:underline">
            View all privacy features
          </Link>
        </div>

        {/* Category 3 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <Settings size={24} className="text-subrosa-red mr-3" />
            <h3 className="text-xl font-bold">Configuration</h3>
          </div>
          <ul className="space-y-2 mb-4">
            <li>
              <Link
                href="/documentation/configuration/general"
                className="text-gray-300 hover:text-white transition-colors"
              >
                General Settings
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/configuration/privacy"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Privacy Settings
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/configuration/network"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Network Configuration
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/configuration/advanced"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Advanced Configuration
              </Link>
            </li>
          </ul>
          <Link
            href="/documentation/configuration"
            className="inline-flex items-center text-subrosa-red hover:underline"
          >
            View all configuration guides
          </Link>
        </div>

        {/* Category 4 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <HelpCircle size={24} className="text-subrosa-red mr-3" />
            <h3 className="text-xl font-bold">Troubleshooting</h3>
          </div>
          <ul className="space-y-2 mb-4">
            <li>
              <Link
                href="/documentation/troubleshooting/connection"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Connection Issues
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/troubleshooting/performance"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Performance Optimization
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/troubleshooting/common-errors"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Common Errors
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/troubleshooting/faq"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
          <Link
            href="/documentation/troubleshooting"
            className="inline-flex items-center text-subrosa-red hover:underline"
          >
            View all troubleshooting guides
          </Link>
        </div>

        {/* Category 5 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <Code size={24} className="text-subrosa-red mr-3" />
            <h3 className="text-xl font-bold">Developer Resources</h3>
          </div>
          <ul className="space-y-2 mb-4">
            <li>
              <Link href="/documentation/developers/api" className="text-gray-300 hover:text-white transition-colors">
                API Documentation
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/developers/extensions"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Extension Development
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/developers/contributing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contributing to Sub Rosa
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/developers/architecture"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Technical Architecture
              </Link>
            </li>
          </ul>
          <Link href="/documentation/developers" className="inline-flex items-center text-subrosa-red hover:underline">
            View all developer resources
          </Link>
        </div>

        {/* Category 6 */}
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <Book size={24} className="text-subrosa-red mr-3" />
            <h3 className="text-xl font-bold">User Guides</h3>
          </div>
          <ul className="space-y-2 mb-4">
            <li>
              <Link href="/documentation/guides/beginners" className="text-gray-300 hover:text-white transition-colors">
                Beginner's Guide
              </Link>
            </li>
            <li>
              <Link href="/documentation/guides/advanced" className="text-gray-300 hover:text-white transition-colors">
                Advanced User Guide
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/guides/best-practices"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Privacy Best Practices
              </Link>
            </li>
            <li>
              <Link href="/documentation/guides/migration" className="text-gray-300 hover:text-white transition-colors">
                Migrating from Other Browsers
              </Link>
            </li>
          </ul>
          <Link href="/documentation/guides" className="inline-flex items-center text-subrosa-red hover:underline">
            View all user guides
          </Link>
        </div>
      </div>

      {/* Documentation Search */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray mb-12">
        <h2 className="text-2xl font-bold mb-4">Search Documentation</h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for topics, features, or questions..."
              className="w-full px-4 py-3 bg-subrosa-dark border border-subrosa-gray rounded-md focus:outline-none focus:ring-2 focus:ring-subrosa-red"
            />
            <button className="absolute right-3 top-3 px-4 py-1 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors">
              Search
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-subrosa-red hover:underline">
              Contact our support team
            </Link>
            .
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-subrosa-dark p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Our documentation is constantly evolving. If you can't find the information you need, our community and
          support team are here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/community"
            className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Join Our Community
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
