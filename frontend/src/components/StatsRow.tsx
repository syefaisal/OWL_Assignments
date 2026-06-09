import type { Stat } from "../types";
import { StatGlyph } from "./icons";

function ChangeBadge({ change, trend }: { change: string; trend: Stat["trend"] }) {
  const up = trend === "up";
  return (
    <span className={`stat-card__change stat-card__change--${trend}`}>
      <span className="stat-card__arrow">{up ? "↗" : "↘"}</span>
      {change}
    </span>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__icon">
          <StatGlyph name={stat.icon} />
        </span>
        <ChangeBadge change={stat.change} trend={stat.trend} />
      </div>
      <div className="stat-card__value">{stat.value}</div>
      <div className="stat-card__label">{stat.label}</div>
    </div>
  );
}

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats-row">
      {stats.map((s) => (
        <StatCard key={s.id} stat={s} />
      ))}
    </div>
  );
}
