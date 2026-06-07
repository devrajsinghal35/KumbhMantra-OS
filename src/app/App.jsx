import { useMemo, useState } from 'react'
import Header from '@/components/layout/Header'
import TopMetrics from '@/components/layout/TopMetrics'
import TabNav from '@/components/layout/TabNav'
import DashboardShell from '@/components/layout/DashboardShell'
import Toast from '@/components/ui/Toast'
import OverviewTab from '@/features/overview/OverviewTab'
import IncidentsTab from '@/features/incidents/IncidentsTab'
import FleetTab from '@/features/fleet/FleetTab'
import AIIntelTab from '@/features/ai-intel/AIIntelTab'
import AnalyticsTab from '@/features/analytics/AnalyticsTab'
import useSystemClock from '@/hooks/useSystemClock'
import useSimulationEngine from '@/hooks/useSimulationEngine'
import useToast from '@/hooks/useToast'
import { formatNum } from '@/lib/format'
import { getAverageDensity, getCriticalCount, getWarningCount, getCriticalIncidents } from '@/lib/metrics'
import { densityToStatus } from '@/lib/status'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [networkMode, setNetworkMode] = useState('LIVE')
  const [heatmapMode, setHeatmapMode] = useState(false)
  const [selected, setSelected] = useState(null)

  const sysTime = useSystemClock()
  const { toast, showToast } = useToast()
  const { sectors, incidents, fleet, aiInsights, totalFootfall, footfallHistory, dispatchIncident } = useSimulationEngine()

  const critCount = getCriticalCount(sectors)
  const warnCount = getWarningCount(sectors)
  const incCritical = getCriticalIncidents(incidents)
  const avgDensity = getAverageDensity(sectors)

  const metrics = useMemo(() => ([
    { label: 'TOTAL FOOTFALL', value: formatNum(totalFootfall), sub: '+320/min', colorClass: 'text-sky-400', spark: footfallHistory },
    { label: 'ACTIVE INCIDENTS', value: incidents.length, sub: `${incCritical} critical`, colorClass: incCritical > 0 ? 'text-rose-400' : 'text-slate-400' },
    { label: 'CRITICAL SECTORS', value: `${critCount}/${sectors.length}`, sub: `${warnCount} warning`, colorClass: critCount > 0 ? 'text-rose-400' : 'text-emerald-400' },
    { label: 'AVG CROWD DENSITY', value: `${avgDensity}%`, sub: densityToStatus(avgDensity), colorClass: avgDensity > 80 ? 'text-rose-400' : avgDensity > 60 ? 'text-amber-400' : 'text-emerald-400' },
    { label: 'FLEET ACTIVE', value: '184/200', sub: '2 dispatched', colorClass: 'text-violet-400' },
  ]), [avgDensity, critCount, footfallHistory, incCritical, incidents.length, sectors.length, totalFootfall, warnCount])

  return (
    <div className="flex min-h-screen select-none flex-col bg-[#080d10] font-mono text-[13px] text-[#e2e8f0]">
      <Header sysTime={sysTime} networkMode={networkMode} onToggleNetwork={() => setNetworkMode((prev) => prev === 'LIVE' ? 'EDGE' : 'LIVE')} incCritical={incCritical} />
      <TopMetrics metrics={metrics} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} heatmapMode={heatmapMode} setHeatmapMode={setHeatmapMode} />
      <DashboardShell>
        {activeTab === 'overview' ? <OverviewTab sectors={sectors} incidents={incidents} selected={selected} setSelected={setSelected} heatmapMode={heatmapMode} dispatchIncident={dispatchIncident} showToast={showToast} /> : null}
        {activeTab === 'incidents' ? <IncidentsTab incidents={incidents} dispatchIncident={dispatchIncident} showToast={showToast} /> : null}
        {activeTab === 'fleet' ? <FleetTab fleet={fleet} showToast={showToast} /> : null}
        {activeTab === 'ai_intel' ? <AIIntelTab aiInsights={aiInsights} showToast={showToast} /> : null}
        {activeTab === 'analytics' ? <AnalyticsTab sectors={sectors} incidents={incidents} /> : null}
      </DashboardShell>
      <Toast toast={toast} />
    </div>
  )
}
