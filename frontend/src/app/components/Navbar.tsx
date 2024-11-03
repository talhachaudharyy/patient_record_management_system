"use client"
import Link from 'next/link'


export default function Navbar() {
  return (
    <nav className="bg-maincolor bg-opacity-80 p-4 flex justify-between items-center">
      <div className="flex items-center">
      <svg className='h-10 w-10 text-white opacity-80 mr-2 ml-5' viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      <span className="font-bold text-white">PURITY.</span>
      </div>
      <div className="flex items-center space-x-10 text-sm mr-10">
        <Link href="/" className="text-white hover:text-gray-200">Home</Link>
        <Link href="/pages/user_sign-up" className="text-white hover:text-gray-200">Sign Up</Link>
        <Link href="/pages/user_sign-in" className="text-white hover:text-gray-200">Sign In</Link>
        <button className="bg-white text-maincolor px-4 py-2 rounded-md hover:bg-gray-100">
          Free Download
        </button>
      </div>
    </nav>
  )
}