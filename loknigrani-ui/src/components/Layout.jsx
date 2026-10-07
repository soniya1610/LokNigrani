import { NavLink, Outlet } from 'react-router-dom'
import { Search, Bell, ShieldCheck } from 'lucide-react'
import { nav } from '../config'
import { user } from '../data/dashboard'

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-16 md:w-60 bg-card border-r border-white/5 flex flex-col">
      <div className="p-3 md:p-4 flex items-center gap-2">
        <div className="h-9 w-9 shrink-0 rounded-lg bg-primary flex items-center justify-center shadow-glow"><ShieldCheck size={20} className="text-white" /></div>
        <div className="hidden md:block leading-tight"><div className="font-bold text-white">LokNigrani</div><div className="text-[10px] text-slate-400">Transparent Infrastructure for a Better Tomorrow</div></div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {nav.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} end={path === '/'} title={label}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm justify-center md:justify-start ${isActive ? 'bg-primary text-white shadow-glow' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <Icon size={18} /><span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="hidden md:block p-4 text-xs text-slate-500 border-t border-white/5">Better Roads, Greener Future</div>
    </aside>
  )
}
function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-navy/90 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center gap-3">
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
        <input placeholder="Search projects, locations, evidence..." className="w-full bg-card rounded-xl pl-9 pr-3 py-2 text-sm outline-none border border-white/5 focus:border-primary" />
      </div>
      <button className="relative p-2 rounded-xl bg-card border border-white/5"><Bell size={18} /><span className="absolute -top-1 -right-1 text-[10px] bg-risk text-white rounded-full h-4 w-4 flex items-center justify-center">4</span></button>
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-white">SM</div>
        <div className="hidden sm:block leading-tight"><div className="text-sm text-white">{user.name}</div><div className="text-xs text-slate-400">{user.role}</div></div>
      </div>
    </header>
  )
}
export default function Layout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-16 md:ml-60"><Topbar /><main className="p-4 md:p-6"><Outlet /></main></div>
    </div>
  )
}
