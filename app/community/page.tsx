import Link from "next/link"
import { ArrowLeft, Users, MessageSquare, Github, Twitter, DiscIcon as Discord, Heart } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Connect with privacy enthusiasts, get support, and help shape the future of Sub Rosa.
        </p>
      </div>

      {/* Community Overview */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <div className="inline-block px-3 py-1 bg-subrosa-red bg-opacity-20 text-subrosa-red rounded-full text-sm font-medium mb-4">
              Our Community
            </div>
            <h2 className="text-3xl font-bold mb-4">Privacy is Better Together</h2>
            <p className="text-gray-300 mb-4">
              Sub Rosa is more than just a browser—it's a community of privacy-conscious individuals committed to
              protecting digital freedom. Our community is the heart of everything we do.
            </p>
            <p className="text-gray-300">
              Whether you're a privacy novice or a security expert, you'll find a welcoming space to learn, share, and
              collaborate with like-minded individuals from around the world.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-subrosa-dark rounded-full flex items-center justify-center">
                  <Users size={64} className="text-subrosa-red" />
                </div>
              </div>
              <div className="absolute top-0 right-0">
                <div className="w-16 h-16 bg-subrosa-dark rounded-full flex items-center justify-center border-4 border-subrosa-light">
                  <MessageSquare size={24} className="text-subrosa-red" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0">
                <div className="w-16 h-16 bg-subrosa-dark rounded-full flex items-center justify-center border-4 border-subrosa-light">
                  <Heart size={24} className="text-subrosa-red" />
                </div>
              </div>
              <div className="absolute bottom-0 right-12">
                <div className="w-16 h-16 bg-subrosa-dark rounded-full flex items-center justify-center border-4 border-subrosa-light">
                  <Github size={24} className="text-subrosa-red" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Platforms */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Discord */}
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray overflow-hidden">
            <div className="h-3 bg-[#5865F2]"></div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#5865F2] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <Discord size={32} className="text-[#5865F2]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Discord</h3>
              <p className="text-gray-300 mb-4">
                Join our Discord server to chat with other users, get real-time support, and participate in community
                events.
              </p>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Users className="mr-2" size={16} />
                <span>5,200+ members</span>
              </div>
              <a
                href="https://discord.gg/subrosa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#5865F2] text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Join Discord
              </a>
            </div>
          </div>

          {/* Forum */}
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray overflow-hidden">
            <div className="h-3 bg-subrosa-red"></div>
            <div className="p-6">
              <div className="w-16 h-16 bg-subrosa-red bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <MessageSquare size={32} className="text-subrosa-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Forum</h3>
              <p className="text-gray-300 mb-4">
                Our forum is the place for in-depth discussions, tutorials, feature requests, and sharing privacy tips.
              </p>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <MessageSquare className="mr-2" size={16} />
                <span>10,000+ posts</span>
              </div>
              <Link
                href="/forum"
                className="inline-block px-4 py-2 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Visit Forum
              </Link>
            </div>
          </div>

          {/* GitHub */}
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray overflow-hidden">
            <div className="h-3 bg-[#333]"></div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#333] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <Github size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="text-gray-300 mb-4">
                Contribute to Sub Rosa's development, report bugs, or explore our open-source components on GitHub.
              </p>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Github className="mr-2" size={16} />
                <span>1,200+ stars</span>
              </div>
              <a
                href="https://github.com/subrosa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#333] text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Twitter */}
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6 flex items-center">
            <div className="w-12 h-12 bg-[#1DA1F2] bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Twitter size={24} className="text-[#1DA1F2]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Twitter</h3>
              <p className="text-gray-300 text-sm mb-2">
                Follow us for news, tips, and updates about Sub Rosa and privacy.
              </p>
              <a
                href="https://twitter.com/subrosa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DA1F2] hover:underline text-sm"
              >
                @subrosa
              </a>
            </div>
          </div>

          {/* Mastodon */}
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6 flex items-center">
            <div className="w-12 h-12 bg-[#6364FF] bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6364FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.58 13.913c-.29 1.469-2.592 3.121-5.238 3.396-1.379.184-2.737.368-4.185.276-2.368-.092-4.237-.844-4.237-.844 0 .368.23.844.46 1.104 1.013 2.024 7.627 1.746 10.364.368 1.242-.66 1.932-1.564 1.932-1.564l.368-1.38-1.932.368s-1.242.66-3.45.844c-1.242.092-2.368-.092-2.368-.092 5.054-.736 7.443-3.488 7.627-3.58.92-.46 1.84-1.104 1.932-1.932.184-1.47-.736-2.208-.736-2.208-2.024-2.024-7.535-2.116-7.627-2.116h-.736c-1.656 0-3.174.66-4.048 1.84l.184-.184h-.184v2.024c0 1.38 1.104 2.484 2.484 2.484 1.38 0 2.484-1.104 2.484-2.484V7.97h1.932v3.672c0 1.38 1.104 2.484 2.484 2.484 1.38 0 2.484-1.104 2.484-2.484V7.97c0-1.38-1.104-2.484-2.484-2.484-1.196 0-2.208.844-2.484 1.932-1.196-1.012-2.668-1.564-4.232-1.564C5.546 5.854 3 8.4 3 11.642s2.576 5.788 5.788 5.788c1.288 0 2.484-.368 3.488-1.104 1.012.736 2.208 1.104 3.488 1.104 1.196 0 2.3-.276 3.304-.828l.46 1.012 2.024-1.38c.092-.46.184-.92.184-1.38l-.138-.941z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Mastodon</h3>
              <p className="text-gray-300 text-sm mb-2">
                Follow our Mastodon account for a privacy-friendly social experience.
              </p>
              <a
                href="https://mastodon.social/@subrosa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6364FF] hover:underline text-sm"
              >
                @subrosa@mastodon.social
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Community Highlights */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Community Highlights</h2>
        <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Highlight 1 */}
            <div className="bg-subrosa-light rounded-lg p-4">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                <div>
                  <h3 className="font-bold">Sarah K.</h3>
                  <p className="text-xs text-gray-400">Community Moderator</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                "The Sub Rosa community is one of the most welcoming and knowledgeable groups I've ever been a part of.
                Everyone is passionate about privacy and eager to help others."
              </p>
              <div className="flex items-center text-xs text-gray-400">
                <Heart size={12} className="text-subrosa-red mr-1" />
                <span>Member since 2021</span>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="bg-subrosa-light rounded-lg p-4">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                <div>
                  <h3 className="font-bold">Michael T.</h3>
                  <p className="text-xs text-gray-400">Open Source Contributor</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                "Contributing to Sub Rosa has been an incredible experience. The team is responsive, the codebase is
                well-maintained, and it feels great to help build a tool that respects user privacy."
              </p>
              <div className="flex items-center text-xs text-gray-400">
                <Github size={12} className="mr-1" />
                <span>25+ contributions</span>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="bg-subrosa-light rounded-lg p-4">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                <div>
                  <h3 className="font-bold">Elena R.</h3>
                  <p className="text-xs text-gray-400">Privacy Advocate</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                "The Sub Rosa forum has become my go-to resource for privacy news and discussions. I've learned so much
                from the community and made connections with people who share my values."
              </p>
              <div className="flex items-center text-xs text-gray-400">
                <MessageSquare size={12} className="mr-1" />
                <span>500+ forum posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ways to Contribute */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Ways to Contribute</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
            <h3 className="text-xl font-bold mb-4">For Developers</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs text-subrosa-red">1</span>
                </div>
                <div>
                  <h4 className="font-bold">Contribute Code</h4>
                  <p className="text-sm text-gray-300">
                    Help improve Sub Rosa by fixing bugs, adding features, or improving performance.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs text-subrosa-red">2</span>
                </div>
                <div>
                  <h4 className="font-bold">Report Bugs</h4>
                  <p className="text-sm text-gray-300">
                    Found a bug? Report it on GitHub to help us improve the browser's stability.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs text-subrosa-red">3</span>
                </div>
                <div>
                  <h4 className="font-bold">Review Code</h4>
                  <p className="text-sm text-gray-300">
                    Help review pull requests to ensure code quality and security.
                  </p>
                </div>
              </li>
            </ul>
            <a
              href="https://github.com/subrosa/contributing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Developer Guide
            </a>
          </div>

          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
            <h3 className="text-xl font-bold mb-4">For Everyone</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs text-subrosa-red">1</span>
                </div>
                <div>
                  <h4 className="font-bold">Spread the Word</h4>
                  <p className="text-sm text-gray-300">
                    Share Sub Rosa with friends and family to help grow our privacy-focused community.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs text-subrosa-red">2</span>
                </div>
                <div>
                  <h4 className="font-bold">Help Others</h4>
                  <p className="text-sm text-gray-300">
                    Answer questions on the forum or Discord to help new users get the most out of Sub Rosa.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-subrosa-red bg-opacity-20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs text-subrosa-red">3</span>
                </div>
                <div>
                  <h4 className="font-bold">Provide Feedback</h4>
                  <p className="text-sm text-gray-300">
                    Share your thoughts and suggestions to help us improve Sub Rosa.
                  </p>
                </div>
              </li>
            </ul>
            <Link
              href="/community/get-involved"
              className="inline-block mt-4 px-4 py-2 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Join the Privacy Movement</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Together, we can build a more private and secure internet for everyone. Join our community today and be part
          of the change.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://discord.gg/subrosa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#5865F2] text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Join Discord
          </a>
          <Link
            href="/forum"
            className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Visit Forum
          </Link>
          <a
            href="https://github.com/subrosa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
