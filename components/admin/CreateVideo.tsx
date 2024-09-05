'use client'

import React, { useState } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from '@/utils/firebaseConfig'
import { create } from '@/app/[locale]/admin/_actions/videoActions'
import { useTransition } from 'react'

const CreateVideoForm: React.FC = () => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const [title, setTitle] = useState<string>('')

  const [url, setUrl] = useState<string>('')
  const [category, setCategory] = useState<string>('gospel')
  const [english, setEnglish] = useState<boolean>(false)

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
        <h1 className='text-white text-center text-[30px]'>Create Video</h1>
        <input
          name='title'
          type='text'
          placeholder='Title...will not be shown publicly'
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
          <option value='gospel'>Gospel</option>
          <option value='messages'>Message</option>
          <option value='other'>Other</option>
        </select>
        <div className='flex relative bg-[#2e2236] mt-8'></div>

        {/* <p className='text-[18px] text-white my-4'>URL:{url}</p> */}

        <textarea
          className='text-[#2e2236] mt-4 pl-1 h-8'
          name='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Paste Url'
        />

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
          {isPending ? '...Creating...' : 'Create Video'}
        </button>
      </form>
    </div>
  )
}

export default CreateVideoForm
