'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { ArrowLeft, Music as AudioIcon } from 'lucide-react'

const AudioBack = () => {
  const { locale } = useParams()
  return (
    <div className="relative z-50">
      <div className="backdrop-blur-md bg-sacred-dark/90 border-b border-sacred-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href={`/admin/audio`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sacred-terracotta/15 to-sacred-gold/15 text-white hover:from-sacred-terracotta/25 hover:to-sacred-gold/25 transition-all duration-200 border border-sacred-terracotta/30 hover:border-sacred-terracotta/60"
            >
              <ArrowLeft size={18} />
              <AudioIcon size={18} />
              <span className="font-medium">Back to Audios</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioBack
