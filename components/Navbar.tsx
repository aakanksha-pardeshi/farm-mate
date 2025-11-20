'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🌾</span>
              <span className="text-2xl font-bold text-primary-900 tracking-tight">FarmMate</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/listings/lands"
                className={`text-sm font-medium transition-colors ${isActive('/listings/lands')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
                  }`}
              >
                Find Land
              </Link>
              <Link
                href="/listings/farmers"
                className={`text-sm font-medium transition-colors ${isActive('/listings/farmers')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
                  }`}
              >
                Find Farmers
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/profile/create"
              className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition shadow-sm hover:shadow-md"
            >
              Join Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/listings/lands"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
            >
              Find Land
            </Link>
            <Link
              href="/listings/farmers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
            >
              Find Farmers
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
