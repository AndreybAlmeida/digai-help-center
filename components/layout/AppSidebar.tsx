"use client";

import { categories } from "@/data/categories";
import { searchArticles } from "@/data/articles";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  BarChart3, Briefcase, ChevronDown,
  CircleHelp, ExternalLink, Home,
  HeadphonesIcon, Plug, Rocket, Search,
  Sparkles, X, MessageCircle, Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Article } from "@/types/content";

const catIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Briefcase, Plug, BarChart3, CircleHelp, Sparkles,
};

const navItems = [
  { href: "/",            icon: Home,           label: "Início" },
  { href: "/comece-aqui", icon: Rocket,          label: "Comece por Aqui" },
  { href: "/chat",        icon: MessageCircle,   label: "Falar com ANA", isAI: true },
  { href: "/faq",         icon: CircleHelp,      label: "FAQ" },
  { href: "/contato",     icon: HeadphonesIcon,  label: "Suporte" },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [catsOpen, setCatsOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSearch = (v: string) => {
    setSearch(v);
    setSearchResults(v.trim().length >= 2 ? searchArticles(v).slice(0, 5) : []);
  };

  const showResults = searchFocused && search.trim().length >= 2;

  return (
    <aside
      className="flex h-screen w-[240px] shrink-0 flex-col overflow-y-auto border-r"
      style={{
        background: "var(--sb-bg)",
        borderColor: "var(--sb-border)",
      }}
    >
      {/* ─── Logo ─────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: "var(--sb-border)" }}
      >
        {/* Logomarca inline */}
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <rect width="32" height="32" rx="8" fill="url(#sb-logo-grad)"/>
          <path d="M8 8h8a8 8 0 0 1 0 16H8V8z" fill="white" fillOpacity="0.95"/>
          <circle cx="22" cy="22" r="3" fill="#20BD5A"/>
          <defs>
            <linearGradient id="sb-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f2347"/>
              <stop offset="100%" stopColor="#1B3A6B"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Wordmark */}
        <div className="leading-none">
          <span
            className="text-base font-bold tracking-tight"
            style={{ fontFamily: "'Switzer', sans-serif" }}
          >
            <span style={{ color: "var(--brand-navy)" }}>dig</span>
            <span style={{ color: "#20BD5A" }}>AI</span>
          </span>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--sb-fg-muted)" }}>
            Central de Ajuda
          </p>
        </div>
      </div>

      {/* ─── Search ───────────────────────────────────────────────────── */}
      <div className="relative px-3 pt-3 pb-1">
        <div
          className="flex items-center gap-2 rounded-lg border px-3 py-2 transition-all"
          style={{
            background: "var(--surface-2, #f0f4ff)",
            borderColor: searchFocused ? "#20BD5A" : "var(--sb-border)",
            boxShadow: searchFocused ? "0 0 0 3px rgba(32,189,90,0.15)" : "none",
          }}
        >
          <Search className="size-3.5 shrink-0" style={{ color: "var(--sb-fg-muted)" }} />
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Buscar..."
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: "var(--fg)" }}
          />
          {search && (
            <button onClick={() => handleSearch("")}>
              <X className="size-3" style={{ color: "var(--sb-fg-muted)" }} />
            </button>
          )}
        </div>

        {/* Search results dropdown */}
        {showResults && (
          <div
            className="absolute left-3 right-3 top-full z-50 mt-1 overflow-hidden rounded-xl border shadow-xl"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            {searchResults.length > 0 ? (
              searchResults.map((a) => (
                <Link
                  key={a.id}
                  href={`/artigo/${a.slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 text-xs transition-colors"
                  style={{ color: "var(--fg)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <CircleHelp className="size-3 shrink-0" style={{ color: "var(--sb-fg-muted)" }} />
                  <span className="truncate">{a.title}</span>
                </Link>
              ))
            ) : (
              <p className="px-3 py-2.5 text-xs" style={{ color: "var(--sb-fg-muted)" }}>
                Sem resultados.{" "}
                <Link href="/chat" className="font-medium" style={{ color: "#1B3A6B" }}>
                  Pergunte à ANA
                </Link>
              </p>
            )}
          </div>
        )}
      </div>

      {/* ─── Nav ──────────────────────────────────────────────────────── */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-2">

        {/* Main links */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all",
              )}
              style={{
                background: active ? "var(--sb-active-bg)" : "transparent",
                color: active ? "var(--sb-active-fg)" : "var(--sb-fg)",
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "var(--sb-hover)";
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full"
                  style={{ background: "var(--sb-active-bar)" }}
                />
              )}
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.isAI && (
                <span
                  className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                  style={{ background: "#20BD5A", color: "#fff" }}
                >
                  IA
                </span>
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-1 mx-3 border-t" style={{ borderColor: "var(--sb-border)" }} />

        {/* Categorias */}
        <button
          onClick={() => setCatsOpen(!catsOpen)}
          className="flex w-full items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors"
          style={{ color: "var(--sb-fg-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sb-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span className="flex-1 text-left">Categorias</span>
          <ChevronDown
            className={cn("size-3 transition-transform", catsOpen && "rotate-180")}
          />
        </button>

        {catsOpen && (
          <div className="flex flex-col gap-0.5">
            {categories.map((cat) => {
              const Icon = catIconMap[cat.icon] || CircleHelp;
              const active = pathname.startsWith(`/categoria/${cat.slug}`);
              return (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="relative flex items-center gap-2 rounded-lg pl-5 pr-3 py-1.5 text-xs transition-all"
                  style={{
                    background: active ? "var(--sb-active-bg)" : "transparent",
                    color: active ? "var(--sb-active-fg)" : "var(--sb-fg)",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "var(--sb-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 h-3.5 w-0.5 -translate-y-1/2 rounded-full"
                      style={{ background: "var(--sb-active-bar)" }}
                    />
                  )}
                  <Icon className="size-3 shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <div
        className="border-t px-3 py-3 space-y-2"
        style={{ borderColor: "var(--sb-border)" }}
      >
        {/* TIP pill */}
        <div
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
          style={{
            background: "rgba(32,189,90,0.08)",
            border: "1px solid rgba(32,189,90,0.2)",
          }}
        >
          <Zap className="size-3" style={{ color: "#20BD5A" }} />
          <span className="text-[10px] font-semibold" style={{ color: "var(--brand-navy)" }}>
            Talent Intelligence Platform
          </span>
        </div>

        <div className="flex items-center justify-between px-1">
          <a
            href={SITE_CONFIG.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] transition-colors"
            style={{ color: "var(--sb-fg-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1B3A6B")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--sb-fg-muted)")}
          >
            <ExternalLink className="size-3" />
            Acessar plataforma
          </a>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
