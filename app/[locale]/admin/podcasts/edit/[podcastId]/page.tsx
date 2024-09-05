'use client'
import React, { useState, useEffect, useTransition } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from '@/utils/firebaseConfig'
import { useParams } from 'next/navigation'
import {
  getSinglePodcast,
  editSinglePodcast,
} from '../../../_actions/podcastActions'
import DeletePodcastButton from '@/components/admin/DeletePodcastButton'

import { AiOutlineDelete } from 'react-icons/ai'
import AudioBack from '@/components/admin/AudioBack'
import Image from 'next/image'

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
  const [open, setOpen] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [category, setCategory] = useState<string>('gospel')
  const [english, setEnglish] = useState<boolean>(false)
  const [id, setId] = useState('')
  const [podcast, setPodcast] = useState<Podcast | null>(null)

  // State to hold the preview URL of the selected file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { podcastId } = useParams()
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

  useEffect(() => {
    getPodcast()
  }, [])

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

  const handleFileUpload = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storage = getStorage(app)
        const name = new Date().getTime() + file.name
        const storageRef = ref(storage, name)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
          },
          (error) => {
            console.error('Upload failed:', error)
            setMessage('Failed to upload image')
            reject(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setAudioUrl(downloadURL)
              resolve(downloadURL)
            })
          }
        )
      } else {
        resolve(audioUrl)
      }
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Update preview URL state
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
    } else {
      setFile(null)
      setPreviewUrl(null)
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreviewUrl(null)
    setAudioUrl('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const mediaUrl = await handleFileUpload()

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
    }
  }

  return (
    <div className='text-white text-[25px] flex flex-col gap-2 justify-center items-center'>
      <AudioBack />
      <h1 className='text-yellow-300'>Edit Single Podcast</h1>
      {podcast ? (
        <form
          onSubmit={handleSubmit}
          method='post'
          className='relative flex flex-col mx-2 lg:mx-[35%] mt-16'
        >
          <input type='hidden' name='id' value={podcast.id} />
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

          <div className='flex relative bg-[#2e2236] mt-8'>
            <button
              type='button'
              className='w-[36px] h-[36px] border border-green-100 flex items-center justify-center cursor-pointer'
              onClick={() => setOpen(!open)}
            >
              <Image
                src='/player_pics/plus.png'
                alt=''
                width={16}
                height={16}
              />
            </button>
            {open && (
              <div className='flex gap-[20px] z-999 w-[100%] absolute left-[50px]'>
                <input
                  type='file'
                  id='image'
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button
                  type='button'
                  className='border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'
                >
                  <label htmlFor='image'>
                    <Image
                      src='/player_pics/music.webp'
                      alt=''
                      width={16}
                      height={16}
                    />
                  </label>
                </button>
              </div>
            )}
            <button
              type='button'
              className='ml-16 border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'
            >
              <label htmlFor='image'>
                <AiOutlineDelete
                  className='text-red-700'
                  onClick={removeFile}
                />
              </label>
            </button>
          </div>
          {previewUrl ? (
            <Image className='w-[250px] my-4' src={previewUrl} alt={title} />
          ) : (
            audioUrl !== '' && (
              <p className='text-[15px] w-[250px] my-4'>{audioUrl}</p>
            )
          )}

          <p
            onClick={() => setEnglish((prev) => !prev)}
            className={
              english
                ? 'text-green-500 text-[25px] mt-4 cursor-pointer'
                : 'text-red-500 text-[25px] mt-4 cursor-pointer'
            }
          >
            Is this to be displayed on the english webpage ?{' '}
            {english ? 'Yes' : 'No'}
          </p>
          <input type='hidden' name='english' value={english ? 'on' : 'off'} />

          <textarea
            className='text-[#2e2236] mt-4 pl-1'
            name='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Text...'
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
          <DeletePodcastButton podcastId={podcast.id} />
        </form>
      ) : (
        <h1>...Loading</h1>
      )}
    </div>
  )
}

export default EditPodcast
