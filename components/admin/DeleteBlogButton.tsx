'use client'
import React, { useState } from 'react'
import { deleteSingleBlog } from '@/app/[locale]/admin/_actions/blogActions'

interface Blog {
  blogId: string
}

const DeleteBlogButton: React.FC<Blog> = (blogId) => {
  const [message, setMessage] = useState('')
  const deleteBlog = async (e: any, blogId: string) => {
    e.preventDefault()
    const userConfirmed = confirm('Are you sure you want to delete this item?')
    if (userConfirmed) {
      // Perform the delete operation
      const response = await deleteSingleBlog(blogId)

      if (response.message) setMessage(response.message)
    } else {
      // Cancel the delete operation
      console.log('Delete operation cancelled')
    }
  }

  return (
    <>
      <button
        className='px-3 py-1.5 text-red-400/70 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 rounded-lg transition-all duration-200 text-sm font-lato'
        onClick={(e) => deleteBlog(e, blogId.blogId)}
      >
        Delete Blog
      </button>
      {message && (
        <p className='text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5'>{message}</p>
      )}
    </>
  )
}

export default DeleteBlogButton
