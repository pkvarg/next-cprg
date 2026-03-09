'use client'
import React, { useState } from 'react'
import { Link } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { Menu, X, Home, Music, Video } from 'lucide-react'

const AdminNavbar = () => {
  const [navbar, setNavbar] = useState(false)
  const { locale } = useParams()

  return (
    <header className="relative z-50">
      <nav className="bg-sacred-dark/95 backdrop-blur-sm border-b border-sacred-gold/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-sacred-cream hover:text-sacred-gold transition-colors duration-200"
              >
                <Home size={24} />
                <span className="font-semibold text-lg font-lato">Home</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href={`/admin/audio`}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-sacred-gold/10 text-sacred-cream hover:bg-sacred-gold/20 transition-all duration-200 border border-sacred-gold/20 hover:border-sacred-gold/40"
              >
                <Music size={20} />
                <span className="font-lato">Audio</span>
              </Link>

              <Link
                href={`/admin/video`}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-sacred-gold/10 text-sacred-cream hover:bg-sacred-gold/20 transition-all duration-200 border border-sacred-gold/20 hover:border-sacred-gold/40"
              >
                <Video size={20} />
                <span className="font-lato">Video</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setNavbar(!navbar)}
                className="p-2 rounded-lg bg-sacred-deep text-sacred-cream hover:bg-sacred-gold/10 transition-colors duration-200 border border-sacred-gold/20"
              >
                {navbar ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {navbar && (
            <div className="md:hidden border-t border-sacred-gold/20 py-4 space-y-3">
              <Link
                href={`/admin/audio`}
                className="flex items-center space-x-3 p-3 rounded-lg bg-sacred-gold/10 text-sacred-cream hover:bg-sacred-gold/20 transition-all duration-200"
                onClick={() => setNavbar(false)}
              >
                <Music size={20} />
                <span className="font-lato">Audio</span>
              </Link>

              <Link
                href={`/admin/video`}
                className="flex items-center space-x-3 p-3 rounded-lg bg-sacred-gold/10 text-sacred-cream hover:bg-sacred-gold/20 transition-all duration-200"
                onClick={() => setNavbar(false)}
              >
                <Video size={20} />
                <span className="font-lato">Video</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default AdminNavbar
