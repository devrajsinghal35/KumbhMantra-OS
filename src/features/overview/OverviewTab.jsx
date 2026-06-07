import Sparkline from '@/components/ui/Sparkline'
import RadialGauge from '@/components/ui/RadialGauge'
import { formatNum } from '@/lib/format'
import { statusColor } from '@/lib/status'

export default function OverviewTab({ sectors, incidents, selected, setSelected, heatmapMode, dispatchIncident, showToast }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="text-[11px] tracking-widest text-[#4a6275]">SECTOR TELEMETRY GRID · {sectors.length} ZONES ACTIVE</div>
          <div className="flex gap-2.5 text-[10px] text-[#4a6275]">
            <span className="text-rose-400">■ CRITICAL</span>
            <span className="text-amber-400">■ WARNING</span>
            <span className="text-emerald-400">■ STABLE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => {
            const colors = statusColor(sector.status)
            const isSelected = selected?.id === sector.id

            return (
              <button
                key={sector.id}
                onClick={() => setSelected(isSelected ? null : sector)}
                className={`group relative overflow-hidden rounded-lg border bg-[#0d1520] p-3 text-left transition-all duration-200 ${isSelected ? 'scale-[1.01] ring-1 ring-orange-500' : ''}`}
                style={{ borderColor: isSelected ? '#f97316' : colors.border }}
              >
                {heatmapMode ? <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.text}22, transparent 70%)` }} /> : null}
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="mb-0.5 text-[10px] text-[#4a6275]">{sector.type.toUpperCase()} · {sector.id}</div>
                    <div className="text-xs font-bold leading-tight text-slate-200">{sector.shortName}</div>
                  </div>
                  <span className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ backgroundColor: colors.badge, color: colors.badgeText }}>
                    {sector.status}
                  </span>
                </div>

                <div className="mb-1.5 flex items-center gap-2">
                  <RadialGauge value={sector.density} color={colors.text} size={48} />
                  <div>
                    <div className="text-lg font-bold leading-none" style={{ color: colors.text }}>{sector.density}%</div>
                    <div className="text-[9px] text-[#4a6275]">DENSITY</div>
                    <div className="mt-0.5 text-[10px] text-slate-400">{formatNum(Math.round((sector.cap * sector.density) / 100))}/{formatNum(sector.cap)}</div>
                  </div>
                  <div className="ml-auto">
                    <Sparkline data={sector.history} color={colors.text} width={50} height={28} />
                  </div>
                </div>
                <div className="h-0.5 overflow-hidden rounded bg-[#1e2d3d]">
                  <div className="h-full transition-all duration-500" style={{ width: `${sector.density}%`, backgroundColor: colors.text }} />
                </div>
              </button>
            )
          })}
        </div>

        {selected ? (
          <div className="mt-3 rounded-lg border bg-[#0d1520] p-3.5" style={{ borderColor: statusColor(selected.status).border }}>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-200">
                SECTOR DETAIL: <span style={{ color: statusColor(selected.status).text }}>{selected.name}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-base text-[#4a6275]">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { label: 'CAPACITY', value: `${formatNum(selected.cap)} pax` },
                { label: 'CURRENT LOAD', value: `${formatNum(Math.round((selected.cap * selected.density) / 100))} pax` },
                { label: 'DENSITY INDEX', value: `${selected.density}%` },
                { label: 'EVAC CLEARANCE', value: selected.density > 80 ? 'ALPHA_CRITICAL' : selected.density > 60 ? 'BRAVO_DELAYED' : 'OPTIMAL_OMNI' },
              ].map((metric) => (
                <div key={metric.label} className="rounded-md border border-[#1e2d3d] bg-[#080d10] p-2.5 px-3">
                  <div className="mb-1 text-[9px] text-[#4a6275]">{metric.label}</div>
                  <div className="font-bold" style={{ color: statusColor(selected.status).text }}>{metric.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <button className="rounded bg-gradient-to-br from-orange-700 to-red-600 px-3 py-1.5 text-[11px] font-bold tracking-wider text-white" onClick={() => showToast(`Crowd control squad deployed to ${selected.shortName}`, 'success')}>DEPLOY CROWD CONTROL</button>
              <button className="rounded bg-gradient-to-br from-blue-700 to-blue-600 px-3 py-1.5 text-[11px] font-bold tracking-wider text-white" onClick={() => showToast(`Medical team alerted for ${selected.shortName}`, 'info')}>ALERT MEDICAL TEAM</button>
              <button className="rounded bg-gradient-to-br from-emerald-800 to-emerald-700 px-3 py-1.5 text-[11px] font-bold tracking-wider text-white" onClick={() => showToast(`Evacuation protocol initiated for ${selected.shortName}`, 'warning')}>INITIATE EVAC PROTOCOL</button>
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <div className="mb-2.5 text-[11px] tracking-widest text-[#4a6275]">LIVE INCIDENT TRIAGE · {incidents.length} PENDING</div>
        <div className="space-y-2 overflow-y-auto">
          {incidents.length === 0 ? (
            <div className="p-10 text-center text-[11px] text-emerald-400">
              <div className="mb-2 text-2xl">✓</div>
              ALL CLEAR — NO ACTIVE INCIDENTS
            </div>
          ) : incidents.map((incident) => {
            const urgencyClass = incident.urgency === 'CRITICAL' ? 'text-rose-500 border-l-rose-600' : incident.urgency === 'HIGH' ? 'text-amber-500 border-l-amber-500' : incident.urgency === 'MEDIUM' ? 'text-blue-500 border-l-blue-500' : 'text-slate-500 border-l-slate-500'
            return (
              <div key={incident.id} className={`rounded-r-md border-l-4 bg-[#0d1520] p-3 ${incident.status === 'RESOLVING' ? 'opacity-50' : ''} ${urgencyClass.split(' ')[1]}`}>
                <div className="mb-1 flex justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-[#1e2d3d] px-1.5 py-0.5 text-[9px] text-[#94a3b8]">{incident.id}</span>
                    <span className={`text-[10px] font-bold ${urgencyClass.split(' ')[0]}`}>{incident.type.toUpperCase()}</span>
                  </div>
                  <span className="text-[10px] text-[#4a6275]">{incident.ts}</span>
                </div>
                <div className="mb-0.5 text-[11px] font-medium text-[#e2e8f0]">{incident.location}</div>
                <div className="mb-2 text-[10px] leading-normal text-[#64748b]">{incident.detail}</div>
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] ${incident.status === 'RESOLVING' ? 'text-emerald-400' : 'text-[#94a3b8]'}`}>
                    {incident.status === 'RESOLVING' ? `● RESOLVING — ${incident.responders} UNITS ETA ${incident.eta}min` : `● ${incident.status}`}
                  </span>
                  {incident.status === 'UNASSIGNED' ? (
                    <button
                      className="rounded bg-gradient-to-br from-orange-700 to-red-600 px-3 py-1 text-[11px] font-bold tracking-wider text-white"
                      onClick={() => {
                        const eta = dispatchIncident(incident.id)
                        showToast(`Squad dispatched — ETA ${eta} min`, 'success')
                      }}
                    >
                      DISPATCH
                    </button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
