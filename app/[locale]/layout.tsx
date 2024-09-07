import type { Metadata } from 'next'
import { Yanone_Kaffeesatz, Lora } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import AudioProvider from '@/utils/AudioProvider'
import { cn } from '@/lib/utils'
import PodcastPlayer from '@/components/audio/PodcastPlayer'

//const inter = Yanone_Kaffeesatz({ subsets: ['latin'] })
const inter = Lora({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Církev v Praze',
  description: 'místní církev, církev v Praze',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    locale: string
  }
}>) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={params.locale} className='!scroll-smooth'>
        <head>
          <meta property='title' content='Církev v Praze' />
          <meta
            property='description'
            content='místní církev, církev v Praze'
          />

          <meta property='og:title' content='Církev v Praze' />
          <meta
            property='og:description'
            content='místní církev, církev v Praze'
          />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content='miestnacirkev.sk' />
          <meta property='og:url' content='https://www.miestnacirkev' />

          <meta
            property='og:image'
            content='https://www.miestnacirkev.sk/vineyardmeta.webp'
          />
          <meta property='og:image:type' content='png' />
          <meta property='og:image:width' content='400' />
          <meta property='og:image:height' content='400' />
          <meta property='og:image:alt' content='miestnacirkev.sk' />
          <meta property='fb:app_id' content='627076731624225' />
        </head>
        <AudioProvider>
          <body className={cn(inter.className)}>
            {children}

            <PodcastPlayer />
          </body>
        </AudioProvider>
      </html>
    </NextIntlClientProvider>
  )
}
