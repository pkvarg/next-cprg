import React from 'react'
import PagesHeader from '@/components/PagesHeader'
import { getLocale } from 'next-intl/server'
import db from '@/db/db'
import Link from 'next/link'
import ServerScrollLink from '@/components/ServerScrollLink'
import Footer from '@/components/Footer'

const Blog = async () => {
  const locale = await getLocale()

  const blogs = await db.blog.findMany({
    where: {
      category: 'blogs',
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
    },
    orderBy: { title: 'asc' },
  })
  if (blogs.length === 0) return <p>No blogs found</p>

  return (
    <>
      <div className='blogpage h-screen'>
        <PagesHeader />

        <div className='text-white text-center text-[30px]'>Blog</div>
        <div className='mt-8 flex flex-col items-center gap-1 w-full'>
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div
                className='text-white text-[25px] cursor-pointer w-full max-w-[95%] lg:max-w-[50%] hover:text-yellow-400'
                key={blog.id}
              >
                <ServerScrollLink id={blog.id} title={blog.title} />
              </div>
            ))}
        </div>
      </div>

      <div>
        <div className='bg-[#768c51] text-white py-8 lg:py-16 text-[20px] lg:text-[30px]'>
          <div className='flex flex-col items-center justify-evenly mx-4 lg:mx-[20%]'>
            {blogs.length > 0 &&
              blogs.map((blog) => (
                <div className='flex flex-col' id={blog.id} key={blog.id}>
                  <div className='flex flex-col gap-2 justify-center items-center py-2 mt-8'>
                    <h2 className='text-[30px]'>{blog.title}</h2>
                    {blog.media && (
                      <img
                        src={blog.media}
                        alt={blog.title}
                        className='w-[100px]'
                      />
                    )}
                    <p className='font-[300] text-[20px] lg:text-[30px] text-justify'>
                      {blog.text}
                    </p>
                  </div>
                  <Link
                    href={blog?.link}
                    target='_blank'
                    className='text-[20px] ml-auto cursor-pointer hover:text-yellow-400'
                  >
                    {locale === 'cz'
                      ? 'Pre viac podobného obsahu prejdite na rhemabooks.org'
                      : 'For more of similar content go to rhemabooks.org'}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blog
