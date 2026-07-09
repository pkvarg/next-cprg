'use client'
import React from 'react'
import CookieConsent from 'react-cookie-consent'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
//import { updateVisitors } from '@/utils/visitorsCounter'

const Footer = () => {
  const t = useTranslations('Home')

  // const increaseVisitors = async () => {
  //   await updateVisitors()
  // }

  const apiUrl = 'https://hono-api.pictusweb.com/api/visitors/cprg/increase'
  //const apiUrl = 'http://localhost:3013/api/visitors/cprg/increase'

  const incrementCount = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Failed to increment count')
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  const loadUmamiScript = () => {
    // Check if script is already loaded
    if (document.querySelector('script[data-website-id="9ffb9e17-5e14-476b-af03-bbe52807b6a8"]')) {
      return
    }

    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://analytics.pictusweb.com/script.js'
    script.setAttribute('data-website-id', '9ffb9e17-5e14-476b-af03-bbe52807b6a8')
    document.head.appendChild(script)
  }

  return (
    <>
      <CookieConsent
        location="bottom"
        style={{
          background: '#1c1917',
          color: '#faf7f2',
          fontSize: '14px',
          fontFamily: "'Lato', sans-serif",
          borderTop: '1px solid rgba(201, 162, 39, 0.25)',
          padding: '16px 28px',
        }}
        buttonStyle={{
          background: '#7a3325',
          color: '#faf7f2',
          fontSize: '13px',
          fontFamily: "'Lato', sans-serif",
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          padding: '8px 20px',
          borderRadius: '4px',
          border: 'none',
        }}
        buttonText={t('cookiesButton')}
        expires={365}
        enableDeclineButton
        onAccept={() => {
          incrementCount()
          loadUmamiScript()
        }}
        declineButtonStyle={{
          background: 'transparent',
          color: 'rgba(250, 247, 242, 0.5)',
          fontSize: '13px',
          fontFamily: "'Lato', sans-serif",
          padding: '8px 16px',
          borderRadius: '4px',
          border: '1px solid rgba(250, 247, 242, 0.2)',
        }}
        declineButtonText={t('cookiesButtonNo')}
        onDecline={() => {
          incrementCount()
        }}
      >
        {t('cookiesText')}{' '}
      </CookieConsent>
      <footer className="bg-sacred-dark border-t border-sacred-gold/20 font-light">
        <section className="mx-4 text-sacred-cream/50 text-[0.85rem] font-lato font-light pt-8 lg:pt-4 pb-8">
          <div className="flex flex-row gap-2 justify-center items-center">
            <p className="text-[0.85rem] mt-[0px]">&copy;</p>
            <p> {Date().substring(11, 15)}</p>
            <p>Církev v Praze</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 items-center justify-center"></div>
          <div className="flex justify-center mt-0 lg:mt-2">
            <Link href="https://pictusweb.sk" target="_blank" className="text-sacred-muted hover:text-sacred-gold transition-colors text-[0.85rem]">
              &#60;&#47;&#62; PICTUSWEB development
            </Link>
          </div>
        </section>
      </footer>
    </>
  )
}

export default Footer
