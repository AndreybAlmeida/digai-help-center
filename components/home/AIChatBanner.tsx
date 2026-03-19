import { ArrowRight, Bot, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AIChatBanner() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-subtle)",
        padding: "56px 24px",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            padding: "28px 32px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            flexWrap: "wrap",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bot style={{ width: "22px", height: "22px", color: "#fff" }} />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <h3
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "var(--fg)",
                  letterSpacing: "-0.01em",
                }}
              >
                Fale com a ANA
              </h3>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "2px 8px",
                  borderRadius: "100px",
                  border: "1px solid var(--border)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--fg-muted)",
                }}
              >
                <Sparkles style={{ width: "9px", height: "9px", color: "#00B896" }} />
                IA
              </span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
              A ANA usa toda a base de conhecimento da DigAI para responder dúvidas, sugerir tutoriais e guiar você — em segundos.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/chat"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#fff",
              background: "var(--brand)",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            Iniciar conversa
            <ArrowRight style={{ width: "15px", height: "15px" }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
