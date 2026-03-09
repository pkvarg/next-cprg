'use client'
import { Link } from '@/i18n/routing'

import { useParams } from 'next/navigation'
import React from 'react'
import { ArrowLeft, Home } from 'lucide-react'

const AdminBack = () => {
  const { locale } = useParams()
  return (
    <div className="relative z-50">
      <div className="bg-sacred-dark/95 backdrop-blur-sm border-b border-sacred-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href={`/admin`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sacred-gold/10 text-sacred-cream hover:bg-sacred-gold/20 transition-all duration-200 border border-sacred-gold/20 hover:border-sacred-gold/40"
            >
              <ArrowLeft size={18} />
              <Home size={18} />
              <span className="font-medium font-lato">Back to Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBack
