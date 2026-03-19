"use client";

import { SITE_CONFIG } from "@/lib/config";
import { Bot, ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/shared/ThemeToggle";

const navLinks = [
  { href: "/comece-aqui", label: "Comece por Aqui" },
  { href: "/faq",         label: "FAQ" },
  { href: "/contato",     label: "Suporte" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          height: "56px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 24px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginRight: "16px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {/* Logo icon — favicon oficial da DigAI */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon-digai-32.png"
            width={28}
            height={28}
            alt="DigAI"
            style={{ borderRadius: "6px" }}
          />
          {/* Wordmark */}
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "16px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#0034AB" }}>dig</span><span style={{ color: "#00B896" }}>AI</span>
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--fg-subtle)",
              borderLeft: "1px solid var(--border)",
              paddingLeft: "10px",
              marginLeft: "2px",
            }}
          >
            Central de Ajuda
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {navLinks.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--brand)" : "var(--fg-muted)",
                  background: active ? "var(--brand-dim)" : "transparent",
                  textDecoration: "none",
                  transition: "color 0.15s, background 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              color: "var(--fg-muted)",
              background: "transparent",
              textDecoration: "none",
              border: "1px solid var(--border)",
              whiteSpace: "nowrap",
            }}
          >
            <Search style={{ width: "13px", height: "13px" }} />
            Buscar
            <kbd
              style={{
                marginLeft: "4px",
                borderRadius: "4px",
                border: "1px solid var(--border)",
                background: "var(--bg-subtle)",
                padding: "1px 5px",
                fontSize: "10px",
                color: "var(--fg-subtle)",
                fontFamily: "inherit",
              }}
            >
              ⌘K
            </kbd>
          </Link>

          <Link
            href="/chat"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              background: "var(--brand)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <Bot style={{ width: "13px", height: "13px" }} />
            Falar com ANA
          </Link>

          <a
            href={SITE_CONFIG.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--brand)",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--brand)",
              whiteSpace: "nowrap",
            }}
          >
            <ExternalLink style={{ width: "13px", height: "13px" }} />
            Acesse a DigAI
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
