import { useState } from "react";
import { pie, arc } from "d3-shape";
import type { AllocationSlice } from "../types";
import { useMeasure } from "./useMeasure";

const HEIGHT = 200;
const INNER_RADIUS = 52;
const OUTER_RADIUS = 80;
const PAD_ANGLE = (2 * Math.PI) / 180; // 2deg, matches Recharts paddingAngle={2}

export function AllocationChart({ data }: { data: AllocationSlice[] }) {
  const { ref, width } = useMeasure();
  const [hover, setHover] = useState<number | null>(null);

  const cx = width / 2;
  const cy = HEIGHT / 2;

  const arcs = pie<AllocationSlice>()
    .value((d) => d.value)
    .sort(null)
    .padAngle(PAD_ANGLE)(data);

  const makeArc = arc<(typeof arcs)[number]>()
    .innerRadius(INNER_RADIUS)
    .outerRadius(OUTER_RADIUS);

  const active = hover != null ? data[hover] : null;

  return (
    <section className="card chart-card">
      <div className="card__head">
        <div>
          <h2 className="card__title">Strategy Allocation</h2>
          <p className="card__subtitle">Current portfolio breakdown</p>
        </div>
      </div>

      <div ref={ref} style={{ position: "relative", width: "100%", height: HEIGHT }}>
        {width > 0 && (
          <svg width={width} height={HEIGHT}>
            <g transform={`translate(${cx},${cy})`}>
              {arcs.map((a, i) => (
                <path
                  key={data[i].name}
                  d={makeArc(a) ?? ""}
                  fill={data[i].color}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
              ))}
            </g>
          </svg>
        )}

        {active && (
          <div
            className="chart-tooltip"
            style={{ left: cx, top: cy }}
          >
            {active.name} : {active.value}%
          </div>
        )}
      </div>

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
