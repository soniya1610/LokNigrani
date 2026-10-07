import { Card, PageHead } from '../components/ui'
import { citizenStats as S, citizenReports } from '../data/ops'
const col = { Resolved: 'text-ok', 'In Progress': 'text-primary', Pending: 'text-warn' }
export default function CitizenReports() {
  const stats = [['Total', S.total, '#fff'], ['Resolved', S.resolved, '#22C55E'], ['In Progress', S.progress, '#2563EB'], ['Pending', S.pending, '#F59E0B']]
  return (
    <div>
      <PageHead title="Citizen Reports" />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">{stats.map(([k, v, c]) => <Card key={k}><div className="text-xs text-slate-400">{k}</div><div className="text-3xl font-bold" style={{ color: c }}>{v}</div></Card>)}</div>
      <Card className="p-0 overflow-x-auto"><table className="w-full text-sm min-w-[640px]"><thead><tr className="text-left text-xs text-slate-400 border-b border-white/5">{['ID', 'Issue', 'Location', 'Date', 'Status'].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{citizenReports.map((r) => <tr key={r.id} className="border-b border-white/5"><td className="p-3 text-slate-400">{r.id}</td><td className="p-3 text-white">{r.issue}</td><td className="p-3">{r.location}</td><td className="p-3">{r.date}</td><td className={`p-3 ${col[r.status]}`}>{r.status}</td></tr>)}</tbody></table></Card>
    </div>
  )
}
