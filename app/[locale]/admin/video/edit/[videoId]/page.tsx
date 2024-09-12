'use client'
import React, { useState, useEffect, useTransition } from 'react'

import { useParams } from 'next/navigation'
import { getSingleVideo, editSingleVideo } from '../../../_actions/videoActions'
import DeleteVideoButton from '@/components/admin/DeleteVideoButton'

import VideoBack from '@/components/admin/VideoBack'
import { useTranslations } from 'next-intl'

interface Video {
  id: string
  title: string
  url: string
  category: string
  english: boolean
}

const EditVideo = () => {
  const t = useTranslations('Home')
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const [title, setTitle] = useState<string>('')

  const [url, setUrl] = useState<string>('')
  const [category, setCategory] = useState<string>('gospel')
  const [english, setEnglish] = useState<boolean>(false)
  const [id, setId] = useState('')
  const [video, setVideo] = useState<Video | null>(null)

  const { videoId } = useParams()
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

  useEffect(() => {
    getVideo()
  }, [getVideo])

  useEffect(() => {
    if (video) {
      setId(video.id)
      setTitle(video.title)
      setCategory(video.category)
      setUrl(video.url)

      setEnglish(video.english)
    }
  }, [video, videoId])

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

  return (
    <div className='text-white text-[25px] flex flex-col gap-2 justify-center items-center'>
      <VideoBack />
      <h1 className='text-yellow-300'>Edit Single Video</h1>
      {video ? (
        <form
          onSubmit={handleSubmit}
          method='post'
          className='relative flex flex-col mx-2 lg:mx-[35%] mt-16 w-[50%]'
        >
          <input type='hidden' name='id' value={video.id} />
          <label className='text-[30px] py-1' htmlFor='title'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='category' className='text-[25px] mt-4'>
            Category
          </label>
          <select
            id='category'
            name='category'
            className='mt-2 text-[#2e2236]'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='gospel'>Gospel</option>
            <option value='messages'>Message</option>
            <option value='other'>Other</option>
          </select>

          <p
            onClick={() => setEnglish((prev) => !prev)}
            className={
              english
                ? 'text-green-500 text-[25px] mt-4 cursor-pointer'
                : 'text-red-500 text-[25px] mt-4 cursor-pointer'
            }
          >
            {t('adminEnglish')} {english ? 'Yes' : 'No'}
          </p>
          <input type='hidden' name='english' value={english ? 'on' : 'off'} />

          <textarea
            className='text-[#2e2236] mt-4 pl-1'
            name='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Url...'
            required
          />
          <button
            className='mt-4 text-green-400'
            type='submit'
            disabled={isPending}
          >
            {isPending ? '...Editing...' : 'Edit'}
          </button>
          {message && (
            <p className='text-center bg-yellow-500 text-white text-[25px]'>
              {message}
            </p>
          )}
          <DeleteVideoButton videoId={video.id} />
        </form>
      ) : (
        <h1>...Loading</h1>
      )}
    </div>
  )
}

export default EditVideo
