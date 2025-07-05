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
      <nav className="backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-200"
              >
                <Home size={24} />
                <span className="font-semibold text-lg">Home</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href={`/admin/audio`}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
              >
                <Music size={20} />
                <span>Audio</span>
              </Link>

              <Link
                href={`/admin/video`}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200 border border-purple-500/20 hover:border-purple-500/40"
              >
                <Video size={20} />
                <span>Video</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setNavbar(!navbar)}
                className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 transition-colors duration-200"
              >
                {navbar ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {navbar && (
            <div className="md:hidden border-t border-slate-700/50 py-4 space-y-3">
              <Link
                href={`/admin/audio`}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200"
                onClick={() => setNavbar(false)}
              >
                <Music size={20} />
                <span>Audio</span>
              </Link>

              <Link
                href={`/admin/video`}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200"
                onClick={() => setNavbar(false)}
              >
                <Video size={20} />
                <span>Video</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default AdminNavbar
