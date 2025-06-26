import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Tag, Clock, ChevronRight } from "lucide-react"

export default function BlogPage() {
  // Sample blog posts data
  const featuredPost = {
    id: 1,
    title: "The Future of Privacy in a Connected World",
    excerpt:
      "As our lives become increasingly digital, protecting our privacy has never been more important. Learn how Sub Rosa is leading the charge in the fight for digital privacy.",
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "April 15, 2023",
    author: "Elena Kowalski",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "8 min read",
    category: "Privacy",
    slug: "future-of-privacy",
  }

  const recentPosts = [
    {
      id: 2,
      title: "Understanding Browser Fingerprinting and How to Prevent It",
      excerpt:
        "Browser fingerprinting is a sophisticated tracking technique that can identify you even when you're browsing in private mode. Here's how it works and how Sub Rosa protects you.",
      coverImage: "/placeholder.svg?height=300&width=500",
      date: "April 10, 2023",
      author: "Michael Chen",
      readTime: "6 min read",
      category: "Security",
      slug: "understanding-browser-fingerprinting",
    },
    {
      id: 3,
      title: "The Dangers of Public Wi-Fi and How to Stay Safe",
      excerpt:
        "Public Wi-Fi networks are convenient, but they're also a playground for hackers. Learn about the risks and how to protect yourself with Sub Rosa's decentralized VPN.",
      coverImage: "/placeholder.svg?height=300&width=500",
      date: "April 5, 2023",
      author: "Sarah Johnson",
      readTime: "5 min read",
      category: "Security",
      slug: "dangers-of-public-wifi",
    },
    {
      id: 4,
      title: "How Governments Are Tracking Your Online Activities",
      excerpt:
        "Government surveillance is more widespread than ever. Discover the methods used to monitor citizens online and how privacy tools like Sub Rosa can help protect your rights.",
      coverImage: "/placeholder.svg?height=300&width=500",
      date: "March 28, 2023",
      author: "David Rodriguez",
      readTime: "7 min read",
      category: "Privacy",
      slug: "government-tracking-online",
    },
  ]

  const categories = [
    { name: "Privacy", count: 12 },
    { name: "Security", count: 8 },
    { name: "Technology", count: 6 },
    { name: "Tutorials", count: 5 },
    { name: "Company News", count: 4 },
    { name: "Industry Updates", count: 3 },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Sub Rosa Blog</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Insights, tutorials, and updates on privacy, security, and the latest features of Sub Rosa.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="bg-subrosa-dark rounded-lg overflow-hidden border border-subrosa-gray">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative">
              <Image
                src={featuredPost.coverImage || "/placeholder.svg"}
                alt={featuredPost.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-subrosa-red text-white text-sm font-medium rounded-full">
                Featured
              </div>
            </div>
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gray-400 mb-3">
                <span className="flex items-center mr-4">
                  <Calendar size={14} className="mr-1" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center mr-4">
                  <User size={14} className="mr-1" />
                  {featuredPost.author}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {featuredPost.readTime}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center justify-between">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center text-subrosa-red hover:underline"
                >
                  Read Article <ChevronRight size={16} className="ml-1" />
                </Link>
                <span className="px-3 py-1 bg-subrosa-red bg-opacity-20 text-subrosa-red text-sm rounded-full">
                  {featuredPost.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts and Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Recent Posts */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-subrosa-dark rounded-lg overflow-hidden border border-subrosa-gray">
                <div className="relative">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-400 mb-2">
                    <span className="flex items-center mr-3">
                      <Calendar size={12} className="mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <Link href={`/blog/${post.slug}`} className="text-subrosa-red hover:underline text-sm">
                      Read More
                    </Link>
                    <span className="px-2 py-0.5 bg-subrosa-red bg-opacity-20 text-subrosa-red text-xs rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog/all"
              className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors inline-block"
            >
              View All Articles
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Categories */}
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between py-2 border-b border-subrosa-gray last:border-b-0 hover:text-subrosa-red transition-colors"
                  >
                    <span className="flex items-center">
                      <Tag size={14} className="mr-2" />
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-400">{category.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
            <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Stay up to date with the latest privacy news, security tips, and Sub Rosa updates.
            </p>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-subrosa-light border border-subrosa-gray rounded-md focus:outline-none focus:ring-2 focus:ring-subrosa-red"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>

      {/* Featured Topics */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
            <h3 className="text-xl font-bold mb-3">Privacy Fundamentals</h3>
            <p className="text-gray-300 mb-4">
              Learn the basics of online privacy and how to protect yourself in the digital age.
            </p>
            <Link
              href="/blog/topic/privacy-fundamentals"
              className="inline-flex items-center text-subrosa-red hover:underline text-sm"
            >
              Explore Topic <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
            <h3 className="text-xl font-bold mb-3">Decentralized Technology</h3>
            <p className="text-gray-300 mb-4">
              Discover how decentralized networks are revolutionizing privacy and security online.
            </p>
            <Link
              href="/blog/topic/decentralized-technology"
              className="inline-flex items-center text-subrosa-red hover:underline text-sm"
            >
              Explore Topic <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="bg-subrosa-dark rounded-lg border border-subrosa-gray p-6">
            <h3 className="text-xl font-bold mb-3">Digital Rights</h3>
            <p className="text-gray-300 mb-4">
              Stay informed about the latest developments in digital rights and internet freedom.
            </p>
            <Link
              href="/blog/topic/digital-rights"
              className="inline-flex items-center text-subrosa-red hover:underline text-sm"
            >
              Explore Topic <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-subrosa-light p-8 rounded-lg border border-subrosa-gray text-center">
        <h2 className="text-2xl font-bold mb-4">Join the Privacy Revolution</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Stay informed about privacy issues and be part of the movement to reclaim digital freedom.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-subrosa-red text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Sign Up for Sub Rosa
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
