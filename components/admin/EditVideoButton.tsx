'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Link {
  link: string
}

const EditVideoButton: React.FC<Link> = (link) => {
  const router = useRouter()
  return (
    <button
      className='text-yellow-400 text-[18px]'
      onClick={() => {
        router.push(link.link)
      }}
    >
      Edit Video
    </button>
  )
}

export default EditVideoButton
