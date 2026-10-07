import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Card, PageHead } from '../components/ui'
import { analytics as A } from '../data/ops'
import { riskDistribution } from '../data/dashboard'
import { projects } from '../data/projects'

const tip = { contentStyle: { background: '#0B1730', border: '1px solid #1e3a8a', borderRadius: 8 } }
const grid = <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
const budget = projects.map((p) => ({ name: p.location, Budget: p.budgetLakh, Expenditure: p.utilizedLakh }))
export default function Analytics() {
  return (
    <div className="space-y-4">
      <PageHead title="Analytics" sub="Budget values below are in ₹ Lakh for the five sample projects" />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">{A.kpis.map(([k, v]) => <Card key={k}><div className="text-xs text-slate-400">{k}</div><div className="text-2xl font-bold text-white mt-1">{v}</div></Card>)}</div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Progress trend (projects by status)" className="lg:col-span-2"><div className="h-64"><ResponsiveContainer><BarChart data={A.trend}>{grid}<XAxis dataKey="m" stroke="#64748b" fontSize={12} /><YAxis stroke="#64748b" fontSize={12} /><Tooltip {...tip} /><Legend />
          <Bar dataKey="On Track" stackId="a" fill="#22C55E" /><Bar dataKey="At Risk" stackId="a" fill="#EF4444" /><Bar dataKey="Verification" stackId="a" fill="#A855F7" /><Bar dataKey="Delayed" stackId="a" fill="#F59E0B" /></BarChart></ResponsiveContainer></div></Card>
        <Card title="Project distribution"><div className="h-64"><ResponsiveContainer><PieChart><Pie data={riskDistribution} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">{riskDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}</Pie><Tooltip {...tip} /><Legend /></PieChart></ResponsiveContainer></div></Card>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Budget vs expenditure (₹ Lakh)"><div className="h-64"><ResponsiveContainer><BarChart data={budget}>{grid}<XAxis dataKey="name" stroke="#64748b" fontSize={12} /><YAxis stroke="#64748b" fontSize={12} /><Tooltip {...tip} /><Legend /><Bar dataKey="Budget" fill="#2563EB" radius={[4, 4, 0, 0]} /><Bar dataKey="Expenditure" fill="#F59E0B" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></Card>
        <Card title="Top performing regions (physical progress %)"><div className="h-64"><ResponsiveContainer><BarChart data={A.regions} layout="vertical"><CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} /><XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={12} /><YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={60} /><Tooltip {...tip} /><Bar dataKey="score" fill="#22C55E" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div></Card>
      </div>
    </div>
  )
}
