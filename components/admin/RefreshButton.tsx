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
      className='cursor-pointer text-yellow-500 ml-2 lg:ml-12'
      onClick={handleRefresh}
    >
      {' '}
      {t('refreshAdmin')}
    </button>
  )
}

export default RefreshButton
