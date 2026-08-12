"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { initStore, getAllItems, mergeItems, exportStore } from "@/lib/knowledgeStore";
import { KnowledgeItem } from "@/types/knowledge";
import KnowledgeTable from "@/components/admin/KnowledgeTable";
import { Plus } from "lucide-react";

export default function BasePage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);

  function refresh() {
    setItems(getAllItems());
  }

  useEffect(() => {
    initStore();
    // Sync generated FAQs from documents into the local store
    fetch("/api/admin/generated-faqs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.items)) mergeItems(data.items);
      })
      .catch(() => {})
      .finally(() => {
        refresh();
        // Auto-publish current state to DB on every admin page load
        const store = JSON.parse(exportStore());
        fetch("/api/knowledge/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: store.items }),
        }).catch(() => {});
      });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--fg)" }}>Base de Conhecimento</h1>
        <Link
          href="/admin/novo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 18px",
            borderRadius: "8px",
            background: "var(--brand)",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          <Plus style={{ width: "15px", height: "15px" }} />
          Novo item
        </Link>
      </div>
      <KnowledgeTable items={items} onRefresh={refresh} />
    </div>
  );
}
