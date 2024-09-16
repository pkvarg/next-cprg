'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const VideoBack = () => {
  const { locale } = useParams()
  return (
    <div className='p-4 text-[25px]'>
      <Link href={`/${locale}/admin/video`} className='text-white'>
        Back To Videos
      </Link>
    </div>
  )
}

export default VideoBack
