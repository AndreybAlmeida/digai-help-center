"use client";

import { searchArticles } from "@/data/articles";
import { Article } from "@/types/content";
import { FileText, GraduationCap, Play, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const contentTypeIcon = { article: FileText, tutorial: GraduationCap, video: Play, faq: FileText };

export default function TopBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [focused, setFocused] = useState(false);

  const handleSearch = (v: string) => {
    setQuery(v);
    setResults(v.trim().length >= 2 ? searchArticles(v).slice(0, 5) : []);
  };

  const showDropdown = focused && query.trim().length >= 2;

  return (
    <header
      className="flex h-12 shrink-0 items-center gap-4 border-b px-6"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Buscar artigos, tutoriais..."
          className="h-8 w-full rounded-lg border pl-9 pr-8 text-xs outline-none transition-all focus:ring-2"
          style={{
            borderColor: "var(--border)",
            background: "var(--muted)",
            color: "var(--foreground)",
          }}
        />
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          >
            <X className="size-3" />
          </button>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border shadow-lg"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            {results.length > 0 ? (
              results.map((a) => {
                const Icon = contentTypeIcon[a.contentType] || FileText;
                return (
                  <Link
                    key={a.id}
                    href={`/artigo/${a.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Icon className="size-3.5 shrink-0 text-slate-400" />
                    <span style={{ color: "var(--foreground)" }}>{a.title}</span>
                  </Link>
                );
              })
            ) : (
              <div className="px-3 py-3 text-center text-xs text-slate-400">
                Nenhum resultado.{" "}
                <Link href="/chat" className="text-digai-800">
                  Pergunte à ANA
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Link
          href="/chat"
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:opacity-90"
          style={{ background: "var(--navy-800)" }}
        >
          <span>Falar com ANA</span>
          <span
            className="rounded-full px-1 py-0.5 text-[9px] font-bold text-digai-950"
            style={{ background: "var(--cyan)" }}
          >
            IA
          </span>
        </Link>
      </div>
    </header>
  );
}
