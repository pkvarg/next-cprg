import React from 'react'
import { useTranslations } from 'next-intl'

const WeLoveSection = () => {
  const t = useTranslations('Home')
  return (
    <>
      <div className='bg-[#f9f9f9] h-8 lg:scroll-mt-14' id='about'></div>
      <div className='bg-[#f9f9f9] text-[20px] lg:text-[25px] pt-8 lg:pt-16 pb-12 lg:pb-24 text-center text-[#80422C]'>
        <div className='uppercase mx-4'>
          <h1 className='font-black'>{t('home01title1')}</h1>
          <h2 className='font-bold'>{t('home01title2')}</h2>
        </div>
        <div className='flex justify-center'>
          <div className='bg-greyline h-[2px] w-[33%] my-6'></div>
        </div>
        <div className='mx-4 lg:mx-[20%]'>
          <p className='text-[22.5px] text-center'>{t('home01p1')}</p>
          <p className='text-[22.5px] text-center'>{t('home01p2')}</p>
          <p className='text-[22.5px] text-center'>{t('home01p3')}</p>
          <p className='text-[22.5px] text-center'>{t('home01p4')}</p>
        </div>
      </div>
    </>
  )
}

export default WeLoveSection
