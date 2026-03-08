'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Link {
  link: string
  title: string
}

const GoToBlogButton: React.FC<Link> = (link) => {
  const router = useRouter()
  return (
    <button
      className='border border-sacred-cream/60 text-sacred-cream hover:bg-sacred-cream hover:text-sacred-terracotta transition-all px-6 py-2 rounded font-lato text-[0.9rem] tracking-wider'
      onClick={() => {
        router.push(link.link)
      }}
    >
      {link.title}
    </button>
  )
}

export default GoToBlogButton
