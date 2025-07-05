// import React from 'react'
// import CreatePodcastForm from '@/components/admin/CreatePodcast'

// import AllPodcasts from '@/components/admin/AllPodcasts'

// import AdminBack from '@/components/admin/AdminBack'

// const Audio = () => {
//   return (
//     <div>
//       <AdminBack />

//       <h1 className='text-[30px] text-center text-white'>Audio</h1>
//       <AllPodcasts />
//       <CreatePodcastForm />
//     </div>
//   )
// }

// export default Audio

// Modern Audio Page Component
import React from 'react'
import CreatePodcastForm from '@/components/admin/CreatePodcast'
import AllPodcasts from '@/components/admin/AllPodcasts'
import AdminBack from '@/components/admin/AdminBack'
import { Headphones } from 'lucide-react'

const Audio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminBack />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Audio Management
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
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
