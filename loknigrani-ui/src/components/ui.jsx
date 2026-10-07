import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import { riskMeta } from '../config'
export const Card = ({ title, action, children, className = '' }) => (
  <div className={`bg-card rounded-xl border border-white/5 shadow-glow p-4 ${className}`}>
    {(title || action) && <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-white text-sm">{title}</h3>{action}</div>}
    {children}
  </div>
)
export const RiskBadge = ({ risk }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${riskMeta[risk].cls}`}>{riskMeta[risk].label}</span>
)
export const ProgressBar = ({ value, color = '#2563EB' }) => (
  <div className="h-2 w-full rounded-full bg-white/10"><div className="h-2 rounded-full" style={{ width: `${value}%`, background: color }} /></div>
)
export const Spark = ({ data, color }) => (
  <div className="h-10 w-24">
    <ResponsiveContainer><AreaChart data={data}>
      <defs><linearGradient id={`g${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.5} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
      <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#g${color.slice(1)})`} />
    </AreaChart></ResponsiveContainer>
  </div>
)
export const Gauge = ({ value, color, label }) => {
  const r = 34, c = 2 * Math.PI * r
  return (
    <div className="flex flex-col items-center">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} transform="rotate(-90 44 44)" />
        <text x="44" y="49" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600">{value}%</text>
      </svg>
      <span className="text-xs text-slate-400 mt-1">{label}</span>
    </div>
  )
}
export const Tabs = ({ tabs, value, onChange }) => (
  <div className="flex gap-1 bg-card rounded-xl p-1 overflow-x-auto border border-white/5 w-fit max-w-full">
    {tabs.map((t) => (
      <button key={t} onClick={() => onChange(t)} className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap ${value === t ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}>{t}</button>
    ))}
  </div>
)
export const Select = ({ value, onChange, options, label }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className="bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none focus:border-primary">
    {options.map((o) => <option key={o.v ?? o} value={o.v ?? o}>{o.l ?? o}</option>)}
  </select>
)
export const Conf = ({ value }) => <span className="text-xs text-slate-400">Confidence {value}%</span>
export const PageHead = ({ title, sub, children }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
    <div><h1 className="text-xl font-bold text-white">{title}</h1>{sub && <p className="text-sm text-slate-400">{sub}</p>}</div>{children}
  </div>
)
