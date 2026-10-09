'use client'
import React, { useEffect, useState } from 'react'
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent'
import Link from 'next/link'
import { Link as LocaleLink } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
//import { updateVisitors } from '@/utils/visitorsCounter'

const Footer = () => {
  const t = useTranslations('Home')
  const [bannerVisible, setBannerVisible] = useState<'byCookieValue' | 'show' | 'hidden'>('byCookieValue')

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

  // Consent given on an earlier visit: load analytics on every page load.
  useEffect(() => {
    if (getCookieConsentValue() === 'true') {
      loadUmamiScript()
    }
  }, [])

  // Umami honours `umami.disabled`, so withdrawing consent stops tracking at once.
  const decide = (granted: boolean) => {
    try {
      if (granted) {
        localStorage.removeItem('umami.disabled')
      } else {
        localStorage.setItem('umami.disabled', '1')
      }
    } catch {
      // storage unavailable — the banner simply shows again next visit
    }
    if (granted) {
      loadUmamiScript()
    }
    if (bannerVisible === 'byCookieValue') {
      incrementCount()
    }
    setBannerVisible('hidden')
  }

  return (
    <>
      <CookieConsent
        visible={bannerVisible}
        location="bottom"
        style={{
          background: '#1c1917',
          color: '#faf7f2',
          fontSize: '14px',
          fontFamily: 'var(--font-lato), sans-serif',
          borderTop: '1px solid rgba(201, 162, 39, 0.25)',
          padding: '16px 28px',
        }}
        buttonStyle={{
          background: '#7a3325',
          color: '#faf7f2',
          fontSize: '13px',
          fontFamily: 'var(--font-lato), sans-serif',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          padding: '8px 20px',
          borderRadius: '4px',
          border: '1px solid #7a3325',
        }}
        buttonText={t('cookiesButton')}
        expires={365}
        enableDeclineButton
        onAccept={() => decide(true)}
        declineButtonStyle={{
          background: 'transparent',
          color: '#faf7f2',
          fontSize: '13px',
          fontFamily: 'var(--font-lato), sans-serif',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          padding: '8px 20px',
          borderRadius: '4px',
          border: '1px solid rgba(201, 162, 39, 0.5)',
        }}
        declineButtonText={t('cookiesButtonNo')}
        onDecline={() => decide(false)}
      >
        {t('cookiesText')}{' '}
        <LocaleLink href="/privacy#cookies" style={{ color: '#e8c460', textDecoration: 'underline' }}>
          {t('cookiesLink')}
        </LocaleLink>
      </CookieConsent>
      <footer className="bg-sacred-dark border-t border-sacred-gold/20 font-light">
        <section className="mx-4 text-sacred-cream/50 text-[0.85rem] font-lato font-light pt-8 lg:pt-4 pb-8">
          <div className="flex flex-row gap-2 justify-center items-center">
            <p className="text-[0.85rem] mt-[0px]">&copy;</p>
            <p> {Date().substring(11, 15)}</p>
            <p>Církev v Praze</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 items-center justify-center">
            <LocaleLink
              href="/privacy"
              className="text-sacred-muted hover:text-sacred-gold transition-colors text-[0.85rem]"
            >
              {t('cookiesLink')}
            </LocaleLink>
            <button
              type="button"
              onClick={() => setBannerVisible('show')}
              className="text-sacred-muted hover:text-sacred-gold transition-colors text-[0.85rem]"
            >
              {t('footerCookieSettings')}
            </button>
          </div>
          <div className="flex justify-center mt-0 lg:mt-2">
            <Link
              href="https://pictusweb.sk"
              target="_blank"
              className="text-sacred-muted hover:text-sacred-gold transition-colors text-[0.85rem]"
            >
              &#60;&#47;&#62; PICTUSWEB development
            </Link>
          </div>
        </section>
      </footer>
    </>
  )
}

export default Footer
