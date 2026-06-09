import { api } from "./api/client";
import { AlertsPanel } from "./components/AlertsPanel";
import { AllocationChart } from "./components/AllocationChart";
import { Header } from "./components/Header";
import { PerformanceChart } from "./components/PerformanceChart";
import { StatsRow } from "./components/StatsRow";
import { useFetch } from "./components/useFetch";

export default function App() {
  const stats = useFetch(api.stats);
  const performance = useFetch(api.performance);
  const allocation = useFetch(api.allocation);
  const alerts = useFetch(api.alerts);

  const error =
    stats.error || performance.error || allocation.error || alerts.error;

  return (
    <div className="app">
      <Header />

      <main className="layout">
        <div className="layout__main">
          {error && (
            <div className="banner banner--error">
              Couldn’t reach the API — is the backend running on :8000? ({error})
            </div>
          )}

          {stats.data && <StatsRow stats={stats.data} />}

          <div className="charts-grid">
            {performance.data && <PerformanceChart data={performance.data} />}
            {allocation.data && <AllocationChart data={allocation.data} />}
          </div>
        </div>

        {alerts.data && <AlertsPanel alerts={alerts.data} />}
      </main>
    </div>
  );
}
