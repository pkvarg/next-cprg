'use client'
import React, { useState } from 'react'
import { deleteSingleVideo } from '@/app/[locale]/admin/_actions/videoActions'

interface Video {
  videoId: string
}

const DeleteVideoButton: React.FC<Video> = (videoId) => {
  const [message, setMessage] = useState('')
  const deleteVideo = async (e: any, videoId: string) => {
    e.preventDefault()
    const userConfirmed = confirm('Are you sure you want to delete this item?')
    if (userConfirmed) {
      // Perform the delete operation
      const response = await deleteSingleVideo(videoId)

      if (response.message) setMessage(response.message)
    } else {
      // Cancel the delete operation
      console.log('Delete operation cancelled')
    }
  }

  return (
    <>
      <button
        className='text-red-500 text-[18px]'
        onClick={(e) => deleteVideo(e, videoId.videoId)}
      >
        Delete Video
      </button>
      {message && (
        <p className='text-green-600 text-[15px] bg-white'>{message}</p>
      )}
    </>
  )
}

export default DeleteVideoButton
