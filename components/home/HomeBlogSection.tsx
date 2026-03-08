import React from 'react'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import GoToBlogButton from '../admin/GoToBlogButton'

import db from '@/db/db'
import Image from 'next/image'

const HomeBlogSection = async () => {
  const t = await getTranslations('Home')

  const locale = await getLocale()

  const blog = await db.blog.findFirst({
    where: {
      category: 'blogs',
      english: locale === 'en' ? true : false,
      upcoming: true,
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
  })

  return (
    <div>
      <div className="bg-sacred-terracotta text-sacred-cream py-12 lg:py-20">
        <div className="flex flex-col items-center justify-evenly mx-4 lg:mx-[20%]">
          {blog !== null ? (
            <div
              key={blog?.id}
              className="flex flex-col gap-2 justify-center items-center py-2 mt-8"
            >
              <h2 className="font-cormorant text-[1.8rem] lg:text-[2.2rem] italic text-sacred-gold font-semibold text-center mb-6">{blog?.title}</h2>
              {blog?.media && <Image src={blog?.media} alt={blog?.title} className="w-[100px]" />}
              <p className="font-lato text-[0.95rem] lg:text-[1rem] text-sacred-cream/85 font-light leading-relaxed text-justify my-4">{blog?.text}</p>

              <GoToBlogButton link={`${locale}/blog`} title={t('blogsAll')} />
            </div>
          ) : (
            <h1 className="text-sacred-cream bg-sacred-terracotta h-8">No blogs</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeBlogSection
