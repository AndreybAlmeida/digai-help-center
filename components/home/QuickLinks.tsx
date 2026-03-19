"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const actions = [
  { label: "Criar minha primeira vaga",    href: "/artigo/como-criar-workspace",             tag: "Tutorial" },
  { label: "Configurar triagem com IA",    href: "/artigo/como-criar-triagem",                tag: "Tutorial" },
  { label: "Filtrar e avaliar candidatos", href: "/artigo/como-filtrar-avaliar-candidatos",   tag: "Tutorial" },
  { label: "Publicar vaga no LinkedIn",    href: "/artigo/job-slot-linkedin",                 tag: "Guia"     },
  { label: "Integrar com Gupy",            href: "/artigo/ativando-integracao-gupy",          tag: "Tutorial" },
  { label: "API — Primeiros passos",       href: "/artigo/api-digai-introducao",              tag: "Técnico"  },
];

export default function QuickLinks() {
  return (
    <section style={{ borderTop: "1px solid var(--border)", padding: "56px 24px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>

        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--fg)",
              letterSpacing: "-0.02em",
            }}
          >
            Ações rápidas
          </h2>
          <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--fg-muted)" }}>
            As tarefas mais comuns de quem usa a DigAI
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "8px",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {actions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                textDecoration: "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--fg-subtle)",
                    flexShrink: 0,
                  }}
                >
                  {item.tag}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>
                  {item.label}
                </span>
              </div>
              <ArrowRight style={{ width: "14px", height: "14px", color: "var(--fg-subtle)", flexShrink: 0 }} />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
