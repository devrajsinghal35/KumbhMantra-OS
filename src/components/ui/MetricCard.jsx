import Sparkline from '@/components/ui/Sparkline'

export default function MetricCard({ label, value, sub, colorClass, spark }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-r border-[#1e2d3d] p-3 px-[18px] lg:border-b-0">
      <div>
        <div className="mb-0.5 text-[10px] tracking-widest text-[#4a6275]">{label}</div>
        <div className={`text-2xl font-bold leading-none tracking-tight ${colorClass}`}>{value}</div>
        <div className="mt-0.5 text-[10px] text-slate-500">{sub}</div>
      </div>
      {spark ? (
        <div className="ml-auto">
          <Sparkline data={spark.slice(-20)} color="#38bdf8" width={60} height={24} />
        </div>
      ) : null}
    </div>
  )
}
