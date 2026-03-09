'use client'

import React, { useState, useRef } from 'react'
import { create } from '@/app/[locale]/admin/_actions/blogActions'
import { useTransition } from 'react'
import Image from 'next/image'
import {
  Upload,
  Image as ImageIcon,
  X,
  Check,
  AlertCircle,
  FileText,
  Tag,
  Globe,
  Link as LinkIcon,
  Sparkles,
  Calendar,
} from 'lucide-react'

const CreateBlogForm: React.FC = () => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState<string>('blogs')
  const [open, setOpen] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [upcoming, setUpcoming] = useState<boolean>(false)
  const [english, setEnglish] = useState<boolean>(false)
  const [link, setLink] = useState<string>('')
  const [media, setMedia] = useState<string>('')

  // File upload state
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type - accept image files
    if (!selectedFile.type.startsWith('image/')) {
      setError('Prosim, nahrajte obrazok')
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
        setError('Ziadny subor na nahratie')
        reject(new Error('No file selected'))
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
          throw new Error('Nepodarilo sa nahrat subor')
        }

        const data = await response.json()
        setSuccessMessage('Subor bol uspesne nahrany!')
        setUploadedFileUrl(data.imageUrl)
        setMedia(data.imageUrl)

        // Reset the file input but keep the success message and URL
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        resolve(data.imageUrl)
      } catch (err) {
        console.error('Chyba pri nahravani suboru:', err)
        const errorMessage = err instanceof Error ? err.message : 'Nastala neznama chyba'
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
    setMedia('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let mediaUrl = media

      // If there's a file selected but not uploaded yet, upload it first
      if (file && !uploadedFileUrl) {
        mediaUrl = await uploadFile()
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('category', category)
      formData.append('text', text)
      formData.append('upcoming', upcoming.toString())
      formData.append('english', english.toString())
      formData.append('link', link)
      formData.append('media', mediaUrl)

      startTransition(async () => {
        const result = await create(formData)
        setMessage(result.message)

        // Reset form on success
        if (result.success) {
          setTitle('')
          setText('')
          setCategory('blogs')
          setUpcoming(false)
          setEnglish(false)
          setLink('')
          setMedia('')
          resetUpload()
        }
      })
    } catch (error) {
      console.error('Error in form submission:', error)
      setError('Chyba pri odosielani formulara')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="bg-sacred-deep rounded-2xl border border-sacred-gold/20 overflow-hidden">
        {/* Header */}
        <div className="bg-sacred-gold/10 border-b border-sacred-gold/20 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred-gold/20 border border-sacred-gold/30">
              <FileText className="w-6 h-6 text-sacred-gold" />
            </div>
            <h1 className="text-3xl font-cormorant italic text-sacred-gold">
              Create New Blog
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
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-sacred-dark border border-sacred-gold/20 rounded-lg text-sacred-cream placeholder-sacred-muted focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
            />
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
              <option value="announcements">Announcement</option>
              <option value="events">Event</option>
              <option value="blogs">Blog</option>
            </select>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sacred-cream/80 font-medium font-lato">
              <ImageIcon size={18} />
              Featured Image
            </label>

            {/* Upload Area */}
            <div className="relative">
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-8 border-2 border-dashed border-sacred-gold/20 rounded-lg bg-sacred-dark/50 hover:bg-sacred-dark hover:border-sacred-gold/40 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-lg bg-sacred-gold/10 group-hover:bg-sacred-gold/20 transition-all duration-200 border border-sacred-gold/20">
                    <Upload className="w-8 h-8 text-sacred-gold" />
                  </div>
                  <div className="text-center">
                    <p className="text-sacred-cream font-medium font-lato">Click to upload image</p>
                    <p className="text-sacred-muted text-sm font-lato">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </div>
              </button>
            </div>

            {/* File Upload Section */}
            {file && (
              <div className="p-4 bg-sacred-dark border border-sacred-gold/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={18} className="text-sacred-gold" />
                    <span className="text-sacred-cream font-medium font-lato">Selected File:</span>
                  </div>
                  <button
                    type="button"
                    onClick={resetUpload}
                    className="p-1 hover:bg-sacred-gold/10 rounded transition-colors"
                  >
                    <X size={16} className="text-sacred-muted" />
                  </button>
                </div>
                <p className="text-sacred-cream/80 mb-3 truncate font-lato">{file.name}</p>
                <button
                  type="button"
                  onClick={uploadFile}
                  disabled={loading || !file}
                  className="flex items-center gap-2 px-4 py-2 bg-sacred-gold text-sacred-dark rounded-lg font-medium font-lato hover:bg-sacred-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-sacred-dark/30 border-t-sacred-dark rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Upload File
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Success/Error Messages */}
            {successMessage && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                <Check size={18} />
                <span className="font-lato">{successMessage}</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                <AlertCircle size={18} />
                <span className="font-lato">{error}</span>
              </div>
            )}

            {/* Uploaded File URL */}
            {uploadedFileUrl && (
              <div className="p-3 bg-sacred-dark border border-sacred-gold/20 rounded-lg">
                <p className="text-sacred-muted text-sm mb-2 font-lato">Uploaded file URL:</p>
                <div className="p-2 bg-sacred-dark border border-sacred-gold/10 rounded text-sacred-cream/80 text-sm break-all font-mono">
                  {uploadedFileUrl}
                </div>
              </div>
            )}

            {/* Image Preview */}
            {media && (
              <div className="relative overflow-hidden rounded-lg border border-sacred-gold/20">
                <Image
                  src={media}
                  alt={title || 'Uploaded image'}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {!media && !file && (
              <div className="flex items-center justify-center h-32 bg-sacred-dark/50 border border-sacred-gold/10 rounded-lg">
                <span className="text-sacred-muted font-lato">No image selected</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            {category !== 'announcements' && (
              <label className="flex items-center gap-3 p-4 bg-sacred-dark/50 border border-sacred-gold/20 rounded-lg hover:bg-sacred-dark transition-colors cursor-pointer">
                <input
                  name="upcoming"
                  type="checkbox"
                  checked={upcoming}
                  onChange={(e) => setUpcoming(e.target.checked)}
                  className="w-5 h-5 accent-sacred-gold bg-sacred-dark border-sacred-gold/30 rounded"
                />
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-sacred-gold" />
                  <span className="text-sacred-cream font-medium font-lato">
                    {category === 'blogs' ? 'Mark as Newest Blog' : 'Mark as Upcoming Event'}
                  </span>
                </div>
              </label>
            )}

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

          {/* Link Input for Events */}
          {category === 'events' && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sacred-cream/80 font-medium font-lato">
                <LinkIcon size={18} />
                External Link
              </label>
              <input
                name="link"
                type="text"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-3 bg-sacred-dark border border-sacred-gold/20 rounded-lg text-sacred-cream placeholder-sacred-muted focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
              />
            </div>
          )}

          {/* Content Textarea */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sacred-cream/80 font-medium font-lato">
              <FileText size={18} />
              Content
            </label>
            <textarea
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your blog content here..."
              rows={8}
              className="w-full px-4 py-3 bg-sacred-dark border border-sacred-gold/20 rounded-lg text-sacred-cream placeholder-sacred-muted focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200 resize-none"
            />
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
            disabled={isPending || loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sacred-gold text-sacred-dark font-bold rounded-lg hover:bg-sacred-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg font-lato"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-sacred-dark/30 border-t-sacred-dark rounded-full animate-spin" />
                Creating Blog...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Create Blog
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlogForm
