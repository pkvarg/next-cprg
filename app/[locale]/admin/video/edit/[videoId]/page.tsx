// Modern EditVideo Component
'use client'
import React, { useState, useEffect, useTransition } from 'react'
import { useParams } from 'next/navigation'
import { getSingleVideo, editSingleVideo } from '../../../_actions/videoActions'
import DeleteVideoButton from '@/components/admin/DeleteVideoButton'
import VideoBack from '@/components/admin/VideoBack'
import {
  Video as VideoIcon,
  FileText,
  Tag,
  Globe,
  Link as LinkIcon,
  Edit3,
  Youtube,
  Play,
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'

interface Video {
  id: string
  title: string
  url: string
  category: string
  english: boolean
}

const EditVideo = () => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [category, setCategory] = useState<string>('gospel')
  const [english, setEnglish] = useState<boolean>(false)
  const [id, setId] = useState('')
  const [video, setVideo] = useState<Video | null>(null)

  const { videoId } = useParams()

  useEffect(() => {
    const getVideo = async () => {
      if (videoId) {
        const singleVideo = await getSingleVideo(videoId.toString())
        if (singleVideo.success && singleVideo.video) {
          setVideo({
            ...singleVideo.video,
          } as Video)
        }
      }
    }

    getVideo()
  }, [videoId]) // Include videoId as dependency

  useEffect(() => {
    if (video) {
      setId(video.id)
      setTitle(video.title)
      setCategory(video.category)
      setUrl(video.url)
      setEnglish(video.english)
    }
  }, [video, videoId])

  // Function to detect if URL is YouTube
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  // Function to extract video ID from YouTube URL for preview
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('title', title)
      formData.append('url', url)
      formData.append('category', category)
      formData.append('english', english.toString())

      startTransition(async () => {
        const result = await editSingleVideo(formData)
        setMessage(result.message)
      })
    } catch (error) {
      console.error('Error in form submission:', error)
    }
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-sacred-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading video...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sacred-dark">
      <VideoBack />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sacred-terracotta/5 to-sacred-gold/5"></div>
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-sacred-terracotta to-sacred-gold">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-sacred-gold">
                Edit Video
              </h1>
            </div>
            <p className="text-xl text-sacred-cream/70">Update your video content</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-16">
        <div className="bg-sacred-deep/60 backdrop-blur-sm border border-sacred-gold/20 rounded-2xl border border-sacred-gold/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sacred-terracotta/15 to-sacred-gold/15 border-b border-sacred-gold/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-sacred-terracotta to-sacred-gold">
                  <VideoIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{video.title}</h2>
                  <p className="text-sacred-cream/70 text-sm">Video ID: {video.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isYouTubeUrl(video.url) && (
                  <span className="px-3 py-1 bg-sacred-terracotta text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Youtube size={12} />
                    YouTube
                  </span>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    video.category === 'gospel'
                      ? 'bg-rose-500/20 text-rose-400'
                      : video.category === 'messages'
                      ? 'bg-orange-500/20 text-sacred-terracotta'
                      : 'bg-sacred-gold/15 text-sacred-gold-light'
                  }`}
                >
                  {video.category}
                </span>
                {video.english && (
                  <span className="px-3 py-1 bg-sacred-gold text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Globe size={12} />
                    EN
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Current Video Preview */}
          {video.url && (
            <div className="p-6 border-b border-sacred-gold/20">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Play size={18} className="text-rose-400" />
                Current Video
              </h3>

              {isYouTubeUrl(video.url) && getYouTubeId(video.url) ? (
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-sacred-dark">
                    <Image
                      src={`https://img.youtube.com/vi/${getYouTubeId(
                        video.url,
                      )}/maxresdefault.jpg`}
                      alt="YouTube thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${getYouTubeId(
                          video.url,
                        )}/hqdefault.jpg`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-sacred-gold/80 backdrop-blur-sm">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg">
                  <p className="text-sacred-cream/70 text-sm break-all">{video.url}</p>
                </div>
              )}

              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-gradient-to-r from-sacred-terracotta to-sacred-gold text-white rounded-lg text-sm font-medium hover:from-sacred-terracotta hover:to-sacred-gold transition-all duration-200"
              >
                <ExternalLink size={14} />
                Watch Video
              </a>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <input type="hidden" name="id" value={video.id} />

            {/* Title Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sacred-cream/70 font-medium">
                <FileText size={18} />
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Enter video title (for admin reference only)..."
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg text-white placeholder-sacred-cream/40 focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
              />
              <p className="text-sacred-cream/60 text-sm">
                This title is for admin purposes only and will not be displayed publicly.
              </p>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sacred-cream/70 font-medium">
                <Tag size={18} />
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg text-white focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
              >
                <option value="gospel">⛪ Gospel</option>
                <option value="messages">📖 Message</option>
                <option value="other">🎬 Other</option>
              </select>
            </div>

            {/* URL Input */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sacred-cream/70 font-medium">
                <LinkIcon size={18} />
                Video URL
              </label>
              <div className="relative">
                <textarea
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg text-white placeholder-sacred-cream/40 focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200 resize-none"
                />
                {isYouTubeUrl(url) && (
                  <div className="absolute top-3 right-3">
                    <Youtube className="w-6 h-6 text-sacred-terracotta" />
                  </div>
                )}
              </div>

              {/* URL Preview */}
              {url && (
                <div className="p-4 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ExternalLink size={16} className="text-rose-400" />
                    <span className="text-white font-medium">Video Preview:</span>
                  </div>

                  {isYouTubeUrl(url) && getYouTubeId(url) ? (
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-sacred-dark">
                        <Image
                          src={`https://img.youtube.com/vi/${getYouTubeId(url)}/maxresdefault.jpg`}
                          alt="YouTube thumbnail"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://img.youtube.com/vi/${getYouTubeId(
                              url,
                            )}/hqdefault.jpg`
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="p-3 rounded-full bg-sacred-gold/80 backdrop-blur-sm">
                            <Play className="w-6 h-6 text-white fill-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Youtube className="w-4 h-4 text-sacred-terracotta" />
                        <span className="text-rose-400 text-sm font-medium">
                          YouTube Video Detected
                        </span>
                      </div>
                    </div>
                  ) : url ? (
                    <div className="p-3 bg-sacred-deep/50 border border-sacred-gold/20 rounded text-sacred-cream/70 text-sm break-all">
                      {url}
                    </div>
                  ) : null}

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-gradient-to-r from-sacred-terracotta to-sacred-gold text-white rounded-lg text-sm font-medium hover:from-sacred-terracotta hover:to-sacred-gold transition-all duration-200"
                  >
                    <ExternalLink size={14} />
                    Open Video
                  </a>
                </div>
              )}
            </div>

            {/* English Option */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 bg-sacred-deep/30 border border-sacred-gold/20 rounded-lg hover:bg-sacred-deep/50 transition-colors cursor-pointer">
                <input
                  name="english"
                  type="checkbox"
                  checked={english}
                  onChange={(e) => setEnglish(e.target.checked)}
                  className="w-5 h-5 text-sacred-terracotta bg-sacred-deep border-sacred-gold/20 rounded focus:ring-sacred-gold/20"
                />
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-sacred-gold" />
                  <span className="text-white font-medium">Display on English webpage</span>
                </div>
              </label>
            </div>

            {/* Submit Message */}
            {message && (
              <div className="p-4 bg-sacred-gold/15 border border-sacred-gold/30 rounded-lg">
                <p className="text-sacred-gold-light font-medium text-center">{message}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sacred-terracotta to-sacred-gold text-white font-bold rounded-lg hover:from-sacred-terracotta hover:to-sacred-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Video...
                  </>
                ) : (
                  <>
                    <Edit3 size={20} />
                    Update Video
                  </>
                )}
              </button>
            </div>

            {/* Delete Button */}
            <div className="pt-6 border-t border-sacred-gold/20">
              <DeleteVideoButton videoId={video.id} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditVideo
