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
          <p className="text-sacred-muted text-xl font-lato">No blogs found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-cormorant italic text-sacred-gold">
          All Blogs
        </h1>
        <RefreshButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="group relative bg-sacred-deep rounded-xl border border-sacred-gold/20 overflow-hidden hover:border-sacred-gold/40 transition-all duration-300"
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
                <div className="w-full h-full bg-sacred-dark flex items-center justify-center">
                  <span className="text-sacred-muted font-lato">No Image</span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {blog.upcoming && (
                  <span className="px-2 py-1 bg-sacred-gold/20 text-sacred-gold text-xs font-medium rounded-full border border-sacred-gold/30">
                    New
                  </span>
                )}
                {blog.english && (
                  <span className="px-2 py-1 bg-sacred-gold/20 text-sacred-gold text-xs font-medium rounded-full flex items-center gap-1 border border-sacred-gold/30">
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
                  <Tag size={16} className="text-sacred-gold" />
                  <span className="text-sacred-gold text-sm font-medium capitalize font-lato">
                    {blog.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-sacred-cream group-hover:text-sacred-gold transition-colors duration-200 font-cormorant">
                  {blog.title}
                </h3>
              </div>

              <p className="text-sacred-cream/80 text-sm line-clamp-3 font-lato">{blog.text}</p>

              {blog.link && (
                <div className="flex items-center gap-2 text-sacred-gold text-sm">
                  <ExternalLink size={14} />
                  <span className="truncate font-lato">External Link</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-sacred-gold/10">
                <EditBlogButton link={`/en/admin/blogs/edit/${blog.id}`} />
                <DeleteBlogButton blogId={blog.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
