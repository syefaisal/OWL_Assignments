import type { Alert, AllocationSlice, PerformancePoint, Stat } from "../types";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  stats: () => getJSON<Stat[]>("/api/stats"),
  performance: () => getJSON<PerformancePoint[]>("/api/performance"),
  allocation: () => getJSON<AllocationSlice[]>("/api/allocation"),
  alerts: () => getJSON<Alert[]>("/api/alerts"),
};
