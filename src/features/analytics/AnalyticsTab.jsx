import { statusColor } from '@/lib/status'

export default function AnalyticsTab({ sectors, incidents }) {
  const incidentTypes = ['Crowd Surge', 'Medical Emergency', 'Infrastructure Failure', 'Lost Child', 'Fire Alert']
  const chartColors = ['bg-rose-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400', 'bg-violet-400']
  const textColors = ['text-rose-400', 'text-amber-400', 'text-blue-400', 'text-emerald-400', 'text-violet-400']

  return (
    <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
      <div className="rounded-lg border border-[#1e2d3d] bg-[#0d1520] p-4">
        <div className="mb-3 text-[11px] font-bold text-sky-400">SECTOR DENSITY COMPARISON</div>
        <div className="space-y-2">
          {sectors.map((sector) => {
            const colors = statusColor(sector.status)
            return (
              <div key={sector.id}>
                <div className="mb-0.5 flex justify-between text-[10px]">
                  <span className="text-[#94a3b8]">{sector.shortName}</span>
                  <span className="font-bold" style={{ color: colors.text }}>{sector.density}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#1e2d3d]">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${sector.density}%`, backgroundColor: colors.text }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-lg border border-[#1e2d3d] bg-[#0d1520] p-4">
        <div className="mb-3 text-[11px] font-bold text-sky-400">INCIDENT DISTRIBUTION</div>
        <div className="space-y-3">
          {incidentTypes.map((type, index) => {
            const count = incidents.filter((incident) => incident.type === type).length + Math.floor(Math.random() * 3)
            const pct = Math.min((count / 10) * 100, 100)
            return (
              <div key={type}>
                <div className="mb-1 flex justify-between text-[10px]">
                  <span className="text-[#94a3b8]">{type}</span>
                  <span className={`font-bold ${textColors[index]}`}>{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#1e2d3d]">
                  <div className={`h-full ${chartColors[index]}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
