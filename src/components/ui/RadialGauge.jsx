export default function RadialGauge({ value, max = 100, size = 72, label, color }) {
  const pct = Math.min(value / max, 1)
  const radius = (size - 8) / 2
  const cx = size / 2
  const cy = size / 2

  const arcPoint = (progress, r) => {
    const angle = progress * 2 * Math.PI - Math.PI / 2
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }

  const largeArc = pct > 0.5 ? 1 : 0
  const end = arcPoint(pct, radius)
  const start = arcPoint(0, radius)
  const path = pct >= 1
    ? `M ${cx},${cy - radius} A ${radius},${radius} 0 1 1 ${cx - 0.001},${cy - radius}`
    : `M ${start} A ${radius},${radius} 0 ${largeArc} 1 ${end}`

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`${label || 'Gauge'} ${value}%`}>
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#1e2a1e" strokeWidth="7" />
      <path d={path} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="13" fontWeight="700" fontFamily="monospace">{value}%</text>
      {label ? <text x={cx} y={cy + 14} textAnchor="middle" fill="#666" fontSize="7" fontFamily="monospace">{label}</text> : null}
    </svg>
  )
}
