'use client'
import Footer from '@/components/Footer'
import PagesHeader from '@/components/PagesHeader'
import React from 'react'
import { useTranslations } from 'next-intl'

const Privacy = () => {
  const t = useTranslations('Privacy')

  return (
    <>
      <PagesHeader />
      <div className="bg-sacred-dark min-h-screen">
        <div className="text-sacred-cream px-4 lg:px-[10%] flex flex-col gap-4 pb-12 max-w-3xl mx-auto">
          <h1 className="font-cormorant text-[2.5rem] italic text-sacred-gold text-center my-10">
            {t('title')}
          </h1>
          <p className="font-lato text-sacred-muted text-[0.9rem] text-center -mt-6 mb-4">
            {t('lastUpdated')}
          </p>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('intro')}
          </p>

          <h2 className="font-cormorant text-[1.6rem] text-sacred-cream font-semibold mt-6">
            {t('dataTitle')}
          </h2>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('dataText')}
          </p>

          <h2 className="font-cormorant text-[1.6rem] text-sacred-cream font-semibold mt-6">
            {t('cookiesTitle')}
          </h2>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('cookiesIntro')}
          </p>
          <h3 className="font-cormorant text-[1.3rem] italic text-sacred-gold mt-2">
            {t('necessaryTitle')}
          </h3>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('necessaryText')}
          </p>
          <h3 className="font-cormorant text-[1.3rem] italic text-sacred-gold mt-2">
            {t('analyticsTitle')}
          </h3>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('analyticsText')}
          </p>

          <h2 className="font-cormorant text-[1.6rem] text-sacred-cream font-semibold mt-6">
            {t('notUsedTitle')}
          </h2>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('notUsedText')}
          </p>

          <h2 className="font-cormorant text-[1.6rem] text-sacred-cream font-semibold mt-6">
            {t('consentTitle')}
          </h2>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('consentText')}
          </p>

          <h2 className="font-cormorant text-[1.6rem] text-sacred-cream font-semibold mt-6">
            {t('rightsTitle')}
          </h2>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('rightsText')}
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Privacy
