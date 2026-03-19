"use client";

import { AI_CONFIG } from "@/lib/config";
import { Bot, Sparkles } from "lucide-react";
import { useState } from "react";

interface ChatSuggestionsProps {
  onSelect: (q: string) => void;
}

function AnaAvatar({ size = 96 }: { size?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,52,171,0.20)",
      }}>
        <Bot style={{ width: size * 0.42, height: size * 0.42, color: "#fff" }} />
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,52,171,0.20)",
      border: "3px solid var(--brand-dim)", flexShrink: 0,
    }}>
      <img
        src="/ana-avatar.png"
        alt="ANA"
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
      />
    </div>
  );
}

export default function ChatSuggestions({ onSelect }: ChatSuggestionsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "40px 16px",
        textAlign: "center",
      }}
    >
      <AnaAvatar size={96} />

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "6px" }}>
          <p
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "var(--fg)",
            }}
          >
            {AI_CONFIG.name}
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 8px",
              borderRadius: "100px",
              background: "var(--brand-dim)",
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--brand)",
            }}
          >
            <Sparkles style={{ width: "9px", height: "9px" }} />
            IA
          </span>
        </div>
        <p style={{ maxWidth: "340px", fontSize: "14px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
          {AI_CONFIG.welcomeMessage}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", maxWidth: "400px" }}>
        {AI_CONFIG.suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            style={{
              padding: "6px 14px",
              borderRadius: "100px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              fontSize: "12px",
              color: "var(--fg-muted)",
              cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
              (e.currentTarget as HTMLElement).style.color = "var(--fg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
