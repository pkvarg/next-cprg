'use client'
import Footer from '@/components/Footer'
import PagesHeader from '@/components/PagesHeader'
import React from 'react'
import { useTranslations } from 'next-intl'

const Meetings = () => {
  const t = useTranslations('Home')

  return (
    <>
      <PagesHeader />
      <div className='bg-sacred-dark min-h-screen'>
        <div className='text-sacred-cream px-4 lg:px-[10%] flex flex-col gap-4 pb-12 max-w-3xl mx-auto'>
          <h1 className='font-cormorant text-[2rem] italic text-sacred-gold text-center my-10'>{t('meetingsTitle')}</h1>
          <p className='font-lato text-sacred-cream/80 leading-relaxed text-[1.25rem]'>{t('meetingsP1')}</p>
          <p className='font-lato italic text-sacred-cream/70 text-[1.25rem] leading-relaxed'>
            {t('meetingsP1ver1')}
            <span className='text-sacred-gold/60 text-[1.1rem]'> {t('meetingsP1ver1Ref')}</span>
          </p>
          <p className='font-lato italic text-sacred-cream/70 text-[1.25rem] leading-relaxed'>
            {t('meetingsP1ver2')}
            <span className='text-sacred-gold/60 text-[1.1rem]'> {t('meetingsP1ver2Ref')}</span>
          </p>

          <h2 className='font-cormorant text-[1.4rem] text-sacred-cream font-semibold mt-4'> {t('meetingsP2')}</h2>
          <p className='font-lato text-sacred-cream/80 leading-relaxed text-[1.25rem]'>{t('meetingsP3')}</p>
          <p className='font-lato italic text-sacred-cream/70 text-[1.25rem] leading-relaxed'>
            {t('meetingsP3ver')}
            <span className='text-sacred-gold/60 text-[1.1rem]'> {t('meetingsP3verRef')}</span>
          </p>
          <p className='font-lato text-sacred-cream/80 leading-relaxed text-[1.25rem]'>{t('meetingsP4')}</p>
          <p className='font-lato text-sacred-cream/80 leading-relaxed text-[1.25rem]'>{t('meetingsP5')}</p>
          <p className='font-lato italic text-sacred-cream/70 text-[1.25rem] leading-relaxed'>
            {t('meetingsP5ver')}
            <span className='text-sacred-gold/60 text-[1.1rem]'> {t('meetingsP5verRef')}</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Meetings
