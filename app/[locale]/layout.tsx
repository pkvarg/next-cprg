import type { Metadata } from 'next'
import { Lora, Cormorant_Garamond, Lato } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import AudioProvider from '@/utils/AudioProvider'
import { cn } from '@/lib/utils'
import PodcastPlayer from '@/components/audio/PodcastPlayer'
import ScrollToTop from '@/components/ScrollToTop'

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: 'Církev v Praze',
  description: 'místní církev, církev v Praze',
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode
    params: {
      locale: string
    }
  }>,
) {
  const params = await props.params

  const { children } = props

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <html
        lang={params.locale}
        className={cn('!scroll-smooth', lora.variable, cormorant.variable, lato.variable)}
      >
        <head>
          <meta property="title" content="Církev v Praze" />
          <meta property="description" content="místní církev, církev v Praze" />

          <meta property="og:title" content="Církev v Praze" />
          <meta property="og:description" content="místní církev, církev v Praze" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="cirkevvpraze.cz" />
          <meta property="og:url" content="https://www.cirkevvpraze.cz" />

          <meta property="og:image" content="https://www.cirkevvpraze.cz/cprg_meta.webp" />
          <meta property="og:image:type" content="png" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
          <meta property="og:image:alt" content="cirkevvpraze.cz" />
          <meta property="fb:app_id" content="627076731624225" />
        </head>
        <AudioProvider>
          <body className={cn(lora.className)}>
            {children}

            <PodcastPlayer />
            <ScrollToTop />
          </body>
        </AudioProvider>
      </html>
    </NextIntlClientProvider>
  )
}
