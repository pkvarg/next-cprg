'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  }, [])

  const stats = [
    {
      name: 'Visitors',
      value: countVisitors,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
    },
    {
      name: 'Bots',
      value: countBots,
      icon: Bot,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
    },
    {
      name: 'Emails',
      value: countEmails,
      icon: Mail,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-slate-800/50 rounded-xl h-32 border border-slate-700/50"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.name}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} p-6 hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">{stat.name}</p>
                <p
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Animated background effect */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-white/5 to-white/10 blur-xl"></div>
          </div>
        )
      })}
    </div>
  )
}

export default Counter
