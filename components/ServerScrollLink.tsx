'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface ServerScrollLinkProps {
  id: string
  title: string
}

const ServerScrollLink: React.FC<ServerScrollLinkProps> = ({ id, title }) => {
  const { locale } = useParams()
  return (
    <Link href={`/${locale}/blog/#${id}`}>
      <li>{title}</li>
    </Link>
  )
}

export default ServerScrollLink
