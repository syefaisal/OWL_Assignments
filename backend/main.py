"""OWL Fund Intelligence — mock data API.

A small FastAPI app that serves the data powering the dashboard. Everything is
mocked in-memory; in a real system these handlers would query a database or an
upstream analytics service.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="OWL Fund Intelligence API", version="1.0.0")

# The frontend runs on a different origin in dev (Vite on :5173), so allow CORS.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


STATS = [
    {
        "id": "funds-monitored",
        "label": "Funds Monitored",
        "value": "142",
        "change": "8.2%",
        "trend": "up",
        "icon": "activity",
    },
    {
        "id": "total-aum",
        "label": "Total AUM Tracked",
        "value": "$15.0B",
        "change": "12.5%",
        "trend": "up",
        "icon": "dollar",
    },
    {
        "id": "avg-ytd-return",
        "label": "Avg. YTD Return",
        "value": "+12.5%",
        "change": "3.1%",
        "trend": "up",
        "icon": "trending-up",
    },
    {
        "id": "active-alerts",
        "label": "Active Alerts",
        "value": "24",
        "change": "15%",
        "trend": "down",
        "icon": "alert",
    },
]


# Cumulative monthly returns (%) for the trailing 12 months.
PERFORMANCE = [
    {"month": "Jul", "portfolio": 2.0, "benchmark": 2.0},
    {"month": "Aug", "portfolio": 3.2, "benchmark": 2.4},
    {"month": "Sep", "portfolio": 2.6, "benchmark": 2.9},
    {"month": "Oct", "portfolio": 4.8, "benchmark": 3.3},
    {"month": "Nov", "portfolio": 4.2, "benchmark": 3.9},
    {"month": "Dec", "portfolio": 5.8, "benchmark": 4.3},
    {"month": "Jan", "portfolio": 7.0, "benchmark": 4.9},
    {"month": "Feb", "portfolio": 7.6, "benchmark": 5.4},
    {"month": "Mar", "portfolio": 8.8, "benchmark": 6.0},
    {"month": "Apr", "portfolio": 9.6, "benchmark": 6.4},
    {"month": "May", "portfolio": 11.0, "benchmark": 7.0},
    {"month": "Jun", "portfolio": 12.2, "benchmark": 7.6},
]


ALLOCATION = [
    {"name": "Hedge Funds", "value": 32, "color": "#6366f1"},
    {"name": "Private Equity", "value": 25, "color": "#3b82f6"},
    {"name": "Venture Capital", "value": 18, "color": "#22c55e"},
    {"name": "Real Assets", "value": 12, "color": "#f97316"},
    {"name": "Fixed Income", "value": 8, "color": "#ef4444"},
    {"name": "Public Equity", "value": 5, "color": "#a855f7"},
]


ALERTS = [
    {
        "id": "1",
        "title": "Tiger Global +25% YTD",
        "detail": "Outperforming benchmark by 17.3pp",
        "time": "2h ago",
        "type": "positive",
    },
    {
        "id": "2",
        "title": "Bridgewater drawdown alert",
        "detail": "Pure Alpha fund down -3.1% YTD",
        "time": "4h ago",
        "type": "warning",
    },
    {
        "id": "3",
        "title": "PM departure at Citadel",
        "detail": "Senior PM Alex Chen leaving",
        "time": "6h ago",
        "type": "people",
    },
    {
        "id": "4",
        "title": "Baupost ADV amendment",
        "detail": "Updated Form ADV filed with SEC",
        "time": "1d ago",
        "type": "filing",
    },
    {
        "id": "5",
        "title": "Renaissance +32.1%",
        "detail": "Top performer in universe",
        "time": "1d ago",
        "type": "positive",
    },
]


@app.get("/api/stats")
def get_stats():
    return STATS


@app.get("/api/performance")
def get_performance():
    return PERFORMANCE


@app.get("/api/allocation")
def get_allocation():
    return ALLOCATION


@app.get("/api/alerts")
def get_alerts():
    return ALERTS


@app.get("/api/health")
def health():
    return {"status": "ok"}
