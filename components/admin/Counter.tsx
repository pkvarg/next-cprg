'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Users, Bot, Mail, TrendingUp } from 'lucide-react'

const Counter = () => {
  const [countVisitors, setCountVisitors] = useState(0)
  const [countBots, setCountBots] = useState(0)
  const [countEmails, setCountEmails] = useState(0)
  const [loading, setLoading] = useState(true)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const apiUrl = 'https://hono-api.pictusweb.com/api/stats/cprg'

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await axios.get(apiUrl, config)
        setCountBots(data.bots)
        setCountVisitors(data.visitors)
        setCountEmails(data.emails)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    getStats()
  })

  const stats = [
    {
      name: 'Visitors',
      value: countVisitors,
      icon: Users,
    },
    {
      name: 'Bots',
      value: countBots,
      icon: Bot,
    },
    {
      name: 'Emails',
      value: countEmails,
      icon: Mail,
    },
    {
      name: 'Analytics',
      value: null,
      icon: TrendingUp,
      isLink: true,
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-sacred-deep rounded-sm h-32 border border-sacred-gold/20"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        const CardContent = (
          <div className="relative overflow-hidden rounded-sm bg-sacred-deep border border-sacred-gold/20 p-6 hover:border-sacred-gold/40 hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-cormorant italic text-[0.8rem] uppercase tracking-[0.25em] text-sacred-muted">
                  {stat.name}
                </p>
                {stat.value !== null ? (
                  <p className="font-cormorant text-3xl font-semibold mt-1 text-sacred-gold">
                    {stat.value.toLocaleString()}
                  </p>
                ) : (
                  <p className="text-sacred-cream/70 text-sm font-lato mt-1">View Dashboard</p>
                )}
              </div>
              <div className="p-3 rounded-sm bg-sacred-gold/15 border border-sacred-gold/30">
                <Icon className="w-6 h-6 text-sacred-gold" />
              </div>
            </div>
          </div>
        )

        if (stat.isLink) {
          return (
            <Link
              key={stat.name}
              href="https://analytics.pictusweb.com/share/KkcE727xQQoyzTbx/cirkevvpraze.cz"
              target="_blank"
              rel="noopener noreferrer"
            >
              {CardContent}
            </Link>
          )
        }

        return <div key={stat.name}>{CardContent}</div>
      })}
    </div>
  )
}

export default Counter
