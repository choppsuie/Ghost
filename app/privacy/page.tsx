import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-300">Last Updated: April 15, 2023</p>
      </div>

      <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6 mb-8">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p>
            At Sub Rosa, privacy isn't just a feature—it's our foundation. This Privacy Policy explains how we handle
            your data (spoiler alert: we collect as little as possible) and how our products and services are designed
            to protect your privacy.
          </p>
          <p>
            We've written this policy to be clear and straightforward, avoiding legal jargon wherever possible. We want
            you to understand exactly how we protect your privacy, so you can use Sub Rosa with complete confidence.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Privacy Principles</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Minimal Data Collection:</strong> We collect only what's absolutely necessary to provide our
              services.
            </li>
            <li>
              <strong>Zero Knowledge:</strong> Our systems are designed so that we cannot access your browsing data,
              even if we wanted to.
            </li>
            <li>
              <strong>No Tracking:</strong> We don't track your browsing activity, period.
            </li>
            <li>
              <strong>No Data Selling:</strong> We will never sell your data to third parties.
            </li>
            <li>
              <strong>Transparency:</strong> We're open about our practices and will notify you of any changes to this
              policy.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p>
            We've designed Sub Rosa to collect as little information as possible while still providing a functional
            service. Here's what we do and don't collect:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Information We Do Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> If you create an account, we collect your email address and a hashed
              version of your password. This is necessary to manage your account and provide access to premium features.
            </li>
            <li>
              <strong>Payment Information:</strong> If you subscribe to our premium service, payment processing is
              handled by our payment processors (Stripe and PayPal). We store only the minimum information required to
              manage your subscription.
            </li>
            <li>
              <strong>Aggregate Usage Statistics:</strong> We collect anonymous, aggregate data about how our services
              are used. This includes information like the number of active users, server load, and general performance
              metrics. This data cannot be linked to individual users.
            </li>
            <li>
              <strong>Crash Reports:</strong> If the application crashes, we collect anonymous crash reports to help us
              identify and fix bugs. These reports do not contain any personal information or browsing data.
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Information We Don't Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Browsing History:</strong> We do not collect or store your browsing history.
            </li>
            <li>
              <strong>IP Addresses:</strong> We do not log or store your IP address.
            </li>
            <li>
              <strong>DNS Requests:</strong> We do not log or store your DNS requests.
            </li>
            <li>
              <strong>Device Information:</strong> We do not collect information about your device, such as your
              operating system or hardware specifications.
            </li>
            <li>
              <strong>Location Data:</strong> We do not collect or store your location data.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p>The limited information we do collect is used only for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To process payments and manage subscriptions</li>
            <li>To improve our services through anonymous, aggregate usage statistics</li>
            <li>To identify and fix bugs through anonymous crash reports</li>
            <li>To communicate with you about your account or our services</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
          <p>
            We take the security of your data extremely seriously. We implement industry-standard security measures to
            protect the limited data we do collect:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All data is encrypted in transit using TLS 1.3</li>
            <li>Passwords are hashed using bcrypt with a strong work factor</li>
            <li>We regularly audit our systems for potential vulnerabilities</li>
            <li>We follow security best practices for all our infrastructure</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Sharing and Third Parties</h2>
          <p>
            We do not sell, rent, or trade your personal information with any third parties. We may share the limited
            data we collect in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Service Providers:</strong> We use a small number of third-party service providers to help us
              operate our business (e.g., payment processors, email delivery services). These providers only receive the
              information they need to provide their services and are bound by strict confidentiality agreements.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information if required to do so by law or if we
              believe in good faith that such action is necessary to comply with legal processes. However, due to our
              minimal data collection practices, we would have very little information to provide even if compelled.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights and Choices</h2>
          <p>You have several rights regarding your personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Access and Correction:</strong> You can access and update your account information at any time
              through your account settings.
            </li>
            <li>
              <strong>Deletion:</strong> You can delete your account at any time. When you delete your account, we
              remove all personal information associated with it.
            </li>
            <li>
              <strong>Data Portability:</strong> You can export your account data at any time.
            </li>
            <li>
              <strong>Marketing Communications:</strong> You can opt out of marketing communications at any time.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our services are not directed to children under the age of 16, and we do not knowingly collect personal
            information from children under 16. If we become aware that we have collected personal information from a
            child under 16, we will take steps to delete that information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">International Data Transfers</h2>
          <p>
            Sub Rosa is a global service, and your information may be transferred to and processed in countries other
            than your own. We ensure that such transfers comply with applicable data protection laws and that
            appropriate safeguards are in place to protect your information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other
            operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new
            Privacy Policy on our website and, if you have an account, by sending you an email notification.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us
            at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@subrosa.com
          </p>
          <p>
            <strong>Address:</strong> Sub Rosa Privacy Office, 123 Privacy Way, San Francisco, CA 94105, USA
          </p>
        </div>
      </div>

      <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray mb-8">
        <h2 className="text-xl font-bold mb-4">Privacy Policy Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-subrosa-dark p-4 rounded-lg">
            <h3 className="font-bold mb-2">We Collect Minimal Data</h3>
            <p className="text-sm text-gray-300">
              Only what's necessary to provide our services: account info, payment details, and anonymous usage
              statistics.
            </p>
          </div>
          <div className="bg-subrosa-dark p-4 rounded-lg">
            <h3 className="font-bold mb-2">We Don't Track You</h3>
            <p className="text-sm text-gray-300">
              We don't collect browsing history, IP addresses, DNS requests, device info, or location data.
            </p>
          </div>
          <div className="bg-subrosa-dark p-4 rounded-lg">
            <h3 className="font-bold mb-2">We Don't Sell Your Data</h3>
            <p className="text-sm text-gray-300">
              We will never sell your data to third parties. Your privacy is our priority.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-300 mb-4">Have questions about our privacy practices?</p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
