'use client'
import React, { useState, useEffect, useTransition, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getSingleBlog, editSingleBlog } from '../../../_actions/blogActions'
import DeleteBlogButton from '@/components/admin/DeleteBlogButton'
import AdminBack from '@/components/admin/AdminBack'
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
  Edit3,
  Trash2,
} from 'lucide-react'

interface Blog {
  id: string
  title: string
  category: string
  media: string
  text: string
  upcoming: boolean
  english: boolean
  link: string
}

const EditBlog = () => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const [blog, setBlog] = useState<Blog | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [media, setMedia] = useState('')
  const [upcoming, setUpcoming] = useState(false)
  const [english, setEnglish] = useState(false)
  const [hasLink, setHasLink] = useState(false)
  const [link, setLink] = useState('')

  // File upload state
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State to hold the preview URL of the selected file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { blogId } = useParams()

  useEffect(() => {
    const getBlog = async () => {
      if (blogId) {
        const singleBlog = await getSingleBlog(blogId.toString())
        if (singleBlog.success && singleBlog.blog) {
          setBlog(singleBlog.blog)
        }
      }
    }

    getBlog()
  }, [blogId]) // Include blogId as dependency

  useEffect(() => {
    if (blog) {
      setId(blog.id)
      setTitle(blog.title)
      setCategory(blog.category)
      setMedia(blog.media)
      setText(blog.text)
      setUpcoming(blog.upcoming)
      setEnglish(blog.english)
      setLink(blog.link)
      setHasLink(blog.link !== '' ? true : false)
    }
  }, [blog, blogId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type - accept image files
    if (!selectedFile.type.startsWith('image/')) {
      setError('Prosím, nahrajte obrázok')
      return
    }

    setFile(selectedFile)
    setError(null)
    setSuccessMessage(null)
    setUploadedFileUrl(null)

    // Update preview URL state
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
  }

  const uploadFile = async (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        // If no file is selected, return the current media URL
        resolve(media)
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
        setMedia(data.imageUrl)

        // Reset the file input but keep the success message and URL
        setFile(null)
        setPreviewUrl(null)
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
    setPreviewUrl(null)
    setError(null)
    setSuccessMessage(null)
    setUploadedFileUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreviewUrl(null)
    setMedia('')
    setUploadedFileUrl(null)
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
      formData.append('id', id)
      formData.append('title', title)
      formData.append('category', category)
      formData.append('text', text)
      formData.append('upcoming', upcoming.toString())
      formData.append('english', english.toString())
      formData.append('link', link)
      formData.append('media', mediaUrl)

      startTransition(async () => {
        const result = await editSingleBlog(formData)
        setMessage(result.message)
      })
    } catch (error) {
      console.error('Error in form submission:', error)
      setError('Chyba pri odosielaní formulára')
    }
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-sacred-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sacred-gold/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading blog...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sacred-dark">
      <AdminBack />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sacred-gold/5 to-sacred-terracotta/5"></div>
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-sacred-gold to-sacred-gold-light">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-sacred-gold">
                Edit Blog
              </h1>
            </div>
            <p className="text-xl text-sacred-cream/70">Update your blog content</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-16">
        <div className="bg-sacred-deep/60 backdrop-blur-sm border border-sacred-gold/20 rounded-2xl border border-sacred-gold/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sacred-gold/10 to-sacred-gold-light/10 border-b border-sacred-gold/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-sacred-gold to-sacred-gold-light">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{blog.title}</h2>
                  <p className="text-sacred-cream/70 text-sm">Blog ID: {blog.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    blog.category === 'blogs'
                      ? 'bg-blue-500/20 text-sacred-gold'
                      : blog.category === 'events'
                      ? 'bg-sacred-gold/20 text-sacred-gold-light'
                      : 'bg-orange-500/20 text-sacred-terracotta'
                  }`}
                >
                  {blog.category}
                </span>
                {blog.english && (
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
            <input type="hidden" name="id" value={blog.id} />

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
                placeholder="Enter blog title..."
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
                <option value="announcements">📢 Announcement</option>
                <option value="events">🎉 Event</option>
                <option value="blogs">📝 Blog</option>
              </select>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sacred-cream/70 font-medium">
                <ImageIcon size={18} />
                Featured Image
              </label>

              {/* Current Image Display */}
              {(media || previewUrl) && (
                <div className="relative">
                  <div className="relative overflow-hidden rounded-lg border border-sacred-gold/20 mb-4">
                    <Image
                      src={previewUrl || media}
                      alt={title}
                      width={400}
                      height={250}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-3 right-3 p-2 bg-sacred-gold/80 backdrop-blur-sm text-white rounded-lg hover:bg-sacred-terracotta/80 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}

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
                  className="w-full p-8 border-2 border-dashed border-sacred-gold/20 rounded-lg bg-sacred-deep/30 hover:bg-sacred-deep/50 hover:border-blue-500/50 transition-all duration-200 group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-sacred-gold/10 to-sacred-gold-light/10 group-hover:from-sacred-gold/20 group-hover:to-sacred-gold-light/20 transition-all duration-200">
                      <Upload className="w-8 h-8 text-sacred-gold" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium">
                        {media ? 'Change image' : 'Click to upload image'}
                      </p>
                      <p className="text-sacred-cream/60 text-sm">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* File Upload Section */}
              {file && (
                <div className="p-4 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={18} className="text-sacred-gold" />
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
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sacred-gold to-sacred-gold-light text-white rounded-lg font-medium hover:from-sacred-gold-light hover:to-sacred-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                  <p className="text-sacred-cream/60 text-sm mb-2">Uploaded file URL:</p>
                  <div className="p-2 bg-sacred-deep/50 border border-sacred-gold/20 rounded text-sacred-cream/70 text-sm break-all">
                    {uploadedFileUrl}
                  </div>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-4">
              {category !== 'announcements' && (
                <label className="flex items-center gap-3 p-4 bg-sacred-deep/30 border border-sacred-gold/20 rounded-lg hover:bg-sacred-deep/50 transition-colors cursor-pointer">
                  <input
                    name="upcoming"
                    type="checkbox"
                    checked={upcoming}
                    onChange={(e) => setUpcoming(e.target.checked)}
                    className="w-5 h-5 text-sacred-gold bg-sacred-deep border-sacred-gold/20 rounded focus:ring-sacred-gold/20"
                  />
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-sacred-gold-light" />
                    <span className="text-white font-medium">
                      {category === 'blogs' ? 'Mark as Newest Blog' : 'Mark as Upcoming Event'}
                    </span>
                  </div>
                </label>
              )}

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

              <label className="flex items-center gap-3 p-4 bg-sacred-deep/30 border border-sacred-gold/20 rounded-lg hover:bg-sacred-deep/50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasLink}
                  onChange={(e) => setHasLink(e.target.checked)}
                  className="w-5 h-5 text-sacred-gold bg-sacred-deep border-sacred-gold/20 rounded focus:ring-sacred-gold/20"
                />
                <div className="flex items-center gap-2">
                  <LinkIcon size={18} className="text-sacred-gold-light" />
                  <span className="text-white font-medium">Add external link</span>
                </div>
              </label>
            </div>

            {/* Link Input */}
            {hasLink && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sacred-cream/70 font-medium">
                  <LinkIcon size={18} />
                  External Link
                </label>
                <input
                  name="link"
                  type="url"
                  placeholder="https://example.com"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-4 py-3 bg-sacred-deep/50 border border-sacred-gold/20 rounded-lg text-white placeholder-sacred-cream/40 focus:border-sacred-gold/50 focus:ring-2 focus:ring-sacred-gold/20 focus:outline-none transition-all duration-200"
                />
              </div>
            )}

            {/* Content Textarea */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sacred-cream/70 font-medium">
                <FileText size={18} />
                Content
              </label>
              <textarea
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your blog content here..."
                rows={8}
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
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sacred-gold to-sacred-gold-light text-white font-bold rounded-lg hover:from-sacred-gold-light hover:to-sacred-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Blog...
                  </>
                ) : (
                  <>
                    <Edit3 size={20} />
                    Update Blog
                  </>
                )}
              </button>
            </div>

            {/* Delete Button */}
            <div className="pt-6 border-t border-sacred-gold/20">
              <DeleteBlogButton blogId={blog.id} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditBlog
