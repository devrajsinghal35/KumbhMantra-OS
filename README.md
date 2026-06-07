# KumbhMantra OS

KumbhMantra OS is a modular Vite + React command center designed for large-scale event operations such as Mahakumbh crowd management. It presents live crowd telemetry, incident triage, fleet coordination, and AI-assisted recommendations in a judge-friendly dashboard repository structure.

## Why this repository stands out

- Production-ready modular architecture instead of a single monolithic file.
- Feature-based React structure for overview, incidents, fleet, AI intelligence, and analytics.
- Vite-powered development and production builds.
- Reusable UI primitives such as sparklines, gauges, badges, shell layout, and toast feedback.
- Mock simulation engine that makes the prototype feel live during demos without requiring backend services.

## Repository structure

```text
kumbhmantra-command-center/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── data/
│   ├── features/
│   │   ├── overview/
│   │   ├── incidents/
│   │   ├── fleet/
│   │   ├── ai-intel/
│   │   └── analytics/
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Core features

### 1. Unified telemetry overview
The overview tab provides high-priority operational awareness across active zones. Sector cards include density gauges, sparklines, status badges, and action buttons for rapid command decisions.

### 2. Incident management center
Operators can inspect urgent incidents, dispatch squads, escalate active issues, and track responder ETAs from a dedicated incident panel.

### 3. Fleet deployment tracker
Transport and emergency assets are displayed in a structured operational table with load bars, route assignment, and reroute actions.

### 4. AI intelligence panel
The AI panel surfaces predictive recommendations, optimization opportunities, and crowd-flow projections for the next hour.

### 5. Analytics layer
Analytics panels summarize sector density comparison and incident distribution to support post-event review and live trend interpretation.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS 3
- ESLint 9
- PostCSS + Autoprefixer

## Getting started

```bash
npm install
npm run dev
```

Open the local Vite URL in your browser after the dev server starts.

## Production commands

```bash
npm run build
npm run preview
npm run lint
```

## Architecture notes

- `src/data/` stores mock operational datasets.
- `src/hooks/useSimulationEngine.js` drives live demo behavior.
- `src/lib/` contains status, formatting, and metric utilities.
- `src/features/` isolates each dashboard domain for easier scaling.
- `src/components/layout/` and `src/components/ui/` keep the design system reusable.

## Hackathon pitch angle

KumbhMantra OS demonstrates how a real-time command layer can reduce response delay, surface congestion risk earlier, and help administrators coordinate crowd safety across dense public infrastructure. The repository is organized to show engineering maturity, not just UI polish.

## Suggested next upgrades

- Replace mock datasets with REST or WebSocket feeds.
- Add role-based operator views.
- Integrate GIS maps and geofenced alerts.
- Store historical analytics snapshots.
- Add unit tests and visual regression checks.
