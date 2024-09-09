import React from 'react'
import db from '@/db/db'
import EditBlogButton from './EditBlogButton'
import DeleteBlogButton from './DeleteBlogButton'
import RefreshButton from './RefreshButton'
import Image from 'next/image'

export default async function AllBlogs() {
  const blogs = await db.blog.findMany({
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
    orderBy: { updatedAt: 'desc' },
  })
  if (blogs.length === 0) return <p>No blogs found</p>

  return (
    <div className='mt-8'>
      <RefreshButton />
      <h1 className='text-[30px] text-center text-white'>All Blogs</h1>

      <div className='flex justify-center items-center mx-4 lg:mx-[5%]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white text-[25px] py-8'>
          {blogs.map((blog) => (
            <div className='py-4' key={blog.id}>
              <div>
                <h1 className='text-green-500'>Title: {blog.title}</h1>
                <h2 className='text-green-200'>Category: {blog.category}</h2>
                {/* <div className='flex flex-row gap-2'>
                  <p>Image: </p>
                  {blog.media !== '' ? (
                    <Image
                      className='w-[250px] lg:w-[100px]'
                      src={blog.media}
                      alt={blog.title}
                    />
                  ) : (
                    <p>no image</p>
                  )}
                </div> */}
                <p className='text-[17.5px]'>Text: {blog.text}</p>
                <p className='text-green-200 text-[10px] my-4'>
                  Link: {blog.link}
                </p>
                <p className={blog.english ? 'text-green-500' : 'text-red-500'}>
                  English: {blog.english ? 'true' : 'false'}
                </p>
                {blog.upcoming && <p>Upcoming / New: true </p>}
              </div>
              <div className='flex flex-col gap-2 items-start mt-2'>
                <EditBlogButton link={`/en/admin/blogs/edit/${blog.id}`} />
                <DeleteBlogButton blogId={`${blog.id}`} />
              </div>

              {/* <p>Dátum: {getDate(blog.updatedAt)}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
