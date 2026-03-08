import React from 'react'
import { useTranslations } from 'next-intl'

const WeLoveSection = () => {
  const t = useTranslations('Home')
  return (
    <>
      <div className='bg-sacred-cream h-8 lg:scroll-mt-14' id='about'></div>
      <div className='bg-sacred-cream text-sacred-terracotta pt-8 lg:pt-16 pb-12 lg:pb-24 text-center'>
        <div className='uppercase mx-4'>
          <h1 className='font-cormorant text-[2rem] lg:text-[2.8rem] font-semibold tracking-widest'>{t('home01title1')}</h1>
          <h2 className='font-cormorant text-[1.5rem] lg:text-[2rem] font-normal italic'>{t('home01title2')}</h2>
        </div>
        <div className='flex justify-center'>
          <div className='bg-sacred-gold h-[1px] w-[200px] my-6'></div>
        </div>
        <div className='mx-4 lg:mx-[20%]'>
          <p className='font-lato text-[1.15rem] lg:text-[1.25rem] text-sacred-dark/80 leading-relaxed'>{t('home01p1')}</p>
          <p className='font-lato text-[1.15rem] lg:text-[1.25rem] text-sacred-dark/80 leading-relaxed'>{t('home01p2')}</p>
          <p className='font-lato text-[1.15rem] lg:text-[1.25rem] text-sacred-dark/80 leading-relaxed'>{t('home01p3')}</p>
          <p className='font-lato text-[1.15rem] lg:text-[1.25rem] text-sacred-dark/80 leading-relaxed'>{t('home01p4')}</p>
        </div>
      </div>
    </>
  )
}

export default WeLoveSection
