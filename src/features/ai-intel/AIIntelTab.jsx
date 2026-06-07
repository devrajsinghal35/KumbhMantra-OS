export default function AIIntelTab({ aiInsights, showToast }) {
  return (
    <div>
      <div className="mb-3 text-[11px] tracking-widest text-[#4a6275]">AI INTELLIGENCE PANEL · PREDICTIVE ANALYTICS + RECOMMENDATIONS</div>
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {aiInsights.map((insight) => {
          const tone = insight.type === 'alert'
            ? { border: 'border-rose-600', bg: 'bg-[#2d0a0a]', text: 'text-rose-400' }
            : insight.type === 'prediction'
              ? { border: 'border-amber-600', bg: 'bg-[#1c1500]', text: 'text-amber-400' }
              : insight.type === 'optimization'
                ? { border: 'border-emerald-600', bg: 'bg-[#051a0f]', text: 'text-emerald-400' }
                : { border: 'border-blue-600', bg: 'bg-[#0c1629]', text: 'text-blue-400' }

          return (
            <div key={insight.id} className={`rounded-lg border p-4 ${tone.bg} ${tone.border}`}>
              <div className="mb-2 flex items-start justify-between">
                <div className="text-2xl">{insight.icon}</div>
                <div className="text-right">
                  <div className="text-[9px] text-[#4a6275]">AI CONFIDENCE</div>
                  <div className={`text-lg font-bold ${tone.text}`}>{insight.confidence}%</div>
                </div>
              </div>
              <div className="mb-3 text-[11px] text-slate-200">{insight.text}</div>
              <div className="flex gap-2">
                <button className="rounded bg-gradient-to-br from-orange-700 to-red-600 px-3 py-1 text-[11px] font-bold tracking-wider text-white" onClick={() => showToast('Action accepted and queued', 'success')}>ACCEPT & ACT</button>
                <button className="rounded border border-[#1e2d3d] bg-slate-800/80 px-3 py-1 text-[11px] font-bold tracking-wider text-white" onClick={() => showToast('Insight dismissed', 'info')}>DISMISS</button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-lg border border-[#1e2d3d] bg-[#0d1520] p-4">
        <div className="mb-2.5 text-[11px] font-bold text-sky-400">AI CROWD FLOW PREDICTION — NEXT 60 MINUTES</div>
        <div className="flex h-20 items-end gap-1">
          {Array.from({ length: 12 }, (_, index) => {
            const baseVal = 40 + Math.sin(index * 0.8) * 20 + Math.random() * 15
            const isNow = index === 0
            const isFuture = index > 0
            return (
              <div key={index} className="flex flex-1 flex-col items-center gap-0.5">
                <div className={`w-full rounded-t-sm border ${isNow ? 'border-orange-500 bg-orange-500' : isFuture ? 'border-[#1e3a4a] bg-[#1e4a6a]' : 'border-[#1e3a4a] bg-[#0d2a3d]'}`} style={{ height: `${baseVal}%` }} />
                <div className="text-[8px] text-[#4a6275]">+{index * 5}m</div>
              </div>
            )
          })}
        </div>
        <div className="mt-2 flex gap-3 text-[9px] text-[#4a6275]">
          <span className="text-orange-500">■ NOW</span>
          <span className="text-[#1e4a6a]">■ PREDICTED</span>
          <span>Based on historical Kumbh patterns + live IoT telemetry</span>
        </div>
      </div>
    </div>
  )
}
