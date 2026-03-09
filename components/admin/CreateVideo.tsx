'use client'

import React, { useState } from 'react'
import { create } from '@/app/[locale]/admin/_actions/videoActions'
import { useTransition } from 'react'
import {
  Video as VideoIcon,
  FileText,
  Tag,
  Globe,
  Link as LinkIcon,
  Youtube,
  Play,
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'

const CreateVideoForm: React.FC = () => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [category, setCategory] = useState<string>('gospel')
  const [english, setEnglish] = useState<boolean>(false)

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
      formData.append('title', title)
      formData.append('url', url)
      formData.append('category', category)
      formData.append('english', english.toString())

      startTransition(async () => {
        const result = await create(formData)
        setMessage(result.message)

        // Reset form on success
        if (result.success) {
          setTitle('')
          setUrl('')
          setCategory('gospel')
          setEnglish(false)
        }
      })
    } catch (error) {
      console.error('Error in form submission:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="bg-sacred-deep rounded-2xl border border-sacred-gold/20 overflow-hidden">
        {/* Header */}
        <div className="bg-sacred-gold/10 border-b border-sacred-gold/20 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred-gold/20 border border-sacred-gold/30">
              <VideoIcon className="w-6 h-6 text-sacred-gold" />
            </div>
            <h1 className="text-3xl font-cormorant italic text-sacred-gold">
              Create New Video
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sacred-cream/80 font-medium font-lato">
              <FileText size={18} />
              Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter video title (for admin reference only)..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-sacred-dark border border-sacred-gold/20 rounded-lg text-sacred-cream placeholder-sacred-muted focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
            />
            <p className="text-sacred-muted text-sm font-lato">
              This title is for admin purposes only and will not be displayed publicly.
            </p>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sacred-cream/80 font-medium font-lato">
              <Tag size={18} />
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-sacred-dark border border-sacred-gold/20 rounded-lg text-sacred-cream focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
            >
              <option value="gospel">Gospel</option>
              <option value="messages">Message</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* URL Input */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sacred-cream/80 font-medium font-lato">
              <LinkIcon size={18} />
              Video URL
            </label>
            <div className="relative">
              <input
                name="url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full px-4 py-3 bg-sacred-dark border border-sacred-gold/20 rounded-lg text-sacred-cream placeholder-sacred-muted focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
              />
              {isYouTubeUrl(url) && (
                <div className="absolute right-3 top-3">
                  <Youtube className="w-6 h-6 text-red-500" />
                </div>
              )}
            </div>

            {/* URL Preview */}
            {url && (
              <div className="p-4 bg-sacred-dark border border-sacred-gold/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink size={16} className="text-sacred-gold" />
                  <span className="text-sacred-cream font-medium font-lato">Video Preview:</span>
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
                          <Play className="w-6 h-6 text-sacred-dark fill-sacred-dark" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-500" />
                      <span className="text-sacred-gold text-sm font-medium font-lato">
                        YouTube Video Detected
                      </span>
                    </div>
                  </div>
                ) : url ? (
                  <div className="p-3 bg-sacred-deep border border-sacred-gold/10 rounded text-sacred-cream/80 text-sm break-all font-mono">
                    {url}
                  </div>
                ) : null}

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-sacred-gold text-sacred-dark rounded-lg text-sm font-medium font-lato hover:bg-sacred-gold-light transition-all duration-200"
                >
                  <ExternalLink size={14} />
                  Open Video
                </a>
              </div>
            )}
          </div>

          {/* English Option */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 bg-sacred-dark/50 border border-sacred-gold/20 rounded-lg hover:bg-sacred-dark transition-colors cursor-pointer">
              <input
                name="english"
                type="checkbox"
                checked={english}
                onChange={(e) => setEnglish(e.target.checked)}
                className="w-5 h-5 accent-sacred-gold bg-sacred-dark border-sacred-gold/30 rounded"
              />
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-sacred-gold" />
                <span className="text-sacred-cream font-medium font-lato">Display on English webpage</span>
              </div>
            </label>
          </div>

          {/* Submit Message */}
          {message && (
            <div className="p-4 bg-sacred-gold/10 border border-sacred-gold/20 rounded-lg">
              <p className="text-sacred-gold font-medium text-center font-lato">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sacred-gold text-sacred-dark font-bold rounded-lg hover:bg-sacred-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg font-lato"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-sacred-dark/30 border-t-sacred-dark rounded-full animate-spin" />
                Creating Video...
              </>
            ) : (
              <>
                <VideoIcon size={20} />
                Create Video
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateVideoForm
