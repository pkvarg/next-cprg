'use client'
import React, { useRef, useState } from 'react'
import Message from '../Message'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const Contact = () => {
  const t = useTranslations('Home')
  const { locale } = useParams()
  const [message, setMessage] = useState<string | null>(null)
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [mailMessage, setMailMessage] = useState('')
  const [checkBox, setCheckBox] = useState<boolean>(false)
  const [showGdpr, setShowGdpr] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const toggleShowGdpr = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowGdpr((prev) => !prev)
  }

  const handleCheckBox = () => {
    setCheckBox((current) => !current)
  }

  const form = useRef<HTMLFormElement>(null)
  const x = process.env.VITE_EMAIL_EXTRA_ONE
  const y = process.env.VITE_EMAIL_EXTRA_TWO
  const [passwordGroupOne, setPasswordGroupOne] = useState(x)
  const [passwordGroupTwo, setPasswordGroupTwo] = useState(y)

  const sendEmail = (e: any) => {
    e.preventDefault()

    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
      setMessage(t('contactError'))
      setName('')
      setEmail('')
      setPhone('')
      setMailMessage('')

      const element = document
        .getElementById('contact')
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      callContactApi(name, email, phone, mailMessage)
      const element = document.getElementById('contact')
      element?.scrollIntoView({ behavior: 'smooth' })
      setName('')
      setPhone('')
      setEmail('')
      setMailMessage('')
    }
  }

  const origin = 'MIESTNACIRKEV.SK'

  const callContactApi = async (
    name: string,
    email: string,
    phone: string,
    mailMessage: string
  ) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const { data } = await axios.put(
        'https://tss.pictusweb.com/email/universal/mailer',
        //'http://localhost:3010/email/universal/mailer',
        { name, email, phone, mailMessage, locale, origin },
        config
      )

      if (data.status === 'Success') {
        setMessageSuccess(t('contactMessageSuccess'))
      }
    } catch (error) {
      setMessage(t('contactError'))
      console.log(error)
    }
  }

  return (
    <>
      <div className='bg-[#80422C] h-8 lg:scroll-mt-14' id='contact'></div>
      <div className='bg-[#80422C] pt-8 lg:pt-16 pb-10 text-[25px] text-white'>
        <h1 className='text-[20px] lg:text-[25px] text-white text-center lg:pt-0 py-4'>
          {t('contactTitle')}
        </h1>
        <div className='mx-4 md:mx-6 lg:mx-0 flex lg:flex-row flex-col lg:justify-center items-center lg:gap-[10%] '>
          <div className='pt-[50px] lg:pt-0 lg:w-[30%]'>
            {messageSuccess && (
              <Message variant='success'>{messageSuccess}</Message>
            )}
            {message && <Message variant='danger'>{message}</Message>}
            <div>
              <form
                ref={form}
                onSubmit={sendEmail}
                className='flex flex-col gap-[2.5px]'
              >
                <div className='text-[18px]'>
                  <div className='flex flex-col'>
                    <label className='form-label mt-[2.5%] text-[20px]'>
                      {t('contactName')}
                    </label>
                    <input
                      className='form-control rounded-xl'
                      type='text'
                      name='user_name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />

                    <label className='form-label mt-[2.5%] text-[20px]'>
                      {t('contactEmail')}
                    </label>
                    <input
                      className='form-control rounded-xl'
                      type='email'
                      name='user_email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label className='form-label mt-[2.5%] text-[20px]'>
                      {' '}
                      {t('contactPhone')}
                    </label>
                    <input
                      className='form-control rounded-xl'
                      type='text'
                      name='user_phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label className='form-label mt-[2.5%] text-[20px]'>
                    {t('contactMessage')}
                  </label>
                  <textarea
                    className='form-control rounded-xl text-[#2e2236] text-[20px] pl-[10px]'
                    rows={5}
                    name='message'
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                    required
                  ></textarea>

                  <div className='flex flex-row form-check mt-8 items-center'>
                    <input
                      id='flexCheckDefault'
                      type='checkbox'
                      defaultChecked={false}
                      //value={checkBox}
                      onChange={handleCheckBox}
                      required
                      className='rounded-xl w-[25px] h-[25px] lg:h-[30px]'
                    />

                    <label
                      className='form-check-label text-[18px] lg:text-[18px] ml-[15px] mt-[3px]'
                      htmlFor='flexCheckDefault'
                    >
                      {t('contactAgree')}{' '}
                      <button
                        className='underline'
                        onClick={(e) => toggleShowGdpr(e)}
                      >
                        {t('contactGdpr')}{' '}
                      </button>
                      {showGdpr && (
                        <p className='w-[300px] lg:w-[240px] text-[18px] text-left mt-2 leading-6'>
                          {t('gdpr1')}
                        </p>
                      )}
                    </label>
                  </div>
                </div>
                <input
                  className='form-control hidden'
                  type='text'
                  defaultValue={passwordGroupOne}
                  onChange={(e) => setPasswordGroupOne(e.target.value)}
                />
                <input
                  className='form-control hidden'
                  type='text'
                  defaultValue={passwordGroupTwo}
                  onChange={(e) => setPasswordGroupTwo(e.target.value)}
                />
                <button
                  className='text-[20px] bg-violet mt-10 pt-[2.5px] rounded-xl border border-white hover:text-[#2e2236] hover:bg-white'
                  type='submit'
                  value='Send'
                >
                  {t('contactSend')}
                </button>
              </form>
            </div>
            <div></div>
          </div>
          <div className='lg:w-[30%] text-[20px]'>
            <h1 className='text-[25px] pb-4'> {t('contactRightTitle')}</h1>
            <p>
              {t('contactRightTue')}
              <span className='text-[15.5px]'>{t('contactRightTueDesc')}</span>
            </p>
            <p>
              {t('contactRightThu')}

              <span className='text-[15.5px]'>{t('contactRightThuDesc')}</span>
            </p>
            <p className='mb-4'>
              {t('contactRightSun')}

              <span className='text-[15.5px]'>{t('contactRightSunDesc')}</span>
            </p>

            <Link href={`${locale}/meetings`} className='underline text-[18px]'>
              {t('contactRightLink')}
            </Link>

            <p className='py-4 text-[17.5px]'>
              <a href='mailto:info@cirkevvpraze.cz'>
                Email: info@cirkevvpraze.cz
              </a>
            </p>

            {/* <h1 className='mt-14 text-center'>{t('contactInvite01')}</h1>
            <h2 className='text-center'>{t('contactInvite02')}</h2> */}
            <div className='mt-16 flex lg:ml-16 justify-center lg:mr-[15%]'></div>
            {/* <h3 className='mt-12 text-center'>
              {t('contactInvite03')}

              <span className='text-[17.5px] '>{t('contactInvite04')}</span>
            </h3> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
