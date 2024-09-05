'use client'
import React, { useState, useEffect } from 'react'
import PagesHeader from '@/components/PagesHeader'
import { getSingleBlog } from '../../admin/_actions/blogActions'
import { useParams } from 'next/navigation'
import Link from 'next/link'

import { useTranslations } from 'next-intl'
import Footer from '@/components/Footer'

interface Blog {
  id: string
  title: string
  category: string
  media: string
  text: string
  upcoming: boolean
  english: boolean
  link: string
}

const Blog = () => {
  const [blog, setBlog] = useState<Blog | null>(null)
  const { locale, id } = useParams()
  const t = useTranslations('Home')

  const getBlog = async () => {
    if (id) {
      const singleBlog = await getSingleBlog(id.toString())

      if (singleBlog.success && singleBlog.blog) {
        setBlog(singleBlog.blog)
      } else {
        return <h1>...getting data...</h1>
      }
    }
  }

  useEffect(() => {
    getBlog()
  }, [])

  useEffect(() => {
    if (blog && id) {
      const element = document.getElementById(id.toString())
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  })

  return (
    <>
      <div className='blogpage h-screen'>
        <PagesHeader />

        <div className='text-white text-center text-[30px]'>Blog</div>
      </div>

      <div>
        <div className='bg-[#768c51] text-white py-8 lg:py-16 text-[20px] lg:text-[30px]'>
          <div className='flex flex-row items-center justify-evenly mx-4 lg:mx-[20%]'>
            {blog !== null && (
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
                  href={`/${locale}/blog`}
                  target='_blank'
                  className='text-[20px] ml-auto cursor-pointer hover:text-yellow-400'
                >
                  {t('blogsAll')}
                </Link>
                {/* <Link
                  href={blog?.link}
                  target='_blank'
                  className='text-[20px] ml-auto cursor-pointer hover:text-yellow-400'
                >
                  {t('blogMore')}
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blog
