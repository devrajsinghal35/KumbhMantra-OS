import { useEffect, useState } from 'react'

export default function useSystemClock() {
  const [sysTime, setSysTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setSysTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return sysTime
}
