'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Counter = () => {
  const [countVisitors, setCountVisitors] = useState(0)
  const [countBots, setCountBots] = useState(0)
  const [countEmails, setCountEmails] = useState(0)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const apiUrl = 'https://hono-api.pictusweb.com/api/stats/cprg'
  //const apiUrl = 'http://localhost:3013/api/stats/cprg'

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await axios.get(apiUrl, config)
        setCountBots(data.bots)
        setCountVisitors(data.visitors)
        setCountEmails(data.emails)
      } catch (err) {
        console.error('Error fetching bots:', err)
      }
    }

    getStats()
  })

  return (
    <div className="m-4 text-yellow-300 text-[20px]">
      <p>Visitors: {countVisitors}</p>
      <p>Bots: {countBots}</p>
      <p>Emails: {countEmails}</p>
    </div>
  )
}

export default Counter
