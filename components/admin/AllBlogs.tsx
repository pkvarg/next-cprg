// import React from 'react'
// import db from '@/db/db'
// import EditBlogButton from './EditBlogButton'
// import DeleteBlogButton from './DeleteBlogButton'
// import RefreshButton from './RefreshButton'
// import Image from 'next/image'

// export default async function AllBlogs() {
//   const blogs = await db.blog.findMany({
//     select: {
//       id: true,
//       title: true,
//       category: true,
//       media: true,
//       text: true,
//       upcoming: true,
//       english: true,
//       link: true,
//     },
//     orderBy: { updatedAt: 'desc' },
//   })
//   if (blogs.length === 0) return <p>No blogs found</p>

//   return (
//     <div className='mt-8'>
//       <RefreshButton />
//       <h1 className='text-[30px] text-center text-white'>All Blogs</h1>

//       <div className='flex justify-center items-center mx-4 lg:mx-[5%]'>
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white text-[25px] py-8'>
//           {blogs.map((blog) => (
//             <div className='py-4' key={blog.id}>
//               <div>
//                 <h1 className='text-green-500'>Title: {blog.title}</h1>
//                 <h2 className='text-green-200'>Category: {blog.category}</h2>
//                 <div className='flex flex-row gap-2'>
//                   <p>Image: </p>
//                   {blog.media !== '' ? (
//                     <Image
//                       className='w-[250px] lg:w-[100px]'
//                       src={blog.media}
//                       alt={blog.title}
//                     />
//                   ) : (
//                     <p>no image</p>
//                   )}
//                 </div>
//                 <p className='text-[17.5px]'>Text: {blog.text}</p>
//                 <p className='text-green-200'>Link: {blog.link}</p>
//                 <p className={blog.english ? 'text-green-500' : 'text-red-500'}>
//                   English: {blog.english ? 'true' : 'false'}
//                 </p>
//                 {blog.upcoming && <p>Upcoming / New: true </p>}
//               </div>
//               <div className='flex flex-col gap-2 items-start mt-2'>
//                 <EditBlogButton link={`/en/admin/blogs/edit/${blog.id}`} />
//                 <DeleteBlogButton blogId={`${blog.id}`} />
//               </div>

//               {/* <p>Dátum: {getDate(blog.updatedAt)}</p> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// Updated AllBlogs Component
import React from 'react'
import db from '@/db/db'
import EditBlogButton from './EditBlogButton'
import DeleteBlogButton from './DeleteBlogButton'
import RefreshButton from './RefreshButton'
import Image from 'next/image'
import { Calendar, Tag, Globe, ExternalLink } from 'lucide-react'

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

  if (blogs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-slate-400 text-xl">No blogs found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          All Blogs
        </h1>
        <RefreshButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              {blog.media ? (
                <Image
                  src={blog.media}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <span className="text-slate-400">No Image</span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {blog.upcoming && (
                  <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-full">
                    New
                  </span>
                )}
                {blog.english && (
                  <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Globe size={12} />
                    EN
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={16} className="text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium capitalize">
                    {blog.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                  {blog.title}
                </h3>
              </div>

              <p className="text-slate-300 text-sm line-clamp-3">{blog.text}</p>

              {blog.link && (
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <ExternalLink size={14} />
                  <span className="truncate">External Link</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                <EditBlogButton link={`/en/admin/blogs/edit/${blog.id}`} />
                <DeleteBlogButton blogId={blog.id} />
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
