// Minimal inline SVG icons (stroke-based, Feather-style) so we avoid an icon
// dependency. Each accepts standard SVG props (size via width/height, color via
// `stroke="currentColor"`).
import type { SVGProps } from "react";
import type { AlertType, StatIcon } from "../types";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ActivityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export function DollarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function OwlIcon(props: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <circle cx="9" cy="9" r="2.5" />
      <circle cx="15" cy="9" r="2.5" />
      <path d="M4 8a8 8 0 0 1 16 0v5a8 8 0 0 1-16 0z" />
      <path d="M9 16c1 1 2 1.2 3 1.2S14 17 15 16" />
    </svg>
  );
}

const STAT_ICONS = {
  activity: ActivityIcon,
  dollar: DollarIcon,
  "trending-up": TrendingUpIcon,
  alert: AlertTriangleIcon,
} as const;

export function StatGlyph({ name, ...props }: { name: StatIcon } & IconProps) {
  const Cmp = STAT_ICONS[name];
  return <Cmp {...props} />;
}

const ALERT_ICONS = {
  positive: TrendingUpIcon,
  warning: AlertTriangleIcon,
  people: UsersIcon,
  filing: FileIcon,
} as const;

export function AlertGlyph({ type, ...props }: { type: AlertType } & IconProps) {
  const Cmp = ALERT_ICONS[type];
  return <Cmp {...props} />;
}
