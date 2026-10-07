import { useState } from 'react'
import { Card, Select, PageHead } from '../components/ui'
import { auditLog } from '../data/ops'
export default function AuditLog() {
  const [actor, setActor] = useState('All actors'), [action, setAction] = useState('All actions'), [q, setQ] = useState('')
  const uniq = (k) => [...new Set(auditLog.map((l) => l[k]))]
  const rows = auditLog.filter((l) => (actor === 'All actors' || l.actor === actor) && (action === 'All actions' || l.action === action) && l.entity.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <PageHead title="Audit Log" sub="Every action on cases, reports and data is recorded" />
      <div className="flex flex-wrap gap-3 mb-4"><Select label="Actor" value={actor} onChange={setActor} options={['All actors', ...uniq('actor')]} /><Select label="Action" value={action} onChange={setAction} options={['All actions', ...uniq('action')]} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by entity" className="bg-card border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary" /></div>
      <Card className="p-0 overflow-x-auto"><table className="w-full text-sm min-w-[620px]"><thead><tr className="text-left text-xs text-slate-400 border-b border-white/5">{['Actor', 'Action', 'Entity', 'Timestamp'].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{rows.map((l) => <tr key={l.id} className="border-b border-white/5"><td className="p-3 text-white">{l.actor}</td><td className="p-3">{l.action}</td><td className="p-3">{l.entity}</td><td className="p-3 text-slate-400">{l.ts}</td></tr>)}
          {!rows.length && <tr><td colSpan="4" className="p-8 text-center text-slate-500">No entries match.</td></tr>}</tbody></table></Card>
    </div>
  )
}
