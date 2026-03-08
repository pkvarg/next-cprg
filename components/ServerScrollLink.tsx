'use client'
import { Link } from '@/i18n/routing'
import { useParams } from 'next/navigation'

interface ServerScrollLinkProps {
  id: string
  title: string
}

const ServerScrollLink: React.FC<ServerScrollLinkProps> = ({ id, title }) => {
  const { locale } = useParams()
  return (
    <Link href={`/blog/#${id}`}>
      <li className="font-lato text-[1rem] text-sacred-cream/80 hover:text-sacred-gold transition-colors list-none text-center lg:text-start">{title}</li>
    </Link>
  )
}

export default ServerScrollLink
