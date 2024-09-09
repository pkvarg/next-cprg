'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'next-intl'

const AdminBack = () => {
  const { locale } = useParams()
  const t = useTranslations('Home')
  return (
    <div className='p-4 text-[25px]'>
      <Link href={`/${locale}/admin`} className='text-white'>
        {t('adminBack')}
      </Link>
    </div>
  )
}

export default AdminBack
