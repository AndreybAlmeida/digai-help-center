"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";
import { SITE_CONFIG } from "@/lib/config";
import { Bot, ExternalLink, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/comece-aqui", label: "Comece Aqui" },
  { href: "/faq", label: "FAQ" },
  { href: "/chat", label: "Chat IA" },
  { href: "/contato", label: "Suporte" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600">
            <Bot className="size-4 text-white" />
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            DigAI <span className="font-normal text-slate-400">Ajuda</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition-colors",
                pathname === link.href
                  ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={SITE_CONFIG.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors sm:flex"
          >
            Acessar plataforma
            <ExternalLink className="size-3.5" />
          </a>
          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === link.href
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
