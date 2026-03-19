"use client";

import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import {
  BarChart3, Briefcase, ChevronRight, CircleHelp,
  Code2, Cpu, Plug, Rocket, SearchCheck,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ style?: React.CSSProperties }>> = {
  Rocket, Briefcase, Cpu, SearchCheck, Plug, BarChart3, Code2, CircleHelp,
};

export default function CategoryGrid() {
  return (
    <section style={{ padding: "56px 24px" }}>
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
            Explorar por categoria
          </h2>
          <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--fg-muted)" }}>
            Documentação organizada por área da plataforma
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
          }}
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || CircleHelp;
            const count = articles.filter((a) => a.category === cat.slug && a.published).length;

            return (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  textDecoration: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "var(--bg-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: "16px", height: "16px", color: "var(--fg-muted)" }} />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)", marginBottom: "4px" }}>
                    {cat.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--fg-muted)",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {cat.description}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "var(--fg-subtle)" }}>
                    {count} {count === 1 ? "artigo" : "artigos"}
                  </span>
                  <ChevronRight style={{ width: "14px", height: "14px", color: "var(--fg-subtle)" }} />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
