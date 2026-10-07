import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card, PageHead, Gauge } from '../components/ui'
import { impact as I } from '../data/ops'
import { summary } from '../data/dashboard'

export default function Impact() {
  const [pos, setPos] = useState(50)
  const area = I.lengthKm * 1000 * I.widthM, rework = area * (I.reworkPct / 100)
  const material = rework * I.thicknessM * I.density, co2 = material * I.factor
  const fmt = (n) => Math.round(n).toLocaleString()
  return (
    <div className="space-y-4">
      <PageHead title="Impact" sub={`Sample outcome: ${I.project} ${I.name} · Portfolio est. CO₂ saved ${summary.co2Tonnes.toLocaleString()} tonnes`} />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Before / After" className="lg:col-span-2">
          <div className="relative h-64 rounded-xl overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-slate-700 flex items-end p-3 text-xs text-white">After</div>
            <div className="absolute inset-0 bg-gradient-to-br from-stone-600 to-stone-800 flex items-end p-3 text-xs text-white" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>Before</div>
            <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }} />
          </div>
          <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} className="w-full mt-3 accent-blue-500" aria-label="Before after slider" />
          <p className="text-xs text-slate-500">Placeholder imagery. Drag the slider to compare.</p>
        </Card>
        <Card title="Condition score"><div className="grid grid-cols-2 gap-2 py-4"><Gauge value={I.before} color="#EF4444" label="Before" /><Gauge value={I.after} color="#22C55E" label="After" /></div>
          <p className="text-xs text-slate-400 text-center">Improvement of {I.after - I.before} points</p></Card>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card><div className="text-xs text-slate-400">Rework avoided</div><div className="text-2xl font-bold text-white">{fmt(rework)} m²</div></Card>
        <Card><div className="text-xs text-slate-400">Material saved</div><div className="text-2xl font-bold text-white">{fmt(material)} t</div></Card>
        <Card><div className="text-xs text-slate-400">CO₂ saved</div><div className="text-2xl font-bold text-ok">{co2.toFixed(1)} t</div></Card>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Calculation">
          <p className="text-sm text-white">CO₂ saved = area × thickness × density × emission factor</p>
          <div className="text-xs text-slate-300 mt-3 space-y-1">
            <div>Road area: {I.lengthKm} km × {I.widthM} m = {fmt(area)} m²</div>
            <div>Rework avoided ({I.reworkPct}%): {fmt(rework)} m²</div>
            <div>Material: {fmt(rework)} × {I.thicknessM} m × {I.density} t/m³ = {fmt(material)} t</div>
            <div>CO₂: {fmt(material)} t × {I.factor} tCO₂/t = <b className="text-ok">{co2.toFixed(1)} t</b></div>
          </div><p className="text-xs text-slate-500 mt-3">Estimates use sample assumptions for illustration.</p>
        </Card>
        <Card title="CO₂ saved by project (tonnes, total 1,240)"><div className="h-56"><ResponsiveContainer><BarChart data={I.byProject}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} /><XAxis dataKey="name" stroke="#64748b" fontSize={11} /><YAxis stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={{ background: '#0B1730', border: '1px solid #1e3a8a', borderRadius: 8 }} /><Bar dataKey="co2" fill="#22C55E" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></Card>
      </div>
    </div>
  )
}
