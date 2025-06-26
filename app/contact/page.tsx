import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare, Globe, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Have questions or need assistance? We're here to help. Reach out to our team through any of the channels
          below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Methods */}
        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <Mail className="text-subrosa-red mr-3" size={24} />
            <h2 className="text-xl font-bold">Email Us</h2>
          </div>
          <p className="text-gray-300 mb-4">
            For general inquiries, support requests, or any questions you might have.
          </p>
          <a href="mailto:support@subrosa.com" className="text-subrosa-red hover:underline text-lg font-medium">
            support@subrosa.com
          </a>
        </div>

        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <Phone className="text-subrosa-red mr-3" size={24} />
            <h2 className="text-xl font-bold">Call Us</h2>
          </div>
          <p className="text-gray-300 mb-4">Speak directly with our customer support team during business hours.</p>
          <a href="tel:+18005551234" className="text-subrosa-red hover:underline text-lg font-medium">
            +1 (800) 555-1234
          </a>
          <div className="mt-4 flex items-center text-sm text-gray-400">
            <Clock size={14} className="mr-1" />
            <span>Mon-Fri: 9AM-6PM EST</span>
          </div>
        </div>

        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <div className="flex items-center mb-4">
            <MessageSquare className="text-subrosa-red mr-3" size={24} />
            <h2 className="text-xl font-bold">Live Chat</h2>
          </div>
          <p className="text-gray-300 mb-4">Get immediate assistance through our live chat support system.</p>
          <button className="px-4 py-2 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors">
            Start Chat
          </button>
          <div className="mt-4 flex items-center text-sm text-gray-400">
            <Clock size={14} className="mr-1" />
            <span>Available 24/7</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 bg-subrosa-dark border border-subrosa-gray rounded-md focus:outline-none focus:ring-2 focus:ring-subrosa-red"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 bg-subrosa-dark border border-subrosa-gray rounded-md focus:outline-none focus:ring-2 focus:ring-subrosa-red"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 bg-subrosa-dark border border-subrosa-gray rounded-md focus:outline-none focus:ring-2 focus:ring-subrosa-red"
                placeholder="How can we help you?"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 bg-subrosa-dark border border-subrosa-gray rounded-md focus:outline-none focus:ring-2 focus:ring-subrosa-red"
                placeholder="Please describe your question or issue in detail..."
                required
              ></textarea>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                className="h-4 w-4 text-subrosa-red focus:ring-subrosa-red border-gray-600 rounded"
                required
              />
              <label htmlFor="privacy" className="ml-2 block text-sm text-gray-300">
                I agree to the{" "}
                <Link href="/privacy" className="text-subrosa-red hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
            <div className="flex items-center mb-4">
              <MapPin className="text-subrosa-red mr-3" size={24} />
              <h2 className="text-xl font-bold">Our Location</h2>
            </div>
            <p className="text-gray-300 mb-2">Sub Rosa Headquarters</p>
            <p className="text-gray-300 mb-4">
              123 Privacy Way, Suite 456
              <br />
              San Francisco, CA 94105
              <br />
              United States
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-subrosa-red hover:underline"
            >
              View on Map
              <ArrowLeft size={14} className="ml-1 rotate-180" />
            </a>
          </div>

          <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
            <div className="flex items-center mb-4">
              <Globe className="text-subrosa-red mr-3" size={24} />
              <h2 className="text-xl font-bold">Connect With Us</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Follow us on social media for the latest updates, privacy tips, and announcements.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/subrosa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-subrosa-dark rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/subrosa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-subrosa-dark rounded-full hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/subrosa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-subrosa-dark rounded-full hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://reddit.com/r/subrosa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-subrosa-dark rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Reddit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path>
                  <path d="M15.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path>
                  <path d="M9 16c.5-1 2-2 3-2s2.5 1 3 2"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/faq#billing" className="text-gray-300 hover:text-white transition-colors">
                  Billing and Subscription Questions
                </Link>
              </li>
              <li>
                <Link href="/faq#technical" className="text-gray-300 hover:text-white transition-colors">
                  Technical Support Issues
                </Link>
              </li>
              <li>
                <Link href="/faq#privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy and Security Concerns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-subrosa-red hover:underline">
                  View All FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-subrosa-dark p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Connect with other privacy-conscious users, share tips, and stay updated on the latest privacy trends in our
          community forums.
        </p>
        <Link
          href="/community"
          className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Join the Discussion
        </Link>
      </div>
    </div>
  )
}
