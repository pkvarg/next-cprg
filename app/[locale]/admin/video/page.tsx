// import React from 'react'
// import AdminBack from '@/components/admin/AdminBack'
// import AllVideos from '@/components/admin/AllVideos'
// import CreateVideoForm from '@/components/admin/CreateVideo'

// const Video = () => {
//   return (
//     <div>
//       <AdminBack />

//       <h1 className='text-[30px] text-center text-white'>Video</h1>
//       <AllVideos />
//       <CreateVideoForm />
//     </div>
//   )
// }

// export default Video

// Modern Video Page Component
import React from 'react'
import AdminBack from '@/components/admin/AdminBack'
import AllVideos from '@/components/admin/AllVideos'
import CreateVideoForm from '@/components/admin/CreateVideo'
import { Video as VideoIcon } from 'lucide-react'

const Video = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <AdminBack />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-3xl"></div>
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                <VideoIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Video Management
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
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
