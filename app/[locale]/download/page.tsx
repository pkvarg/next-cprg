'use client'
import PagesHeader from '@/components/PagesHeader'
import React, { useState, useEffect } from 'react'
import { Download, FileText, AlertCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const DownloadPage = () => {
  const t = useTranslations('Download')
  const locale = useLocale()
  const { locale: paramLocale } = useParams()
  const [pdfUrl, setPdfUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Configuration based on locale
  const getConfig = () => {
    const currentLocale = locale || paramLocale

    if (currentLocale === 'en') {
      return {
        PDF_FILENAME: 'mystery.pdf',
        PDF_TITLE: t('titleEn'),
        PDF_DESCRIPTION: t('descriptionEn'),
      }
    } else {
      return {
        PDF_FILENAME: 'tajemstvi.pdf',
        PDF_TITLE: t('titleCs'),
        PDF_DESCRIPTION: t('descriptionCs'),
      }
    }
  }

  const { PDF_FILENAME, PDF_TITLE, PDF_DESCRIPTION } = getConfig()

  useEffect(() => {
    // Set the PDF URL from public folder
    const url = `/${PDF_FILENAME}`
    setPdfUrl(url)

    // Check if PDF exists by trying to fetch it
    fetch(url, { method: 'HEAD' })
      .then((response) => {
        if (response.ok) {
          setLoading(false)
        } else {
          setError(t('errorNotFound'))
          setLoading(false)
        }
      })
      .catch(() => {
        setError(t('errorLoading'))
        setLoading(false)
      })
  }, [locale, paramLocale, PDF_FILENAME, t])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = PDF_FILENAME
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sacred-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sacred-gold mx-auto mb-4"></div>
          <p className="text-sacred-cream/60 font-lato">{t('loading')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sacred-dark flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-sacred-gold mx-auto mb-4" />
          <h2 className="font-cormorant text-[1.5rem] italic text-sacred-cream mb-2">{t('errorTitle')}</h2>
          <p className="text-sacred-cream/60 font-lato mb-4">{error}</p>
          <p className="text-sacred-muted font-lato text-[0.85rem]">
            {t('errorInstruction', { filename: PDF_FILENAME })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="podcastpage min-h-screen overflow-x-hidden">
      <PagesHeader />
      <h1 className="font-cormorant text-[2rem] italic text-sacred-gold text-center mt-8">{t('pageTitle')}</h1>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <FileText className="h-12 w-12 text-sacred-gold mx-auto mb-4" />
          <h1 className="font-cormorant text-[2rem] italic text-sacred-cream text-center mb-2">{PDF_TITLE}</h1>
          <p className="font-lato text-sacred-cream/70 text-[1rem] text-center max-w-xl mx-auto">{PDF_DESCRIPTION}</p>
        </div>

        {/* PDF Preview and Download Section */}
        <div className="bg-sacred-deep rounded-lg border border-sacred-gold/20 overflow-hidden">
          <div className="p-4 lg:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-cormorant text-[1.3rem] text-sacred-cream">{t('preview')}</h2>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-5 py-2 bg-sacred-terracotta text-sacred-cream font-lato text-[0.9rem] tracking-wider rounded hover:bg-sacred-gold hover:text-sacred-dark transition-colors cursor-pointer"
              >
                <Download className="h-5 w-5 mr-2" />
                {t('downloadButton')}
              </button>
            </div>

            {/* PDF Preview */}
            <div className="bg-sacred-dark rounded border border-sacred-gold/10 p-2">
              <div className="w-full" style={{ height: '600px' }}>
                <iframe
                  src={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-0 rounded"
                  title="PDF Preview"
                  onError={() => setError(t('errorPreview'))}
                >
                  <p className="text-center text-sacred-cream/60 mt-8">
                    {t('browserNotSupported')}{' '}
                    <button onClick={handleDownload} className="text-sacred-gold hover:underline">
                      {t('clickToDownload')}
                    </button>
                  </p>
                </iframe>
              </div>
            </div>

            {/* Download Info */}
            <div className="mt-6 p-4 bg-sacred-deep rounded border border-sacred-gold/20">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Download className="h-5 w-5 text-sacred-gold mt-0.5" />
                </div>
                <div className="ml-3">
                  <h3 className="font-cormorant text-[1.1rem] text-sacred-gold">{t('downloadInfoTitle')}</h3>
                  <p className="font-lato text-sacred-cream/70 text-[0.9rem] mt-1">{t('downloadInfoDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage
