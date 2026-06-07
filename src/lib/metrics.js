export const getAverageDensity = (sectors) => Math.round(sectors.reduce((sum, sector) => sum + sector.density, 0) / sectors.length)
export const getCriticalCount = (sectors) => sectors.filter((sector) => sector.status === 'CRITICAL').length
export const getWarningCount = (sectors) => sectors.filter((sector) => sector.status === 'WARNING').length
export const getCriticalIncidents = (incidents) => incidents.filter((incident) => incident.urgency === 'CRITICAL').length
