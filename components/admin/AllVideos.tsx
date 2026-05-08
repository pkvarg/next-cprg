import React from 'react'
import db from '@/db/db'
import RefreshButton from './RefreshButton'
import EditVideoButton from './EditVideoButton'
import DeleteVideoButton from './DeleteVideoButton'
import { Video as VideoIcon, Tag, Globe, ExternalLink, Play, Youtube } from 'lucide-react'
import { VideoThumbnail } from './AdminVideoThumnailClient'

export default async function AllVideos() {
  const videos = await db.video.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      english: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  if (videos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-sacred-deep border border-sacred-gold/20">
              <VideoIcon className="w-12 h-12 text-sacred-muted" />
            </div>
          </div>
          <p className="text-sacred-muted text-xl font-lato">No videos found</p>
        </div>
      </div>
    )
  }

  // Function to extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Function to get YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeId(url)
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-cormorant italic text-[0.85rem] uppercase tracking-[0.3em] text-sacred-gold mb-2">
            Library
          </p>
          <h1 className="font-cormorant text-3xl md:text-4xl font-semibold italic text-sacred-cream">
            All Videos
          </h1>
        </div>
        <RefreshButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {videos.map((video) => {
          const thumbnail = getYouTubeThumbnail(video.url)
          const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be')

          return (
            <div
              key={video.id}
              className="group relative bg-sacred-deep rounded-sm border border-sacred-gold/20 overflow-hidden hover:border-sacred-gold/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-sacred-dark">
                <VideoThumbnail
                  src={thumbnail || ''}
                  alt={video.title || 'alt'}
                  title={video.title || 'title'}
                />

                <div className="absolute top-4 left-4 flex gap-2">
                  {isYouTube && (
                    <span className="px-2 py-1 bg-sacred-gold/90 text-sacred-dark text-[0.65rem] font-cormorant italic uppercase tracking-wider rounded-sm flex items-center gap-1">
                      <Youtube size={12} />
                      YouTube
                    </span>
                  )}
                  {video.english && (
                    <span className="px-2 py-1 bg-sacred-gold/90 text-sacred-dark text-[0.65rem] font-cormorant italic uppercase tracking-wider rounded-sm flex items-center gap-1">
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
                      {video.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-sacred-cream group-hover:text-sacred-gold transition-colors duration-200 mb-3 font-cormorant">
                    {video.title}
                  </h3>
                </div>

                {/* URL Display */}
                <div className="p-3 bg-sacred-dark border border-sacred-gold/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <ExternalLink size={14} className="text-sacred-muted" />
                    <span className="text-sacred-muted text-xs font-lato">Video URL:</span>
                  </div>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sacred-gold text-sm font-mono hover:text-sacred-gold-light transition-colors break-all block"
                  >
                    {video.url}
                  </a>
                </div>

                {/* Watch Button */}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-sacred-gold text-sacred-dark rounded-sm font-cormorant font-semibold italic uppercase tracking-[0.15em] text-xs hover:bg-sacred-gold-light transition-all duration-200"
                >
                  <Play size={16} />
                  Watch Video
                </a>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-sacred-gold/10">
                  <EditVideoButton link={`/en/admin/video/edit/${video.id}`} />
                  <DeleteVideoButton videoId={video.id} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
