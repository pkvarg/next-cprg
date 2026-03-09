import React from 'react'
import AdminBack from '@/components/admin/AdminBack'
import AllVideos from '@/components/admin/AllVideos'
import CreateVideoForm from '@/components/admin/CreateVideo'
import { Video as VideoIcon } from 'lucide-react'

const Video = () => {
  return (
    <div className="min-h-screen bg-sacred-dark">
      <AdminBack />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-sacred-gold/20 border border-sacred-gold/30">
                <VideoIcon className="w-8 h-8 text-sacred-gold" />
              </div>
              <h1 className="text-5xl md:text-6xl font-cormorant italic text-sacred-gold">
                Video Management
              </h1>
            </div>
            <p className="text-xl text-sacred-cream/70 max-w-2xl mx-auto font-lato">
              Create and manage your video content
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-12 pb-20">
        <AllVideos />
        <CreateVideoForm />
      </div>
    </div>
  )
}

export default Video
