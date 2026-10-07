import { Construction } from 'lucide-react'
export default function Placeholder({ title }) {
  return (
    <div className="bg-card rounded-xl border border-white/5 p-12 text-center">
      <Construction className="mx-auto text-primary mb-3" size={36} />
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      <p className="text-slate-400 text-sm mt-1">This page is coming in the next part.</p>
    </div>
  )
}
