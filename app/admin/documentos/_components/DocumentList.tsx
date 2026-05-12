"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Loader2, RefreshCw, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";

export interface DocumentRow {
  id: string;
  filename: string;
  size_bytes: number;
  status: "processando" | "concluido" | "erro";
  error_message: string | null;
  chunks_count: number;
  faqs_generated_count: number;
  created_at: string;
}

interface DocumentListProps {
  refreshTrigger: number;
  onSelect: (doc: DocumentRow) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function StatusBadge({ status }: { status: DocumentRow["status"] }) {
  const config = {
    processando: { icon: <Loader2 size={13} className="animate-spin" />, label: "Processando", color: "#f59e0b" },
    concluido: { icon: <CheckCircle size={13} />, label: "Concluído", color: "#22c55e" },
    erro: { icon: <XCircle size={13} />, label: "Erro", color: "#ef4444" },
  }[status];

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: config.color, fontWeight: 500, fontSize: 13 }}>
      {config.icon}
      {config.label}
    </span>
  );
}

export function DocumentList({ refreshTrigger, onSelect }: DocumentListProps) {
  const [docs, setDocs] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const pollingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function fetchDocs() {
    try {
      const res = await fetch("/api/admin/documents");
      if (!res.ok) return;
      const data = await res.json();
      setDocs(data.documents ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDocs();
  }, [refreshTrigger]);

  // Poll while any doc is "processando"
  useEffect(() => {
    const hasPending = docs.some((d) => d.status === "processando");
    if (hasPending) {
      pollingRef.current = setTimeout(fetchDocs, 3000);
    }
    return () => {
      if (pollingRef.current) clearTimeout(pollingRef.current);
    };
  }, [docs]);

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("Excluir documento e todos os FAQs gerados?")) return;
    await fetch(`/api/admin/documents/${id}`, { method: "DELETE" });
    fetchDocs();
  }

  async function handleReprocess(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    await fetch(`/api/admin/documents/${id}/reprocess`, { method: "POST" });
    setDocs((prev) => prev.map((d) => d.id === id ? { ...d, status: "processando" } : d));
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Loader2 size={24} className="animate-spin" style={{ color: "var(--fg-muted, #888)" }} />
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0", color: "var(--fg-muted, #888)" }}>
        <FileText size={32} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
        <p style={{ margin: 0 }}>Nenhum documento enviado ainda.</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {["Arquivo", "Tamanho", "Status", "Chunks", "FAQs", "Ações"].map((h) => (
              <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "var(--fg-muted, #888)", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr
              key={doc.id}
              onClick={() => onSelect(doc)}
              style={{ borderBottom: "1px solid var(--border)", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-subtle, rgba(0,0,0,0.03))")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FileText size={15} style={{ color: "var(--fg-muted, #888)", flexShrink: 0 }} />
                  <span style={{ fontWeight: 500, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {doc.filename}
                  </span>
                </div>
              </td>
              <td style={{ padding: "10px 12px", color: "var(--fg-muted, #888)" }}>{formatBytes(doc.size_bytes)}</td>
              <td style={{ padding: "10px 12px" }}><StatusBadge status={doc.status} /></td>
              <td style={{ padding: "10px 12px", textAlign: "center" }}>{doc.chunks_count}</td>
              <td style={{ padding: "10px 12px", textAlign: "center" }}>{doc.faqs_generated_count}</td>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    title="Ver detalhes"
                    onClick={(e) => { e.stopPropagation(); onSelect(doc); }}
                    style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    title="Reprocessar"
                    onClick={(e) => handleReprocess(doc.id, e)}
                    disabled={doc.status === "processando"}
                    style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px", cursor: "pointer", opacity: doc.status === "processando" ? 0.4 : 1 }}
                  >
                    <RefreshCw size={14} />
                  </button>
                  <button
                    title="Excluir"
                    onClick={(e) => handleDelete(doc.id, e)}
                    style={{ background: "none", border: "1px solid #fca5a5", borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#ef4444" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
