'use client'

import React, { useState } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from '@/utils/firebaseConfig'
import { create } from '@/app/[locale]/admin/_actions/blogActions'
import { useTransition } from 'react'
import Image from 'next/image'

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
              setMedia(downloadURL)
              resolve(downloadURL)
            })
          }
        )
      } else {
        resolve('')
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const mediaUrl = await handleFileUpload()

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
      })
    } catch (error) {
      console.error('Error in form submission:', error)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method='post'
        className='relative flex flex-col gap-2 mx-4 lg:mx-[20%] text-[25px]'
      >
        <h1 className='text-white text-center text-[30px]'>Create Blog</h1>
        <input
          name='title'
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
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
          <option value='announcements'>Announcement</option>
          <option value='events'>Event</option>
          <option value='blogs'>Blog</option>
        </select>
        <div className='flex relative bg-[#2e2236] mt-8'>
          <button
            type='button'
            className='w-[36px] h-[36px] border border-green-100 flex items-center justify-center cursor-pointer'
            onClick={() => setOpen(!open)}
          >
            <Image src='/player_pics/plus.png' alt='' width={16} height={16} />
          </button>
          {open && (
            <div className='flex gap-[20px] z-999 w-[100%] absolute left-[50px]'>
              <input
                type='file'
                id='image'
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                style={{ display: 'none' }}
              />
              <button
                type='button'
                className='border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'
              >
                <label htmlFor='image'>
                  <Image
                    src='/player_pics/image.png'
                    alt=''
                    width={16}
                    height={16}
                  />
                </label>
              </button>
            </div>
          )}
        </div>
        {media !== '' ? (
          <Image className='w-[250px] my-4' src={media} alt={title} />
        ) : (
          <p>without image</p>
        )}
        {category !== 'announcements' && (
          <label className='text-white mt-4'>
            <input
              name='upcoming'
              type='checkbox'
              checked={upcoming}
              onChange={(e) => setUpcoming(e.target.checked)}
            />
            <span className='pl-2'>
              {category === 'blogs' ? 'Newest Blog' : 'Upcoming Event'}?
            </span>
          </label>
        )}

        <label className='text-white'>
          <input
            name='english'
            type='checkbox'
            checked={english}
            onChange={(e) => setEnglish(e.target.checked)}
          />
          <span className='pl-2'>
            Is this to be displayed on the english webpage?
          </span>
        </label>
        <textarea
          className='text-[#2e2236] mt-4 pl-1'
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Text...'
        />
        {category === 'events' && (
          <input
            name='link'
            type='text'
            placeholder='Link'
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        )}

        {message && (
          <p className='text-center bg-yellow-500 text-white text-[25px]'>
            {message}
          </p>
        )}
        <button
          className='text-green-500 cursor-pointer'
          type='submit'
          disabled={isPending}
        >
          {isPending ? '...Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  )
}

export default CreateBlogForm
