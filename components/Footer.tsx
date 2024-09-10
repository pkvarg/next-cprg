'use client'
import React from 'react'
import CookieConsent from 'react-cookie-consent'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { updateVisitors } from '@/utils/visitorsCounter'

const Footer = () => {
  const t = useTranslations('Home')

  const increaseVisitors = async () => {
    await updateVisitors()
  }

  return (
    <>
      <CookieConsent
        location='bottom'
        style={{
          background: '#9D7739',
          color: '#ffffff',
          fontSize: '15px',
          textAlign: 'justify',
        }}
        buttonStyle={{
          background: '#1d9f2f',
          color: '#fff',
          fontSize: '15px',
          borderRadius: '25px',
        }}
        buttonText={t('cookiesButton')}
        expires={365}
        enableDeclineButton
        onAccept={() => {
          increaseVisitors()
        }}
        declineButtonStyle={{
          background: 'red',
          color: '#fff',
          fontSize: '15px',
          borderRadius: '25px',
        }}
        declineButtonText={t('cookiesButtonNo')}
        onDecline={() => {
          increaseVisitors()
        }}
      >
        {t('cookiesText')}{' '}
      </CookieConsent>
      <footer className='bg-[#80422C] font-light'>
        <section className='mx-4 text-white text-[15px] lg:text-[20px] pt-0 lg:pt-4 pb-8'>
          <div className='flex flex-row gap-2 justify-center items-center'>
            <p className='text-[15px] mt-[0px]'>&copy;</p>
            <p> {Date().substring(11, 15)}</p>
            <p>Církev v Praze</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 items-center justify-center'></div>
          <div className='flex justify-center mt-0 lg:mt-2 text-[15px]'>
            <Link href='https://pictusweb.sk' target='_blank'>
              &#60;&#47;&#62; PICTUSWEB development
            </Link>
          </div>
        </section>
      </footer>
    </>
  )
}

export default Footer
