import { useEffect, useMemo, useState } from 'react'
import { INCIDENT_TYPES } from '@/app/constants'
import { SECTORS } from '@/data/sectors'
import { SAMPLE_INCIDENTS } from '@/data/incidents'
import { FLEET } from '@/data/fleet'
import { AI_INSIGHTS } from '@/data/insights'
import { densityToStatus } from '@/lib/status'

const buildSectorState = () => SECTORS.map((sector) => ({
  ...sector,
  status: densityToStatus(sector.density),
  history: Array.from({ length: 20 }, () => sector.density + (Math.random() - 0.5) * 10),
}))

export default function useSimulationEngine() {
  const [sectors, setSectors] = useState(buildSectorState)
  const [incidents, setIncidents] = useState(SAMPLE_INCIDENTS)
  const [fleet] = useState(FLEET)
  const [totalFootfall, setTotalFootfall] = useState(3842190)
  const [footfallHistory, setFootfallHistory] = useState(Array.from({ length: 30 }, (_, i) => 3700000 + i * 5000 + Math.random() * 10000))

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalFootfall((prev) => {
        const next = prev + Math.floor(Math.random() * 30) - 5
        setFootfallHistory((history) => [...history.slice(1), next])
        return next
      })

      setSectors((prev) => prev.map((sector) => {
        const delta = (Math.random() - 0.48) * 4
        const density = Math.min(Math.max(sector.density + delta, 5), 99)
        return {
          ...sector,
          density: Math.round(density),
          status: densityToStatus(density),
          history: [...sector.history.slice(1), density],
        }
      }))

      if (Math.random() > 0.88) {
        const type = INCIDENT_TYPES[Math.floor(Math.random() * INCIDENT_TYPES.length)]
        const urgency = ['HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 3)]
        const location = SECTORS[Math.floor(Math.random() * SECTORS.length)].name
        const ts = new Date().toTimeString().slice(0, 8)
        setIncidents((prev) => [{
          id: `INC-${200 + Math.floor(Math.random() * 800)}`,
          type,
          location,
          urgency,
          status: 'UNASSIGNED',
          ts,
          detail: 'Automated beacon alert — field verification required.',
          responders: 0,
          eta: null,
        }, ...prev].slice(0, 8))
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const dispatchIncident = (id) => {
    const eta = 3 + Math.floor(Math.random() * 7)
    setIncidents((prev) => prev.map((incident) => incident.id === id ? {
      ...incident,
      status: 'RESOLVING',
      responders: 2 + Math.floor(Math.random() * 4),
      eta,
    } : incident))

    setTimeout(() => {
      setIncidents((prev) => prev.filter((incident) => incident.id !== id))
    }, 8000)

    return eta
  }

  return useMemo(() => ({
    sectors,
    incidents,
    fleet,
    aiInsights: AI_INSIGHTS,
    totalFootfall,
    footfallHistory,
    dispatchIncident,
  }), [sectors, incidents, fleet, totalFootfall, footfallHistory])
}
