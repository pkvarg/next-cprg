'use server'
import db from '@/db/db'

interface VideoData {
  title: string
  url: string
  category: string
  english: boolean
}

interface Video extends VideoData {
  id: string
}

export async function create(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    console.log('here create')
    const data: VideoData = {
      title: formData.get('title')?.toString() || '',
      url: formData.get('url')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      english: formData.get('english') === 'true',
    }

    await db.video.create({
      data,
    })

    return { success: true, message: 'Video created successfully' }
  } catch (error) {
    console.error('Error creating video:', error)
    return { success: false, message: 'Failed to create video' }
  }
}

export async function getAllVideos(): Promise<{
  allVideos: {}
  success: boolean
  message: string
}> {
  'use server'
  try {
    const allVideos = await db.video.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        url: true,
        english: true,
      },
      orderBy: { title: 'asc' },
    })
    return { allVideos, success: true, message: 'Videos success' }
  } catch (error) {
    console.error('Error getting videos:', error)
    return {
      allVideos: {},
      success: false,
      message: 'Failed to get videos',
    }
  }
}

export async function getSingleVideo(videoId: string): Promise<{
  video: Video | null
  success: boolean
  message: string
}> {
  'use server'
  try {
    const video = await db.video.findUnique({
      where: {
        id: videoId,
      },
    })
    if (video) {
      return {
        video: video as Video,
        success: true,
        message: 'Videos success',
      }
    }
    return { video: null, success: true, message: 'Videos success' }
  } catch (error) {
    console.error('Error getting videos:', error)
    return { video: null, success: false, message: 'Failed to get videos' }
  }
}

export async function deleteSingleVideo(
  videoId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await db.video.delete({
      where: {
        id: videoId,
      },
    })
    return { success: true, message: 'Video successfuly deleted' }
  } catch (error) {
    return { success: false, message: 'Video not deleted' }
  }
}

export async function editSingleVideo(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    const data: Video = {
      id: formData.get('id')?.toString() || '',
      title: formData.get('title')?.toString() || '',
      url: formData.get('url')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      english: formData.get('english') === 'true',
    }

    if (!data.id) {
      throw new Error('Video ID is required')
    }

    await db.video.update({
      where: {
        id: data.id,
      },
      data,
    })

    return { success: true, message: 'Video updated successfully' }
  } catch (error) {
    console.error('Error updating video:', error)
    return { success: false, message: 'Failed to update video' }
  }
}
