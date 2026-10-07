import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup } from 'react-leaflet'
import { ArrowLeft, Check, X, FileText } from 'lucide-react'
import { Card, RiskBadge, Tabs, Gauge, Conf } from '../components/ui'
import { getProject, evidenceItems, anomalies, reports } from '../data/registry'
import { riskMeta } from '../config'

const Row = ({ k, v }) => <div className="flex justify-between py-2 border-b border-white/5 text-sm"><span className="text-slate-400">{k}</span><span className="text-white">{v}</span></div>
export default function ProjectDetail() {
  const { id } = useParams()
  const p = getProject(id)
  const [tab, setTab] = useState('Overview')
  if (!p) return <Card>Project not found. <Link className="text-primary" to="/projects">Back to projects</Link></Card>
  const ev = evidenceItems.filter((e) => e.project === p.id)
  const an = anomalies.filter((a) => a.project === p.id)
  const gap = p.reported - p.physical
  return (
    <div className="space-y-4">
      <Link to="/projects" className="text-xs text-slate-400 inline-flex items-center gap-1"><ArrowLeft size={12} />Projects</Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold text-white">{p.id} · {p.name}</h1><RiskBadge risk={p.risk} />
        <span className="text-xs text-slate-400">{p.location} · {p.status} · Flag confidence {p.confidence}%</span>
      </div>
      <Tabs tabs={['Overview', 'Specifications', 'Evidence Timeline', 'Map', 'Anomalies', 'Verification', 'Reports']} value={tab} onChange={setTab} />

      {tab === 'Overview' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <Card title="Progress" className="lg:col-span-2"><div className="grid grid-cols-3 gap-2">
            <Gauge value={p.reported} color="#F59E0B" label="Reported" /><Gauge value={p.physical} color="#22C55E" label="Physical" />
            <Gauge value={Math.round((p.utilizedLakh / p.budgetLakh) * 100)} color="#2563EB" label="Budget Utilized" /></div>
            <p className="text-xs text-slate-400 mt-4">{p.start} – {p.end} · Contractor: {p.contractor}</p></Card>
          <Card title="Summary"><Row k="Reported vs physical gap" v={`${gap} pts`} /><Row k="Open anomalies" v={an.length} /><Row k="Evidence items" v={ev.length} />
            {gap > 8 && <p className="text-xs text-warn mt-3">Potential deviation: reported progress is ahead of physical progress. Needs verification.</p>}</Card>
        </div>
      )}
      {tab === 'Specifications' && (
        <Card title="Specifications" className="max-w-xl"><Row k="Length" v={`${p.lengthKm.toFixed(1)} km`} /><Row k="Thickness" v={`${p.thicknessMm} mm`} /><Row k="Material" v={p.material} />
          <Row k="Budget" v={`₹${p.budgetLakh} Lakh`} /><Row k="Utilized" v={`₹${p.utilizedLakh} Lakh (${Math.round((p.utilizedLakh / p.budgetLakh) * 100)}%)`} /></Card>
      )}
      {tab === 'Evidence Timeline' && (
        <div className="grid md:grid-cols-3 gap-4">
          {['Before', 'During', 'After'].map((ph) => (
            <Card key={ph} title={ph}>
              {ev.filter((e) => e.phase === ph).map((e) => (
                <div key={e.id} className="mb-3"><div className={`h-24 rounded-lg bg-gradient-to-br ${e.grad}`} /><div className="text-xs mt-1 text-white">{e.id} · {e.category}</div><div className="text-xs text-slate-500">{e.time}</div></div>
              ))}
              {!ev.some((e) => e.phase === ph) && <p className="text-xs text-slate-500">No evidence yet.</p>}
            </Card>
          ))}
        </div>
      )}
      {tab === 'Map' && (
        <Card title="Project boundary & evidence pins"><div className="h-96"><MapContainer key={p.id} center={[p.lat, p.lng]} zoom={14} style={{ height: '100%' }}>
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polygon positions={p.boundary} pathOptions={{ color: riskMeta[p.risk].color, fillOpacity: 0.15 }} />
          {ev.map((e) => <CircleMarker key={e.id} center={[e.lat, e.lng]} radius={7} pathOptions={{ color: '#fff', fillColor: e.status === 'verified' ? '#22C55E' : '#A855F7', fillOpacity: 1 }}><Popup>{e.id} · {e.category}<br />{e.status === 'verified' ? 'GPS Verified' : 'Needs Review'}</Popup></CircleMarker>)}
        </MapContainer></div></Card>
      )}
      {tab === 'Anomalies' && (
        <div className="space-y-3">{an.map((a) => (
          <Card key={a.id}><div className="flex flex-wrap justify-between gap-2"><span className="text-sm text-white">{a.type}</span><span className="text-xs text-slate-400">Risk score {a.score} · <Conf value={a.confidence} /></span></div>
            <p className="text-sm text-slate-300 mt-1">{a.reason}</p><p className="text-xs text-slate-500 mt-1">{a.rule}</p></Card>))}
          {!an.length && <Card>No anomalies flagged.</Card>}</div>
      )}
      {tab === 'Verification' && (
        <Card title="Evidence validation" className="max-w-2xl">{ev.map((e) => (
          <div key={e.id} className="flex flex-wrap items-center gap-3 py-2 border-b border-white/5 text-sm"><span className="text-white w-16">{e.id}</span>
            {Object.entries({ 'EXIF match': e.checks.exif, 'Inside boundary': e.checks.boundary, 'No duplicate': e.checks.duplicate }).map(([k, v]) => (
              <span key={k} className={`inline-flex items-center gap-1 text-xs ${v ? 'text-ok' : 'text-verify'}`}>{v ? <Check size={12} /> : <X size={12} />}{k}</span>))}</div>))}</Card>
      )}
      {tab === 'Reports' && (
        <Card title="Reports" className="max-w-xl">{reports.map((r) => (
          <div key={r.id} className="flex items-center gap-3 py-2 border-b border-white/5 text-sm"><FileText size={16} className="text-primary" /><div><div className="text-white">{r.title}</div><div className="text-xs text-slate-500">{r.id}</div></div></div>))}</Card>
      )}
    </div>
  )
}
