import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { projects } from '../data/projects'
import { riskMeta } from '../config'
export default function MapPanel({ height = 260 }) {
  return (
    <div>
      <div style={{ height }}>
        <MapContainer center={[29.0, 76.95]} zoom={8} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {projects.map((p) => (
            <CircleMarker key={p.id} center={[p.lat, p.lng]} radius={9} pathOptions={{ color: '#fff', weight: 2, fillColor: riskMeta[p.risk].color, fillOpacity: 0.95 }}>
              <Popup><b>{p.id}</b> {p.name}<br />{p.location} · {riskMeta[p.risk].label}</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-400">
        {Object.values(riskMeta).map((m) => <span key={m.label} className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full" style={{ background: m.color }} />{m.label}</span>)}
      </div>
    </div>
  )
}
