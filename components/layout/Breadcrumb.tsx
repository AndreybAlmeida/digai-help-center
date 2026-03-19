import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--fg-muted)" }}>
      <Link href="/" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
        Central de Ajuda
      </Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ChevronRight style={{ width: "12px", height: "12px", flexShrink: 0 }} />
          {item.href ? (
            <Link href={item.href} style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ fontWeight: 500, color: "var(--fg)" }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
