import React from 'react'
import { LayoutDashboard } from 'lucide-react'
import AdminNavbar from '@/components/admin/AdminNavbar'
import CreateBlogForm from '@/components/admin/CreateBlog'
import AllBlogs from '@/components/admin/AllBlogs'
import Counter from '@/components/admin/Counter'

const admin = async () => {
  return (
    <div className="min-h-screen bg-sacred-dark font-lato">
      <AdminNavbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sacred-gold/5 to-sacred-terracotta/5"></div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 pt-12 pb-10">
          <p className="font-cormorant italic text-[0.85rem] uppercase tracking-[0.3em] text-sacred-gold">
            Admin
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-sm bg-sacred-gold/15 border border-sacred-gold/30">
              <LayoutDashboard className="w-7 h-7 text-sacred-gold" />
            </div>
            <h1 className="font-cormorant font-semibold italic text-[2.4rem] md:text-[3rem] text-sacred-cream tracking-wide">
              Dashboard
            </h1>
          </div>
          <p className="text-sacred-cream/60 max-w-2xl mx-auto text-center font-lato">
            Manage blogs, events and stats from here.
          </p>

          <div className="w-full max-w-6xl mx-auto px-4 mt-6">
            <Counter />
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-20 space-y-16">
        <AllBlogs />
        <CreateBlogForm />
      </div>
    </div>
  )
}

export default admin
