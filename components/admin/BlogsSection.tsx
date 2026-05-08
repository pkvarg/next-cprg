'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CalendarDays, FileText, Tag, Globe, ExternalLink } from 'lucide-react'
import EditBlogButton from './EditBlogButton'
import DeleteBlogButton from './DeleteBlogButton'

export type BlogRow = {
  id: string
  title: string
  category: string
  media: string
  text: string
  upcoming: boolean
  english: boolean
  link: string
}

type Kind = 'events' | 'blogs' | 'other'

const ICONS: Record<Kind, React.ComponentType<{ size?: number; className?: string }>> = {
  events: CalendarDays,
  blogs: FileText,
  other: Tag,
}

function StatusBadge({ kind, upcoming }: { kind: Kind; upcoming: boolean }) {
  if (kind === 'events') {
    return upcoming ? (
      <span className="px-2 py-1 bg-sacred-gold/90 text-sacred-dark text-[0.65rem] font-cormorant italic uppercase tracking-wider rounded-sm">
        Upcoming
      </span>
    ) : (
      <span className="px-2 py-1 bg-white/10 text-sacred-cream/70 text-[0.65rem] font-cormorant italic uppercase tracking-wider rounded-sm border border-white/20">
        Past
      </span>
    )
  }
  if (kind === 'blogs' && upcoming) {
    return (
      <span className="px-2 py-1 bg-sacred-terracotta/90 text-white text-[0.65rem] font-cormorant italic uppercase tracking-wider rounded-sm">
        Featured
      </span>
    )
  }
  return null
}

function BlogCard({ blog, kind }: { blog: BlogRow; kind: Kind }) {
  const fade = kind === 'events' && !blog.upcoming
  return (
    <div
      className={`group relative bg-sacred-deep/60 backdrop-blur-sm rounded-sm border border-sacred-gold/20 overflow-hidden hover:border-sacred-gold/50 transition-all duration-300 flex flex-col ${
        fade ? 'opacity-70 hover:opacity-100' : ''
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        {blog.media ? (
          <Image
            src={blog.media}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-sacred-dark flex items-center justify-center">
            <span className="text-sacred-cream/40 font-cormorant italic uppercase text-xs tracking-wider">
              No Image
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <StatusBadge kind={kind} upcoming={blog.upcoming} />
          <span className="px-2 py-1 bg-sacred-gold/90 text-sacred-dark text-[0.65rem] font-cormorant italic uppercase tracking-wider rounded-sm flex items-center gap-1">
            <Globe size={10} />
            {blog.english ? 'EN' : 'CZ'}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-sacred-terracotta">
          <Tag size={12} />
          <span className="text-[0.65rem] font-cormorant italic uppercase tracking-[0.15em] capitalize">
            {blog.category}
          </span>
        </div>
        <h3 className="font-cormorant text-lg font-semibold text-sacred-cream leading-tight group-hover:text-sacred-gold transition-colors duration-200">
          {blog.title}
        </h3>
        <p className="text-sacred-cream/60 text-sm line-clamp-2 flex-1 font-lato">{blog.text}</p>
        {blog.link && (
          <div className="flex items-center gap-1 text-sacred-gold/80 text-xs">
            <ExternalLink size={12} />
            <span className="truncate">External link</span>
          </div>
        )}
        <div className="flex gap-3 pt-3 border-t border-sacred-gold/10">
          <EditBlogButton link={`/en/admin/blogs/edit/${blog.id}`} />
          <DeleteBlogButton blogId={blog.id} />
        </div>
      </div>
    </div>
  )
}

const chipBase =
  'px-2 py-1 rounded-sm font-cormorant italic uppercase tracking-[0.15em] text-[0.7rem] transition-colors cursor-pointer'

function Chip({
  pressed,
  onClick,
  children,
  tone = 'gold',
}: {
  pressed: boolean
  onClick: () => void
  children: React.ReactNode
  tone?: 'gold' | 'terracotta'
}) {
  const onClasses =
    tone === 'terracotta'
      ? 'bg-sacred-terracotta/20 border border-sacred-terracotta/60 text-sacred-terracotta'
      : 'bg-sacred-gold/20 border border-sacred-gold/60 text-sacred-gold'
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={
        pressed
          ? `${chipBase} ${onClasses}`
          : `${chipBase} bg-white/5 border border-white/10 text-sacred-cream/60 hover:text-sacred-cream hover:border-white/30`
      }
    >
      {children}
    </button>
  )
}

export default function BlogsSection({
  title,
  kind,
  blogs,
}: {
  title: string
  kind: Kind
  blogs: BlogRow[]
}) {
  const isEvents = kind === 'events'

  const [showUpcoming, setShowUpcoming] = useState(true)
  const [showPast, setShowPast] = useState(false)
  const [showEN, setShowEN] = useState(true)
  const [showCZ, setShowCZ] = useState(true)

  if (blogs.length === 0) return null

  const Icon = ICONS[kind]
  const upcomingCount = blogs.filter((b) => b.upcoming).length
  const pastCount = blogs.length - upcomingCount
  const enCount = blogs.filter((b) => b.english).length
  const czCount = blogs.length - enCount

  const visible = blogs.filter((b) => {
    if (isEvents) {
      if (b.upcoming && !showUpcoming) return false
      if (!b.upcoming && !showPast) return false
    }
    if (b.english && !showEN) return false
    if (!b.english && !showCZ) return false
    return true
  })

  return (
    <section>
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="p-2 rounded-sm bg-sacred-gold/15 border border-sacred-gold/30">
          <Icon size={18} className="text-sacred-gold" />
        </div>
        <h2 className="font-cormorant text-2xl font-semibold italic text-sacred-cream tracking-wide">
          {title}
        </h2>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {isEvents && (
            <>
              <Chip pressed={showUpcoming} onClick={() => setShowUpcoming((v) => !v)}>
                {upcomingCount} Upcoming
              </Chip>
              <Chip
                pressed={showPast}
                onClick={() => setShowPast((v) => !v)}
                tone="terracotta"
              >
                {pastCount} Past
              </Chip>
              <span className="w-px h-5 bg-white/15 mx-1" aria-hidden></span>
            </>
          )}
          <Chip pressed={showEN} onClick={() => setShowEN((v) => !v)}>
            {enCount} EN
          </Chip>
          <Chip pressed={showCZ} onClick={() => setShowCZ((v) => !v)}>
            {czCount} CZ
          </Chip>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-sacred-cream/40 text-sm font-lato italic">
          Nothing to show. Toggle a filter to view items.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visible.map((b) => (
            <BlogCard key={b.id} blog={b} kind={kind} />
          ))}
        </div>
      )}
    </section>
  )
}
