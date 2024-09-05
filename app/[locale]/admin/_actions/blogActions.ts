'use server'
import db from '@/db/db'

interface BlogData {
  title: string
  category: string
  media: string
  text: string
  upcoming: boolean
  english: boolean
  link: string
}

interface Blog extends BlogData {
  id: string
}

export async function create(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    const data: BlogData = {
      title: formData.get('title')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      media: formData.get('media')?.toString() || '',
      text: formData.get('text')?.toString() || '',
      upcoming: formData.get('upcoming') === 'true',
      english: formData.get('english') === 'true',
      link: formData.get('link')?.toString() || '',
    }

    await db.blog.create({
      data,
    })

    return { success: true, message: 'Blog created successfully' }
  } catch (error) {
    console.error('Error creating blog:', error)
    return { success: false, message: 'Failed to create blog' }
  }
}

export async function getAllBlogs(): Promise<{
  allBlogs: {}
  success: boolean
  message: string
}> {
  'use server'
  try {
    const allBlogs = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        media: true,
        text: true,
        upcoming: true,
        english: true,
        link: true,
      },
      orderBy: { title: 'asc' },
    })
    return { allBlogs, success: true, message: 'Blogs success' }
  } catch (error) {
    console.error('Error getting blogs:', error)
    return { allBlogs: {}, success: false, message: 'Failed to get blogs' }
  }
}

export async function getSingleBlog(blogId: string): Promise<{
  blog: Blog | null
  success: boolean
  message: string
}> {
  'use server'
  try {
    const blog = await db.blog.findUnique({
      where: {
        id: blogId,
      },
    })
    if (blog) {
      return { blog, success: true, message: 'Blogs success' }
    }
    return { blog: null, success: true, message: 'Blogs success' }
  } catch (error) {
    console.error('Error getting blogs:', error)
    return { blog: null, success: false, message: 'Failed to get blogs' }
  }
}

export async function deleteSingleBlog(
  blogId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await db.blog.delete({
      where: {
        id: blogId,
      },
    })
    return { success: true, message: 'Blog successfuly deleted' }
  } catch (error) {
    return { success: false, message: 'Blog not deleted' }
  }
}

export async function editSingleBlog(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    const data: Blog = {
      id: formData.get('id')?.toString() || '',
      title: formData.get('title')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      media: formData.get('media')?.toString() || '',
      text: formData.get('text')?.toString() || '',
      upcoming: formData.get('upcoming') === 'true',
      english: formData.get('english') === 'true',
      link: formData.get('link')?.toString() || '',
    }

    if (!data.id) {
      throw new Error('Blog ID is required')
    }

    await db.blog.update({
      where: {
        id: data.id,
      },
      data,
    })

    return { success: true, message: 'Blog updated successfully' }
  } catch (error) {
    console.error('Error updating blog:', error)
    return { success: false, message: 'Failed to update blog' }
  }
}
