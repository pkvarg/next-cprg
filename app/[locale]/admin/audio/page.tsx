import React from 'react'
import CreatePodcastForm from '@/components/admin/CreatePodcast'
import AllPodcasts from '@/components/admin/AllPodcasts'
import AdminBack from '@/components/admin/AdminBack'
import { Headphones } from 'lucide-react'

const Audio = () => {
  return (
    <div className="min-h-screen bg-sacred-dark">
      <AdminBack />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-sacred-gold/20 border border-sacred-gold/30">
                <Headphones className="w-8 h-8 text-sacred-gold" />
              </div>
              <h1 className="text-5xl md:text-6xl font-cormorant italic text-sacred-gold">
                Audio Management
              </h1>
            </div>
            <p className="text-xl text-sacred-cream/70 max-w-2xl mx-auto font-lato">
              Create and manage your podcast content
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-12 pb-20">
        <AllPodcasts />
        <CreatePodcastForm />
      </div>
    </div>
  )
}

export default Audio
