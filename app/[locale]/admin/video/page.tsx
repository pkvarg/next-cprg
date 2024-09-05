import React from 'react'
import AdminBack from '@/components/admin/AdminBack'
import AllVideos from '@/components/admin/AllVideos'
import CreateVideoForm from '@/components/admin/CreateVideo'

const Video = () => {
  return (
    <div>
      <AdminBack />

      <h1 className='text-[30px] text-center text-white'>Video</h1>
      <AllVideos />
      <CreateVideoForm />
    </div>
  )
}

export default Video
