'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const RefreshButton = () => {
  const t = useTranslations('Home')
  const router = useRouter()

  const handleRefresh = () => {
    router.refresh()
  }

  return (
    <button
      className='cursor-pointer px-4 py-2 text-sacred-gold hover:text-sacred-gold-light border border-sacred-gold/20 hover:border-sacred-gold/40 rounded-lg transition-all duration-200 font-lato text-sm'
      onClick={handleRefresh}
    >
      {t('refreshAdmin')}
    </button>
  )
}

export default RefreshButton
