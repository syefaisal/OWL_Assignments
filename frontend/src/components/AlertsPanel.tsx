import type { Alert } from "../types";
import { AlertGlyph } from "./icons";

function AlertRow({ alert }: { alert: Alert }) {
  return (
    <li className="alert">
      <span className={`alert__icon alert__icon--${alert.type}`}>
        <AlertGlyph type={alert.type} width={16} height={16} />
      </span>
      <div className="alert__body">
        <p className="alert__title">{alert.title}</p>
        <p className="alert__detail">{alert.detail}</p>
        <span className="alert__time">{alert.time}</span>
      </div>
    </li>
  );
}

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <aside className="alerts-panel">
      <div className="alerts-panel__head">
        <h2 className="alerts-panel__title">Alerts</h2>
        <button className="alerts-panel__action">Mark all read</button>
      </div>
      <ul className="alerts-panel__list">
        {alerts.map((a) => (
          <AlertRow key={a.id} alert={a} />
        ))}
      </ul>
    </aside>
  );
}
