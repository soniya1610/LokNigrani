import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, MapPin, Clock, Lock, CheckCircle2 } from 'lucide-react'
import { Card } from '../components/ui'
import { fullProjects, categories } from '../data/registry'

export default function SubmitEvidence() {
  const [file, setFile] = useState(null), [preview, setPreview] = useState(null)
  const [gps, setGps] = useState(null), [gpsMsg, setGpsMsg] = useState('')
  const [stamp] = useState(() => new Date().toLocaleString())
  const [project, setProject] = useState(fullProjects[0].id), [cat, setCat] = useState('Pothole'), [note, setNote] = useState('')
  const [ref, setRef] = useState(null)
  const onFile = (e) => {
    const f = e.target.files[0]; if (!f) return
    setFile(f); setPreview(URL.createObjectURL(f)); setGpsMsg('Locating…')
    if (!navigator.geolocation) return setGpsMsg('Geolocation unavailable in this browser.')
    navigator.geolocation.getCurrentPosition(
      (pos) => { setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setGpsMsg('') },
      () => setGpsMsg('Location permission denied. It will be marked Needs Review.'), { timeout: 8000 })
  }
  const submit = () => setRef(`LN-EV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`)
  if (ref) return (
    <div className="max-w-md mx-auto"><Card className="text-center py-10">
      <CheckCircle2 size={48} className="mx-auto text-ok" /><h2 className="text-lg font-semibold text-white mt-3">Evidence submitted</h2>
      <p className="text-sm text-slate-400 mt-1">Reference ID</p><p className="text-xl font-bold text-primary tracking-wide">{ref}</p>
      <p className="text-xs text-slate-500 mt-3">Your submission will be validated and may be marked GPS Verified or Needs Review.</p>
      <Link to="/evidence" className="inline-block mt-5 bg-primary text-white text-sm px-4 py-2 rounded-xl">Go to Evidence</Link></Card></div>
  )
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold text-white">Submit Evidence</h1>
      <Card>
        <label className="block border-2 border-dashed border-white/15 rounded-xl p-4 text-center cursor-pointer hover:border-primary">
          {preview ? <img src={preview} alt="Preview" className="rounded-lg max-h-64 mx-auto" /> : <div className="py-8 text-slate-400"><Camera className="mx-auto mb-2" />Tap to take or upload a photo</div>}
          <input type="file" accept="image/*" capture="environment" onChange={onFile} className="hidden" />
        </label>
        <div className="mt-3 space-y-1 text-xs text-slate-300">
          <div className="flex items-center gap-2"><MapPin size={14} className="text-primary" />{gps ? `${gps.lat.toFixed(5)}, ${gps.lng.toFixed(5)}` : gpsMsg || 'GPS captured automatically after you add a photo'}</div>
          <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />{stamp}</div>
        </div>
      </Card>
      <Card className="space-y-3 text-sm">
        <label className="block text-xs text-slate-400">Project
          <select value={project} onChange={(e) => setProject(e.target.value)} className="mt-1 w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-slate-200">{fullProjects.map((p) => <option key={p.id} value={p.id}>{p.id} · {p.name}</option>)}</select></label>
        <div><div className="text-xs text-slate-400 mb-1">Category</div><div className="flex flex-wrap gap-2">{categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs border ${cat === c ? 'bg-primary border-primary text-white' : 'border-white/10 text-slate-300'}`}>{c}</button>))}</div></div>
        <label className="block text-xs text-slate-400">Observation
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} placeholder="Describe what you see…" className="mt-1 w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-primary" /></label>
        <p className="flex gap-2 text-xs text-slate-400 bg-navy rounded-xl p-3"><Lock size={14} className="shrink-0 text-primary" />Your identity is not shown publicly. Location and time are used only to validate this evidence.</p>
        <button disabled={!file} onClick={submit} className="w-full bg-primary disabled:opacity-40 text-white rounded-xl py-2.5">Submit Evidence</button>
      </Card>
    </div>
  )
}
