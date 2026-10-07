import { useState } from 'react'
import { Download, FilePlus2, X } from 'lucide-react'
import { Card, Tabs, PageHead } from '../components/ui'
import { reportList } from '../data/ops'
import { fullProjects } from '../data/registry'

export default function Reports() {
  const [tab, setTab] = useState('All'), [rows, setRows] = useState(reportList), [dlg, setDlg] = useState(false), [msg, setMsg] = useState('')
  const [form, setForm] = useState({ type: 'Project', project: 'RP-004' })
  const gen = () => {
    setRows([{ id: `RPT-2024-0${20 + rows.length}`, title: `${form.type} Report – ${form.project}`, type: form.type, date: 'Today' }, ...rows]); setDlg(false)
  }
  const s = 'w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200'
  const list = rows.filter((r) => tab === 'All' || r.type === tab)
  return (
    <div>
      <PageHead title="Reports"><button onClick={() => setDlg(true)} className="inline-flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-xl"><FilePlus2 size={16} />Generate Report</button></PageHead>
      <Tabs tabs={['All', 'Project', 'Financial', 'Inspection', 'Audit']} value={tab} onChange={setTab} />
      <p className="text-xs text-slate-500 my-3">Anomalies are indicators for verification, not proof of wrongdoing.</p>
      {msg && <p className="text-xs text-ok mb-2">{msg}</p>}
      <Card className="p-0 overflow-x-auto"><table className="w-full text-sm min-w-[620px]"><thead><tr className="text-left text-xs text-slate-400 border-b border-white/5">{['Report ID', 'Title', 'Type', 'Date', ''].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{list.map((r) => <tr key={r.id} className="border-b border-white/5"><td className="p-3 text-slate-400">{r.id}</td><td className="p-3 text-white">{r.title}</td><td className="p-3">{r.type}</td><td className="p-3">{r.date}</td>
          <td className="p-3"><button onClick={() => setMsg(`Mock download: ${r.id} (no file is generated in this UI build).`)} className="inline-flex items-center gap-1 text-primary text-xs border border-primary/40 rounded-lg px-3 py-1"><Download size={12} />Download</button></td></tr>)}</tbody></table></Card>
      {dlg && <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4"><div className="bg-card rounded-xl border border-white/10 w-full max-w-sm p-5 space-y-3">
        <div className="flex justify-between"><h3 className="text-white font-semibold">Generate Report</h3><button onClick={() => setDlg(false)}><X size={18} /></button></div>
        <select className={s} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{['Project', 'Financial', 'Inspection', 'Audit'].map((t) => <option key={t}>{t}</option>)}</select>
        <select className={s} value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}>{fullProjects.map((p) => <option key={p.id} value={p.id}>{p.id} · {p.name}</option>)}</select>
        <button onClick={gen} className="w-full bg-primary text-white rounded-xl py-2 text-sm">Generate</button></div></div>}
    </div>
  )
}
