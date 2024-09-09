import React from 'react'

import AdminNavbar from '@/components/admin/AdminNavbar'
import CreateBlogForm from '@/components/admin/CreateBlog'
import AllBlogs from '@/components/admin/AllBlogs'
import Counter from '@/components/admin/Counter'

const admin = async () => {
  return (
    <div className='text-white text-[25px]'>
      <AdminNavbar />
      <div className='flex justify-center items-center flex-col gap-2 mt-4'>
        <h1>Hello Admin</h1>
        <Counter />
      </div>

      <AllBlogs />
      <CreateBlogForm />
    </div>
  )
}

export default admin
