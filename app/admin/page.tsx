"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { initStore, getStoreStats, getAllItems } from "@/lib/knowledgeStore";
import { KnowledgeItem } from "@/types/knowledge";
import StatsCard from "@/components/admin/StatsCard";
import KnowledgeTable from "@/components/admin/KnowledgeTable";
import { Plus } from "lucide-react";

export default function AdminDashboard() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, categories: 0 });

  function refresh() {
    setItems(getAllItems());
    setStats(getStoreStats());
  }

  useEffect(() => {
    initStore();
    refresh();
  }, []);

  return (
    <div>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--fg)" }}>Base de Conhecimento</h1>
          <p style={{ marginTop: "4px", fontSize: "14px", color: "var(--fg-muted)" }}>
            Gerencie os itens usados pela ANA para responder perguntas.
          </p>
        </div>
        <Link
          href="/admin/novo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "8px",
            background: "var(--brand)",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          <Plus style={{ width: "16px", height: "16px" }} />
          Novo item
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
        <StatsCard label="Total de itens" value={stats.total} color="var(--brand)" />
        <StatsCard label="Publicados" value={stats.published} color="#00B896" />
        <StatsCard label="Rascunhos" value={stats.drafts} color="var(--fg-muted)" />
        <StatsCard label="Categorias" value={stats.categories} color="#7c3aed" />
      </div>

      {/* Table */}
      <KnowledgeTable items={items} onRefresh={refresh} />
    </div>
  );
}
