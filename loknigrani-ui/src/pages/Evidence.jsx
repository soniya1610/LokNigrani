import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BadgeCheck, Eye, X, Check, Info, Plus } from 'lucide-react'
import { Card, Select, PageHead } from '../components/ui'
import { evidenceItems, fullProjects } from '../data/registry'

const Badge = ({ status }) => status === 'verified'
  ? <span className="inline-flex items-center gap-1 text-[10px] bg-ok/20 text-ok border border-ok/30 px-2 py-0.5 rounded-full"><BadgeCheck size={11} />GPS Verified</span>
  : <span className="inline-flex items-center gap-1 text-[10px] bg-verify/20 text-verify border border-verify/30 px-2 py-0.5 rounded-full"><Eye size={11} />Needs Review</span>

function Drawer({ e, onClose }) {
  const checks = [['EXIF match', e.checks.exif], ['Inside boundary', e.checks.boundary], ['Duplicate check (no duplicate found)', e.checks.duplicate]]
  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-card border-l border-white/10 p-4 overflow-y-auto" onClick={(x) => x.stopPropagation()}>
        <div className="flex justify-between items-center mb-3"><h3 className="text-white font-semibold">{e.id} · {e.project}</h3><button onClick={onClose}><X size={18} /></button></div>
        <div className={`relative h-56 rounded-xl bg-gradient-to-br ${e.grad}`}>
          {e.detections.map((d, i) => (
            <div key={i} className="absolute border-2 border-warn rounded" style={{ left: `${d.box[0]}%`, top: `${d.box[1]}%`, width: `${d.box[2]}%`, height: `${d.box[3]}%` }}>
              <span className="absolute -top-5 left-0 text-[10px] bg-warn text-black px-1.5 rounded whitespace-nowrap">{d.label} {d.conf}%</span>
            </div>))}
        </div>
        <p className="flex gap-2 text-xs text-slate-400 mt-2"><Info size={14} className="shrink-0" />AI results are indicators, not proof.</p>
        <div className="mt-4 flex items-center justify-between"><Badge status={e.status} /><span className="text-xs text-slate-400">{e.time}</span></div>
        <div className="text-xs text-slate-400 mt-1">{e.lat.toFixed(4)}° N, {e.lng.toFixed(4)}° E · {e.category}</div>
        <h4 className="text-sm text-white mt-5 mb-2">Validation checklist</h4>
        {checks.map(([k, v]) => <div key={k} className={`flex items-center gap-2 text-sm py-1.5 ${v ? 'text-ok' : 'text-verify'}`}>{v ? <Check size={14} /> : <X size={14} />}<span className="text-slate-200">{k}</span><span className="ml-auto text-xs">{v ? 'Passed' : 'Needs verification'}</span></div>)}
        <h4 className="text-sm text-white mt-5 mb-2">AI detections</h4>
        {e.detections.map((d, i) => <div key={i} className="flex justify-between text-sm py-1"><span>{d.label}</span><span className="text-slate-400">Confidence {d.conf}%</span></div>)}
      </div>
    </div>
  )
}
export default function Evidence() {
  const [proj, setProj] = useState('all'), [status, setStatus] = useState('all'), [from, setFrom] = useState(''), [sel, setSel] = useState(null)
  const rows = evidenceItems.filter((e) => (proj === 'all' || e.project === proj) && (status === 'all' || e.status === status) && (!from || e.date >= from))
  return (
    <div>
      <PageHead title="Evidence" sub="Citizen and field evidence with automated validation">
        <Link to="/evidence/submit" className="inline-flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-xl"><Plus size={16} />Submit Evidence</Link>
      </PageHead>
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <Select label="Project" value={proj} onChange={setProj} options={[{ v: 'all', l: 'All projects' }, ...fullProjects.map((p) => ({ v: p.id, l: `${p.id} · ${p.name}` }))]} />
        <Select label="Status" value={status} onChange={setStatus} options={[{ v: 'all', l: 'All statuses' }, { v: 'verified', l: 'GPS Verified' }, { v: 'review', l: 'Needs Review' }]} />
        <label className="text-xs text-slate-400 flex items-center gap-2">From<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200" /></label>
      </div>
      <p className="text-xs text-slate-500 mb-3">AI results are indicators, not proof.</p>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {rows.map((e) => (
          <button key={e.id} onClick={() => setSel(e)} className="text-left rounded-xl overflow-hidden border border-white/5 bg-card hover:border-primary shadow-glow">
            <div className={`h-32 bg-gradient-to-br ${e.grad} p-2`}><Badge status={e.status} /></div>
            <div className="p-3 text-xs"><div className="text-white text-sm">{e.id} · {e.project}</div><div className="text-slate-400">{e.category} · {e.phase}</div><div className="text-slate-500">{e.lat.toFixed(4)}, {e.lng.toFixed(4)}</div><div className="text-slate-500">{e.time}</div></div>
          </button>))}
      </div>
      {!rows.length && <Card className="text-center text-slate-500">No evidence matches these filters.</Card>}
      {sel && <Drawer e={sel} onClose={() => setSel(null)} />}
    </div>
  )
}
