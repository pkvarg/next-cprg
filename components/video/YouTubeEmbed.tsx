'use client'
import React, { useState } from 'react'
import { useLocale } from 'next-intl'
import { getYouTubeId } from '@/utils/getYouTubeId'

interface YouTubeEmbedProps {
  url: string
}

// Loads YouTube only after a click, so visitors are not connected to Google
// (IP address, YouTube cookies) without their action. See /privacy#videa.
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  const [active, setActive] = useState(false)
  const isEnglish = useLocale() === 'en'
  const videoId = getYouTubeId(url)

  if (active) {
    return (
      <div className=''>
        <iframe
          className='video-mob'
          width='560'
          height='315'
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded YouTube Video'
        ></iframe>
      </div>
    )
  }

  return (
    <div className=''>
      <button
        type='button'
        onClick={() => setActive(true)}
        className='video-mob group flex w-[560px] max-w-full h-[315px] flex-col items-center justify-center gap-3 bg-sacred-deep border border-sacred-gold/20 px-6 text-center text-sacred-cream cursor-pointer'
        aria-label={isEnglish ? 'Play video' : 'Přehrát video'}
      >
        <span className='flex h-14 w-14 items-center justify-center rounded-full bg-sacred-terracotta transition-transform group-hover:scale-110'>
          <svg viewBox='0 0 24 24' className='ml-1 h-6 w-6 fill-current' aria-hidden='true'>
            <path d='M8 5v14l11-7z' />
          </svg>
        </span>
        <span className='font-lato text-[0.85rem] uppercase tracking-[0.12em]'>
          {isEnglish ? 'Play video' : 'Přehrát video'}
        </span>
        <span className='font-lato max-w-sm text-[0.8rem] text-sacred-cream/60'>
          {isEnglish
            ? 'The video plays from YouTube (Google). Clicking loads it and Google may store cookies.'
            : 'Video se přehraje z YouTube (Google). Kliknutím ho načtete a Google může uložit cookies.'}
        </span>
      </button>
    </div>
  )
}

export default YouTubeEmbed
