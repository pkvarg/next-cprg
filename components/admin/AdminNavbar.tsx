'use client'
import React, { useState } from 'react'
import { Link } from '@/i18n/routing'
import { useParams, useRouter } from 'next/navigation'
import { Menu, X, Home, Music, Video, LogOut } from 'lucide-react'

const AdminNavbar = () => {
  const [navbar, setNavbar] = useState(false)
  const { locale } = useParams()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace(`/${locale}/admin/login`)
    router.refresh()
  }

  return (
    <header className="relative z-50">
      <nav className="bg-sacred-dark/95 backdrop-blur-sm border-b border-sacred-gold/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-sacred-cream hover:text-sacred-gold transition-colors duration-200"
              >
                <Home size={24} />
                <span className="font-cormorant italic text-lg">Home</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href={`/admin/audio`}
                className="flex items-center space-x-2 px-4 py-2 rounded-sm bg-sacred-gold/10 text-sacred-cream hover:bg-sacred-gold/20 transition-all duration-200 border border-sacred-gold/30 hover:border-sacred-gold/60"
              >
                <Music size={20} />
                <span className="font-cormorant italic text-sm tracking-wider">Audio</span>
              </Link>

              <Link
                href={`/admin/video`}
                className="flex items-center space-x-2 px-4 py-2 rounded-sm bg-sacred-terracotta/10 text-sacred-cream hover:bg-sacred-terracotta/20 transition-all duration-200 border border-sacred-terracotta/30 hover:border-sacred-terracotta/60"
              >
                <Video size={20} />
                <span className="font-cormorant italic text-sm tracking-wider">Video</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-sm bg-rose-500/10 text-sacred-cream hover:bg-rose-500/20 transition-all duration-200 border border-rose-500/30 hover:border-rose-500/60"
              >
                <LogOut size={20} />
                <span className="font-cormorant italic text-sm tracking-wider">Sign out</span>
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setNavbar(!navbar)}
                className="p-2 rounded-sm bg-sacred-deep text-sacred-cream hover:bg-sacred-gold/10 transition-colors duration-200 border border-sacred-gold/20"
              >
                {navbar ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {navbar && (
            <div className="md:hidden border-t border-sacred-gold/20 py-4 space-y-3">
              <Link
                href={`/admin/audio`}
                className="flex items-center space-x-3 p-3 rounded-sm bg-sacred-gold/10 text-sacred-cream hover:bg-sacred-gold/20 transition-all duration-200 border border-sacred-gold/30"
                onClick={() => setNavbar(false)}
              >
                <Music size={20} />
                <span className="font-cormorant italic">Audio</span>
              </Link>

              <Link
                href={`/admin/video`}
                className="flex items-center space-x-3 p-3 rounded-sm bg-sacred-terracotta/10 text-sacred-cream hover:bg-sacred-terracotta/20 transition-all duration-200 border border-sacred-terracotta/30"
                onClick={() => setNavbar(false)}
              >
                <Video size={20} />
                <span className="font-cormorant italic">Video</span>
              </Link>

              <button
                onClick={() => {
                  setNavbar(false)
                  handleLogout()
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-sm bg-rose-500/10 text-sacred-cream hover:bg-rose-500/20 transition-all duration-200 border border-rose-500/30"
              >
                <LogOut size={20} />
                <span className="font-cormorant italic">Sign out</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default AdminNavbar
