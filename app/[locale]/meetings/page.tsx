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
      <div className='text-white px-4 lg:px-[10%] text-[20px] flex flex-col gap-2 pb-8'>
        <h1 className='text-center text-[25px] my-8'>{t('meetingsTitle')}</h1>
        <p className='leading-[25px]'>{t('meetingsP1')}</p>
        <p className='italic text-[18.5px]'>
          {t('meetingsP1ver1')}

          <span className='text-[15px]'> {t('meetingsP1ver1Ref')}</span>
        </p>
        <p className='italic text-[18.5px]'>
          {t('meetingsP1ver2')}
          <span className='text-[15px]'> {t('meetingsP1ver2Ref')}</span>
        </p>

        <h2> {t('meetingsP2')}</h2>
        <p className='text-[18.5px]'>{t('meetingsP3')}</p>
        <p className='italic text-[18.5px]'>
          {t('meetingsP3ver')}

          <span className='text-[15px]'> {t('meetingsP3verRef')}</span>
        </p>
        <p> {t('meetingsP4')}</p>
        <p className='text-[18.5px]'>{t('meetingsP5')}</p>
        <p className='italic text-[18.5px]'>
          {t('meetingsP5ver')}

          <span className='text-[15px]'> {t('meetingsP5verRef')}</span>
        </p>
      </div>
      <Footer />
    </>
  )
}

export default Meetings
