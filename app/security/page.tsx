import Link from "next/link"
import { ArrowLeft, Shield, Lock, Key, Server, Eye, FileCheck } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Security Architecture</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Sub Rosa is built from the ground up with security as the primary focus. Learn about our comprehensive
          security measures.
        </p>
      </div>

      {/* Security Overview */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <div className="inline-block px-3 py-1 bg-subrosa-red bg-opacity-20 text-subrosa-red rounded-full text-sm font-medium mb-4">
              Security Overview
            </div>
            <h2 className="text-3xl font-bold mb-4">Multi-layered Protection</h2>
            <p className="text-gray-300 mb-4">
              Sub Rosa implements a multi-layered security architecture that protects your data at every level, from
              your device to the internet and back again.
            </p>
            <p className="text-gray-300">
              Our security model follows the principle of defense in depth, ensuring that even if one security measure
              is compromised, multiple additional layers continue to protect your privacy and data.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-64 bg-subrosa-dark rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <div className="relative">
                    <div className="w-full h-48 border-2 border-subrosa-red rounded-lg p-4 flex flex-col items-center justify-center">
                      <div className="w-full h-36 border border-gray-600 rounded-lg p-3 flex flex-col items-center justify-center">
                        <div className="w-full h-24 border border-gray-600 rounded-lg p-2 flex flex-col items-center justify-center">
                          <div className="w-full h-16 border border-gray-600 rounded-lg p-2 flex items-center justify-center">
                            <Shield size={24} className="text-subrosa-red" />
                            <span className="ml-2 text-sm">Your Data</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">Multiple Security Layers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Core Security Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Security Feature 1 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Lock size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
            <p className="text-gray-300 mb-4">
              All your browsing data is encrypted from your device to its destination, preventing anyone from
              intercepting or reading your data.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>AES-256 encryption</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Perfect forward secrecy</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Encrypted DNS queries</span>
              </li>
            </ul>
          </div>

          {/* Security Feature 2 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Key size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Zero-Knowledge Architecture</h3>
            <p className="text-gray-300 mb-4">
              Our zero-knowledge architecture ensures that we never have access to your browsing data or personal
              information.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>No logging of browsing activity</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Client-side encryption of all data</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>No personal data collection</span>
              </li>
            </ul>
          </div>

          {/* Security Feature 3 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Server size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Decentralized Infrastructure</h3>
            <p className="text-gray-300 mb-4">
              Our decentralized network architecture eliminates single points of failure and prevents targeted attacks
              on central servers.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Peer-to-peer network topology</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Distributed node verification</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Redundant routing paths</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Certifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Security Certifications & Audits</h2>
        <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <div className="flex items-center mb-4">
                <FileCheck size={24} className="text-subrosa-red mr-3" />
                <h3 className="text-xl font-bold">Independent Security Audits</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Sub Rosa undergoes regular security audits by independent cybersecurity firms to verify our security
                claims and identify potential vulnerabilities.
              </p>
              <p className="text-gray-300">
                Our most recent audit was completed in March 2023 by CyberSec Partners, who verified our zero-knowledge
                claims and encryption implementation.
              </p>
              <Link href="/security/audits" className="inline-flex items-center mt-4 text-subrosa-red hover:underline">
                View audit reports
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="bg-subrosa-light p-4 rounded-lg border border-subrosa-gray">
                <h4 className="font-bold mb-3">Security Certifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-subrosa-dark p-3 rounded border border-subrosa-gray flex items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                      <Shield size={20} className="text-subrosa-red" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">ISO 27001</p>
                      <p className="text-xs text-gray-400">Information Security</p>
                    </div>
                  </div>
                  <div className="bg-subrosa-dark p-3 rounded border border-subrosa-gray flex items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                      <Lock size={20} className="text-subrosa-red" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">GDPR</p>
                      <p className="text-xs text-gray-400">Compliant</p>
                    </div>
                  </div>
                  <div className="bg-subrosa-dark p-3 rounded border border-subrosa-gray flex items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                      <Eye size={20} className="text-subrosa-red" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">SOC 2</p>
                      <p className="text-xs text-gray-400">Type II Certified</p>
                    </div>
                  </div>
                  <div className="bg-subrosa-dark p-3 rounded border border-subrosa-gray flex items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                      <Shield size={20} className="text-subrosa-red" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">HIPAA</p>
                      <p className="text-xs text-gray-400">Compliant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Practices */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Security Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <h3 className="text-xl font-bold mb-4">Vulnerability Management</h3>
            <p className="text-gray-300 mb-4">
              We maintain a comprehensive vulnerability management program that includes regular penetration testing,
              code reviews, and automated security scanning.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Quarterly penetration testing</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Continuous automated security scanning</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Bug bounty program for security researchers</span>
              </li>
            </ul>
          </div>

          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <h3 className="text-xl font-bold mb-4">Incident Response</h3>
            <p className="text-gray-300 mb-4">
              Our dedicated security team is ready to respond to security incidents 24/7, with a comprehensive incident
              response plan that ensures rapid mitigation and resolution.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>24/7 security monitoring</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Documented incident response procedures</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs text-subrosa-red">✓</span>
                </div>
                <span>Regular incident response drills</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Security Without Compromise</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Experience the most secure browser available without sacrificing performance or usability. Sub Rosa provides
          military-grade security with a seamless user experience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Secure Your Browsing Now
          </Link>
          <Link
            href="/documentation/security"
            className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Security Documentation
          </Link>
        </div>
      </div>
    </div>
  )
}
