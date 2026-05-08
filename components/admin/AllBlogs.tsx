import React from 'react'
import db from '@/db/db'
import RefreshButton from './RefreshButton'
import BlogsSection, { type BlogRow } from './BlogsSection'

export default async function AllBlogs() {
  const blogs = (await db.blog.findMany({
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
  })) as BlogRow[]

  if (blogs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-sacred-muted text-xl font-lato">No blogs found</p>
        </div>
      </div>
    )
  }

  const sortByActive = (a: BlogRow, b: BlogRow) =>
    Number(b.upcoming) - Number(a.upcoming) ||
    Number(b.english) - Number(a.english) ||
    a.title.localeCompare(b.title)
  const events = blogs.filter((b) => b.category === 'events').sort(sortByActive)
  const articles = blogs.filter((b) => b.category === 'blogs').sort(sortByActive)
  const other = blogs
    .filter((b) => b.category !== 'events' && b.category !== 'blogs')
    .sort(sortByActive)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-cormorant italic text-[0.85rem] uppercase tracking-[0.3em] text-sacred-gold mb-2">
            Content
          </p>
          <h1 className="font-cormorant text-3xl md:text-4xl font-semibold italic text-sacred-cream tracking-wide">
            Blogs &amp; Events
          </h1>
        </div>
        <RefreshButton />
      </div>

      <BlogsSection title="Events" kind="events" blogs={events} />
      <BlogsSection title="Blogs" kind="blogs" blogs={articles} />
      {other.length > 0 && <BlogsSection title="Other" kind="other" blogs={other} />}
    </div>
  )
}
