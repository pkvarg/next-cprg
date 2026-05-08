import React from 'react'
import AdminBack from '@/components/admin/AdminBack'
import AllVideos from '@/components/admin/AllVideos'
import CreateVideoForm from '@/components/admin/CreateVideo'
import { Video as VideoIcon } from 'lucide-react'

const Video = () => {
  return (
    <div className="min-h-screen bg-sacred-dark font-lato">
      <AdminBack />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sacred-terracotta/5 to-sacred-gold/5"></div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 pt-12 pb-12">
          <p className="font-cormorant italic text-[0.85rem] uppercase tracking-[0.3em] text-sacred-terracotta">
            Médiá
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-sm bg-sacred-terracotta/15 border border-sacred-terracotta/30">
              <VideoIcon className="w-7 h-7 text-sacred-terracotta" />
            </div>
            <h1 className="font-cormorant font-semibold italic text-[2.4rem] md:text-[3rem] text-sacred-cream tracking-wide">
              Video
            </h1>
          </div>
          <p className="text-sacred-cream/60 max-w-2xl mx-auto text-center">
            Create and manage your video content
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-12 pb-20">
        <AllVideos />
        <CreateVideoForm />
      </div>
    </div>
  )
}

export default Video
