import React from 'react'
import PagesHeader from '@/components/PagesHeader'
import PodcastDetailPlayer from '@/components/audio/PodcastDetailPlayer'

import Image from 'next/image'
import { getLocale } from 'next-intl/server'
import db from '@/db/db'

const Podcasts = async () => {
  const locale = await getLocale()

  const podcasts = await db.podcast.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      description: true,
      audioUrl: true,
      english: true,
    },
    where: {
      audioUrl: {
        not: '',
      },
      english: locale === 'en' ? true : false,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className='podcastpage min-h-screen overflow-x-hidden'>
      <PagesHeader />

      <div className='text-white text-center text-[30px]'>
        <h1>{locale === 'en' ? 'Podcasts' : 'Podcasty'}</h1>
      </div>

      {podcasts.length === 0 ? (
        <p className='text-[35px] text-red-500 text-center h-screen '>
          <span className='bg-white p-2'>
            No podcasts found in this language!
          </span>
        </p>
      ) : (
        <section className='flex lg:w-full flex-col mt-8 pb-16 mx-4 lg:mx-[20%] text-white'>
          {podcasts.length > 0 &&
            podcasts.map((podcast) => (
              <PodcastDetailPlayer
                podcastId={podcast.id}
                {...podcast}
                key={podcast.id}
              />
            ))}
        </section>
      )}
    </div>
  )
}

export default Podcasts
