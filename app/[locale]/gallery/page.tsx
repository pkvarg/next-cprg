import PagesHeader from '@/components/PagesHeader'
import React from 'react'
import { useTranslations } from 'next-intl'

const Gallery = () => {
  const t = useTranslations('Home')
  return (
    <div className='podcastpage min-h-screen overflow-x-hidden'>
      <PagesHeader />
      <h1 className='font-cormorant text-[2.5rem] italic text-sacred-gold text-center mt-12'>
        {t('headerGallery')}
      </h1>
    </div>
  )
}

export default Gallery
