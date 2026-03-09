import React from 'react'
import AdminNavbar from '@/components/admin/AdminNavbar'
import CreateBlogForm from '@/components/admin/CreateBlog'
import AllBlogs from '@/components/admin/AllBlogs'
import Counter from '@/components/admin/Counter'

const admin = async () => {
  return (
    <div className="min-h-screen bg-sacred-dark">
      <AdminNavbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 flex justify-center items-center flex-col gap-6 pt-8 pb-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-cormorant italic text-sacred-gold">
              Admin Dashboard
            </h1>
            <p className="text-xl text-sacred-cream/70 max-w-2xl mx-auto font-lato">
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
