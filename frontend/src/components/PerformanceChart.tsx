import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PerformancePoint } from "../types";

const AXIS_COLOR = "#9ca3af";

export function PerformanceChart({ data }: { data: PerformancePoint[] }) {
  return (
    <section className="card chart-card">
      <div className="card__head">
        <div>
          <h2 className="card__title">Portfolio Performance</h2>
          <p className="card__subtitle">Cumulative returns vs. benchmark</p>
        </div>
        <div className="legend">
          <span className="legend__item">
            <span className="legend__swatch legend__swatch--portfolio" />
            Portfolio
          </span>
          <span className="legend__item">
            <span className="legend__swatch legend__swatch--benchmark" />
            Benchmark
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid stroke="#eef0f4" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: AXIS_COLOR, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: AXIS_COLOR, fontSize: 12 }}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
            width={42}
          />
          <Tooltip
            formatter={(v: number) => `${v}%`}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="portfolio"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="#9ca3af"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
