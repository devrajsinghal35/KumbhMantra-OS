export default function IncidentsTab({ incidents, dispatchIncident, showToast }) {
  return (
    <div>
      <div className="mb-3 text-[11px] tracking-widest text-[#4a6275]">INCIDENT MANAGEMENT CENTER · {incidents.length} ACTIVE</div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {incidents.map((incident) => {
          const tone = incident.urgency === 'CRITICAL'
            ? { border: 'border-rose-600', bg: 'bg-[#2d0a0a]', text: 'text-rose-400' }
            : incident.urgency === 'HIGH'
              ? { border: 'border-amber-600', bg: 'bg-[#1c1500]', text: 'text-amber-400' }
              : incident.urgency === 'MEDIUM'
                ? { border: 'border-blue-600', bg: 'bg-[#0c1629]', text: 'text-blue-400' }
                : { border: 'border-slate-600', bg: 'bg-[#0f172a]', text: 'text-slate-400' }

          return (
            <div key={incident.id} className={`rounded-lg border p-4 ${tone.bg} ${tone.border}`}>
              <div className="mb-2 flex justify-between">
                <div>
                  <span className="mr-2 rounded bg-[#1e2d3d] px-1.5 py-0.5 text-[9px] text-[#94a3b8]">{incident.id}</span>
                  <span className={`rounded bg-black/20 px-1.5 py-0.5 text-[10px] font-bold ${tone.text}`}>{incident.urgency}</span>
                </div>
                <span className="text-[10px] text-[#4a6275]">{incident.ts}</span>
              </div>
              <div className={`mb-1 text-sm font-bold ${tone.text}`}>{incident.type}</div>
              <div className="mb-1.5 text-[11px] text-[#94a3b8]">📍 {incident.location}</div>
              <div className={`mb-3 border-l-2 pl-2 text-[11px] leading-relaxed text-[#64748b] ${tone.border}`}>{incident.detail}</div>
              <div className="flex gap-2">
                {incident.status === 'UNASSIGNED' ? (
                  <>
                    <button className="rounded bg-gradient-to-br from-orange-700 to-red-600 px-3 py-1 text-[11px] font-bold tracking-wider text-white" onClick={() => { const eta = dispatchIncident(incident.id); showToast(`Squad dispatched — ETA ${eta} min`, 'success') }}>DISPATCH SQUAD</button>
                    <button className="rounded bg-gradient-to-br from-blue-700 to-blue-600 px-3 py-1 text-[11px] font-bold tracking-wider text-white" onClick={() => showToast('Incident escalated to regional command', 'info')}>ESCALATE</button>
                  </>
                ) : (
                  <div className="flex items-center text-[10px] text-emerald-400">
                    <span className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {incident.responders} UNITS — ETA {incident.eta}min
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
