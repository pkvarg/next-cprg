import React from 'react'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import db from '@/db/db'
import Link from 'next/link'

const HomeUpcomingSection = async () => {
  const t = await getTranslations('Home')

  const locale = await getLocale()

  const events = await db.blog.findMany({
    where: {
      category: 'events',
      upcoming: true,
      english: locale === 'en' ? true : false,
    },
    select: {
      id: true,
      title: true,
      category: true,
      media: true,
      text: true,
      upcoming: true,
      english: true,
      link: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  //const events = []

  return events.length > 0 ? (
    <>
      <div className="bg-sacred-cream-dark h-8 lg:scroll-mt-14" id="events"></div>
      <div className="bg-sacred-cream-dark text-sacred-terracotta pt-8 lg:pt-16 pb-12 lg:pb-20 px-4 lg:px-[20%]">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-cormorant text-[1.4rem] lg:text-[1.8rem] italic text-sacred-gold text-center mb-6">{t('home03sub')}</h2>
          {events.map(
            (event) =>
              event.upcoming === true && (
                <div key={event.id}>
                  <h3 className="font-cormorant text-[1.3rem] lg:text-[1.6rem] font-semibold text-sacred-terracotta text-center mt-4">{event.title}</h3>
                  <p className="font-lato text-[1.05rem] text-sacred-dark/70 text-center leading-relaxed mt-2 whitespace-break-spaces lg:whitespace-pre">
                    {event.text}
                  </p>
                  {event.link && (
                    <div className="flex justify-center">
                      <Link
                        className="border border-sacred-terracotta text-sacred-terracotta hover:bg-sacred-terracotta hover:text-white rounded px-5 py-1.5 text-[1.05rem] font-lato transition-all mt-8 mb-4"
                        href={event.link}
                        target="_blank"
                      >
                        {t('home02b1')}
                      </Link>
                    </div>
                  )}
                </div>
              ),
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      {' '}
      <div className="bg-sacred-cream-dark h-0 lg:scroll-mt-16" id="events"></div>
      <div className="bg-sacred-cream-dark px-4 lg:px-[20%] text-sacred-terracotta py-8">
        <h1 className="text-center font-lato">
          {locale === 'en' ? 'No upcoming events' : 'Žádné blížící se události'}
        </h1>
      </div>
    </>
  )
}

export default HomeUpcomingSection
