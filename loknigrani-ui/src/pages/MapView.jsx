import { useState } from 'react'
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { Card, Select, Tabs, PageHead } from '../components/ui'
import { fullProjects } from '../data/registry'
import { riskMeta } from '../config'

const tiles = {
  Map: ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', '&copy; OpenStreetMap contributors'],
  Satellite: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 'Tiles &copy; Esri'],
}
export default function MapView() {
  const [mode, setMode] = useState('Map'), [state, setState] = useState('All states'), [type, setType] = useState('All types'), [status, setStatus] = useState('All statuses')
  const rows = fullProjects.filter((p) => (state === 'All states' || p.state === state) && (type === 'All types' || p.type === type) && (status === 'All statuses' || p.status === status))
  const count = (s) => rows.filter((p) => p.status === s).length
  return (
    <div>
      <PageHead title="Map View" sub={`${rows.length} projects shown`}><Tabs tabs={['Map', 'Satellite']} value={mode} onChange={setMode} /></PageHead>
      <div className="flex flex-wrap gap-3 mb-4">
        <Select label="State" value={state} onChange={setState} options={['All states', 'Delhi', 'Haryana']} />
        <Select label="Type" value={type} onChange={setType} options={['All types', 'Urban Road', 'Rural Road', 'Highway']} />
        <Select label="Status" value={status} onChange={setStatus} options={['All statuses', 'Ongoing', 'Completed', 'Delayed']} />
      </div>
      <div className="grid lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-3 p-2"><div className="h-[520px]">
          <MapContainer center={[29.0, 76.95]} zoom={8} style={{ height: '100%', width: '100%' }}>
            <TileLayer key={mode} url={tiles[mode][0]} attribution={tiles[mode][1]} />
            {rows.map((p) => (
              <span key={p.id}>
                <Polygon positions={p.boundary} pathOptions={{ color: riskMeta[p.risk].color, fillOpacity: 0.25, weight: 2 }} />
                <CircleMarker center={[p.lat, p.lng]} radius={9} pathOptions={{ color: '#fff', weight: 2, fillColor: riskMeta[p.risk].color, fillOpacity: 1 }}>
                  <Popup><b>{p.id}</b> {p.name}<br />{riskMeta[p.risk].label} · {p.status}<br /><Link to={`/projects/${p.id}`}>Open details</Link></Popup>
                </CircleMarker>
              </span>))}
          </MapContainer></div></Card>
        <div className="space-y-4">
          <Card title="Status counts">{['Ongoing', 'Completed', 'Delayed'].map((s) => <div key={s} className="flex justify-between py-2 border-b border-white/5 text-sm"><span>{s}</span><span className="text-white font-semibold">{count(s)}</span></div>)}</Card>
          <Card title="Legend">{Object.values(riskMeta).map((m) => <div key={m.label} className="flex items-center gap-2 text-sm py-1"><i className="h-3 w-3 rounded-full" style={{ background: m.color }} />{m.label}</div>)}
            <p className="text-xs text-slate-500 mt-2">Shaded areas show project boundaries.</p></Card>
        </div>
      </div>
    </div>
  )
}
