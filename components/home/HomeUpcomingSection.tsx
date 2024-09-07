import React from 'react'
import { useTranslations } from 'next-intl'
import { getLocale } from 'next-intl/server'
import db from '@/db/db'
import Link from 'next/link'

const HomeUpcomingSection = async () => {
  const t = useTranslations('Home')

  const locale = await getLocale()

  // const events = await db.blog.findMany({
  //   where: {
  //     category: 'events',
  //     upcoming: true,
  //     english: locale === 'en' ? true : false,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     category: true,
  //     media: true,
  //     text: true,
  //     upcoming: true,
  //     english: true,
  //     link: true,
  //   },
  //   orderBy: {
  //     title: 'asc',
  //   },
  // })

  const events = []

  return (
    events.length > 0 && (
      <>
        <div className='bg-white h-8 lg:scroll-mt-14' id='events'></div>
        <div className='bg-white pt-4 lg:pt-8 pb-6 lg:pb-16 px-4 lg:px-[20%]'>
          {/* <h1 className='text-center text-[35px] lg:text-[45px] uppercase mt-8'>
            {t('home03title')}
          </h1> */}
          <div className='flex flex-col items-center justify-center text-[27.5px]'>
            <h2 className='text-[35px]'>{t('home03sub')}</h2>
            {events.map(
              (event) =>
                event.upcoming === true && (
                  <div key={event.id}>
                    <h3 className='text-[30px] text-center mt-2 mx-4 lg:mx-0'>
                      {event.title}
                    </h3>
                    <p className='mt-2 whitespace-break-spaces lg:whitespace-pre text-center'>
                      {event.text}
                    </p>
                    {event.link && (
                      <div className='flex justify-center'>
                        <Link
                          className='mt-8 mb-4 border border-[#2e2236] rounded-2xl px-4 pt-1 hover:bg-[#2e2236] hover:text-white'
                          href={event.link}
                          target='_blank'
                        >
                          {t('home02b1')}
                        </Link>
                      </div>
                    )}
                  </div>
                )
            )}

            {/* {language === 'slovak' &&
            blogs &&
            blogs.map(
              (blog) =>
                blog.upcoming === true && (
                  <div key={blog._id}>
                    <h3 className='text-[30px] text-center mt-2 mx-4 lg:mx-0'>
                      {blog.title}
                    </h3>
                    <p className='mt-2 whitespace-break-spaces lg:whitespace-pre text-center'>
                      {blog.text}
                    </p>
                    {blog.link && (
                      <div className='flex justify-center'>
                        <Link
                          className='mt-8 mb-4 border border-[#2e2236] rounded-2xl px-4 pt-1 hover:bg-[#2e2236] hover:text-white'
                          href={blog.link}
                          target='_blank'
                        >
                          {content.home02b1}
                        </Link>
                      </div>
                    )}
                  </div>
                )
            )}
          {language === 'english' &&
            englishBlogs.map((blog) => (
              <div key={blog._id}>
                <h3 className='text-[30px] text-center mt-2 mx-4 lg:mx-0'>
                  {blog.title}
                </h3>
                <p className='mt-2 whitespace-break-spaces lg:whitespace-pre text-center'>
                  {blog.text}
                </p>
                {blog.link && (
                  <div className='flex justify-center'>
                    <Link
                      className='mt-8 mb-4 border border-[#2e2236] rounded-2xl px-4 pt-1 hover:bg-[#2e2236] hover:text-white'
                      href={blog.link}
                      target='_blank'
                    >
                      {content.home02b1}
                    </Link>
                  </div>
                )}
              </div>
            ))} */}
          </div>
        </div>
      </>
    )
  )
}

export default HomeUpcomingSection
