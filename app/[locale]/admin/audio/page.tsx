import React from 'react'
import CreatePodcastForm from '@/components/admin/CreatePodcast'

import AllPodcasts from '@/components/admin/AllPodcasts'

import AdminBack from '@/components/admin/AdminBack'

const Audio = () => {
  return (
    <div>
      <AdminBack />

      <h1 className='text-[25px] my-8 text-center text-white'>Audio</h1>
      <AllPodcasts />
      <CreatePodcastForm />
    </div>
  )
}

export default Audio
