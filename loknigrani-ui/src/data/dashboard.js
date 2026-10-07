export const summary = { total: 80, budgetCr: 48.6, co2Tonnes: 1240 }
const spark = (a) => a.map((v, i) => ({ i, v }))
export const kpis = [
  { key: 'low', label: 'On Track', count: 52, color: '#22C55E', spark: spark([40, 44, 43, 47, 49, 50, 52]) },
  { key: 'high', label: 'At Risk', count: 18, color: '#EF4444', spark: spark([10, 12, 11, 14, 15, 17, 18]) },
  { key: 'verify', label: 'Under Verification', count: 10, color: '#A855F7', spark: spark([6, 7, 9, 8, 9, 10, 10]) },
  { key: 'delayed', label: 'Delayed', count: 5, color: '#F59E0B', spark: spark([2, 3, 3, 4, 4, 5, 5]) },
]
export const riskDistribution = kpis.map((k) => ({ name: k.label, value: k.count, color: k.color }))
export const progressOverview = [
  { label: 'Planned', value: 100, color: '#2563EB' },
  { label: 'Reported', value: 78, color: '#F59E0B' },
  { label: 'Physical', value: 64, color: '#22C55E' },
]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const mk = (p, r, ph) => months.map((m, i) => ({ month: m, Planned: p[i], Reported: r[i], Physical: ph[i] }))
export const performance = {
  Progress: mk([10, 22, 35, 48, 62, 75, 88, 100], [8, 18, 30, 42, 55, 66, 73, 78], [6, 14, 24, 34, 45, 53, 58, 61]),
  Budget: mk([8, 18, 30, 42, 55, 68, 80, 100], [6, 15, 26, 38, 50, 60, 66, 70], [5, 12, 21, 31, 41, 49, 54, 58]),
  Quality: mk([90, 90, 90, 90, 90, 90, 90, 90], [88, 87, 86, 85, 84, 82, 81, 80], [85, 83, 80, 77, 74, 71, 68, 66]),
}
export const alerts = [
  { id: 1, type: 'high', title: 'Potential deviation: RP-004 reported vs physical gap of 17 pts', time: '2 hrs ago', confidence: 87 },
  { id: 2, type: 'verify', title: 'RP-023 evidence needs verification (GPS mismatch)', time: '5 hrs ago', confidence: 68 },
  { id: 3, type: 'medium', title: 'Anomaly: RP-012 material usage below estimate', time: 'Yesterday', confidence: 74 },
  { id: 4, type: 'medium', title: 'RP-045 progress trending behind schedule', time: '2 days ago', confidence: 71 },
]
export const evidence = [
  { id: 'EV-101', project: 'RP-004', lat: 28.6692, lng: 77.157, time: '12 Jun 2024, 10:42 AM', grad: 'from-slate-600 to-slate-800' },
  { id: 'EV-102', project: 'RP-004', lat: 28.6701, lng: 77.1583, time: '12 Jun 2024, 11:05 AM', grad: 'from-blue-900 to-slate-700' },
  { id: 'EV-103', project: 'RP-012', lat: 28.9931, lng: 77.0151, time: '11 Jun 2024, 04:20 PM', grad: 'from-stone-600 to-stone-800' },
  { id: 'EV-104', project: 'RP-031', lat: 28.8955, lng: 76.6066, time: '10 Jun 2024, 09:15 AM', grad: 'from-emerald-900 to-slate-700' },
]
export const user = { name: 'Soniya Meena', role: 'System Administrator' }
