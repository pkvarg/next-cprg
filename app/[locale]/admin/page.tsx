import React from 'react'
import AdminNavbar from '@/components/admin/AdminNavbar'
import CreateBlogForm from '@/components/admin/CreateBlog'
import AllBlogs from '@/components/admin/AllBlogs'
import Counter from '@/components/admin/Counter'

const admin = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminNavbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Manage your content with style and efficiency
            </p>
          </div>

          {/* Stats Cards */}
          <div className="w-full max-w-6xl mx-auto px-4">
            <Counter />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-12 pb-20">
        <AllBlogs />
        <CreateBlogForm />
      </div>
    </div>
  )
}

export default admin
