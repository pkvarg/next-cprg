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
import { getSingleBlog, editSingleBlog } from '../../../_actions/blogActions'
import DeleteBlogButton from '@/components/admin/DeleteBlogButton'
import AdminBack from '@/components/admin/AdminBack'
import { AiOutlineDelete } from 'react-icons/ai'
import Image from 'next/image'

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
  const [open, setOpen] = useState(false)
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

  // State to hold the preview URL of the selected file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { blogId } = useParams()
  const getBlog = async () => {
    if (blogId) {
      const singleBlog = await getSingleBlog(blogId.toString())
      if (singleBlog.success && singleBlog.blog) {
        setBlog(singleBlog.blog)
      }
    }
  }

  useEffect(() => {
    getBlog()
  }, [])

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
        resolve(media)
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
    setMedia('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const mediaUrl = await handleFileUpload()

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
    }
  }

  return (
    <div className='text-white text-[25px] flex flex-col gap-2 justify-center items-center'>
      <AdminBack />
      <h1 className='text-yellow-300'>Edit Single Blog</h1>
      {blog ? (
        <form
          onSubmit={handleSubmit}
          method='post'
          className='relative flex flex-col mx-2 lg:mx-[35%] mt-16'
        >
          <input type='hidden' name='id' value={blog.id} />
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
                      src='/player_pics/image.png'
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
            media !== '' && (
              <Image className='w-[250px] my-4' src={media} alt={title} />
            )
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

          <p
            onClick={() => setHasLink((prev) => !prev)}
            className={
              hasLink
                ? 'text-green-500 text-[25px] mt-4 cursor-pointer'
                : 'text-red-500 text-[25px] mt-4 cursor-pointer'
            }
          >
            Add a link pointing to a different website? {hasLink ? 'Yes' : 'No'}
          </p>

          {hasLink && (
            <textarea
              className='text-[#2e2236] mt-4 pl-1'
              name='link'
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder='Insert link...'
            />
          )}

          <textarea
            className='text-[#2e2236] mt-4 pl-1'
            name='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <DeleteBlogButton blogId={blog.id} />
        </form>
      ) : (
        <h1>...Loading</h1>
      )}
    </div>
  )
}

export default EditBlog
