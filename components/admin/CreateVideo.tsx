// 'use client'

// import React, { useState } from 'react'
// import { create } from '@/app/[locale]/admin/_actions/videoActions'
// import { useTransition } from 'react'

// const CreateVideoForm: React.FC = () => {
//   const [isPending, startTransition] = useTransition()
//   const [message, setMessage] = useState('')

//   const [title, setTitle] = useState<string>('')

//   const [url, setUrl] = useState<string>('')
//   const [category, setCategory] = useState<string>('gospel')
//   const [english, setEnglish] = useState<boolean>(false)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     try {
//       const formData = new FormData()
//       formData.append('title', title)
//       formData.append('url', url)
//       formData.append('category', category)
//       formData.append('english', english.toString())

//       startTransition(async () => {
//         const result = await create(formData)
//         setMessage(result.message)
//       })
//     } catch (error) {
//       console.error('Error in form submission:', error)
//     }
//   }

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         method="post"
//         className="relative flex flex-col gap-2 mx-4 lg:mx-[20%] text-[25px]"
//       >
//         <h1 className="text-white text-center text-[30px]">Create Video</h1>
//         <input
//           name="title"
//           type="text"
//           placeholder="Title...will not be shown publicly"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <label htmlFor="category" className="text-[25px] mt-4">
//           Category
//         </label>
//         <select
//           id="category"
//           name="category"
//           className="mt-2 text-[#2e2236]"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="gospel">Gospel</option>
//           <option value="messages">Message</option>
//           <option value="other">Other</option>
//         </select>
//         <div className="flex relative bg-[#2e2236] mt-8"></div>

//         {/* <p className='text-[18px] text-white my-4'>URL:{url}</p> */}

//         <textarea
//           className="text-[#2e2236] mt-4 pl-1 h-8"
//           name="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Paste Url"
//         />

//         <label className="text-white">
//           <input
//             name="english"
//             type="checkbox"
//             checked={english}
//             onChange={(e) => setEnglish(e.target.checked)}
//           />
//           <span className="pl-2">Is this to be displayed on the english webpage?</span>
//         </label>

//         {message && <p className="text-center bg-yellow-500 text-white text-[25px]">{message}</p>}
//         <button className="text-green-500 cursor-pointer" type="submit" disabled={isPending}>
//           {isPending ? '...Creating...' : 'Create Video'}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default CreateVideoForm

// Modern CreateVideoForm Component
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
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-b border-slate-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
              <VideoIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Create New Video
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-slate-300 font-medium">
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
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200"
            />
            <p className="text-slate-400 text-sm">
              This title is for admin purposes only and will not be displayed publicly.
            </p>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-slate-300 font-medium">
              <Tag size={18} />
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200"
            >
              <option value="gospel">⛪ Gospel</option>
              <option value="messages">📖 Message</option>
              <option value="other">🎬 Other</option>
            </select>
          </div>

          {/* URL Input */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-slate-300 font-medium">
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
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200"
              />
              {isYouTubeUrl(url) && (
                <div className="absolute right-3 top-3">
                  <Youtube className="w-6 h-6 text-red-500" />
                </div>
              )}
            </div>

            {/* URL Preview */}
            {url && (
              <div className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink size={16} className="text-red-400" />
                  <span className="text-white font-medium">Video Preview:</span>
                </div>

                {isYouTubeUrl(url) && getYouTubeId(url) ? (
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900">
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
                        <div className="p-3 rounded-full bg-red-500/80 backdrop-blur-sm">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-500" />
                      <span className="text-red-400 text-sm font-medium">
                        YouTube Video Detected
                      </span>
                    </div>
                  </div>
                ) : url ? (
                  <div className="p-3 bg-slate-900/50 border border-slate-700/50 rounded text-slate-300 text-sm break-all">
                    {url}
                  </div>
                ) : null}

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                >
                  <ExternalLink size={14} />
                  Open Video
                </a>
              </div>
            )}
          </div>

          {/* English Option */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-600/50 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
              <input
                name="english"
                type="checkbox"
                checked={english}
                onChange={(e) => setEnglish(e.target.checked)}
                className="w-5 h-5 text-red-500 bg-slate-700 border-slate-600 rounded focus:ring-red-500/20"
              />
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-blue-400" />
                <span className="text-white font-medium">Display on English webpage</span>
              </div>
            </label>
          </div>

          {/* Submit Message */}
          {message && (
            <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 font-medium text-center">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
