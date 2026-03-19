"use client";

import { searchArticles } from "@/data/articles";
import { searchKnowledge } from "@/lib/knowledgeStore";
import { ArrowRight, CircleHelp, FileText, GraduationCap, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SearchResult = {
  id: string;
  title: string;
  summary: string;
  href: string;
  resultType: "article" | "knowledge";
};

const contentTypeIcon: Record<string, React.ComponentType<{ style?: React.CSSProperties }>> = {
  article: FileText,
  tutorial: GraduationCap,
  video: FileText,
  faq: CircleHelp,
};

const POPULAR = [
  { label: "Como criar uma Triagem",    href: "/artigo/como-criar-triagem" },
  { label: "Integração com Gupy",       href: "/artigo/ativando-integracao-gupy" },
  { label: "Busca Global — Hunting",    href: "/artigo/como-usar-busca-global-hunting" },
  { label: "API — Introdução",          href: "/artigo/api-digai-introducao" },
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focused, setFocused] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) { setResults([]); return; }

    const articles = searchArticles(value).slice(0, 3).map((a) => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      href: `/artigo/${a.slug}`,
      resultType: "article" as const,
    }));

    const knowledge = searchKnowledge(value, 3).map((k) => ({
      id: k.id,
      title: k.pergunta,
      summary: k.resposta.replace(/\*\*/g, "").slice(0, 80),
      href: `/faq#${k.id}`,
      resultType: "knowledge" as const,
    }));

    setResults([...articles, ...knowledge].slice(0, 6));
  };

  const showDropdown = focused && query.trim().length >= 2;

  return (
    <section style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "16px" }}>
          Central de Ajuda · DigAI Talent Intelligence Platform
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 700,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "16px",
          }}
        >
          Como podemos ajudar?
        </h1>

        <p style={{ fontSize: "17px", color: "var(--fg-muted)", marginBottom: "40px", lineHeight: 1.6 }}>
          Busque artigos e tutoriais, ou converse com a{" "}
          <strong style={{ color: "var(--fg)", fontWeight: 600 }}>ANA</strong>, nossa IA de suporte.
        </p>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "520px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "12px",
              border: `1px solid ${focused ? "var(--brand)" : "var(--border)"}`,
              background: "#fff",
              boxShadow: focused
                ? "0 0 0 3px rgba(0,52,171,0.14), 0 2px 8px rgba(0,0,0,0.06)"
                : "0 1px 4px rgba(0,0,0,0.06)",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
          >
            <Search style={{ marginLeft: "16px", width: "16px", height: "16px", color: "var(--fg-subtle)", flexShrink: 0 }} />
            <input
              placeholder="Buscar artigos, tutoriais, dúvidas..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              style={{
                flex: 1,
                height: "52px",
                background: "transparent",
                border: "none",
                outline: "none",
                padding: "0 12px",
                fontSize: "15px",
                color: "var(--fg)",
              }}
            />
            {query ? (
              <button
                onClick={() => handleSearch("")}
                style={{
                  marginRight: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  border: "none",
                  background: "var(--bg-muted)",
                  cursor: "pointer",
                  color: "var(--fg-muted)",
                }}
              >
                <X style={{ width: "13px", height: "13px" }} />
              </button>
            ) : (
              <kbd
                style={{
                  marginRight: "12px",
                  border: "1px solid var(--border)",
                  background: "var(--bg-subtle)",
                  borderRadius: "6px",
                  padding: "2px 6px",
                  fontSize: "11px",
                  color: "var(--fg-subtle)",
                  fontFamily: "inherit",
                }}
              >
                ⌘K
              </kbd>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                right: 0,
                zIndex: 50,
                borderRadius: "12px",
                border: "1px solid var(--border)",
                background: "#fff",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              {results.length > 0 ? (
                results.map((result) => {
                  const Icon = result.resultType === "knowledge" ? CircleHelp : FileText;
                  return (
                    <Link
                      key={result.id}
                      href={result.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border)",
                        textDecoration: "none",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-subtle)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Icon style={{ width: "15px", height: "15px", color: "var(--fg-subtle)", flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                        <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {result.title}
                        </p>
                        <p style={{ fontSize: "12px", color: "var(--fg-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {result.summary}…
                        </p>
                      </div>
                      {result.resultType === "knowledge" && (
                        <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "100px", background: "var(--teal-dim)", color: "var(--teal)", flexShrink: 0 }}>
                          FAQ
                        </span>
                      )}
                      <ArrowRight style={{ width: "14px", height: "14px", color: "var(--fg-subtle)", flexShrink: 0 }} />
                    </Link>
                  );
                })
              ) : (
                <div style={{ padding: "20px 16px", textAlign: "center", fontSize: "14px", color: "var(--fg-muted)" }}>
                  Nenhum resultado.{" "}
                  <Link href="/chat" style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "none" }}>
                    Pergunte à ANA →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Popular pills */}
        <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--fg-subtle)" }}>Popular:</span>
          {POPULAR.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "inline-flex",
                borderRadius: "100px",
                border: "1px solid var(--border)",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--fg-muted)",
                background: "#fff",
                textDecoration: "none",
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
              {item.label}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
