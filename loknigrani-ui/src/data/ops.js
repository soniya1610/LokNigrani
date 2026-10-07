import { anomalies } from './registry'
export const inspectors = ['Unassigned', 'Rajesh Kumar', 'Anita Sharma', 'Vikram Singh']
export const columns = [['flagged', 'Flagged'], ['assigned', 'Assigned'], ['inspected', 'Inspected'], ['resolved', 'Resolved'], ['dismissed', 'Dismissed']]
const c = (id, an, status, inspector, due, outcome, response) => {
  const a = anomalies.find((x) => x.id === an)
  return { id, anomalyId: an, project: a.project, title: a.type, confidence: a.confidence, status, inspector, due, outcome, response, findings: '',
    timeline: [{ t: '05 Jun 2024', e: `Case opened from ${an}` }, ...(status !== 'flagged' ? [{ t: '07 Jun 2024', e: `Assigned to ${inspector}` }] : [])] }
}
export const initialCases = [
  c('VC-101', 'AN-001', 'flagged', 'Unassigned', '', '', ''),
  c('VC-102', 'AN-002', 'assigned', 'Rajesh Kumar', '2024-06-20', '', ''),
  c('VC-103', 'AN-003', 'assigned', 'Anita Sharma', '2024-06-22', '', ''),
  c('VC-104', 'AN-004', 'inspected', 'Vikram Singh', '2024-06-15', 'Inconclusive', 'Contractor states reports refer to one location.'),
  c('VC-105', 'AN-005', 'flagged', 'Unassigned', '', '', ''),
  c('VC-106', 'AN-006', 'resolved', 'Anita Sharma', '2024-06-10', 'Confirmed', 'Rectification completed on 12 Jun 2024.'),
  c('VC-107', 'AN-006', 'dismissed', 'Rajesh Kumar', '2024-06-08', 'Not confirmed', 'Surface marks were from temporary barricades.'),
]
export const auditLog = [
  { id: 1, actor: 'System', action: 'Flag created', entity: 'AN-001 (RP-004)', ts: '2024-06-12 11:10' },
  { id: 2, actor: 'System', action: 'Flag created', entity: 'AN-003 (RP-004)', ts: '2024-06-09 14:35' },
  { id: 3, actor: 'Soniya Meena', action: 'Assigned inspector', entity: 'VC-102', ts: '2024-06-07 10:02' },
  { id: 4, actor: 'Soniya Meena', action: 'Assigned inspector', entity: 'VC-103', ts: '2024-06-07 10:05' },
  { id: 5, actor: 'Vikram Singh', action: 'Submitted findings', entity: 'VC-104', ts: '2024-06-15 17:40' },
  { id: 6, actor: 'Anita Sharma', action: 'Marked resolved', entity: 'VC-106', ts: '2024-06-12 15:22' },
  { id: 7, actor: 'Rajesh Kumar', action: 'Dismissed case', entity: 'VC-107', ts: '2024-06-08 12:18' },
  { id: 8, actor: 'Soniya Meena', action: 'Generated report', entity: 'RPT-2024-018', ts: '2024-06-30 09:00' },
  { id: 9, actor: 'Soniya Meena', action: 'Exported data', entity: 'Projects (CSV)', ts: '2024-06-30 09:12' },
]
export const reportList = [
  { id: 'RPT-2024-018', title: 'Monthly Quality Summary – June 2024', type: 'Project', date: '30 Jun 2024' },
  { id: 'RPT-2024-011', title: 'Evidence Validation Report', type: 'Inspection', date: '20 Jun 2024' },
  { id: 'RPT-2024-007', title: 'Financial vs Physical Progress Review', type: 'Financial', date: '10 Jun 2024' },
  { id: 'RPT-2024-004', title: 'Case Activity Audit – Q2', type: 'Audit', date: '05 Jun 2024' },
  { id: 'RPT-2024-002', title: 'RP-004 Industrial Area Road Review', type: 'Project', date: '28 May 2024' },
]
export const citizenStats = { total: 248, resolved: 186, progress: 42, pending: 20 }
export const citizenReports = [
  { id: 'CR-2481', issue: 'Large pothole near junction', location: 'Industrial Area, Delhi', date: '12 Jun 2024', status: 'In Progress' },
  { id: 'CR-2476', issue: 'Cracks on newly laid surface', location: 'Sector 10, Sonipat', date: '11 Jun 2024', status: 'Pending' },
  { id: 'CR-2470', issue: 'Waterlogging after rain', location: 'Village B, Panipat', date: '10 Jun 2024', status: 'In Progress' },
  { id: 'CR-2455', issue: 'Missing lane markings', location: 'Ring Road, Rohtak', date: '08 Jun 2024', status: 'Resolved' },
  { id: 'CR-2441', issue: 'Uneven road edge', location: 'Main Market, Karnal', date: '06 Jun 2024', status: 'Resolved' },
  { id: 'CR-2430', issue: 'Blocked drain beside road', location: 'Industrial Area, Delhi', date: '05 Jun 2024', status: 'Pending' },
]
export const impact = {
  project: 'RP-031', name: 'Ring Road Extension', lengthKm: 6.5, widthM: 7, thicknessM: 0.11, density: 2.4, factor: 0.05, reworkPct: 12,
  before: 54, after: 86,
  byProject: [{ name: 'RP-004', co2: 180 }, { name: 'RP-012', co2: 150 }, { name: 'RP-023', co2: 110 }, { name: 'RP-031', co2: 72 }, { name: 'RP-045', co2: 88 }, { name: 'Other 75', co2: 640 }],
}
export const analytics = {
  trend: [
    { m: 'Jan', 'On Track': 38, 'At Risk': 8, Verification: 4, Delayed: 1 }, { m: 'Feb', 'On Track': 41, 'At Risk': 9, Verification: 5, Delayed: 2 },
    { m: 'Mar', 'On Track': 43, 'At Risk': 11, Verification: 6, Delayed: 2 }, { m: 'Apr', 'On Track': 45, 'At Risk': 12, Verification: 7, Delayed: 3 },
    { m: 'May', 'On Track': 47, 'At Risk': 14, Verification: 8, Delayed: 4 }, { m: 'Jun', 'On Track': 49, 'At Risk': 16, Verification: 9, Delayed: 4 },
    { m: 'Jul', 'On Track': 50, 'At Risk': 17, Verification: 10, Delayed: 5 }, { m: 'Aug', 'On Track': 52, 'At Risk': 18, Verification: 10, Delayed: 5 },
  ],
  kpis: [['Total Projects', '80'], ['Avg Physical Progress', '64%'], ['Budget Utilized', '70% of ₹48.6 Cr'], ['Avg Flag Confidence', '78%']],
  regions: [{ name: 'Rohtak', score: 90 }, { name: 'Panipat', score: 63 }, { name: 'Delhi', score: 61 }, { name: 'Sonipat', score: 58 }, { name: 'Karnal', score: 41 }],
}
