import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, Globe, Users, Code, Heart, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About Sub Rosa</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Learn about our mission, our team, and our commitment to privacy and digital freedom.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <div className="inline-block px-3 py-1 bg-subrosa-red bg-opacity-20 text-subrosa-red rounded-full text-sm font-medium mb-4">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold mb-4">Privacy as a Fundamental Right</h2>
            <p className="text-gray-300 mb-4">
              At Sub Rosa, we believe that privacy is a fundamental human right. Our mission is to empower individuals
              to take control of their digital lives and protect their privacy online.
            </p>
            <p className="text-gray-300">
              We're building tools that make privacy accessible to everyone, regardless of technical expertise. By
              combining cutting-edge technology with user-friendly design, we're making it easier than ever to browse
              the web securely and privately.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64">
              <Image
                src="/images/subrosa-icon.png"
                alt="Sub Rosa Logo"
                width={256}
                height={256}
                className="rounded-full border-4 border-subrosa-red"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Story</h2>
        <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">The Beginning</h3>
              <p className="text-gray-300">
                Sub Rosa was founded in 2020 by a group of privacy advocates and security researchers who were
                increasingly concerned about the erosion of privacy in the digital age. They saw how big tech companies
                were collecting vast amounts of user data, often without meaningful consent, and how this data was being
                used to track, profile, and manipulate users.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">The Challenge</h3>
              <p className="text-gray-300">
                The team recognized that while there were existing privacy tools available, they were often difficult to
                use, required technical knowledge, or provided incomplete protection. They set out to create a
                comprehensive privacy solution that would be accessible to everyone, combining the best privacy
                technologies into a seamless, user-friendly package.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">The Solution</h3>
              <p className="text-gray-300">
                After two years of development, the first version of Sub Rosa was released. It combined a
                privacy-focused browser with an integrated decentralized VPN, offering protection against tracking,
                fingerprinting, and surveillance. The name "Sub Rosa" was chosen for its historical meaning of
                confidentiality and secrecy, reflecting the team's commitment to protecting user privacy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Today</h3>
              <p className="text-gray-300">
                Today, Sub Rosa has grown into a thriving privacy platform with users around the world. We continue to
                innovate and improve our technology, guided by our core values of privacy, security, and user
                empowerment. Our team has expanded, but our mission remains the same: to protect privacy as a
                fundamental right and give people the tools they need to take control of their digital lives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Value 1 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Shield size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="text-gray-300">
              We believe that privacy is a fundamental right, not a privilege. Every decision we make is guided by our
              commitment to protecting user privacy.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Users size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">User Empowerment</h3>
            <p className="text-gray-300">
              We empower users with the knowledge and tools they need to take control of their digital lives and make
              informed choices about their privacy.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Code size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Transparency</h3>
            <p className="text-gray-300">
              We believe in being open about how our technology works. Our code is open-source, and we're transparent
              about our business practices.
            </p>
          </div>

          {/* Value 4 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Globe size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Accessibility</h3>
            <p className="text-gray-300">
              We're committed to making privacy accessible to everyone, regardless of technical expertise, location, or
              financial resources.
            </p>
          </div>

          {/* Value 5 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Heart size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-300">
              We believe in the power of community. We work closely with our users and the broader privacy community to
              build better tools and advocate for privacy.
            </p>
          </div>

          {/* Value 6 */}
          <div className="bg-subrosa-dark p-6 rounded-lg border border-subrosa-gray">
            <div className="w-12 h-12 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Target size={24} className="text-subrosa-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-300">
              We're constantly innovating and improving our technology to stay ahead of new threats to privacy and
              provide the best possible protection for our users.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
          <p className="text-gray-300 mb-6">
            Sub Rosa is built by a diverse team of privacy advocates, security researchers, and software engineers who
            are passionate about protecting digital rights and building a more private internet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4"></div>
              <h3 className="font-bold">Alex Chen</h3>
              <p className="text-sm text-gray-400">Co-Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4"></div>
              <h3 className="font-bold">Maria Rodriguez</h3>
              <p className="text-sm text-gray-400">Co-Founder & CTO</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4"></div>
              <h3 className="font-bold">David Kim</h3>
              <p className="text-sm text-gray-400">Head of Security</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4"></div>
              <h3 className="font-bold">Sarah Johnson</h3>
              <p className="text-sm text-gray-400">Head of Product</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/about/team"
              className="inline-block px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Meet the Full Team
            </Link>
          </div>
        </div>
      </div>

      {/* Press & Recognition */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Press & Recognition</h2>
        <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Press 1 */}
            <div className="bg-subrosa-light p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-700 rounded mr-3"></div>
                <div>
                  <h3 className="font-bold">TechCrunch</h3>
                  <p className="text-xs text-gray-400">June 2023</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 italic">
                "Sub Rosa is setting a new standard for privacy-focused browsers with its innovative approach to
                decentralized VPN technology."
              </p>
            </div>

            {/* Press 2 */}
            <div className="bg-subrosa-light p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-700 rounded mr-3"></div>
                <div>
                  <h3 className="font-bold">Wired</h3>
                  <p className="text-xs text-gray-400">May 2023</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 italic">
                "In an era of increasing surveillance, Sub Rosa offers a compelling solution for those who value their
                privacy online."
              </p>
            </div>

            {/* Press 3 */}
            <div className="bg-subrosa-light p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-700 rounded mr-3"></div>
                <div>
                  <h3 className="font-bold">Privacy Tech Awards</h3>
                  <p className="text-xs text-gray-400">2023</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 italic">
                "Winner of the 'Most Innovative Privacy Tool' award for its groundbreaking approach to browser privacy."
              </p>
            </div>

            {/* Press 4 */}
            <div className="bg-subrosa-light p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-700 rounded mr-3"></div>
                <div>
                  <h3 className="font-bold">Digital Freedom Foundation</h3>
                  <p className="text-xs text-gray-400">2022</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 italic">
                "Sub Rosa exemplifies the kind of privacy-first technology we need to protect digital rights in the 21st
                century."
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/about/press"
              className="inline-block px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              View Press Kit
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Join Us in Our Mission</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          We're building a future where privacy is the default, not the exception. Join us in our mission to protect
          digital rights and create a more private internet for everyone.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Get Sub Rosa
          </Link>
          <Link
            href="/careers"
            className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Join Our Team
          </Link>
        </div>
      </div>
    </div>
  )
}
