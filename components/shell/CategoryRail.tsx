"use client";

import { Icon, type IconName } from "@/components/icons/Sprite";
import { CATEGORIES } from "@/lib/content/categories";
import type { Category } from "@/lib/content/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Dot das categorias sem conteúdo — apagado, mas o item segue clicável. */
const DOT_VAZIO = "var(--dot-vazio)";

const NAV: { href: string; icon: IconName; label: string }[] = [
  { href: "/", icon: "list", label: "Início" },
  { href: "/comece-aqui", icon: "rocket", label: "Comece por aqui" },
  { href: "/chat", icon: "spark", label: "Chat com a ANA" },
];

const AJUDA: { href: string; icon: IconName; label: string }[] = [
  { href: "/faq", icon: "help", label: "Perguntas frequentes" },
  { href: "/contato", icon: "share", label: "Falar com suporte" },
  { href: "/categoria/posicionamento", icon: "building", label: "Sobre a DigAI" },
];

export default function CategoryRail({ categorias }: { categorias: Category[] }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href) ?? false);

  return (
    <aside className="rail" aria-label="Categorias">
      <div className="rail-group">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={`rail-item${isActive(n.href) ? " is-active" : ""}`}>
            <Icon name={n.icon} className="ic" />
            <span className="txt-long">{n.label}</span>
          </Link>
        ))}
      </div>

      <div className="rail-group">
        <div className="rail-label">Categorias</div>
        {categorias.map((c) => {
          const vazia = c.materialCount === 0;
          const cor = vazia ? DOT_VAZIO : CATEGORIES[c.slug].c1;
          const href = `/categoria/${c.slug}`;
          return (
            <Link
              key={c.slug}
              href={href}
              className={`rail-item${vazia ? " is-soon" : ""}${isActive(href) ? " is-active" : ""}`}
              style={{ ["--c" as string]: cor }}
            >
              <span className="dot" />
              <span className="txt-long">{CATEGORIES[c.slug].label}</span>
              <span className="n">{c.materialCount}</span>
            </Link>
          );
        })}
      </div>

      <div className="rail-group">
        <div className="rail-label">Ajuda</div>
        {AJUDA.map((n) => (
          <Link key={n.href} href={n.href} className={`rail-item${isActive(n.href) ? " is-active" : ""}`}>
            <Icon name={n.icon} className="ic" />
            <span className="txt-long">{n.label}</span>
          </Link>
        ))}
      </div>

      <div className="rail-foot">
        Não achou o que precisava?
        <br />
        <Link href="/contato">Abrir um chamado →</Link>
      </div>
    </aside>
  );
}
