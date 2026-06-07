export default function StatusBadge({ label, colorClass }) {
  return (
    <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${colorClass}`}>
      {label}
    </span>
  )
}
