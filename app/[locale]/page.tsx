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
      <main className='hero h-[90vh] lg:h-[110vh] text-[35px] lg:text-[45px] text-white -mt-[25%] lg:-mt-[8%] font-extralight'>
        <h1 className='text-center pt-[50%] lg:pt-[20%] leading-[50px] lg:leading-[75px]'>
          {t('heroTitle1')} <br className='flex lg:hidden' /> {t('heroTitle2')}
        </h1>

        <p className='text-center text-[15px] lg:text-[20px] mx-2 mt-4 lg:-mt-8'>
          <br /> {t('heroVerse1')} <br /> {t('heroVerse2')} <br />
          <span className='text-[18px] text-center'> {t('heroRef')}</span>
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
