import { useRouter } from 'next/navigation'
import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const LanguageBar = () => {
  const router = useRouter()

  const pathname = usePathname()

  const path = pathname.slice(4)

  //console.log('pp', extractedPath)

  const handleLanguage = (lang: string) => {
    router.replace(`/${lang}/${path}`)
  }

  return (
    <div className='flex flex-row gap-3 items-center mt-[0px]'>
      <button onClick={() => handleLanguage('en')}>
        <Image
          className='w-[3rem] md:w-[3rem] lg:w-[2rem]'
          src='/flags/english.webp'
          alt='english'
          height={20}
          width={20}
        />
      </button>

      <button onClick={() => handleLanguage('cz')}>
        <Image
          className='w-[3rem] md:w-[3rem] lg:w-[2rem]'
          src='/flags/czech.webp'
          alt='czech'
          height={20}
          width={20}
        />
      </button>
    </div>
  )
}

export default LanguageBar
