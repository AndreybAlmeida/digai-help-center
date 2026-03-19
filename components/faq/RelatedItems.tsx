"use client";

import { getItemById } from "@/lib/knowledgeStore";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface RelatedItemsProps {
  ids?: string[];
}

export default function RelatedItems({ ids }: RelatedItemsProps) {
  if (!ids || ids.length === 0) return null;

  const items = ids.map((id) => getItemById(id)).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--fg-subtle)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Relacionados
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {items.map((item) => (
          <Link
            key={item!.id}
            href={`/faq#${item!.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--brand)",
              textDecoration: "none",
              padding: "4px 0",
            }}
          >
            <ArrowRight style={{ width: "12px", height: "12px", flexShrink: 0 }} />
            {item!.pergunta}
          </Link>
        ))}
      </div>
    </div>
  );
}
