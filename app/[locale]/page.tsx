import React from 'react'
import Header from '../../components/Header'
import WeLoveSection from '@/components/home/WeLoveSection'
import WhatWeBelieve from '@/components/home/WhatWeBelieveSection'
import HomeUpcomingSection from '@/components/home/HomeUpcomingSection'
import HomeBlogSection from '@/components/home/HomeBlogSection'
import Contact from '@/components/home/Contact'

import { useTranslations } from 'next-intl'
import Footer from '@/components/Footer'

export default function Home() {
  const t = useTranslations('Home')

  return (
    <>
      <Header />
      <main className='hero h-screen flex flex-col items-center justify-center'>
        <h1 className='font-cormorant text-[3rem] lg:text-[5rem] text-sacred-cream font-semibold italic text-center leading-tight tracking-wide'>
          {t('heroTitle1')} <br className='flex lg:hidden' /> {t('heroTitle2')}
        </h1>

        <p className='font-lato text-[1.15rem] lg:text-[1.25rem] text-sacred-cream/80 text-center mt-6 max-w-xl mx-auto leading-relaxed font-light'>
          {t('heroVerse1')} {t('heroVerse2')}
          <br />
          <span className='text-sacred-gold text-[1rem]'>{t('heroRef')}</span>
        </p>
      </main>

      <WeLoveSection />
      <WhatWeBelieve />

      <HomeBlogSection />

      <HomeUpcomingSection />

      <Contact />
      <Footer />
    </>
  )
}
