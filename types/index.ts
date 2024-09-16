export interface AudioProps {
  title: string
  audioUrl: string
  podcastId: string
}

export interface AudioContextType {
  audio: AudioProps | undefined
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>
  scrollToPlayer: boolean
  setScrollToPlayer: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PodcastProps {
  id: string
  podcastTitle: string
  podcastDescription: string
  audioUrl: string
}

export interface PodcastCardProps {
  imgUrl: string
  title: string
  description: string
  podcastId: string
}

export interface PodcastDetailPlayerProps {
  audioUrl: string
  title: string
  podcastId: string
  description: string | null
}
