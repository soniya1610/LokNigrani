import { LayoutDashboard, FolderKanban, Map, Camera, ShieldCheck, AlertTriangle, Leaf, FileText, ScrollText, BarChart3, Users, Settings } from 'lucide-react'
export const nav = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Projects', path: '/projects', icon: FolderKanban },
  { label: 'Map View', path: '/map', icon: Map },
  { label: 'Evidence', path: '/evidence', icon: Camera },
  { label: 'Verification', path: '/verification', icon: ShieldCheck },
  { label: 'Anomalies', path: '/anomalies', icon: AlertTriangle },
  { label: 'Impact', path: '/impact', icon: Leaf },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Citizen Reports', path: '/citizen-reports', icon: Users },
  { label: 'Audit Log', path: '/audit-log', icon: ScrollText },
  { label: 'Settings', path: '/settings', icon: Settings },
]
export const riskMeta = {
  high: { label: 'High Risk', color: '#EF4444', cls: 'bg-risk/15 text-risk border-risk/30' },
  medium: { label: 'Medium Risk', color: '#F59E0B', cls: 'bg-warn/15 text-warn border-warn/30' },
  low: { label: 'On Track', color: '#22C55E', cls: 'bg-ok/15 text-ok border-ok/30' },
  verify: { label: 'Under Verification', color: '#A855F7', cls: 'bg-verify/15 text-verify border-verify/30' },
}
