'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

const WhatWeBelieve = () => {
  const [showMore, setShowMore] = useState(false)
  const t = useTranslations('Home')

  return (
    <>
      <div className='bg-[#2e2236] h-8' id='faith'></div>
      <div className='bg-[#2e2236] text-white'>
        <h1 className='text-center text-[30px] lg:text-[40px] font-medium pt-8 lg:pt-16 uppercase'>
          {t('home02title')}
        </h1>
        <div className='text-[20px] lg:text-[30px] font-light mx-4 lg:mx-[20%] text-justify py-8 lg:py-16 flex flex-col gap-4 lg:gap-2'>
          <p>{t('home02p1')}</p>

          <p>{t('home02p2')}</p>

          <p>{t('home02p3')}</p>

          <div className='flex justify-center'>
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
              <p>
                <p>{t('home02p4')}</p>
              </p>
              <p>
                <p>{t('home02p5')}</p>
              </p>
              <p>
                <p>{t('home02p6')}</p>
              </p>
              <p>
                <p>{t('home02p7')}</p>
              </p>
            </>
          )}

          <div className='flex justify-center'>
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
