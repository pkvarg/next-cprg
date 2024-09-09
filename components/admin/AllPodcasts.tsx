import React from 'react'
import db from '@/db/db'
import EditBlogButton from './EditBlogButton'
import DeleteBlogButton from './DeleteBlogButton'
import RefreshButton from './RefreshButton'
import EditPodcastButton from './EditPodcastButton'
import DeletePodcastButton from './DeletePodcastButton'
import { getLocale } from 'next-intl/server'

export default async function AllPodcasts() {
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
    orderBy: { updatedAt: 'desc' },
  })
  if (podcasts.length === 0)
    return (
      <p className='ml-[10%] text-white'>
        {locale === 'en'
          ? 'No podcasts found'
          : 'Nebyly nalezeny žádné podcasty'}
      </p>
    )

  return (
    <div className='mt-8'>
      <RefreshButton />
      <h1 className='text-[30px] text-center text-white'>
        {locale === 'en' ? 'All Podcasts' : 'Všechny podcasty'}
      </h1>

      <div className='flex justify-center items-center mx-4 lg:mx-[5%]'>
        <div className='gap-4 text-white text-[25px] py-8'>
          {podcasts.map((podcast) => (
            <div className='py-4' key={podcast.id}>
              <div>
                <h1 className='text-green-500'>Title: {podcast.title}</h1>
                <h2 className='text-green-200'>Category: {podcast.category}</h2>
                <div className='flex flex-row items-center gap-2'>
                  <p>Url</p>
                  {podcast.audioUrl !== '' ? (
                    <p className='text-[12.5px]'>{podcast.audioUrl}</p>
                  ) : (
                    <p className='text-red-500'>no url</p>
                  )}
                </div>
                <p className='text-[20px]'>
                  Description: {podcast.description}
                </p>

                <p
                  className={
                    podcast.english ? 'text-green-500' : 'text-red-500'
                  }
                >
                  English: {podcast.english ? 'true' : 'false'}
                </p>
              </div>
              <div className='flex flex-col gap-2 items-start mt-2'>
                <EditPodcastButton
                  link={`/${locale}/admin/podcasts/edit/${podcast.id}`}
                />
                <DeletePodcastButton podcastId={`${podcast.id}`} />
              </div>

              {/* <p>Dátum: {getDate(blog.updatedAt)}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
