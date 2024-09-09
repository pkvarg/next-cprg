import React from 'react'
import YouTubeEmbed from '@/components/video/YouTubeEmbed'
import PagesHeader from '@/components/PagesHeader'
import { getLocale } from 'next-intl/server'
import db from '@/db/db'

const VideoPage = async () => {
  const locale = await getLocale()

  const videos = await db.video.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      english: true,
    },
    // where: {
    //   english: locale === 'en' ? true : false,
    // },
    orderBy: { title: 'asc' },
  })

  return (
    <div className='podcastpage min-h-screen overflow-x-hidden'>
      <PagesHeader />

      <div className='text-white text-center text-[25px] mt-8'>
        <h1>{locale === 'en' ? 'Videos' : 'Video'}</h1>
      </div>

      {videos.length === 0 ? (
        <p className='text-[20px] text-red-500 text-center h-screen mt-8'>
          <span className='bg-white p-2'>
            No videos found in this language!
          </span>
        </p>
      ) : (
        <div className='container mx-auto mt-16 pb-16 px-4 text-white'>
          <section className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8'>
            {videos.length > 0 &&
              videos.map((video) => (
                <div
                  className='flex justify-center items-center'
                  key={video.id}
                >
                  <YouTubeEmbed url={video.url} />
                </div>
              ))}
          </section>
        </div>
      )}
    </div>
  )
}

export default VideoPage
