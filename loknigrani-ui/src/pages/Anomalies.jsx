import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Select, PageHead } from '../components/ui'
import { anomalies, anomalyTypes } from '../data/registry'

const chip = { 'Location mismatch': 'bg-verify/15 text-verify', 'Progress jump': 'bg-warn/15 text-warn', 'Repeated complaints': 'bg-primary/20 text-blue-300', 'Financial vs physical gap': 'bg-risk/15 text-risk', 'Visual defect': 'bg-ok/15 text-ok' }
const scoreColor = (s) => (s >= 75 ? '#EF4444' : s >= 55 ? '#F59E0B' : '#22C55E')
export default function Anomalies() {
  const [type, setType] = useState('All types')
  const rows = anomalies.filter((a) => type === 'All types' || a.type === type)
  return (
    <div>
      <PageHead title="Anomalies" sub="Automated indicators that need verification, not conclusions"><Select label="Type" value={type} onChange={setType} options={['All types', ...anomalyTypes]} /></PageHead>
      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm min-w-[960px]">
          <thead><tr className="text-left text-xs text-slate-400 border-b border-white/5">{['Project', 'Type', 'Rule triggered', 'Reason', 'Risk score', 'Confidence', 'Evidence'].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
          <tbody>{rows.map((a) => (
            <tr key={a.id} className="border-b border-white/5 align-top hover:bg-white/5">
              <td className="p-3"><Link to={`/projects/${a.project}`} className="text-primary">{a.project}</Link></td>
              <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${chip[a.type]}`}>{a.type}</span></td>
              <td className="p-3 text-xs text-slate-400 max-w-[200px]">{a.rule}</td>
              <td className="p-3 text-slate-300 max-w-[280px]">{a.reason}</td>
              <td className="p-3 font-semibold" style={{ color: scoreColor(a.score) }}>{a.score}</td>
              <td className="p-3">{a.confidence}%</td>
              <td className="p-3"><Link to="/evidence" className="text-primary text-xs underline">{a.evidence}</Link></td>
            </tr>))}
            {!rows.length && <tr><td colSpan="7" className="p-8 text-center text-slate-500">No anomalies of this type.</td></tr>}</tbody>
        </table>
      </Card>
    </div>
  )
}
