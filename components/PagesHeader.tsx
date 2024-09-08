'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import LanguageBar from './LanguageBar'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface HeaderPagesProps {
  setShowContact: React.Dispatch<React.SetStateAction<boolean>>
}

const PagesHeader = () => {
  const t = useTranslations('Home')
  const [navbar, setNavbar] = useState(false)
  const [showBlog, setShowBlog] = useState(false)
  const { locale } = useParams()

  return (
    <nav
      id='navbar'
      className={'top-0  w-full text-white nav-font bg-[#733b28]'}
    >
      <div className='justify-between px-4 mx-auto md:items-center md:flex md:px-8'>
        <div className='mb-0 lg:mb-2'>
          <div className='flex items-center justify-between py-3 md:py-2 md:block'>
            <Link className='text-[25px] font-normal' href={`/${locale}`}>
              {t('headerPagesHome')}
            </Link>
            <div className='md:hidden'>
              <button
                className='p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-10 h-10'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-10 h-10'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
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
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className='justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-[20px] lg:text-[20px] items-center'>
              <div className='group relative  cursor-pointer'>
                <div className='flex items-center justify-between'>
                  <p className='hover:text-red-600'>{t('headerGallery')}</p>
                </div>
                <div className='invisible absolute z-50 flex w-max flex-col px-4 py-1 text-white shadow-xl group-hover:visible group-hover:bg-[#000000]'>
                  {/* <Link
                    href={`/${locale}/gallery`}
                    className='cursor-pointer hover:text-red-600'
                  >
                    {t('headerPhotos')}
                  </Link> */}
                  <Link
                    href={`/${locale}/podcasts`}
                    className='cursor-pointer hover:text-red-600'
                  >
                    Audio
                  </Link>
                  <Link
                    href={`/${locale}/video`}
                    className='cursor-pointer hover:text-red-600'
                  >
                    Video
                  </Link>

                  {/* <Link
                      href={`/${locale}/download`}
                      className='hover:text-red-600'
                    >
                      {t('headerDownload')}
                    </Link> */}
                </div>
              </div>

              <li>
                <a
                  href='https://www.proudzivota.cz'
                  className='hover:text-red-600 cursor-pointer'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Eshop proudzivota.cz
                </a>
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

export default PagesHeader
