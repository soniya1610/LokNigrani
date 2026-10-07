# LokNigrani

**Transparent Infrastructure for a Better Tomorrow**

LokNigrani is a Public Infrastructure Quality Intelligence Platform. It compares approved project plans (budget, specifications, timeline, location) with geo-tagged ground evidence, flags **potential deviations** using data and AI-based signals, routes them to authorized human inspectors for verification, and tracks the before/after impact of corrective action.

> This repository contains the **frontend (UI) prototype**. It runs on local mock data. The backend and AI/ML modules are developed separately and can be connected through an API layer.

---

## Problem Statement

Public works such as roads, drainage and civic buildings are defined by an approved budget, specification, timeline and location. The challenge is continuously comparing these commitments with reliable ground-level evidence, which is scattered across documents, progress reports, complaints and photographs.

LokNigrani brings this information into one workflow and answers three questions:

1. What was promised?
2. What can be observed?
3. What should be verified or improved?

## Core Workflow

```
Official Project Data -> Ground Evidence -> Evidence Validation -> AI / Data Analysis
-> Anomaly Detection -> Verification -> Corrective Action -> Before/After Impact -> Report
```

## Key Features

| Module | Description |
|---|---|
| Dashboard | Project KPIs, risk distribution, map, alerts, planned vs reported vs physical progress |
| Projects | Project registry with budget, contractor, status and progress |
| Project Detail | Specifications, evidence timeline, project boundary map, anomalies, verification |
| Evidence Submission | Mobile-friendly form with photo, auto GPS and timestamp, category and observation |
| Evidence | Evidence gallery with validation checklist and AI detection overlays |
| Map View | Geographic view of projects with filters and status counts |
| Anomalies | Flags such as location mismatch, progress jump, repeated complaints, financial vs physical gap, visual defect, each with a risk score and confidence |
| Verification | Kanban workflow: Flagged, Assigned, Inspected, Resolved, Dismissed |
| Impact | Before/after comparison, rework avoided, material and CO2 savings with the calculation shown |
| Reports | Generate and download structured project reports |
| Analytics | Trends, project distribution, budget vs expenditure, regional performance |
| Citizen Reports | Complaint statistics and tracking |
| Audit Log | Record of actions, actors and timestamps |
| Settings | Profile, notifications, appearance, security, data and backup |

## Design Principles

- **Evidence-first:** every alert is traceable to data or evidence.
- **Human-in-the-loop:** AI flags; authorized humans verify and decide.
- **Non-accusatory:** the platform uses "potential deviation" and "needs verification", never "corruption" or "fraud".
- **Transparent uncertainty:** a confidence value is shown with every flag.
- **Auditable:** timestamps, locations, sources and status changes are preserved.
- **Privacy-aware:** personal information in citizen submissions is protected.

> **Disclaimer:** An anomaly is a reason for verification, not proof of wrongdoing. AI results are indicators only.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Charts | Recharts |
| Maps | Leaflet + OpenStreetMap (react-leaflet) |
| Icons | lucide-react |
| Data | Local mock data (`src/data`) |

**Planned backend (separate):** Java + Spring Boot, PostgreSQL with PostGIS, Python (FastAPI, OpenCV, scikit-learn) for AI services, JWT-based role access.

## Project Structure

```
loknigrani-ui/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx          # App entry point
    ├── App.jsx           # Routes
    ├── config.js         # App configuration
    ├── index.css         # Global styles (Tailwind)
    ├── components/       # Layout, charts, map panel, shared UI
    ├── pages/            # One file per page/module
    └── data/             # Mock data (projects, dashboard, registry, operations)
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/loknigrani-ui.git

# 2. Move into the project
cd loknigrani-ui

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Demo Data

All pages use consistent sample data. The main demo project is:

| Field | Value |
|---|---|
| Project ID | RP-004 |
| Name | Industrial Area Road, Delhi |
| Length | 4.0 km |
| Specified thickness | 100 mm |
| Approved budget | Rs. 60 Lakh |
| Utilized | Rs. 42 Lakh (70%) |
| Reported progress | 78% |
| Physical progress | 61% |
| Risk level | High (potential deviation, verification recommended) |

## Connecting a Backend

The UI reads from `src/data/*.js`. To connect real APIs:

1. Create a small API helper (for example with Axios) and set the base URL in `src/config.js`.
2. Replace each mock import in a page with an API call.
3. Keep the same data shapes so components continue to work unchanged.

## Roadmap

- [ ] REST API integration (Spring Boot)
- [ ] Authentication and role-based access (Citizen, Inspector, Authority, Contractor)
- [ ] Evidence validation (EXIF, GPS within boundary, duplicate check)
- [ ] AI image analysis for defects (cracks, potholes)
- [ ] Anomaly engine and risk scoring
- [ ] PDF report generation
- [ ] Predictive maintenance

## Screenshots

Add screenshots here after running the app.

```
docs/screenshots/dashboard.png
docs/screenshots/anomalies.png
docs/screenshots/verification.png
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is created for educational and hackathon purposes. Add a license of your choice (for example MIT) before public release.

## Team

- Add team member names and roles here.

---

**Better Roads, Greener Future.**
