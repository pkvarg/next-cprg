'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { RotateCw } from 'lucide-react'
import { useTranslations } from 'next-intl'

const RefreshButton = () => {
  const t = useTranslations('Home')
  const router = useRouter()

  return (
    <button
      onClick={() => router.refresh()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-sacred-gold/10 text-sacred-cream border border-sacred-gold/30 hover:bg-sacred-gold/20 hover:border-sacred-gold/60 font-cormorant italic tracking-wider text-sm transition-all"
      aria-label="Refresh"
    >
      <RotateCw size={14} />
      {t('refreshAdmin')}
    </button>
  )
}

export default RefreshButton
