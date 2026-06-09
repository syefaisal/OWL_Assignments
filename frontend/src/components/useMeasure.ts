import { useEffect, useRef, useState } from "react";

/**
 * Tracks the rendered width of an element via ResizeObserver.
 * Used to give D3 charts the same fluid sizing that Recharts'
 * ResponsiveContainer provided (width: 100%, fixed height).
 */
export function useMeasure<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
