export default function FleetTab({ fleet, showToast }) {
  return (
    <div>
      <div className="mb-3 text-[11px] tracking-widest text-[#4a6275]">FLEET DEPLOYMENT TRACKER · {fleet.length} VEHICLES TRACKED</div>
      <div className="overflow-hidden rounded-lg border border-[#1e2d3d] bg-[#0d1520]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#1e2d3d] bg-[#080d10]">
              {['ASSET ID', 'TYPE', 'ROUTE', 'LOAD', 'STATUS', 'ACTIONS'].map((header) => (
                <th key={header} className="p-2.5 px-3.5 text-left text-[9px] font-bold tracking-widest text-[#4a6275]">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fleet.map((vehicle, index) => {
              const loadPct = Math.round((vehicle.load / vehicle.cap) * 100)
              const statusColor = vehicle.status === 'DISPATCHED' ? '#fbbf24' : vehicle.status === 'STANDBY' ? '#94a3b8' : '#38bdf8'

              return (
                <tr key={vehicle.id} className={`border-b border-[#1e2d3d] ${index % 2 === 0 ? 'bg-[#0d1520]' : 'bg-[#0a1018]'}`}>
                  <td className="p-3 px-3.5 text-xs font-bold text-orange-500">{vehicle.id}</td>
                  <td className="p-3 px-3.5 text-[11px] text-slate-200">{vehicle.type}</td>
                  <td className="p-3 px-3.5 text-[11px] text-[#64748b]">{vehicle.route}</td>
                  <td className="p-3 px-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-[60px] overflow-hidden rounded bg-[#1e2d3d]">
                        <div className={`h-full ${loadPct > 80 ? 'bg-rose-400' : 'bg-sky-400'}`} style={{ width: `${loadPct}%` }} />
                      </div>
                      <span className="text-[11px] text-[#94a3b8]">{vehicle.load}/{vehicle.cap}</span>
                    </div>
                  </td>
                  <td className="p-3 px-3.5">
                    <span className="rounded border border-black/10 bg-black/20 px-2 py-0.5 text-[9px] font-bold tracking-wider" style={{ color: statusColor, borderColor: `${statusColor}44` }}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="p-3 px-3.5">
                    <button className="rounded bg-gradient-to-br from-orange-700 to-red-600 px-3 py-1 text-[10px] font-bold tracking-wider text-white" onClick={() => showToast(`${vehicle.id} rerouted`, 'success')}>REROUTE</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
