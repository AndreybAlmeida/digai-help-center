"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, LayoutDashboard, LogOut, Upload } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/base", label: "Base de Conhecimento", icon: BookOpen, exact: false },
  { href: "/admin/exportar", label: "Exportar / Publicar", icon: Upload, exact: true },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: "32px",
          height: "48px",
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: "var(--fg-muted)",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <ArrowLeft style={{ width: "14px", height: "14px" }} />
          Central de Ajuda
        </Link>

        {/* Separator */}
        <div style={{ width: "1px", height: "20px", background: "var(--border)" }} />

        {/* Title */}
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--fg)", flexShrink: 0 }}>
          Administração DigAI
        </span>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--brand)" : "var(--fg-muted)",
                  background: isActive ? "var(--brand-dim)" : "transparent",
                  textDecoration: "none",
                  transition: "background 0.1s, color 0.1s",
                }}
              >
                <Icon style={{ width: "14px", height: "14px" }} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "13px",
            color: "var(--fg-muted)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <LogOut style={{ width: "14px", height: "14px" }} />
          Sair
        </button>
      </div>
    </div>
  );
}
