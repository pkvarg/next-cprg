'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const AudioBack = () => {
  const { locale } = useParams()
  return (
    <div className='p-4 text-[25px]'>
      <Link href={`/${locale}/admin/audio`} className='text-white'>
        Back To Audios
      </Link>
    </div>
  )
}

export default AudioBack
