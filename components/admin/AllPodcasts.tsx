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
            <div className="p-4 rounded-full bg-slate-800/50">
              <Headphones className="w-12 h-12 text-slate-400" />
            </div>
          </div>
          <p className="text-slate-400 text-xl">No podcasts found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          All Podcasts
        </h1>
        <RefreshButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-purple-400" />
                    <span className="text-purple-400 text-sm font-medium capitalize">
                      {podcast.category}
                    </span>
                    {podcast.english && (
                      <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <Globe size={12} />
                        EN
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-200 mb-3">
                    {podcast.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-3">
                    {podcast.description || 'No description available'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <Headphones className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Audio Player */}
            {podcast.audioUrl && (
              <div className="p-4 bg-slate-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Play size={16} className="text-purple-400" />
                  <span className="text-slate-300 text-sm font-medium">Audio Player</span>
                </div>
                <audio controls className="w-full h-10">
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* URL Display */}
            {podcast.audioUrl && (
              <div className="px-6 py-3 border-t border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <ExternalLink size={14} className="text-slate-400" />
                  <span className="text-slate-400 text-xs">Audio URL:</span>
                </div>
                <p className="text-slate-300 text-xs font-mono truncate">{podcast.audioUrl}</p>
              </div>
            )}

            {/* Actions */}
            <div className="p-6 pt-4 border-t border-slate-700/50">
              <div className="flex gap-3">
                <EditPodcastButton link={`/en/admin/podcasts/edit/${podcast.id}`} />
                <DeletePodcastButton podcastId={podcast.id} />
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
