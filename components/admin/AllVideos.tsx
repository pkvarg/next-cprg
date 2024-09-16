import React from 'react'
import db from '@/db/db'

import RefreshButton from './RefreshButton'
import EditVideoButton from './EditVideoButton'
import DeleteVideoButton from './DeleteVideoButton'
import { getLocale } from 'next-intl/server'

export default async function AllVideos() {
  const locale = await getLocale()
  const videos = await db.video.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      english: true,
    },
    orderBy: { updatedAt: 'desc' },
  })
  if (videos.length === 0)
    return (
      <p className='text-center text-[30px] text-red-500'>
        {locale === 'en' ? 'No videos found' : 'Nebyly nalezeny žádné videa'}
      </p>
    )

  return (
    <div className='mt-8'>
      <RefreshButton />
      <h1 className='text-[30px] text-center text-white'>
        {locale === 'en' ? 'All Videos' : 'Všechna videa'}
      </h1>

      <div className='flex justify-center items-center mx-4 lg:mx-[5%]'>
        <div className='gap-4 text-white text-[25px] py-8'>
          {videos.map((video) => (
            <div className='py-4' key={video.id}>
              <div>
                <h1 className='text-green-500'>Title: {video.title}</h1>
                <h2 className='text-green-200'>Category: {video.category}</h2>
                <div className='flex flex-row items-center gap-2'>
                  <p>Url</p>

                  <p className='text-[12.5px]'>{video.url}</p>
                </div>

                <p
                  className={video.english ? 'text-green-500' : 'text-red-500'}
                >
                  English: {video.english ? 'true' : 'false'}
                </p>
              </div>
              <div className='flex flex-col gap-2 items-start mt-2'>
                <EditVideoButton
                  link={`/${locale}/admin/video/edit/${video.id}`}
                />
                <DeleteVideoButton videoId={`${video.id}`} />
              </div>

              {/* <p>Dátum: {getDate(blog.updatedAt)}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
