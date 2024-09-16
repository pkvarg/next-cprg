'use server'
import db from '@/db/db'

interface PodcastData {
  title: string
  description: string | null // Allow null
  audioUrl: string
  category: string
  english: boolean
}

interface Podcast extends PodcastData {
  id: string
}

export async function create(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    console.log('here create')
    const data: PodcastData = {
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      audioUrl: formData.get('audioUrl')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      english: formData.get('english') === 'true',
    }

    await db.podcast.create({
      data,
    })

    return { success: true, message: 'Podcast created successfully' }
  } catch (error) {
    console.error('Error creating podcast:', error)
    return { success: false, message: 'Failed to create podcast' }
  }
}

export async function getAllPodcasts(): Promise<{
  allPodcasts: {}
  success: boolean
  message: string
}> {
  'use server'
  try {
    const allPodcasts = await db.podcast.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        audioUrl: true,
        english: true,
      },
      orderBy: { title: 'asc' },
    })
    return { allPodcasts, success: true, message: 'Podcasts success' }
  } catch (error) {
    console.error('Error getting podcasts:', error)
    return {
      allPodcasts: {},
      success: false,
      message: 'Failed to get podcasts',
    }
  }
}

export async function getSinglePodcast(podcastId: string): Promise<{
  podcast: Podcast | null
  success: boolean
  message: string
}> {
  'use server'
  try {
    const podcast = await db.podcast.findUnique({
      where: {
        id: podcastId,
      },
    })
    if (podcast) {
      return {
        podcast: podcast as Podcast,
        success: true,
        message: 'Podcasts success',
      }
    }
    return { podcast: null, success: true, message: 'Podcasts success' }
  } catch (error) {
    console.error('Error getting podcasts:', error)
    return { podcast: null, success: false, message: 'Failed to get podcasts' }
  }
}

export async function deleteSinglePodcast(
  podcastId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await db.podcast.delete({
      where: {
        id: podcastId,
      },
    })
    return { success: true, message: 'Podcast successfuly deleted' }
  } catch (error) {
    return { success: false, message: 'Podcast not deleted' }
  }
}

export async function editSinglePodcast(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    const data: Podcast = {
      id: formData.get('id')?.toString() || '',
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      audioUrl: formData.get('audioUrl')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      english: formData.get('english') === 'true',
    }

    if (!data.id) {
      throw new Error('Podcast ID is required')
    }

    await db.podcast.update({
      where: {
        id: data.id,
      },
      data,
    })

    return { success: true, message: 'Podcast updated successfully' }
  } catch (error) {
    console.error('Error updating podcast:', error)
    return { success: false, message: 'Failed to update podcast' }
  }
}
