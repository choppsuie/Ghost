import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-300">Last Updated: April 15, 2023</p>
      </div>

      <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6 mb-8">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p>
            Welcome to Sub Rosa. These Terms of Service ("Terms") govern your use of the Sub Rosa browser and related
            services (collectively, the "Services") provided by Sub Rosa, Inc. ("Sub Rosa," "we," "us," or "our").
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms,
            please do not use our Services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Using Our Services</h2>
          <h3 className="text-xl font-bold mt-6 mb-3">Account Registration</h3>
          <p>
            While you can use many aspects of our Services without creating an account, certain features require
            registration. When you register, you agree to provide accurate and complete information and to keep this
            information up to date.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Acceptable Use</h3>
          <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use our Services in any way that violates any applicable law or regulation
            </li>
            <li>
              Use our Services to engage in any activity that interferes with or disrupts the Services (or the servers
              and networks connected to the Services)
            </li>
            <li>
              Attempt to gain unauthorized access to any part of the Services, other accounts, or other computer systems
              or networks connected to the Services
            </li>
            <li>
              Use our Services to transmit any malware, spyware, or other malicious code
            </li>
            <li>
              Use our Services to harass, abuse, or harm another person or entity
            </li>
            <li>
              Use automated means, including spiders, robots, crawlers, or data mining tools, to download data from the
              Services
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Subscription and Payment</h2>
          <h3 className="text-xl font-bold mt-6 mb-3">Subscription Plans</h3>
          <p>
            Sub Rosa offers both free and premium subscription plans. The features included in each plan are described on
            our website. We reserve the right to modify, terminate, or otherwise amend our offered subscription plans.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Payment</h3>
          <p>
            If you choose a premium subscription plan, you agree to pay the subscription fees as described on our
            website. All payments are processed through our third-party payment processors. By providing payment
            information, you represent and warrant that you are authorized to use the payment method provided.
          </p>
          <p>
            Subscription fees are billed in advance on a recurring basis, depending on the billing cycle you select
            (monthly or annually). You authorize us to charge your payment method for the subscription fees for each
            billing cycle.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Cancellation and Refunds</h3>
          <p>
            You can cancel your subscription at any time through your account settings. Upon cancellation, your
            subscription will remain active until the end of the current billing period, after which it will not renew.
          </p>
          <p>
            We offer a 30-day money-back guarantee for new subscriptions. If you are not satisfied with our Services, you
            can request a full refund within 30 days of your initial purchase by contacting our support team.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
          <h3 className="text-xl font-bold mt-6 mb-3">Our Intellectual Property</h3>
          <p>
            The Services, including all content, features, and functionality, are owned by Sub Rosa, its licensors, or
            other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual
            property or proprietary rights laws.
          </p>
          <p>
            These Terms do not grant you any right, title, or interest in the Services, or any content, features, or
            functionality of the Services.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Open Source</h3>
          <p>
            Certain components of our Services are licensed under open source licenses. Nothing in these Terms prevents
            you from using, modifying, or distributing those components in accordance with the applicable open source
            licenses.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Privacy</h2>
          <p>
            Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference,
            explains how we collect, use, and protect your information. By using our Services, you agree to the
            collection and use of information in accordance with our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Disclaimers</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR
            THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
          <p>
            WHILE WE STRIVE TO PROVIDE A SECURE AND PRIVATE BROWSING EXPERIENCE, WE CANNOT GUARANTEE ABSOLUTE SECURITY
            OR PRIVACY. NO SECURITY MEASURES ARE PERFECT OR IMPENETRABLE, AND WE CANNOT GUARANTEE THAT UNAUTHORIZED
            THIRD PARTIES WILL NEVER BE ABLE TO DEFEAT OUR SECURITY MEASURES OR USE YOUR PERSONAL INFORMATION FOR
            IMPROPER PURPOSES.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL SUB ROSA, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY DIRECT,
            INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING FROM ANY (I) ERRORS,
            MISTAKES, OR INACCURACIES OF CONTENT, (II) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
            RESULTING FROM YOUR ACCESS TO AND USE OF OUR SERVICES, (III) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE
            SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (IV) ANY
            INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR SERVICES, (V) ANY BUGS, VIRUSES, TROJAN HORSES, OR
            THE LIKE, WHICH MAY BE TRANSMITTED TO OR THROUGH OUR SERVICES BY ANY THIRD PARTY, AND/OR (VI) ANY ERRORS OR
            OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES, EVEN IF ADVISED OF THEIR POSSIBILITY.
          </p>\
