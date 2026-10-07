import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, X } from 'lucide-react'
import { Card, RiskBadge, ProgressBar, Tabs, Select, PageHead } from '../components/ui'
import { fullProjects } from '../data/registry'
import { riskMeta } from '../config'

function AddModal({ onClose }) {
  const [done, setDone] = useState(false)
  const f = 'w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary'
  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-white/10 w-full max-w-lg p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-3"><h3 className="font-semibold text-white">Add New Project</h3><button onClick={onClose}><X size={18} /></button></div>
        {done ? <p className="text-ok text-sm py-6 text-center">Form submitted (UI only, nothing is saved).</p> : (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <input className={`${f} col-span-2`} placeholder="Project name" />
            <input className={f} placeholder="Location" /><input className={f} placeholder="Contractor" />
            <input className={f} placeholder="Length (km)" type="number" /><input className={f} placeholder="Thickness (mm)" type="number" />
            <input className={f} placeholder="Budget (₹ Lakh)" type="number" /><input className={f} placeholder="Material" />
            <label className="text-xs text-slate-400">Start date<input type="date" className={f} /></label>
            <label className="text-xs text-slate-400">End date<input type="date" className={f} /></label>
            <button onClick={() => setDone(true)} className="col-span-2 bg-primary text-white rounded-xl py-2">Save Project</button>
          </div>
        )}
      </div>
    </div>
  )
}
export default function Projects() {
  const [tab, setTab] = useState('All'), [q, setQ] = useState(''), [risk, setRisk] = useState('all'), [modal, setModal] = useState(false)
  const rows = fullProjects.filter((p) => (tab === 'All' || p.status === tab) && (risk === 'all' || p.risk === risk) &&
    `${p.id} ${p.name} ${p.location} ${p.contractor}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <PageHead title="Projects" sub={`${rows.length} of ${fullProjects.length} sample projects shown`}>
        <button onClick={() => setModal(true)} className="inline-flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-xl"><Plus size={16} />Add New Project</button>
      </PageHead>
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <Tabs tabs={['All', 'Ongoing', 'Completed', 'Delayed']} value={tab} onChange={setTab} />
        <div className="relative"><Search size={14} className="absolute left-3 top-3 text-slate-500" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects" className="bg-card border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm outline-none focus:border-primary" /></div>
        <Select label="Risk" value={risk} onChange={setRisk} options={[{ v: 'all', l: 'All risk levels' }, ...Object.entries(riskMeta).map(([v, m]) => ({ v, l: m.label }))]} />
      </div>
      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead><tr className="text-left text-xs text-slate-400 border-b border-white/5">{['Project', 'Location', 'Contractor', 'Budget', 'Progress', 'Status', ''].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3"><div className="text-white">{p.name}</div><div className="text-xs text-slate-500">{p.id}</div></td>
                <td className="p-3">{p.location}</td><td className="p-3 text-slate-400">{p.contractor}</td>
                <td className="p-3">₹{p.budgetLakh} Lakh</td>
                <td className="p-3 w-40"><div className="flex items-center gap-2"><ProgressBar value={p.physical} color={riskMeta[p.risk].color} /><span className="text-xs">{p.physical}%</span></div></td>
                <td className="p-3"><div className="flex flex-col gap-1 items-start"><span className="text-xs text-slate-300">{p.status}</span><RiskBadge risk={p.risk} /></div></td>
                <td className="p-3"><Link to={`/projects/${p.id}`} className="text-primary text-xs border border-primary/40 rounded-lg px-3 py-1">View</Link></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan="7" className="p-8 text-center text-slate-500">No projects match.</td></tr>}
          </tbody>
        </table>
      </Card>
      {modal && <AddModal onClose={() => setModal(false)} />}
    </div>
  )
}
