import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BrandPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">Sub Rosa Brand Guidelines</h1>

      <div className="mb-12">
        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray mb-6">
          <h2 className="text-xl font-bold mb-4">Brand Story</h2>
          <p className="mb-4">
            "Sub Rosa" is Latin for "under the rose," a phrase that historically symbolizes secrecy and confidentiality.
            In ancient Rome, a rose hanging from the ceiling of a meeting room indicated that everything discussed under
            it was to remain confidential.
          </p>
          <p>
            Our brand embodies this concept for the digital age, providing a secure and private browsing experience that
            keeps your online activities confidential and protected from surveillance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <h2 className="text-xl font-bold mb-4">Primary Logo</h2>
          <div className="bg-black p-8 rounded-lg flex justify-center mb-4">
            <Image src="/images/subrosa-logo.png" alt="Sub Rosa Logo" width={200} height={200} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg flex justify-center">
              <Image src="/images/subrosa-logo.png" alt="Sub Rosa Logo on Light" width={100} height={100} />
            </div>
            <div className="bg-subrosa-red p-4 rounded-lg flex justify-center">
              <Image src="/images/subrosa-logo.png" alt="Sub Rosa Logo on Brand Color" width={100} height={100} />
            </div>
          </div>
        </div>

        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <h2 className="text-xl font-bold mb-4">Icon & Favicon</h2>
          <div className="flex justify-around mb-6">
            <div className="text-center">
              <div className="bg-black p-4 rounded-lg mb-2">
                <Image src="/images/subrosa-icon.png" alt="Sub Rosa Icon" width={64} height={64} />
              </div>
              <span className="text-sm">App Icon</span>
            </div>
            <div className="text-center">
              <div className="bg-black p-4 rounded-lg mb-2">
                <Image src="/images/subrosa-icon.png" alt="Sub Rosa Favicon" width={32} height={32} />
              </div>
              <span className="text-sm">Favicon</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <h2 className="text-xl font-bold mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="h-24 bg-subrosa-red rounded-lg mb-2"></div>
              <p className="font-medium">Sub Rosa Red</p>
              <p className="text-sm text-gray-400">#ED1C24</p>
            </div>
            <div>
              <div className="h-24 bg-subrosa-dark rounded-lg mb-2"></div>
              <p className="font-medium">Dark</p>
              <p className="text-sm text-gray-400">#0A0A0F</p>
            </div>
            <div>
              <div className="h-24 bg-subrosa-darker rounded-lg mb-2"></div>
              <p className="font-medium">Darker</p>
              <p className="text-sm text-gray-400">#000000</p>
            </div>
            <div>
              <div className="h-24 bg-subrosa-light rounded-lg mb-2"></div>
              <p className="font-medium">Light</p>
              <p className="text-sm text-gray-400">#28282D</p>
            </div>
            <div>
              <div className="h-24 bg-subrosa-gray rounded-lg mb-2"></div>
              <p className="font-medium">Gray</p>
              <p className="text-sm text-gray-400">#3A3A3F</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <h2 className="text-xl font-bold mb-4">Typography</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Primary Font: Inter</h3>
              <div className="space-y-2">
                <p className="text-4xl">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj</p>
                <p className="text-xl">The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-gray-400">Used for all UI elements, body text, and headings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="bg-subrosa-light p-6 rounded-lg border border-subrosa-gray">
          <h2 className="text-xl font-bold mb-4">Brand Voice</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Mission Statement</h3>
              <p className="italic">"Under the rose (in secrecy, privately)"</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Value Proposition</h3>
              <p className="italic">
                "Unlike traditional browsers, Sub Rosa doesn't just make you invisible—it makes you invincible."
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Tone</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Confident but not arrogant</li>
                <li>Technical but accessible</li>
                <li>Privacy-focused without paranoia</li>
                <li>Empowering and educational</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
