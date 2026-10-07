import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import SubmitEvidence from './pages/SubmitEvidence'
import Evidence from './pages/Evidence'
import MapView from './pages/MapView'
import Anomalies from './pages/Anomalies'
import Verification from './pages/Verification'
import Impact from './pages/Impact'
import Reports from './pages/Reports'
import Analytics from './pages/Analytics'
import CitizenReports from './pages/CitizenReports'
import Settings from './pages/Settings'
import AuditLog from './pages/AuditLog'
import Placeholder from './pages/Placeholder'
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="map" element={<MapView />} />
        <Route path="evidence" element={<Evidence />} />
        <Route path="evidence/submit" element={<SubmitEvidence />} />
        <Route path="verification" element={<Verification />} />
        <Route path="anomalies" element={<Anomalies />} />
        <Route path="impact" element={<Impact />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="citizen-reports" element={<CitizenReports />} />
        <Route path="audit-log" element={<AuditLog />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Placeholder title="Not Found" />} />
      </Route>
    </Routes>
  )
}
