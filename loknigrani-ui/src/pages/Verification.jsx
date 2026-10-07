import { useState } from 'react'
import { X, LayoutGrid, Table2 } from 'lucide-react'
import { Card, Tabs, PageHead, Conf } from '../components/ui'
import { initialCases, columns, inspectors, auditLog } from '../data/ops'

const stamp = () => new Date().toISOString().slice(0, 16).replace('T', ' ')
function Drawer({ cs, onSave, onClose, log }) {
  const [f, setF] = useState(cs)
  const set = (k, v) => setF({ ...f, [k]: v })
  const i = 'w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary text-slate-200'
  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-card border-l border-white/10 p-4 overflow-y-auto space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between"><div><h3 className="text-white font-semibold">{f.id} · {f.project}</h3><p className="text-xs text-slate-400">{f.title} · <Conf value={f.confidence} /></p></div><button onClick={onClose}><X size={18} /></button></div>
        <div><h4 className="text-sm text-white mb-2">Timeline</h4>{f.timeline.map((t, k) => <div key={k} className="flex gap-2 text-xs py-1"><i className="h-2 w-2 mt-1 rounded-full bg-primary" /><span className="text-slate-500 w-24">{t.t}</span><span className="text-slate-300">{t.e}</span></div>)}</div>
        <label className="block text-xs text-slate-400">Assign inspector<select className={i} value={f.inspector} onChange={(e) => set('inspector', e.target.value)}>{inspectors.map((x) => <option key={x}>{x}</option>)}</select></label>
        <label className="block text-xs text-slate-400">Due date<input type="date" className={i} value={f.due} onChange={(e) => set('due', e.target.value)} /></label>
        <label className="block text-xs text-slate-400">Outcome<select className={i} value={f.outcome} onChange={(e) => set('outcome', e.target.value)}>{['', 'Confirmed', 'Not confirmed', 'Inconclusive'].map((x) => <option key={x} value={x}>{x || 'Select outcome'}</option>)}</select></label>
        <label className="block text-xs text-slate-400">Findings<textarea rows={3} className={i} value={f.findings} onChange={(e) => set('findings', e.target.value)} /></label>
        <label className="block text-xs text-slate-400">Contractor response<textarea rows={3} className={i} value={f.response} onChange={(e) => set('response', e.target.value)} /></label>
        <button onClick={() => onSave(f)} className="w-full bg-primary text-white rounded-xl py-2 text-sm">Save case</button>
        <div><h4 className="text-sm text-white mb-2">Audit log</h4>{log.filter((l) => l.entity === f.id).map((l, k) => <div key={k} className="text-xs text-slate-400 py-1 border-b border-white/5">{l.ts} · {l.actor} · {l.action}</div>)}
          {!log.some((l) => l.entity === f.id) && <p className="text-xs text-slate-500">No entries yet.</p>}</div>
      </div>
    </div>
  )
}
export default function Verification() {
  const [cases, setCases] = useState(initialCases), [log, setLog] = useState(auditLog), [view, setView] = useState('Board'), [open, setOpen] = useState(null), [over, setOver] = useState(null)
  const addLog = (actor, action, entity) => setLog((l) => [{ id: Date.now(), actor, action, entity, ts: stamp() }, ...l])
  const move = (id, status) => {
    const cur = cases.find((x) => x.id === id); if (!cur || cur.status === status) return
    setCases(cases.map((x) => (x.id === id ? { ...x, status, timeline: [...x.timeline, { t: stamp().slice(0, 10), e: `Moved to ${status}` }] } : x)))
    addLog('Soniya Meena', `Moved to ${status}`, id)
  }
  const save = (f) => { setCases(cases.map((x) => (x.id === f.id ? f : x))); addLog('Soniya Meena', 'Updated case', f.id); setOpen(null) }
  return (
    <div>
      <PageHead title="Verification" sub="Drag cases between stages. Flags are indicators needing verification."><Tabs tabs={['Board', 'Table']} value={view} onChange={setView} /></PageHead>
      {view === 'Board' ? (
        <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-3 overflow-x-auto pb-2">
          {columns.map(([k, label]) => (
            <div key={k} onDragOver={(e) => { e.preventDefault(); setOver(k) }} onDragLeave={() => setOver(null)} onDrop={(e) => { move(e.dataTransfer.getData('text/plain'), k); setOver(null) }}
              className={`rounded-xl p-2 min-h-[320px] border ${over === k ? 'border-primary bg-primary/10' : 'border-white/5 bg-card/60'}`}>
              <div className="text-sm text-white px-1 mb-2">{label} <span className="text-slate-500">({cases.filter((c) => c.status === k).length})</span></div>
              {cases.filter((c) => c.status === k).map((c) => (
                <div key={c.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', c.id)} onClick={() => setOpen(c.id)} className="bg-card border border-white/10 rounded-xl p-3 mb-2 cursor-grab hover:border-primary text-sm">
                  <div className="text-white">{c.id} · {c.project}</div><div className="text-xs text-slate-400">{c.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{c.inspector} · Confidence {c.confidence}%</div></div>))}
            </div>))}
        </div>
      ) : (
        <Card className="p-0 overflow-x-auto"><table className="w-full text-sm min-w-[720px]"><thead><tr className="text-left text-xs text-slate-400 border-b border-white/5">{['Case', 'Project', 'Type', 'Stage', 'Inspector', 'Due', 'Confidence'].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
          <tbody>{cases.map((c) => <tr key={c.id} onClick={() => setOpen(c.id)} className="border-b border-white/5 hover:bg-white/5 cursor-pointer"><td className="p-3 text-white">{c.id}</td><td className="p-3">{c.project}</td><td className="p-3">{c.title}</td><td className="p-3 capitalize">{c.status}</td><td className="p-3">{c.inspector}</td><td className="p-3">{c.due || '—'}</td><td className="p-3">{c.confidence}%</td></tr>)}</tbody></table></Card>
      )}
      {open && <Drawer key={open} cs={cases.find((c) => c.id === open)} onSave={save} onClose={() => setOpen(null)} log={log} />}
    </div>
  )
}
