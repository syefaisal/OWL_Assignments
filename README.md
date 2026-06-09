# OWL — Fund Intelligence Dashboard

A recreation of the OWL Fund Intelligence dashboard: a React + TypeScript frontend
that renders mock data served by a small Python (FastAPI) backend.


## Stack

- **Frontend:** React 18 + TypeScript, [Vite](https://vitejs.dev/) for tooling,
  [D3](https://d3js.org/) (`d3-scale` + `d3-shape`) for the line + donut charts,
  rendered as React-controlled SVG. Plain CSS (no UI framework) to keep the styling
  close to the reference and dependency-light.
- **Backend:** FastAPI + uvicorn serving static mock JSON over a small REST API.

## Project layout

```
backend/
  main.py            # FastAPI app + mock data, one handler per dashboard section
  requirements.txt
frontend/
  src/
    api/client.ts    # typed fetch wrapper around the API
    types.ts         # shared TS types (mirror the API response shapes)
    components/       # Header, StatsRow, PerformanceChart, AllocationChart, AlertsPanel
                      # useMeasure.ts — ResizeObserver hook for responsive chart sizing
    App.tsx          # composes the layout, fetches each section
    styles.css
```

## Running locally

You need two terminals (backend + frontend).

**1. Backend** (http://localhost:8000)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**2. Frontend** (http://localhost:5173)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. Vite proxies `/api/*` to the backend on port 8000
(see `frontend/vite.config.ts`), so the frontend uses relative URLs and there's no
CORS/host config to manage in dev.

## API

| Endpoint           | Returns                                              |
| ------------------ | ---------------------------------------------------- |
| `GET /api/stats`       | Four top-line metric cards                       |
| `GET /api/performance` | 12 months of portfolio vs. benchmark returns     |
| `GET /api/allocation`  | Strategy allocation breakdown (donut + legend)   |
| `GET /api/alerts`      | Alert feed for the sidebar                       |
| `GET /api/health`      | Liveness check                                   |

## Approach & decisions

- **Data shape drives the UI.** The TypeScript types in `types.ts` mirror the API
  responses exactly, so the contract between backend and frontend is explicit and
  the components stay dumb — they just render what they're given.
- **One handler per dashboard section.** Each visual block maps to its own endpoint
  and its own component, so the four sections are fetched independently and a slow
  or failed section doesn't block the others.
- **Icons are inline SVG** (`components/icons.tsx`) rather than an icon library — a
  handful of small Feather-style glyphs isn't worth a dependency.
- **Charts are hand-rolled with D3** (`d3-scale` for axes, `d3-shape` for the
  `curveMonotoneX` line and donut `arc`/`pie`), but React owns the DOM — D3 only
  computes geometry and React renders the SVG. A small `useMeasure` ResizeObserver
  hook supplies the container width so charts stay fluid (replacing what Recharts'
  `ResponsiveContainer` did). There's no enter/transition animation, which keeps the
  first paint deterministic and headless screenshotting reliable.

## What I'd do next

- **Loading & empty states.** Currently sections simply don't render until data
  arrives; skeleton placeholders would feel more polished.
- **Make the data live.** Move the mock data into the backend's domain layer and
  add query params (date range, fund filters) so the charts are interactive.
- **Wire up the interactions.** "Mark all read", the notification bell, and alert
  click-through are presentational right now.
- **Tests.** Component tests (React Testing Library) for the cards/charts and a
  couple of API contract tests (pytest + FastAPI TestClient).
- **Shared types.** Generate the TS types from the FastAPI/OpenAPI schema so the
  frontend and backend can't drift.
