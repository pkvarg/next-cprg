'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Counter = () => {
  const [count, setCount] = useState(0)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const getVisitors = async () => {
    const { data } = await axios.get(
      `https://api.pictusweb.com/api/visitors/cba/counter`,

      // `http://localhost:2000/api/visitors/cba/counter`,

      config
    )

    setCount(data)
  }

  useEffect(() => {
    getVisitors()
  }, [])

  return (
    <div className='m-4 text-yellow-300 text-[30px]'>
      <h1>Visitors count: {count}</h1>
    </div>
  )
}

export default Counter
