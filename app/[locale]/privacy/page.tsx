'use client'
import Footer from '@/components/Footer'
import PagesHeader from '@/components/PagesHeader'
import React from 'react'
import { useTranslations } from 'next-intl'

// Section ids double as anchors, e.g. /privacy#cookies from the cookie banner.
const sections = [
  { id: 'spravce', key: 'controller' },
  { id: 'navsteva', key: 'visit' },
  { id: 'kontaktni-formular', key: 'contactForm' },
  { id: 'cookies', key: 'cookies' },
  { id: 'videa', key: 'videos' },
  { id: 'prijemci', key: 'recipients' },
  { id: 'predavani', key: 'transfers' },
  { id: 'prava', key: 'rights' },
  { id: 'zmeny', key: 'changes' },
]

const Privacy = () => {
  const t = useTranslations('Privacy')

  return (
    <>
      <PagesHeader />
      <div className="bg-sacred-dark min-h-screen">
        <div className="text-sacred-cream px-4 lg:px-[10%] flex flex-col gap-4 pb-12 max-w-3xl mx-auto">
          <h1 className="font-cormorant text-[2.5rem] italic text-sacred-gold text-center my-10">
            {t('title')}
          </h1>
          <p className="font-lato text-sacred-muted text-[0.9rem] text-center -mt-6 mb-4">
            {t('lastUpdated')}
          </p>
          <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem]">
            {t('intro')}
          </p>

          {sections.map(({ id, key }) => (
            <section key={id} id={id} className="scroll-mt-28">
              <h2 className="font-cormorant text-[1.6rem] text-sacred-cream font-semibold mt-6 mb-2">
                {t(`${key}Title`)}
              </h2>
              <p className="font-lato text-sacred-cream/80 leading-relaxed text-[1.15rem] whitespace-pre-line">
                {t(`${key}Text`)}
              </p>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Privacy
