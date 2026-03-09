import React from 'react'
import db from '@/db/db'
import RefreshButton from './RefreshButton'
import EditPodcastButton from './EditPodcastButton'
import DeletePodcastButton from './DeletePodcastButton'
import { Headphones, Tag, Globe, ExternalLink, Play } from 'lucide-react'

export default async function AllPodcasts() {
  const podcasts = await db.podcast.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      description: true,
      audioUrl: true,
      english: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  if (podcasts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-sacred-deep border border-sacred-gold/20">
              <Headphones className="w-12 h-12 text-sacred-muted" />
            </div>
          </div>
          <p className="text-sacred-muted text-xl font-lato">No podcasts found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-cormorant italic text-sacred-gold">
          All Podcasts
        </h1>
        <RefreshButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="group relative bg-sacred-deep rounded-xl border border-sacred-gold/20 overflow-hidden hover:border-sacred-gold/40 transition-all duration-300"
          >
            {/* Header */}
            <div className="p-6 border-b border-sacred-gold/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-sacred-gold" />
                    <span className="text-sacred-gold text-sm font-medium capitalize font-lato">
                      {podcast.category}
                    </span>
                    {podcast.english && (
                      <span className="px-2 py-1 bg-sacred-gold/20 text-sacred-gold text-xs font-medium rounded-full flex items-center gap-1 border border-sacred-gold/30">
                        <Globe size={12} />
                        EN
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-sacred-cream group-hover:text-sacred-gold transition-colors duration-200 mb-3 font-cormorant">
                    {podcast.title}
                  </h3>
                  <p className="text-sacred-cream/80 text-sm line-clamp-3 font-lato">
                    {podcast.description || 'No description available'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-sacred-gold/20 border border-sacred-gold/30">
                  <Headphones className="w-6 h-6 text-sacred-gold" />
                </div>
              </div>
            </div>

            {/* Audio Player */}
            {podcast.audioUrl && (
              <div className="p-4 bg-sacred-dark/50">
                <div className="flex items-center gap-2 mb-3">
                  <Play size={16} className="text-sacred-gold" />
                  <span className="text-sacred-cream/80 text-sm font-medium font-lato">Audio Player</span>
                </div>
                <audio controls className="w-full h-10">
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* URL Display */}
            {podcast.audioUrl && (
              <div className="px-6 py-3 border-t border-sacred-gold/10">
                <div className="flex items-center gap-2 mb-1">
                  <ExternalLink size={14} className="text-sacred-muted" />
                  <span className="text-sacred-muted text-xs font-lato">Audio URL:</span>
                </div>
                <p className="text-sacred-cream/80 text-xs font-mono truncate">{podcast.audioUrl}</p>
              </div>
            )}

            {/* Actions */}
            <div className="p-6 pt-4 border-t border-sacred-gold/10">
              <div className="flex gap-3">
                <EditPodcastButton link={`/en/admin/podcasts/edit/${podcast.id}`} />
                <DeletePodcastButton podcastId={podcast.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
