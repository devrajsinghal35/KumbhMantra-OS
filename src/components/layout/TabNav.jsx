import { APP_TABS } from '@/app/constants'

export default function TabNav({ activeTab, setActiveTab, heatmapMode, setHeatmapMode }) {
  return (
    <div className="flex border-b border-[#1e2d3d] bg-[#0a1520] px-5">
      {APP_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`border-b-2 p-2.5 px-4 text-xs font-medium uppercase tracking-wider ${activeTab === tab ? 'border-b-sky-400 text-sky-400' : 'border-transparent text-[#64748b] hover:text-slate-400'}`}
        >
          {tab.replace('_', ' ')}
        </button>
      ))}
      <div className="ml-auto flex items-center">
        <button
          onClick={() => setHeatmapMode((prev) => !prev)}
          className={`rounded border px-2.5 py-1 text-[10px] tracking-wider ${heatmapMode ? 'border-orange-500 bg-orange-500/15 text-orange-500' : 'border-[#1e2d3d] text-[#4a6275]'}`}
        >
          {heatmapMode ? 'HEATMAP ON' : 'HEATMAP OFF'}
        </button>
      </div>
    </div>
  )
}
