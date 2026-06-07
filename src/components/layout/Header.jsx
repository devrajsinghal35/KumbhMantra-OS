import { formatClock } from '@/lib/format'

export default function Header({ sysTime, networkMode, onToggleNetwork, incCritical }) {
  return (
    <header className="relative z-50 flex h-[52px] shrink-0 items-center justify-between border-b border-[#1e2d3d] bg-[#0a1520] px-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent,transparent_2px,rgba(0,200,255,0.015)_2px,rgba(0,200,255,0.015)_4px)] bg-repeat" />
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <div className="pulse-dot absolute -left-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-orange-500 opacity-60" />
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
        </div>
        <div className="font-bebas text-[22px] tracking-wider text-white [text-shadow:0_0_20px_rgba(251,146,60,0.4)]">
          KUMBHMANTRA<span className="text-orange-500"> OS</span>
        </div>
        <div className="h-6 w-px bg-[#1e2d3d]" />
        <div className="leading-snug text-[11px]">
          <div className="font-medium text-[#64748b]">MAHAKUMBH 2028 · PRAYAGRAJ</div>
          <div className="text-[#4a6275]">UNIFIED OPERATIONS COMMAND</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right text-[11px] text-[#4a6275]">
          <div className="font-medium text-[#94a3b8]">{formatClock(sysTime)}</div>
          <div className={incCritical > 0 ? 'text-rose-400' : 'text-emerald-400'}>
            {incCritical > 0 ? `⚠ ${incCritical} CRITICAL ACTIVE` : '✓ SYSTEMS NOMINAL'}
          </div>
        </div>
        <button
          onClick={onToggleNetwork}
          className={`rounded border px-2.5 py-1 text-[10px] font-bold tracking-wider ${networkMode === 'LIVE' ? 'border-emerald-800 bg-emerald-950/10 text-emerald-400' : 'border-amber-800 bg-amber-950/10 text-amber-400'}`}
        >
          ● {networkMode}
        </button>
      </div>
    </header>
  )
}
