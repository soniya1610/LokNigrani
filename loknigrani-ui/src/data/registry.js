import { projects } from './projects'
const details = {
  'RP-004': { contractor: 'Delhi Infra Works Pvt Ltd', status: 'Ongoing', material: 'Bituminous Concrete (BC)', state: 'Delhi', type: 'Urban Road' },
  'RP-012': { contractor: 'Haryana Roadways Co.', status: 'Ongoing', material: 'Dense Bituminous Macadam', state: 'Haryana', type: 'Urban Road' },
  'RP-023': { contractor: 'Panipat Civil Constructions', status: 'Delayed', material: 'Premix Carpet', state: 'Haryana', type: 'Rural Road' },
  'RP-031': { contractor: 'Rohtak Highway Builders', status: 'Completed', material: 'Bituminous Concrete (BC)', state: 'Haryana', type: 'Highway' },
  'RP-045': { contractor: 'Karnal Urban Developers', status: 'Ongoing', material: 'Semi-Dense Bituminous Concrete', state: 'Haryana', type: 'Urban Road' },
}
export const fullProjects = projects.map((p) => ({ ...p, ...details[p.id], boundary: [[p.lat - 0.002, p.lng - 0.01], [p.lat - 0.002, p.lng + 0.01], [p.lat + 0.002, p.lng + 0.01], [p.lat + 0.002, p.lng - 0.01]] }))
export const getProject = (id) => fullProjects.find((p) => p.id === id)
export const categories = ['Pothole', 'Crack', 'Incomplete work', 'Drainage', 'Other']
const ev = (id, project, status, category, phase, time, date, lat, lng, grad, checks, detections) => ({ id, project, status, category, phase, time, date, lat, lng, grad, checks, detections })
export const evidenceItems = [
  ev('EV-101', 'RP-004', 'verified', 'Incomplete work', 'Before', '12 Jun 2024, 10:42 AM', '2024-06-12', 28.6692, 77.157, 'from-slate-600 to-slate-800', { exif: true, boundary: true, duplicate: true }, [{ label: 'Unfinished surface', conf: 82, box: [15, 45, 40, 30] }]),
  ev('EV-102', 'RP-004', 'verified', 'Crack', 'During', '12 Jun 2024, 11:05 AM', '2024-06-12', 28.6701, 77.1583, 'from-blue-900 to-slate-700', { exif: true, boundary: true, duplicate: true }, [{ label: 'Crack', conf: 88, box: [30, 30, 45, 15] }]),
  ev('EV-103', 'RP-012', 'verified', 'Pothole', 'During', '11 Jun 2024, 04:20 PM', '2024-06-11', 28.9931, 77.0151, 'from-stone-600 to-stone-800', { exif: true, boundary: true, duplicate: true }, [{ label: 'Pothole', conf: 91, box: [25, 50, 25, 20] }]),
  ev('EV-104', 'RP-031', 'verified', 'Other', 'After', '10 Jun 2024, 09:15 AM', '2024-06-10', 28.8955, 76.6066, 'from-emerald-900 to-slate-700', { exif: true, boundary: true, duplicate: true }, [{ label: 'Lane marking', conf: 76, box: [10, 60, 70, 10] }]),
  ev('EV-105', 'RP-004', 'review', 'Drainage', 'After', '09 Jun 2024, 02:10 PM', '2024-06-09', 28.6812, 77.1702, 'from-slate-700 to-indigo-900', { exif: false, boundary: false, duplicate: true }, [{ label: 'Blocked drain', conf: 69, box: [55, 55, 30, 25] }]),
  ev('EV-106', 'RP-023', 'review', 'Pothole', 'During', '08 Jun 2024, 05:48 PM', '2024-06-08', 29.3912, 76.9641, 'from-zinc-600 to-zinc-800', { exif: true, boundary: true, duplicate: false }, [{ label: 'Pothole', conf: 64, box: [35, 40, 22, 22] }]),
  ev('EV-107', 'RP-045', 'verified', 'Crack', 'Before', '07 Jun 2024, 08:30 AM', '2024-06-07', 29.6859, 76.9908, 'from-neutral-600 to-slate-800', { exif: true, boundary: true, duplicate: true }, [{ label: 'Crack', conf: 85, box: [20, 35, 55, 14] }]),
  ev('EV-108', 'RP-012', 'review', 'Incomplete work', 'After', '06 Jun 2024, 12:00 PM', '2024-06-06', 28.9935, 77.0149, 'from-stone-700 to-slate-900', { exif: false, boundary: true, duplicate: true }, [{ label: 'Thin layer', conf: 72, box: [18, 48, 50, 28] }]),
]
export const anomalyTypes = ['Location mismatch', 'Progress jump', 'Repeated complaints', 'Financial vs physical gap', 'Visual defect']
export const anomalies = [
  { id: 'AN-001', project: 'RP-004', type: 'Financial vs physical gap', rule: 'R-07: Utilized % exceeds physical % by > 8 pts', reason: 'Budget utilized 70% while physical progress is 61%. Potential deviation, needs verification.', score: 82, confidence: 87, evidence: 'EV-102' },
  { id: 'AN-002', project: 'RP-004', type: 'Progress jump', rule: 'R-03: Reported progress rose > 15 pts in 30 days', reason: 'Reported progress moved from 63% to 78% without matching site evidence.', score: 76, confidence: 81, evidence: 'EV-101' },
  { id: 'AN-003', project: 'RP-004', type: 'Location mismatch', rule: 'R-01: Photo GPS outside project boundary', reason: 'Photo coordinates fall about 1.4 km outside the boundary polygon.', score: 71, confidence: 78, evidence: 'EV-105' },
  { id: 'AN-004', project: 'RP-023', type: 'Repeated complaints', rule: 'R-11: 3+ citizen reports within 14 days', reason: 'Multiple pothole reports near the same chainage; possible duplicate submissions.', score: 58, confidence: 68, evidence: 'EV-106' },
  { id: 'AN-005', project: 'RP-012', type: 'Visual defect', rule: 'R-15: AI detects surface thinning indicator', reason: 'Visual indicators suggest thinner layer than specified 90 mm. Needs verification.', score: 62, confidence: 72, evidence: 'EV-108' },
  { id: 'AN-006', project: 'RP-045', type: 'Visual defect', rule: 'R-14: Crack density above threshold', reason: 'Early-stage cracking detected on a recently laid section.', score: 49, confidence: 71, evidence: 'EV-107' },
]
export const reports = [
  { id: 'RPT-2024-018', title: 'Monthly Quality Summary – June 2024' },
  { id: 'RPT-2024-011', title: 'Evidence Validation Report' },
  { id: 'RPT-2024-007', title: 'Financial vs Physical Progress Review' },
]
