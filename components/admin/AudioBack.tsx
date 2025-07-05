'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { ArrowLeft, Music as AudioIcon } from 'lucide-react'

const AudioBack = () => {
  const { locale } = useParams()
  return (
    <div className="relative z-50">
      <div className="backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href={`/admin/audio`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white hover:from-red-500/30 hover:to-orange-500/30 transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
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
