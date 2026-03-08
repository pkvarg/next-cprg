import React from 'react'
import PagesHeader from '@/components/PagesHeader'
import { getLocale } from 'next-intl/server'
import db from '@/db/db'
import Link from 'next/link'
import ServerScrollLink from '@/components/ServerScrollLink'
import Footer from '@/components/Footer'
import Image from 'next/image'

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
      <div className="blogpage h-screen">
        <PagesHeader />

        <div className="font-cormorant text-[4rem] lg:text-[4.5rem] italic text-sacred-gold text-center mt-8">
          Blog
        </div>
        <div className="mt-8 lg:mt-16 flex flex-col items-center gap-1 w-full">
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div className="cursor-pointer w-full max-w-[95%] lg:max-w-[50%]" key={blog.id}>
                <ServerScrollLink id={blog.id} title={blog.title} />
              </div>
            ))}
        </div>
      </div>

      <div>
        <div className="bg-sacred-dark text-white py-8 lg:py-16 text-[20px] lg:text-[20px]">
          <div className="flex flex-col items-center justify-evenly mx-4 lg:mx-[20%]">
            {blogs.length > 0 &&
              blogs.map((blog) => (
                <div
                  className="flex flex-col border-b border-sacred-gold/10 pb-8 mb-4"
                  id={blog.id}
                  key={blog.id}
                >
                  <div className="flex flex-col gap-2 justify-center items-center py-2 mt-8">
                    <h2 className="font-cormorant text-[1.6rem] italic text-sacred-gold text-center">
                      {blog.title}
                    </h2>
                    {blog.media && (
                      <Image
                        src={blog.media}
                        alt={blog.title}
                        className="w-[100px]"
                        height={250}
                        width={250}
                      />
                    )}
                    <p className="font-lato text-sacred-cream/80 font-light leading-relaxed text-justify my-4">
                      {blog.text}
                    </p>
                  </div>
                  <Link
                    href={blog?.link}
                    target="_blank"
                    className="text-sacred-gold/70 hover:text-sacred-gold font-lato text-[0.9rem] transition-colors ml-auto cursor-pointer"
                  >
                    {locale === 'cz'
                      ? 'Pro vice podobneho obsahu prejdete na rhemabooks.org'
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
