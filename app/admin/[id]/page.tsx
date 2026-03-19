"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { initStore, getItemById, hardDeleteItem } from "@/lib/knowledgeStore";
import { KnowledgeItem } from "@/types/knowledge";
import KnowledgeForm from "@/components/admin/KnowledgeForm";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function EditItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<KnowledgeItem | null | undefined>(undefined);

  useEffect(() => {
    initStore();
    const found = getItemById(id);
    setItem(found ?? null);
  }, [id]);

  function handleDelete() {
    if (!confirm("Excluir permanentemente este item?")) return;
    hardDeleteItem(id);
    router.push("/admin/base");
  }

  if (item === undefined) {
    return <p style={{ color: "var(--fg-muted)", fontSize: "14px" }}>Carregando…</p>;
  }

  if (item === null) {
    return (
      <div>
        <p style={{ color: "var(--fg-muted)", fontSize: "14px" }}>Item não encontrado: {id}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--fg)" }}>
          Editar item
          <span style={{ marginLeft: "10px", fontSize: "13px", fontWeight: 400, color: "var(--fg-subtle)", fontFamily: "monospace" }}>
            {id}
          </span>
        </h1>
        <button
          onClick={handleDelete}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(239,68,68,0.3)",
            background: "rgba(239,68,68,0.06)",
            color: "#991b1b",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <Trash2 style={{ width: "14px", height: "14px" }} />
          Excluir
        </button>
      </div>
      <KnowledgeForm initial={item} />
    </div>
  );
}
