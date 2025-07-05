'use client'
import { Link } from '@/i18n/routing'

import { useParams } from 'next/navigation'
import React from 'react'
import { ArrowLeft, Home } from 'lucide-react'

const AdminBack = () => {
  const { locale } = useParams()
  return (
    <div className="relative z-50">
      <div className="backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href={`/admin`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
            >
              <ArrowLeft size={18} />
              <Home size={18} />
              <span className="font-medium">Back to Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBack
