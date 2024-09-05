'use client'

import PodcastCard from '@/components/audio/PodcastCard'
import PodcastDetailPlayer from '@/components/audio/PodcastDetailPlayer'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PodcastProps } from '@/types'

const PodcastDetails = ({
  params: { podcastId },
}: {
  params: { podcastId: string }
}) => {
  const podcast = {
    id: '001',
    podcastTitle: '111drive new podcast',
    podcastDescription: 'new desc',

    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/cirkev-v-bratislave.appspot.com/o/07.Epilogue.mp3?alt=media&token=bdaf09f7-d556-40a8-b8c8-8723f66df4c0',
    imageUrl:
      'https://images.unsplash.com/photo-1453503795393-c496eee08c98?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }

  return (
    <section className='flex w-full flex-col mx-4 lg:mx-[20%] text-white'>
      <header className='mt-9 flex items-center justify-between'>
        <h1 className='text-20 font-bold text-white-1'>Currenty Playing</h1>
        <figure className='flex gap-3'>
          <Image
            src='/player_pics/headphone.svg'
            width={24}
            height={24}
            alt='headphone'
          />
          {/* <h2 className='text-16 font-bold text-white-1'>{podcast?.views}</h2> */}
        </figure>
      </header>

      {podcast?.id && (
        <PodcastDetailPlayer podcastId={podcast.id} {...podcast} />
      )}

      <p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'>
        {podcast?.podcastDescription}
      </p>
    </section>
  )
}

export default PodcastDetails
