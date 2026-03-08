'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAudio } from '@/utils/AudioProvider'
import { PodcastDetailPlayerProps } from '@/types'

import LoaderSpinner from './../LoaderSpinner'
import { Button } from './../ui/button'
import { useToast } from './../ui/use-toast'

const PodcastDetailPlayer = ({
  audioUrl,
  title,
  podcastId,
  description,
}: PodcastDetailPlayerProps) => {
  const router = useRouter()
  const { setAudio, scrollToPlayer, setScrollToPlayer } = useAudio()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handlePlay = () => {
    setAudio({
      title,
      audioUrl,
      podcastId,
    })
    setScrollToPlayer(true)
  }

  useEffect(() => {
    if (scrollToPlayer) {
      const playerElement = document.getElementById('player')
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [scrollToPlayer])

  return (
    <div className='mt-6 '>
      <div className='flex flex-col lg:flex-row gap-8 justify-center lg:justify-start items-center bg-sacred-deep border border-sacred-gold/20 rounded-xl lg:w-[50%] lg:px-16 py-4'>
        <div className='flex flex-col gap-4 lg:gap-2 items-center'>
          <Image
            src={'/player_pics/headphone.svg'}
            width={200}
            height={200}
            alt='Podcast image'
            className='rounded-tl-xl w-[40%]'
          />
          <Button
            onClick={handlePlay}
            className='text-[25px] w-full max-w-[250px] bg-sacred-terracotta hover:bg-sacred-gold hover:text-sacred-dark transition-colors text-white-1'
          >
            <Image
              src='/player_pics/Play.svg'
              width={20}
              height={20}
              alt='random play'
            />{' '}
            &nbsp; Play
          </Button>
        </div>

        <div className='flex flex-col lg:gap-5 mx-4 lg:mx-0'>
          <h1 className='font-cormorant text-[1.4rem] italic text-sacred-cream'>
            {title}
          </h1>

          <p className='font-lato text-sacred-cream/75 text-[0.95rem] leading-relaxed lg:text-justify'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PodcastDetailPlayer
