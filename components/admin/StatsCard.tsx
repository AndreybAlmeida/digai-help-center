"use client";

interface StatsCardProps {
  label: string;
  value: number | string;
  color?: string;
}

export default function StatsCard({ label, value, color = "var(--brand)" }: StatsCardProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        flex: "1 1 160px",
      }}
    >
      <span
        style={{
          fontSize: "32px",
          fontWeight: 800,
          color,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: "13px", color: "var(--fg-muted)", fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}
