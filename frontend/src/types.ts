export type Trend = "up" | "down";

export type StatIcon = "activity" | "dollar" | "trending-up" | "alert";

export interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: Trend;
  icon: StatIcon;
}

export interface PerformancePoint {
  month: string;
  portfolio: number;
  benchmark: number;
}

export interface AllocationSlice {
  name: string;
  value: number;
  color: string;
}

export type AlertType = "positive" | "warning" | "people" | "filing";

export interface Alert {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: AlertType;
}
