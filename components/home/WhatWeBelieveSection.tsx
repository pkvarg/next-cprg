'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

const WhatWeBelieve = () => {
  const [showMore, setShowMore] = useState(false)
  const t = useTranslations('Home')

  return (
    <>
      <div className='bg-sacred-dark h-8' id='faith'></div>
      <div className='bg-sacred-dark text-sacred-cream'>
        <h1 className='font-cormorant text-[2rem] lg:text-[2.5rem] text-sacred-gold italic font-semibold tracking-widest uppercase text-center pt-8 lg:pt-16'>
          {t('home02title')}
        </h1>
        <div className='font-lato text-[1rem] lg:text-[1.05rem] text-sacred-cream/80 font-light leading-relaxed text-justify mx-4 lg:mx-[20%] py-8 lg:py-16 flex flex-col gap-4'>
          <p className='text-justify'>{t('home02p1')}</p>

          <p>
            {t('home02p2')}
            <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p2ref')}</span>
          </p>

          <div className='flex justify-center'>
            <button
              className={
                !showMore
                  ? 'mt-12 mb-4 px-6 py-2 rounded border border-sacred-gold/40 text-sacred-cream/70 hover:bg-sacred-gold hover:text-sacred-dark hover:border-sacred-gold transition-all text-[0.9rem] font-lato tracking-wider'
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
                <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p4ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p5')}</p>

              <p>
                {t('home02p6')}
                <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p6ref')}</span>
              </p>

              <p className='text-center my-4'>{t('home02p7')}</p>

              <p>
                {t('home02p8')}
                <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p8ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p9')}</p>
              <p>
                {t('home02p10')}
                <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p10ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p11')}</p>
              <p>
                {t('home02p12')}
                <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p12ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p13')}</p>
              <p>
                {t('home02p14')}
                <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p14ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p15')}</p>
              <p>
                {t('home02p16')}
                <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p16ref')}</span>
              </p>
              <p className='text-center my-4'>{t('home02p17')}</p>
              <p>
                {t('home02p18')}
                <span className='text-sacred-gold/70 text-[0.85rem]'>{t('home02p18ref')}</span>
              </p>
            </>
          )}

          <div className='flex justify-center'>
            <button
              className={
                showMore
                  ? 'mt-12 mb-4 px-6 py-2 rounded border border-sacred-gold/40 text-sacred-cream/70 hover:bg-sacred-gold hover:text-sacred-dark hover:border-sacred-gold transition-all text-[0.9rem] font-lato tracking-wider'
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
