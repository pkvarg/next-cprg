'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Link {
  link: string
}

const EditBlogButton: React.FC<Link> = (link) => {
  const router = useRouter()
  return (
    <button
      className='px-3 py-1.5 text-sacred-gold/70 hover:text-sacred-gold border border-sacred-gold/20 hover:border-sacred-gold/40 rounded-lg transition-all duration-200 text-sm font-lato'
      onClick={() => {
        router.push(link.link)
      }}
    >
      Edit Blog
    </button>
  )
}

export default EditBlogButton
