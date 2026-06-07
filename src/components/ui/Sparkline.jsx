export default function Sparkline({ data, color, height = 32, width = 80 }) {
  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data.map((value, index) => `${(index / (data.length - 1)) * width},${height - ((value - min) / range) * height}`).join(' ')
  const lastX = width
  const lastY = height - ((data[data.length - 1] - min) / range) * height

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }} aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  )
}
