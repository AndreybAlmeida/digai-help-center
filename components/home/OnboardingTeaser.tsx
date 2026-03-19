"use client";

import { onboardingSteps } from "@/data/onboarding";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OnboardingTeaser() {
  const preview = onboardingSteps.slice(0, 4);

  return (
    <section style={{ borderTop: "1px solid var(--border)", padding: "56px 24px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>

          {/* Left */}
          <div style={{ maxWidth: "280px", flexShrink: 0 }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--brand)",
                marginBottom: "8px",
              }}
            >
              Novo por aqui?
            </p>
            <h2
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}
            >
              Comece por aqui
            </h2>
            <p style={{ fontSize: "14px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
              Siga este guia para configurar a DigAI e criar seu primeiro processo seletivo do zero.
            </p>
            <Link
              href="/comece-aqui"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "20px",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--brand)",
                textDecoration: "none",
              }}
            >
              Ver guia completo
              <ArrowRight style={{ width: "15px", height: "15px" }} />
            </Link>
          </div>

          {/* Steps */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            {preview.map((step, i) => (
              <div
                key={step.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "16px 20px",
                  background: "var(--surface)",
                  borderBottom: i < preview.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--brand)",
                    background: "var(--brand-dim)",
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>{step.title}</p>
                  <p style={{ marginTop: "2px", fontSize: "13px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
                    {step.description}
                  </p>
                </div>
                <span style={{ fontSize: "12px", color: "var(--fg-subtle)", flexShrink: 0 }}>
                  {step.estimatedTime} min
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
