"use client";

import { contentTypeLabel, difficultyLabel, formatDate } from "@/lib/utils";
import { Article } from "@/types/content";
import {
  ArrowRight, BarChart3, Briefcase, CircleHelp, Clock,
  Code2, Cpu, FileText, GraduationCap, Play, Plug,
  Rocket, SearchCheck,
} from "lucide-react";
import Link from "next/link";

/* ── Ícone por tipo de conteúdo ──────────────────────────────────────────── */
const contentTypeIcon = {
  article:  FileText,
  tutorial: GraduationCap,
  video:    Play,
  faq:      CircleHelp,
};

/* ── Thumbnail por categoria — gradiente + ícone ────────────────────────── */
const categoryTheme: Record<
  string,
  { gradient: string; iconBg: string; icon: React.ComponentType<{ style?: React.CSSProperties }> }
> = {
  "primeiros-passos":    { gradient: "linear-gradient(135deg,#0034AB 0%,#1a5fd4 100%)", iconBg: "rgba(255,255,255,0.18)", icon: Rocket },
  "gestao-de-vagas":     { gradient: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)", iconBg: "rgba(255,255,255,0.18)", icon: Briefcase },
  "triagem-inteligente": { gradient: "linear-gradient(135deg,#059669 0%,#0891b2 100%)", iconBg: "rgba(255,255,255,0.18)", icon: Cpu },
  "hunting":             { gradient: "linear-gradient(135deg,#2563eb 0%,#4f46e5 100%)", iconBg: "rgba(255,255,255,0.18)", icon: SearchCheck },
  "integracoes":         { gradient: "linear-gradient(135deg,#00B896 0%,#0284c7 100%)", iconBg: "rgba(255,255,255,0.18)", icon: Plug },
  "relatorios":          { gradient: "linear-gradient(135deg,#d97706 0%,#ea580c 100%)", iconBg: "rgba(255,255,255,0.18)", icon: BarChart3 },
  "api-tecnico":         { gradient: "linear-gradient(135deg,#334155 0%,#0f172a 100%)", iconBg: "rgba(255,255,255,0.18)", icon: Code2 },
  "faq":                 { gradient: "linear-gradient(135deg,#db2777 0%,#9333ea 100%)", iconBg: "rgba(255,255,255,0.18)", icon: CircleHelp },
};

const defaultTheme = categoryTheme["primeiros-passos"];

/* ── Etiqueta de dificuldade ─────────────────────────────────────────────── */
const difficultyColors: Record<string, string> = {
  beginner:     "rgba(0,184,150,0.15)",
  intermediate: "rgba(234,179,8,0.15)",
  advanced:     "rgba(239,68,68,0.15)",
};
const difficultyText: Record<string, string> = {
  beginner:     "#00896d",
  intermediate: "#92400e",
  advanced:     "#991b1b",
};

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "row";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const TypeIcon = contentTypeIcon[article.contentType] || FileText;

  /* ── ROW variant ──────────────────────────────────────────────────────── */
  if (variant === "row") {
    return (
      <Link
        href={`/artigo/${article.slug}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "14px 16px",
          borderBottom: "1px solid var(--border)",
          textDecoration: "none",
          transition: "background 0.1s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-subtle)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <TypeIcon style={{ width: "15px", height: "15px", color: "var(--fg-subtle)", flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {article.title}
          </p>
          <p style={{ marginTop: "2px", fontSize: "12px", color: "var(--fg-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {article.summary.slice(0, 80)}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          {article.readTime && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--fg-subtle)" }}>
              <Clock style={{ width: "12px", height: "12px" }} />
              {article.readTime} min
            </span>
          )}
        </div>
      </Link>
    );
  }

  /* ── COMPACT variant ─────────────────────────────────────────────────── */
  if (variant === "compact") {
    return (
      <Link
        href={`/artigo/${article.slug}`}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "10px 12px",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "background 0.1s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-subtle)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <TypeIcon style={{ marginTop: "2px", width: "14px", height: "14px", color: "var(--fg-subtle)", flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>{article.title}</p>
          {article.readTime && (
            <p style={{ marginTop: "2px", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--fg-muted)" }}>
              <Clock style={{ width: "11px", height: "11px" }} />
              {article.readTime} min
            </p>
          )}
        </div>
      </Link>
    );
  }

  /* ── DEFAULT — estilo YouTube card ───────────────────────────────────── */
  const theme = categoryTheme[article.category] || defaultTheme;
  const CategoryIcon = theme.icon;
  const diffBg   = difficultyColors[article.difficulty]  || "rgba(0,0,0,0.06)";
  const diffColor = difficultyText[article.difficulty]   || "var(--fg-muted)";

  return (
    <Link
      href={`/artigo/${article.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        textDecoration: "none",
        overflow: "hidden",
        transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
        el.style.borderColor = "var(--border-strong)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = "var(--border)";
      }}
    >
      {/* ── Thumbnail ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: "148px",
          background: theme.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", right: "-24px", top: "-24px",
          width: "120px", height: "120px", borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
        }} />
        <div style={{
          position: "absolute", left: "-16px", bottom: "-32px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }} />

        {/* Central icon */}
        <div style={{
          width: "56px", height: "56px", borderRadius: "16px",
          background: theme.iconBg,
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1,
        }}>
          <CategoryIcon style={{ width: "26px", height: "26px", color: "#fff" }} />
        </div>

        {/* Content type badge — top left */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          display: "flex", alignItems: "center", gap: "5px",
          padding: "4px 10px",
          borderRadius: "100px",
          background: "rgba(0,0,0,0.28)",
          backdropFilter: "blur(6px)",
        }}>
          <TypeIcon style={{ width: "11px", height: "11px", color: "#fff" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>
            {contentTypeLabel[article.contentType]}
          </span>
        </div>

        {/* Read time — top right */}
        {article.readTime && (
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            display: "flex", alignItems: "center", gap: "4px",
            padding: "4px 8px",
            borderRadius: "100px",
            background: "rgba(0,0,0,0.28)",
            backdropFilter: "blur(6px)",
          }}>
            <Clock style={{ width: "10px", height: "10px", color: "#fff" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>
              {article.readTime} min
            </span>
          </div>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{ padding: "16px 16px 14px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Difficulty badge */}
        <span style={{
          alignSelf: "flex-start",
          marginBottom: "8px",
          padding: "2px 8px",
          borderRadius: "100px",
          background: diffBg,
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: diffColor,
        }}>
          {difficultyLabel[article.difficulty]}
        </span>

        {/* Title — full, no truncation */}
        <h3 style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "var(--fg)",
          lineHeight: 1.45,
          flex: 1,
        }}>
          {article.title}
        </h3>

        {/* Summary — 2 lines */}
        <p style={{
          marginTop: "6px",
          fontSize: "12px",
          color: "var(--fg-muted)",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {article.summary}
        </p>

        {/* Footer */}
        <div style={{
          marginTop: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: "11px", color: "var(--fg-subtle)" }}>
            {formatDate(article.updatedAt)}
          </span>
          <span style={{
            display: "flex", alignItems: "center", gap: "4px",
            fontSize: "12px", fontWeight: 600, color: "var(--brand)",
          }}>
            Abrir
            <ArrowRight style={{ width: "12px", height: "12px" }} />
          </span>
        </div>
      </div>
    </Link>
  );
}
