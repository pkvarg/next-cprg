import PagesHeader from '@/components/PagesHeader'
import React from 'react'
import { useTranslations } from 'next-intl'

const Download = () => {
  const t = useTranslations('Home')
  return (
    <div className='podcastpage min-h-screen overflow-x-hidden'>
      <PagesHeader />
      <h1 className='text-center text-[30px] text-white'>
        {t('headerDownload')}
      </h1>
    </div>
  )
}

export default Download
