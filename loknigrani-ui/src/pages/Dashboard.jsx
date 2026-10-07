import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Leaf, MapPin, Clock, BadgeCheck, AlertTriangle } from 'lucide-react'
import { Card, RiskBadge, ProgressBar, Spark, Gauge } from '../components/ui'
import MapPanel from '../components/MapPanel'
import PerformanceChart from '../components/PerformanceChart'
import { projects, selectedProject as sp } from '../data/projects'
import { summary, kpis, riskDistribution, progressOverview, alerts, evidence } from '../data/dashboard'
import { riskMeta } from '../config'

export default function Dashboard() {
  const gap = sp.reported - sp.physical
  return (
    <div className="space-y-4">
      <div className="rounded-xl p-6 bg-gradient-to-r from-primary/40 via-card to-card border border-primary/20 shadow-glow">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Monitoring Today for Better Tomorrows</h1>
        <div className="flex flex-wrap items-end gap-6 mt-4">
          <div><div className="text-xs text-slate-400">Total Projects</div><div className="text-2xl font-semibold text-white">{summary.total}</div></div>
          <div><div className="text-xs text-slate-400">Total Budget</div><div className="text-2xl font-semibold text-white">₹{summary.budgetCr} Cr</div></div>
          <div><div className="text-xs text-slate-400">Est. CO₂ Saved</div><div className="text-2xl font-semibold text-ok">{summary.co2Tonnes.toLocaleString()} Tonnes</div></div>
          <Link to="/impact" className="ml-auto inline-flex items-center gap-2 bg-primary hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-xl"><Leaf size={16} />View Impact</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.key}>
            <div className="text-xs text-slate-400">{k.label}</div>
            <div className="flex items-end justify-between mt-1">
              <div><div className="text-3xl font-bold text-white">{k.count}</div><div className="text-xs" style={{ color: k.color }}>{((k.count / summary.total) * 100).toFixed(1)}% of projects</div></div>
              <Spark data={k.spark} color={k.color} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-4">
        <Card title="Recent Projects" action={<Link to="/projects" className="text-xs text-primary">View all</Link>} className="xl:col-span-1">
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0"><div className="text-sm text-white truncate">{p.id} · {p.name}</div><div className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11} />{p.location}</div></div>
                  <RiskBadge risk={p.risk} />
                </div>
                <div className="flex items-center gap-2 mt-2"><ProgressBar value={p.physical} color={riskMeta[p.risk].color} /><span className="text-xs text-slate-400 w-10">{p.physical}%</span></div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Project Locations" className="xl:col-span-2"><MapPanel height={300} /></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Risk Distribution">
          <div className="h-48"><ResponsiveContainer><PieChart>
            <Pie data={riskDistribution} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3} stroke="none">
              {riskDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie><Tooltip contentStyle={{ background: '#0B1730', border: '1px solid #1e3a8a', borderRadius: 8 }} />
          </PieChart></ResponsiveContainer></div>
          <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
            {riskDistribution.map((d) => <span key={d.name} className="flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{ background: d.color }} />{d.name} ({d.value})</span>)}
          </div>
        </Card>
        <Card title="Progress Overview">
          <div className="space-y-4 mt-2">
            {progressOverview.map((p) => (
              <div key={p.label}><div className="flex justify-between text-sm mb-1"><span>{p.label}</span><span className="text-white">{p.value}%</span></div><ProgressBar value={p.value} color={p.color} /></div>
            ))}
          </div>
        </Card>
        <Card title="Alerts & Notifications">
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="flex gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: riskMeta[a.type].color }} />
                <div><div className="text-sm text-slate-200">{a.title}</div><div className="text-xs text-slate-500 flex items-center gap-2"><Clock size={11} />{a.time}<span>· Confidence {a.confidence}%</span></div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <PerformanceChart />

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title={`Selected Project · ${sp.id} ${sp.name}`} action={<RiskBadge risk={sp.risk} />} className="lg:col-span-2">
          <div className="text-xs text-slate-400 mb-4">{sp.location} · {sp.lengthKm.toFixed(1)} km · {sp.thicknessMm} mm thickness · {sp.start} – {sp.end}</div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Gauge value={sp.reported} color="#F59E0B" label="Reported" />
            <Gauge value={sp.physical} color="#22C55E" label="Physical" />
            <Gauge value={Math.round((sp.utilizedLakh / sp.budgetLakh) * 100)} color="#2563EB" label="Budget Utilized" />
          </div>
          <div className="text-sm text-slate-300">Budget ₹{sp.budgetLakh} Lakh · Utilized ₹{sp.utilizedLakh} Lakh</div>
        </Card>
        <Card className="border-risk/40">
          <div className="flex items-center gap-2 text-risk font-semibold text-sm"><AlertTriangle size={16} />Potential Deviation Detected</div>
          <p className="text-sm text-slate-300 mt-3">Reported progress ({sp.reported}%) exceeds physical progress ({sp.physical}%) by {gap} points. This anomaly needs verification.</p>
          <div className="mt-4 text-xs text-slate-400">Confidence</div>
          <div className="flex items-center gap-2"><ProgressBar value={sp.confidence} color="#EF4444" /><span className="text-sm text-white">{sp.confidence}%</span></div>
        </Card>
      </div>

      <Card title="Recent Evidence" action={<Link to="/evidence" className="text-xs text-primary">View all</Link>}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {evidence.map((e) => (
            <div key={e.id} className="rounded-xl overflow-hidden border border-white/5 bg-navy">
              <div className={`h-28 bg-gradient-to-br ${e.grad} relative`}>
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] bg-ok/20 text-ok border border-ok/30 px-2 py-0.5 rounded-full"><BadgeCheck size={11} />GPS Verified</span>
              </div>
              <div className="p-2 text-xs"><div className="text-white">{e.project} · {e.id}</div><div className="text-slate-400">{e.lat.toFixed(4)}° N, {e.lng.toFixed(4)}° E</div><div className="text-slate-500">{e.time}</div></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
