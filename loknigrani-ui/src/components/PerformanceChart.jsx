import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'
import { performance } from '../data/dashboard'
import { Card } from './ui'
export default function PerformanceChart() {
  const [tab, setTab] = useState('Progress')
  const tabs = (
    <div className="flex gap-1 bg-navy rounded-lg p-1">
      {Object.keys(performance).map((t) => (
        <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 text-xs rounded-md ${tab === t ? 'bg-primary text-white' : 'text-slate-400'}`}>{t}</button>
      ))}
    </div>
  )
  return (
    <Card title="Project Performance" action={tabs}>
      <div className="h-64">
        <ResponsiveContainer>
          <AreaChart data={performance[tab]}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} /><YAxis stroke="#64748b" fontSize={12} unit="%" />
            <Tooltip contentStyle={{ background: '#0B1730', border: '1px solid #1e3a8a', borderRadius: 8 }} />
            <Legend />
            <Area type="monotone" dataKey="Planned" stroke="#2563EB" fill="#2563EB" fillOpacity={0.12} strokeWidth={2} />
            <Area type="monotone" dataKey="Reported" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.12} strokeWidth={2} />
            <Area type="monotone" dataKey="Physical" stroke="#22C55E" fill="#22C55E" fillOpacity={0.12} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
