import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { AllocationSlice } from "../types";

export function AllocationChart({ data }: { data: AllocationSlice[] }) {
  return (
    <section className="card chart-card">
      <div className="card__head">
        <div>
          <h2 className="card__title">Strategy Allocation</h2>
          <p className="card__subtitle">Current portfolio breakdown</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={52}
            outerRadius={80}
            paddingAngle={2}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number, name: string) => [`${v}%`, name]}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <ul className="alloc-legend">
        {data.map((slice) => (
          <li key={slice.name} className="alloc-legend__row">
            <span className="alloc-legend__left">
              <span
                className="alloc-legend__dot"
                style={{ backgroundColor: slice.color }}
              />
              {slice.name}
            </span>
            <span className="alloc-legend__value">{slice.value}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
