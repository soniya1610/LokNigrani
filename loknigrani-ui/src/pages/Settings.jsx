import { useState } from 'react'
import { Card, Tabs, PageHead } from '../components/ui'
import { user } from '../data/dashboard'

const input = 'w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary text-slate-200'
const Toggle = ({ on, onChange }) => <button onClick={() => onChange(!on)} role="switch" aria-checked={on} className={`h-6 w-11 rounded-full p-0.5 transition ${on ? 'bg-primary' : 'bg-white/20'}`}><span className={`block h-5 w-5 rounded-full bg-white transition ${on ? 'translate-x-5' : ''}`} /></button>
export default function Settings() {
  const [tab, setTab] = useState('Profile'), [msg, setMsg] = useState('')
  const [notif, setNotif] = useState({ 'New anomaly flags': true, 'Case assignments': true, 'Weekly summary email': false, 'Citizen report updates': true })
  const [light, setLight] = useState(() => document.documentElement.classList.contains('light'))
  const theme = (v) => { setLight(v); document.documentElement.classList.toggle('light', v) }
  const done = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }
  return (
    <div className="space-y-4">
      <PageHead title="Settings"><Tabs tabs={['Profile', 'Notifications', 'Appearance', 'Security', 'Data & Backup']} value={tab} onChange={setTab} /></PageHead>
      {msg && <p className="text-xs text-ok">{msg}</p>}
      <Card className="max-w-xl space-y-3">
        {tab === 'Profile' && <><input className={input} defaultValue={user.name} /><input className={input} defaultValue={user.role} /><input className={input} defaultValue="soniya.meena@example.org" /><button onClick={() => done('Profile saved (UI only).')} className="bg-primary text-white rounded-xl px-4 py-2 text-sm">Save</button></>}
        {tab === 'Notifications' && Object.entries(notif).map(([k, v]) => <div key={k} className="flex justify-between items-center text-sm"><span>{k}</span><Toggle on={v} onChange={(x) => setNotif({ ...notif, [k]: x })} /></div>)}
        {tab === 'Appearance' && <div className="flex justify-between items-center text-sm"><span>Light mode</span><Toggle on={light} onChange={theme} /></div>}
        {tab === 'Security' && <><input className={input} type="password" placeholder="Current password" /><input className={input} type="password" placeholder="New password" /><input className={input} type="password" placeholder="Confirm new password" /><button onClick={() => done('Password form submitted (UI only).')} className="bg-primary text-white rounded-xl px-4 py-2 text-sm">Change password</button></>}
        {tab === 'Data & Backup' && <><p className="text-sm text-slate-400">Last backup: 30 Jun 2024, 09:12 (sample)</p><div className="flex gap-2"><button onClick={() => done('Backup started (mock).')} className="bg-primary text-white rounded-xl px-4 py-2 text-sm">Back up now</button><button onClick={() => done('Export prepared (mock).')} className="border border-white/20 rounded-xl px-4 py-2 text-sm">Export data</button></div></>}
      </Card>
    </div>
  )
}
