import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold mb-8">
        Welcome to the VM + dVPN Portal
      </h1>

      <p className="text-2xl mb-8">
        Access your Ubuntu VM with secure dVPN routing.
      </p>

      <div className="flex mb-8">
        <Link href="/login" className="mx-4 px-6 py-3 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors">
          Login
        </Link>
        <Link href="/signup" className="mx-4 px-6 py-3 rounded-md bg-green-500 text-white font-bold hover:bg-green-600 transition-colors">
          Sign Up
        </Link>
      </div>

      <Image
        src="http://picsum.photos/600/400"
        alt="Random image"
        width={600}
        height={400}
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}
