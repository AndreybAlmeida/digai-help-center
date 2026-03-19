"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function ArticleFeedback() {
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  if (voted) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 16px",
          borderRadius: "10px",
          background: "rgba(32,189,90,0.08)",
          border: "1px solid rgba(32,189,90,0.2)",
          fontSize: "14px",
          color: "#16a34a",
        }}
      >
        <ThumbsUp style={{ width: "15px", height: "15px" }} />
        Obrigado pelo seu feedback!
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <p style={{ fontSize: "14px", color: "var(--fg-muted)" }}>Este artigo foi útil?</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setVoted("up")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "transparent",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--fg-muted)",
            cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(32,189,90,0.4)";
            (e.currentTarget as HTMLElement).style.color = "#16a34a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
          }}
        >
          <ThumbsUp style={{ width: "14px", height: "14px" }} />
          Sim
        </button>
        <button
          onClick={() => setVoted("down")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "transparent",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--fg-muted)",
            cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.3)";
            (e.currentTarget as HTMLElement).style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
          }}
        >
          <ThumbsDown style={{ width: "14px", height: "14px" }} />
          Não
        </button>
      </div>
    </div>
  );
}
