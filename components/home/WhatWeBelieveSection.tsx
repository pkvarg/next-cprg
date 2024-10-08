'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

const WhatWeBelieve = () => {
  const [showMore, setShowMore] = useState(false)
  const t = useTranslations('Home')

  return (
    <>
      <div className='bg-[#80422C] h-8' id='faith'></div>
      <div className='bg-[#80422C] text-white'>
        <h1 className='text-center text-[20px] lg:text-[25px] font-medium pt-8 lg:pt-16 uppercase'>
          {t('home02title')}
        </h1>
        <div className='text-[20px] lg:text-[22.5px] font-light mx-4 lg:mx-[20%] text-justify py-8 lg:py-16 flex flex-col gap-4 lg:gap-2'>
          <p className='text-justify'>{t('home02p1')}</p>

          <p>
            {t('home02p2')}
            <span className='text-[15px]'>{t('home02p2ref')}</span>
          </p>

          <div className='flex justify-center text-[15px]'>
            <button
              className={
                !showMore
                  ? 'mt-12 mb-4 rounded-2xl border border-l-emerald-100 hover:bg-white hover:text-[#2e2236] hover:border-[#2e2236] hover:border-2 w-[75px]'
                  : 'hidden'
              }
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? t('home02b2') : t('home02b1')}
            </button>
          </div>

          {showMore && (
            <>
              <p className='text-center my-4'>{t('home02p3')}</p>

              <p>
                {t('home02p4')}
                <span className='text-[15px]'>{t('home02p4ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p5')}</p>

              <p>
                {t('home02p6')}
                <span className='text-[15px]'>{t('home02p6ref')}</span>
              </p>

              <p className='text-center my-4'>{t('home02p7')}</p>

              <p>
                {t('home02p8')}
                <span className='text-[15px]'>{t('home02p8ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p9')}</p>
              <p>
                {t('home02p10')}
                <span className='text-[15px]'>{t('home02p10ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p11')}</p>
              <p>
                {t('home02p12')}
                <span className='text-[15px]'>{t('home02p12ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p13')}</p>
              <p>
                {t('home02p14')}
                <span className='text-[15px]'>{t('home02p14ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p15')}</p>
              <p>
                {t('home02p16')}
                <span className='text-[15px]'>{t('home02p16ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p17')}</p>
              <p>
                {t('home02p18')}
                <span className='text-[15px]'>{t('home02p18ref')}</span>
              </p>
            </>
          )}

          <div className='flex justify-center text-[15px]'>
            <button
              className={
                showMore
                  ? 'mt-12 mb-4 rounded-2xl border border-l-emerald-100 hover:bg-white hover:text-[#2e2236] hover:border-[#2e2236] hover:border-2 w-[75px]'
                  : 'hidden'
              }
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? t('home02b2') : t('home02b1')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhatWeBelieve
