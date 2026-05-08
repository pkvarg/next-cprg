'use client'
import React, { useState, useEffect, useTransition, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getSinglePodcast, editSinglePodcast } from '../../../_actions/podcastActions'
import DeletePodcastButton from '@/components/admin/DeletePodcastButton'
import AudioBack from '@/components/admin/AudioBack'
import {
  Upload,
  Music,
  X,
  Check,
  AlertCircle,
  FileText,
  Tag,
  Globe,
  Headphones,
  Edit3,
  Trash2,
  Play,
  Volume2,
} from 'lucide-react'

interface Podcast {
  id: string
  title: string
  description: string | null // Allow null
  audioUrl: string
  category: string
  english: boolean
}

const EditPodcast = () => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [category, setCategory] = useState<string>('gospel')
  const [english, setEnglish] = useState<boolean>(false)
  const [id, setId] = useState('')
  const [podcast, setPodcast] = useState<Podcast | null>(null)

  // File upload state
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { podcastId } = useParams()

  useEffect(() => {
    const getPodcast = async () => {
      if (podcastId) {
        const singlePodcast = await getSinglePodcast(podcastId.toString())
        if (singlePodcast.success && singlePodcast.podcast) {
          setPodcast({
            ...singlePodcast.podcast,
            description: singlePodcast.podcast.description || '',
          } as Podcast)
        }
      }
    }

    getPodcast()
  }, [podcastId]) // Include podcastId as dependency

  useEffect(() => {
    if (podcast) {
      setId(podcast.id)
      setTitle(podcast.title)
      setCategory(podcast.category)
      setAudioUrl(podcast.audioUrl)
      setDescription(podcast.description || '')
      setEnglish(podcast.english)
    }
  }, [podcast, podcastId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type - accept audio files
    if (!selectedFile.type.startsWith('audio/')) {
      setError('Prosím, nahrajte audio súbor')
      return
    }

    setFile(selectedFile)
    setError(null)
    setSuccessMessage(null)
    setUploadedFileUrl(null)
  }

  const uploadFile = async (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        // If no file is selected, return the current audioUrl
        resolve(audioUrl)
        return
      }

      setLoading(true)
      setError(null)
      setSuccessMessage(null)

      const formData = new FormData()
      formData.append('file', file)

      const apiUrl = 'https://hono-api.pictusweb.com/api/upload/cprg'

      console.log('apiUrl', apiUrl)

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Nepodarilo sa nahrať súbor')
        }

        const data = await response.json()
        setSuccessMessage('Súbor bol úspešne nahraný!')
        setUploadedFileUrl(data.imageUrl)
        setAudioUrl(data.imageUrl)

        // Reset the file input but keep the success message and URL
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        resolve(data.imageUrl)
      } catch (err) {
        console.error('Chyba pri nahrávaní súboru:', err)
        const errorMessage = err instanceof Error ? err.message : 'Nastala neznáma chyba'
        setError(errorMessage)
        reject(new Error(errorMessage))
      } finally {
        setLoading(false)
      }
    })
  }

  const resetUpload = () => {
    setFile(null)
    setError(null)
    setSuccessMessage(null)
    setUploadedFileUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = () => {
    setFile(null)
    setAudioUrl('')
    setUploadedFileUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let mediaUrl = audioUrl

      // If there's a file selected but not uploaded yet, upload it first
      if (file && !uploadedFileUrl) {
        mediaUrl = await uploadFile()
      }

      const formData = new FormData()
      formData.append('id', id)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('audioUrl', mediaUrl)
      formData.append('category', category)
      formData.append('english', english.toString())

      startTransition(async () => {
        const result = await editSinglePodcast(formData)
        setMessage(result.message)
      })
    } catch (error) {
      console.error('Error in form submission:', error)
      setError('Chyba pri odosielaní formulára')
    }
  }

  if (!podcast) {
    return (
      <div className="min-h-screen bg-sacred-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sacred-terracotta/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading podcast...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sacred-dark">
      <AudioBack />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sacred-gold/5 to-sacred-terracotta/5"></div>
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-sacred-gold-light to-sacred-terracotta">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-sacred-gold">
                Edit Podcast
              </h1>
            </div>
            <p className="text-xl text-sacred-cream/70">Update your podcast content</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-16">
        <div className="bg-sacred-deep/60 backdrop-blur-sm border border-sacred-gold/20 rounded-2xl border border-sacred-gold/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sacred-terracotta/10 to-sacred-terracotta/15 border-b border-sacred-gold/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-sacred-gold-light to-sacred-terracotta">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{podcast.title}</h2>
                  <p className="text-sacred-cream/70 text-sm">Podcast ID: {podcast.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    podcast.category === 'gospel'
                      ? 'bg-purple-500/20 text-sacred-terracotta'
                      : podcast.category === 'messages'
                      ? 'bg-pink-500/20 text-sacred-terracotta'
                      : 'bg-orange-500/20 text-sacred-terracotta'
                  }`}
                >
                  {podcast.category}
                </span>
                {podcast.english && (
                  <span className="px-3 py-1 bg-sacred-gold text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Globe size={12} />
                    EN
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <input type="hidden" name="id" value={podcast.id} />

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
                placeholder="Enter podcast title..."
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg text-white placeholder-sacred-cream/40 focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
              />
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
                <option value="other">🎧 Other</option>
              </select>
            </div>

            {/* Audio Upload Section */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sacred-cream/70 font-medium">
                <Music size={18} />
                Audio File
              </label>

              {/* Current Audio Display */}
              {audioUrl && (
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-sacred-terracotta/10 to-sacred-gold-light/10 border border-sacred-terracotta/20 rounded-lg mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Play size={18} className="text-sacred-terracotta" />
                        <span className="text-white font-medium">Current Audio</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 bg-sacred-gold/80 backdrop-blur-sm text-white rounded-lg hover:bg-sacred-terracotta/80 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <audio controls className="w-full mb-2">
                      <source src={audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-sacred-cream/60 text-sm break-all">{audioUrl}</p>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  id="audio"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="audio/*"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-8 border-2 border-dashed border-sacred-gold/20 rounded-lg bg-sacred-deep/30 hover:bg-sacred-deep/50 hover:border-purple-500/50 transition-all duration-200 group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-sacred-terracotta/10 to-sacred-terracotta/15 group-hover:from-sacred-terracotta/20 group-hover:to-sacred-terracotta/25 transition-all duration-200">
                      <Volume2 className="w-8 h-8 text-sacred-terracotta" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium">
                        {audioUrl ? 'Change audio file' : 'Click to upload audio'}
                      </p>
                      <p className="text-sacred-cream/60 text-sm">MP3, WAV, M4A up to 100MB</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* File Upload Section */}
              {file && (
                <div className="p-4 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Music size={18} className="text-sacred-terracotta" />
                      <span className="text-white font-medium">Selected File:</span>
                    </div>
                    <button
                      type="button"
                      onClick={resetUpload}
                      className="p-1 hover:bg-sacred-deep/50 rounded transition-colors"
                    >
                      <X size={16} className="text-sacred-cream/60" />
                    </button>
                  </div>
                  <p className="text-sacred-cream/70 mb-3 truncate">{file.name}</p>
                  <button
                    type="button"
                    onClick={uploadFile}
                    disabled={loading || !file}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sacred-gold-light to-sacred-terracotta text-white rounded-lg font-medium hover:from-sacred-terracotta hover:to-sacred-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        Upload Audio
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="flex items-center gap-2 p-3 bg-sacred-gold/20 border border-sacred-gold/30 rounded-lg text-sacred-gold-light">
                  <Check size={18} />
                  <span>{successMessage}</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-400">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {/* Uploaded File URL */}
              {uploadedFileUrl && (
                <div className="p-3 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg">
                  <p className="text-sacred-cream/60 text-sm mb-2">Uploaded audio URL:</p>
                  <div className="p-2 bg-sacred-deep/50 border border-sacred-gold/20 rounded text-sacred-cream/70 text-sm break-all">
                    {uploadedFileUrl}
                  </div>
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
                  className="w-5 h-5 text-sacred-gold bg-sacred-deep border-sacred-gold/20 rounded focus:ring-sacred-gold/20"
                />
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-sacred-gold" />
                  <span className="text-white font-medium">Display on English webpage</span>
                </div>
              </label>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sacred-cream/70 font-medium">
                <FileText size={18} />
                Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your podcast description here..."
                rows={6}
                className="w-full px-4 py-3 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg text-white placeholder-sacred-cream/40 focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200 resize-none"
              />
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
                disabled={isPending || loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sacred-gold-light to-sacred-terracotta text-white font-bold rounded-lg hover:from-sacred-terracotta hover:to-sacred-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Podcast...
                  </>
                ) : (
                  <>
                    <Edit3 size={20} />
                    Update Podcast
                  </>
                )}
              </button>
            </div>

            {/* Delete Button */}
            <div className="pt-6 border-t border-sacred-gold/20">
              <DeletePodcastButton podcastId={podcast.id} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPodcast
