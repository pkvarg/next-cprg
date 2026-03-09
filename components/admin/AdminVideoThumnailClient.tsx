// Video Thumbnail Client Component
'use client'
import React, { useState } from 'react'
import { Video as VideoIcon, Play } from 'lucide-react'
import Image from 'next/image'

interface VideoThumbnailProps {
  src: string
  alt: string
  title: string
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ src, alt, title }) => {
  const [imageError, setImageError] = useState(false)

  if (imageError || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <VideoIcon className="w-16 h-16 text-slate-500 mx-auto mb-2" />
          <span className="text-slate-400 text-sm">Video Preview</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="p-4 rounded-full bg-red-500/80 backdrop-blur-sm">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div>
    </div>
  )
}
