"use client";

import { getItemById } from "@/lib/knowledgeStore";
import { KnowledgeItem } from "@/types/knowledge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedItemsProps {
  ids?: string[];
}

export default function RelatedItems({ ids }: RelatedItemsProps) {
  const [items, setItems] = useState<KnowledgeItem[]>([]);

  // getItemById lê localStorage. Fazer isso no corpo do render dá saída
  // diferente no servidor e no client — hydration mismatch garantido.
  useEffect(() => {
    if (!ids || ids.length === 0) {
      setItems([]);
      return;
    }
    setItems(ids.map((id) => getItemById(id)).filter((i): i is KnowledgeItem => Boolean(i)));
  }, [ids]);

  if (!ids || ids.length === 0) return null;
  if (items.length === 0) return null;

  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--fg-subtle)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Relacionados
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/faq#${item.id}`}
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
            {item.pergunta}
          </Link>
        ))}
      </div>
    </div>
  );
}
