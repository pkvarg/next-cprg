'use client'
import React, { useState, useEffect } from 'react'
//import Link from 'next/link'
import { Link } from '@/i18n/routing'
import LanguageBar from './LanguageBar'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

const Header = () => {
  const [navbar, setNavbar] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const t = useTranslations('Home')
  const { locale } = useParams()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      id="navbar"
      className={
        isSticky
          ? 'sticky top-0 w-full nav-font bg-sacred-dark/95 backdrop-blur-sm border-b border-sacred-gold/20 z-9999'
          : 'top-0 w-full nav-font'
      }
    >
      <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8">
        <div className="mb-0 lg:mb-2">
          <div className="flex items-center justify-between py-3 md:py-2 md:block">
            <Link href={'/'} className="font-cormorant text-[1.6rem] italic text-sacred-cream hover:text-sacred-gold transition-colors cursor-pointer">
              {t('headerTitle')}
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-sacred-cream rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center h-[80vh] lg:h-auto pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block bg-sacred-dark/95' : 'hidden'
            }`}
          >
            <ul className="justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-[0.95rem] font-lato font-light tracking-wide items-center">
              <li>
                <Link href={'#about'} className="text-sacred-cream/80 hover:text-sacred-gold transition-colors cursor-pointer">
                  {t('headerAbout')}
                </Link>
              </li>
              <li>
                <Link href={`/blog`} className="text-sacred-cream/80 hover:text-sacred-gold transition-colors cursor-pointer">
                  {t('headerBlog')}
                </Link>
              </li>
              <li>
                <Link href={'#events'} className="text-sacred-cream/80 hover:text-sacred-gold transition-colors cursor-pointer">
                  {t('headerEvents')}
                </Link>
              </li>

              <div className="group relative cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="text-sacred-cream/80 hover:text-sacred-gold transition-colors cursor-pointer">{t('headerGallery')}</p>
                </div>
                <div className="invisible absolute z-50 flex w-max flex-col px-4 py-1 bg-sacred-dark border border-sacred-gold/20 rounded shadow-lg group-hover:visible">
                  {/* <Link
                    href={`/gallery`}
                    className='cursor-pointer hover:text-red-600'
                  >
                    {t('headerPhotos')}
                  </Link> */}
                  <Link href={`/podcasts`} className="text-sacred-cream/80 hover:text-sacred-gold transition-colors cursor-pointer">
                    Audio
                  </Link>
                  <Link href={`/video`} className="text-sacred-cream/80 hover:text-sacred-gold transition-colors cursor-pointer">
                    Video
                  </Link>

                  <Link href={'/download'} className="text-sacred-cream/80 hover:text-sacred-gold transition-colors cursor-pointer">
                    {t('headerDownload')}
                  </Link>
                </div>
              </div>

              <li>
                <Link href={'#contact'} className="text-sacred-cream/80 hover:text-sacred-gold transition-colors cursor-pointer">
                  {t('headerContact')}
                </Link>
              </li>

              <li>
                <LanguageBar />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
