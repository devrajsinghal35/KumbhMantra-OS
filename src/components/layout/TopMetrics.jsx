import MetricCard from '@/components/ui/MetricCard'

export default function TopMetrics({ metrics }) {
  return (
    <div className="grid grid-cols-1 border-b border-[#1e2d3d] bg-[#0a1520] sm:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
    </div>
  )
}
