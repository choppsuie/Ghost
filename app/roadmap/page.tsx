import Link from "next/link"
import { ArrowLeft, CheckCircle, Circle, Clock, AlertCircle, Calendar } from "lucide-react"

export default function RoadmapPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Sub Rosa Roadmap</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our vision for the future of private browsing. Explore upcoming features and improvements.
        </p>
      </div>

      {/* Roadmap Overview */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <div className="inline-block px-3 py-1 bg-subrosa-red bg-opacity-20 text-subrosa-red rounded-full text-sm font-medium mb-4">
              Development Vision
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Commitment to Privacy</h2>
            <p className="text-gray-300 mb-4">
              The Sub Rosa roadmap is guided by our unwavering commitment to user privacy and security. Every feature we
              develop is designed to enhance your privacy without compromising on performance or usability.
            </p>
            <p className="text-gray-300">
              We believe in transparency, which is why we openly share our development plans with our community. Your
              feedback helps shape the future of Sub Rosa.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-subrosa-dark p-4 rounded-lg border border-subrosa-gray">
              <div className="flex items-center mb-4">
                <Calendar size={20} className="text-subrosa-red mr-2" />
                <h3 className="font-bold">Current Release</h3>
              </div>
              <div className="mb-2">
                <span className="text-2xl font-bold">v3.2.0</span>
                <span className="ml-2 text-sm text-gray-400">Released April 2025</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <CheckCircle size={16} className="text-green-500 mr-2" />
                <span>Stable Release</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Development Timeline</h2>

        {/* 2023 */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <CheckCircle size={20} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold">2023 (Completed)</h3>
          </div>
          <div className="ml-12 border-l-2 border-subrosa-gray pl-6">
            <div className="mb-6">
              <div className="flex items-start">
                <CheckCircle size={18} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Multi-hop Routing</h4>
                  <p className="text-gray-300 mb-2">
                    Route your traffic through multiple nodes for enhanced privacy and security.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-green-500 bg-opacity-20 text-green-500 rounded text-xs">
                    Completed
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <CheckCircle size={18} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Privacy Score Dashboard</h4>
                  <p className="text-gray-300 mb-2">
                    Real-time monitoring of your privacy protection with detailed metrics and recommendations.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-green-500 bg-opacity-20 text-green-500 rounded text-xs">
                    Completed
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <CheckCircle size={18} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Enhanced Fingerprint Spoofing</h4>
                  <p className="text-gray-300 mb-2">
                    Improved browser fingerprint randomization to prevent tracking across websites.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-green-500 bg-opacity-20 text-green-500 rounded text-xs">
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2024 */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <Clock size={20} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold">2024 (In Progress)</h3>
          </div>
          <div className="ml-12 border-l-2 border-subrosa-gray pl-6">
            <div className="mb-6">
              <div className="flex items-start">
                <CheckCircle size={18} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Advanced Cookie Management</h4>
                  <p className="text-gray-300 mb-2">
                    Granular control over cookies with automatic tracking cookie deletion and isolation.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-green-500 bg-opacity-20 text-green-500 rounded text-xs">
                    Completed
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <CheckCircle size={18} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Secure Password Manager</h4>
                  <p className="text-gray-300 mb-2">
                    Built-in password manager with zero-knowledge encryption and cross-device synchronization.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-green-500 bg-opacity-20 text-green-500 rounded text-xs">
                    Completed
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <Clock size={18} className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Decentralized Bookmark Sync</h4>
                  <p className="text-gray-300 mb-2">
                    Synchronize your bookmarks across devices using encrypted peer-to-peer technology.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-yellow-500 bg-opacity-20 text-yellow-500 rounded text-xs">
                    In Development (85%)
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <Clock size={18} className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Private Search Engine Integration</h4>
                  <p className="text-gray-300 mb-2">
                    Integrated privacy-focused search engine that doesn't track your searches or build a profile.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-yellow-500 bg-opacity-20 text-yellow-500 rounded text-xs">
                    In Development (60%)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2025 */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
              <Circle size={20} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold">2025 (Planned)</h3>
          </div>
          <div className="ml-12 border-l-2 border-subrosa-gray pl-6">
            <div className="mb-6">
              <div className="flex items-start">
                <Circle size={18} className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Quantum-Resistant Encryption</h4>
                  <p className="text-gray-300 mb-2">
                    Implementation of post-quantum cryptography to protect against future quantum computing threats.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Q1 2025</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <Circle size={18} className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">AI-Powered Privacy Assistant</h4>
                  <p className="text-gray-300 mb-2">
                    Intelligent assistant that provides personalized privacy recommendations and automatically adjusts
                    settings.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Q2 2025</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <Circle size={18} className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Decentralized Identity Platform</h4>
                  <p className="text-gray-300 mb-2">
                    Self-sovereign identity system allowing users to control their digital identity without relying on
                    centralized providers.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Q3 2025</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <Circle size={18} className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Enhanced Ad Blocking with Ethical Monetization</h4>
                  <p className="text-gray-300 mb-2">
                    Advanced ad blocking technology that prevents tracking while supporting ethical advertising models.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Q4 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2026 */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
              <Circle size={20} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold">2026 (Future)</h3>
          </div>
          <div className="ml-12 border-l-2 border-subrosa-gray pl-6">
            <div className="mb-6">
              <div className="flex items-start">
                <Circle size={18} className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Private Communication Platform</h4>
                  <p className="text-gray-300 mb-2">
                    Integrated messaging and video calling with end-to-end encryption and perfect forward secrecy.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Q1 2026</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <Circle size={18} className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Secure Cloud Storage</h4>
                  <p className="text-gray-300 mb-2">
                    Zero-knowledge encrypted cloud storage with client-side encryption and decentralized architecture.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Q2 2026</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <Circle size={18} className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Cross-Platform Synchronization</h4>
                  <p className="text-gray-300 mb-2">
                    Seamless synchronization of settings, bookmarks, and passwords across all platforms and devices.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Q3 2026</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <Circle size={18} className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Privacy-Focused App Store</h4>
                  <p className="text-gray-300 mb-2">
                    Curated marketplace for privacy-respecting applications and extensions with strict vetting process.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Q4 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2027 */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
              <Circle size={20} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold">2027 (Vision)</h3>
          </div>
          <div className="ml-12 border-l-2 border-subrosa-gray pl-6">
            <div className="mb-6">
              <div className="flex items-start">
                <AlertCircle size={18} className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Immersive Privacy-First Metaverse</h4>
                  <p className="text-gray-300 mb-2">
                    Privacy-focused virtual reality environment with anonymous interactions and secure digital
                    transactions.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-blue-500 bg-opacity-20 text-blue-400 rounded text-xs">
                    Research Phase
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <AlertCircle size={18} className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Decentralized Web Infrastructure</h4>
                  <p className="text-gray-300 mb-2">
                    Contribution to building a more decentralized internet infrastructure resistant to censorship and
                    surveillance.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-blue-500 bg-opacity-20 text-blue-400 rounded text-xs">
                    Research Phase
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <AlertCircle size={18} className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Privacy-Preserving AI</h4>
                  <p className="text-gray-300 mb-2">
                    Development of AI systems that can provide personalized experiences without compromising user
                    privacy.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-blue-500 bg-opacity-20 text-blue-400 rounded text-xs">
                    Research Phase
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start">
                <AlertCircle size={18} className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Global Privacy Advocacy Platform</h4>
                  <p className="text-gray-300 mb-2">
                    Creation of a platform to advocate for stronger privacy laws and regulations worldwide.
                  </p>
                  <div className="inline-block px-2 py-0.5 bg-blue-500 bg-opacity-20 text-blue-400 rounded text-xs">
                    Planning Phase
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Input */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Community-Driven Development</h2>
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <p className="text-gray-300 mb-6">
            Sub Rosa is built with and for our community. We actively seek input from our users to guide our development
            priorities and ensure we're building features that matter to you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-subrosa-light p-4 rounded-lg border border-subrosa-gray">
              <h3 className="font-bold mb-2">Feature Voting</h3>
              <p className="text-sm text-gray-300 mb-4">
                Vote on upcoming features to help us prioritize our development efforts.
              </p>
              <Link
                href="/community/feature-voting"
                className="inline-block px-4 py-2 bg-subrosa-red text-white rounded-md text-sm hover:bg-opacity-90 transition-colors"
              >
                Vote Now
              </Link>
            </div>
            <div className="bg-subrosa-light p-4 rounded-lg border border-subrosa-gray">
              <h3 className="font-bold mb-2">Beta Testing</h3>
              <p className="text-sm text-gray-300 mb-4">
                Join our beta testing program to try new features before they're released.
              </p>
              <Link
                href="/community/beta"
                className="inline-block px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
              >
                Join Beta
              </Link>
            </div>
            <div className="bg-subrosa-light p-4 rounded-lg border border-subrosa-gray">
              <h3 className="font-bold mb-2">Feature Requests</h3>
              <p className="text-sm text-gray-300 mb-4">
                Submit your ideas for new features or improvements to existing ones.
              </p>
              <Link
                href="/community/feature-requests"
                className="inline-block px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
              >
                Submit Request
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Help Shape the Future of Privacy</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join the Sub Rosa community and help us build the most private and secure browser in the world. Your feedback
          and contributions make a difference.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Join Sub Rosa
          </Link>
          <Link
            href="/community"
            className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Join Our Community
          </Link>
        </div>
      </div>
    </div>
  )
}
