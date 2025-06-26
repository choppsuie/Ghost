"use client"

import Link from "next/link"
import { ArrowLeft, ChevronDown, ChevronUp, Search } from "lucide-react"
import { useState } from "react"

// FAQ Item component with client-side interactivity
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-subrosa-gray last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none focus:ring-2 focus:ring-subrosa-red focus:ring-opacity-50 rounded"
      >
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? <ChevronUp className="text-subrosa-red" /> : <ChevronDown className="text-subrosa-red" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
        <div className="text-gray-300">{answer}</div>
      </div>
    </div>
  )
}

// Server component
export default function FAQPage() {
  // This is a server component, so we'll use a different approach for the FAQ items
  const faqCategories = [
    {
      title: "General Questions",
      items: [
        {
          question: "What is Sub Rosa?",
          answer:
            "Sub Rosa is a privacy-first web browser with an integrated decentralized VPN. It's designed to protect your privacy online by preventing tracking, blocking ads, and masking your location and identity.",
        },
        {
          question: "Is Sub Rosa free to use?",
          answer:
            "Sub Rosa offers both free and premium tiers. The free version includes essential privacy features, while the premium version offers advanced features like multi-hop routing, priority access to nodes, and enhanced support.",
        },
        {
          question: "Which platforms does Sub Rosa support?",
          answer:
            "Sub Rosa is currently available for Windows, macOS, and Linux. Mobile applications for iOS and Android are under development and planned for future release.",
        },
        {
          question: "How is Sub Rosa different from other privacy browsers?",
          answer:
            "Unlike other privacy browsers, Sub Rosa integrates a decentralized VPN directly into the browser, providing a seamless privacy experience. It also offers advanced features like fingerprint spoofing, multi-hop routing, and a comprehensive privacy dashboard.",
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          question: "Does Sub Rosa collect any user data?",
          answer:
            "No, Sub Rosa follows a strict zero-knowledge policy. We do not collect, store, or have access to your browsing history, personal information, or any other data that could identify you or your activities.",
        },
        {
          question: "How does the decentralized VPN work?",
          answer:
            "Sub Rosa's decentralized VPN routes your traffic through a network of peer-to-peer nodes, encrypting your data and masking your IP address. Unlike traditional VPNs that use centralized servers, our decentralized approach eliminates single points of failure and prevents any one entity from accessing your data.",
        },
        {
          question: "What is fingerprint spoofing and how does it protect me?",
          answer:
            "Browser fingerprinting is a technique websites use to identify and track you based on your browser's unique characteristics. Sub Rosa's fingerprint spoofing feature randomizes these characteristics, making it impossible for websites to create a consistent profile of you across different sites.",
        },
        {
          question: "Is my data encrypted?",
          answer:
            "Yes, all your browsing data is encrypted using AES-256 encryption, the same standard used by governments and military organizations. This ensures that even if your data were somehow intercepted, it would be unreadable.",
        },
      ],
    },
    {
      title: "Features & Functionality",
      items: [
        {
          question: "What is multi-hop routing?",
          answer:
            "Multi-hop routing is a feature that routes your traffic through multiple nodes before reaching its destination. This adds additional layers of privacy and security, making it virtually impossible to trace your connection back to your device.",
        },
        {
          question: "Can I still access all websites with Sub Rosa?",
          answer:
            "Yes, Sub Rosa is designed to provide full access to the web while protecting your privacy. In some rare cases, certain websites might detect and block VPN traffic, but our advanced obfuscation techniques minimize this issue.",
        },
        {
          question: "Does using Sub Rosa slow down my internet connection?",
          answer:
            "While any VPN can potentially reduce connection speed due to the encryption and routing process, Sub Rosa is optimized for performance. Most users experience minimal speed reduction, and our node selection algorithm automatically chooses the fastest available nodes.",
        },
        {
          question: "Can I import bookmarks from another browser?",
          answer:
            "Yes, Sub Rosa supports importing bookmarks, history, and saved passwords from most major browsers including Chrome, Firefox, Safari, and Edge.",
        },
      ],
    },
    {
      title: "Account & Billing",
      items: [
        {
          question: "Do I need an account to use Sub Rosa?",
          answer:
            "You can use the basic features of Sub Rosa without an account. However, creating an account allows you to access premium features, sync your settings across devices, and participate in the community.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, PayPal, and various cryptocurrencies including Bitcoin, Ethereum, and Monero for those who prefer anonymous payment options.",
        },
        {
          question: "Can I cancel my subscription at any time?",
          answer:
            "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period.",
        },
        {
          question: "Is there a refund policy?",
          answer:
            "Yes, we offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied with Sub Rosa Premium for any reason, you can request a full refund within 30 days of purchase.",
        },
      ],
    },
    {
      title: "Troubleshooting",
      items: [
        {
          question: "What should I do if I can't connect to the VPN?",
          answer:
            "First, check your internet connection. If that's working, try selecting a different node in the VPN settings. If you're still having issues, check our status page for any known outages, or contact our support team for assistance.",
        },
        {
          question: "Why is a specific website not loading correctly?",
          answer:
            "Some websites may have compatibility issues with privacy browsers. Try disabling certain privacy features temporarily for that specific site, or check our documentation for site-specific troubleshooting guides.",
        },
        {
          question: "How do I report a bug or suggest a feature?",
          answer:
            "You can report bugs and suggest features through our community forum or by contacting our support team. We value user feedback and actively incorporate it into our development roadmap.",
        },
        {
          question: "Is there a way to reset all settings to default?",
          answer:
            "Yes, you can reset all settings to their default values by going to Settings > Advanced > Reset Settings. Note that this will not delete your bookmarks or saved passwords.",
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Find answers to common questions about Sub Rosa, its features, and how to get the most out of your private
          browsing experience.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for questions..."
            className="w-full px-4 py-3 bg-subrosa-dark border border-subrosa-gray rounded-md focus:outline-none focus:ring-2 focus:ring-subrosa-red"
          />
          <button className="absolute right-3 top-3 text-gray-400 hover:text-white">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {faqCategories.map((category, index) => (
          <Link
            key={index}
            href={`#${category.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray hover:border-subrosa-red transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">{category.title}</h2>
            <p className="text-gray-400">{category.items.length} questions</p>
          </Link>
        ))}
      </div>

      {/* FAQ Content */}
      <div className="space-y-12 mb-12">
        {faqCategories.map((category, index) => (
          <div key={index} id={category.title.toLowerCase().replace(/\s+/g, "-")}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mr-3 text-subrosa-red">
                {index + 1}
              </span>
              {category.title}
            </h2>
            <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray overflow-hidden">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="p-4 border-b border-subrosa-gray last:border-b-0">
                  <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Can't find the answer you're looking for? Our support team and community are here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Contact Support
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
