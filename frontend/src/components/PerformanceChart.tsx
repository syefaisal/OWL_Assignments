import { useState } from "react";
import { line, curveMonotoneX } from "d3-shape";
import { scalePoint, scaleLinear } from "d3-scale";
import type { PerformancePoint } from "../types";
import { useMeasure } from "./useMeasure";

const AXIS_COLOR = "#9ca3af";
const HEIGHT = 260;
const MARGIN = { top: 10, right: 14, bottom: 24, left: 38 };

export function PerformanceChart({ data }: { data: PerformancePoint[] }) {
  const { ref, width } = useMeasure();
  const [hover, setHover] = useState<number | null>(null);

  const innerW = Math.max(0, width - MARGIN.left - MARGIN.right);
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;

  const maxValue = Math.max(...data.map((d) => Math.max(d.portfolio, d.benchmark)), 0);
  const yMax = Math.ceil(maxValue / 4) * 4 || 4;
  const yTicks = Array.from({ length: yMax / 4 + 1 }, (_, i) => i * 4);

  const x = scalePoint<string>()
    .domain(data.map((d) => d.month))
    .range([0, innerW]);
  const y = scaleLinear().domain([0, yMax]).range([innerH, 0]);

  const makeLine = line<PerformancePoint>()
    .x((d) => x(d.month) ?? 0)
    .curve(curveMonotoneX);
  const portfolioPath = makeLine.y((d) => y(d.portfolio))(data) ?? "";
  const benchmarkPath = makeLine.y((d) => y(d.benchmark))(data) ?? "";

  const active = hover != null ? data[hover] : null;

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

      <div ref={ref} style={{ position: "relative", width: "100%", height: HEIGHT }}>
        {width > 0 && (
          <svg width={width} height={HEIGHT}>
            <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
              {/* horizontal grid + y axis labels */}
              {yTicks.map((t) => (
                <g key={t} transform={`translate(0,${y(t)})`}>
                  <line x1={0} x2={innerW} stroke="#eef0f4" />
                  <text
                    x={-10}
                    dy="0.32em"
                    textAnchor="end"
                    fill={AXIS_COLOR}
                    fontSize={12}
                  >
                    {t}%
                  </text>
                </g>
              ))}

              {/* x axis labels */}
              {data.map((d) => (
                <text
                  key={d.month}
                  x={x(d.month) ?? 0}
                  y={innerH + 18}
                  textAnchor="middle"
                  fill={AXIS_COLOR}
                  fontSize={12}
                >
                  {d.month}
                </text>
              ))}

              <path d={benchmarkPath} fill="none" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" />
              <path d={portfolioPath} fill="none" stroke="#6366f1" strokeWidth={2.5} />

              {active && (
                <>
                  <line
                    x1={x(active.month) ?? 0}
                    x2={x(active.month) ?? 0}
                    y1={0}
                    y2={innerH}
                    stroke="#e5e7eb"
                  />
                  <circle cx={x(active.month) ?? 0} cy={y(active.portfolio)} r={4} fill="#6366f1" />
                </>
              )}

              {/* hover capture */}
              <rect
                width={innerW}
                height={innerH}
                fill="transparent"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const px = e.clientX - rect.left;
                  let nearest = 0;
                  let best = Infinity;
                  data.forEach((d, i) => {
                    const dist = Math.abs((x(d.month) ?? 0) - px);
                    if (dist < best) {
                      best = dist;
                      nearest = i;
                    }
                  });
                  setHover(nearest);
                }}
                onMouseLeave={() => setHover(null)}
              />
            </g>
          </svg>
        )}

        {active && (
          <div
            className="chart-tooltip"
            style={{
              left: MARGIN.left + (x(active.month) ?? 0),
              top: MARGIN.top + y(active.portfolio),
            }}
          >
            <div className="chart-tooltip__label">{active.month}</div>
            <div>portfolio : {active.portfolio}%</div>
            <div>benchmark : {active.benchmark}%</div>
          </div>
        )}
      </div>
    </section>
  );
}
