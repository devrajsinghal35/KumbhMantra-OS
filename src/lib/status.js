export const densityToStatus = (density) => {
  if (density > 80) return 'CRITICAL'
  if (density > 60) return 'WARNING'
  return 'STABLE'
}

export const statusColor = (status) => {
  if (status === 'CRITICAL') {
    return { bg: '#2d0a0a', border: '#dc2626', text: '#f87171', badge: '#7f1d1d', badgeText: '#fecaca' }
  }
  if (status === 'WARNING') {
    return { bg: '#1c1500', border: '#d97706', text: '#fbbf24', badge: '#78350f', badgeText: '#fde68a' }
  }
  return { bg: '#051a0f', border: '#16a34a', text: '#4ade80', badge: '#14532d', badgeText: '#bbf7d0' }
}
