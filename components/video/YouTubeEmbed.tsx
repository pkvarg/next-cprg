import React from 'react'
import { getYouTubeId } from '@/utils/getYouTubeId'

interface YouTubeEmbedProps {
  url: string
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  const videoId = getYouTubeId(url)
  const embedUrl = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className=''>
      <iframe
        className='video-mob'
        width='560'
        height='315'
        src={embedUrl}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded YouTube Video'
      ></iframe>
    </div>
  )
}

export default YouTubeEmbed
