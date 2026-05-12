"use client";

import { useEffect, useState } from "react";
import { X, RefreshCw, Trash2, Loader2 } from "lucide-react";
import type { DocumentRow } from "./DocumentList";

interface GeneratedFaq {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
  tipo: string;
  nivel: string;
}

interface DocumentDetailDrawerProps {
  doc: DocumentRow | null;
  onClose: () => void;
  onDeleted: () => void;
  onReprocessed: () => void;
}

export function DocumentDetailDrawer({ doc, onClose, onDeleted, onReprocessed }: DocumentDetailDrawerProps) {
  const [faqs, setFaqs] = useState<GeneratedFaq[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!doc) return;
    setLoadingFaqs(true);
    fetch(`/api/admin/documents/${doc.id}`)
      .then((r) => r.json())
      .then((data) => setFaqs(data.faqs ?? []))
      .finally(() => setLoadingFaqs(false));
  }, [doc?.id]);

  if (!doc) return null;

  async function handleDelete() {
    if (!doc) return;
    if (!confirm("Excluir documento e todos os FAQs gerados?")) return;
    setActionLoading(true);
    await fetch(`/api/admin/documents/${doc.id}`, { method: "DELETE" });
    setActionLoading(false);
    onDeleted();
    onClose();
  }

  async function handleReprocess() {
    if (!doc) return;
    setActionLoading(true);
    await fetch(`/api/admin/documents/${doc.id}/reprocess`, { method: "POST" });
    setActionLoading(false);
    onReprocessed();
    onClose();
  }

  const statusLabels = { processando: "Processando", concluido: "Concluído", erro: "Erro" };
  const statusColors = { processando: "#f59e0b", concluido: "#22c55e", erro: "#ef4444" };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40,
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(480px, 95vw)",
          background: "var(--bg, #fff)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {doc.filename}
            </h3>
            <span style={{ fontSize: 12, color: statusColors[doc.status], fontWeight: 500 }}>
              {doc.status === "processando" && <Loader2 size={11} className="animate-spin" style={{ display: "inline", marginRight: 4 }} />}
              {statusLabels[doc.status]}
            </span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Metadados */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Chunks", value: doc.chunks_count },
              { label: "FAQs gerados", value: doc.faqs_generated_count },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "var(--bg-subtle, rgba(0,0,0,0.03))", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 12, color: "var(--fg-muted, #888)" }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>

          {doc.error_message && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626" }}>
              <strong>Erro:</strong> {doc.error_message}
            </div>
          )}

          {/* FAQs gerados */}
          <div>
            <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600 }}>
              FAQs gerados ({faqs.length})
            </h4>
            {loadingFaqs ? (
              <Loader2 size={18} className="animate-spin" style={{ color: "var(--fg-muted, #888)" }} />
            ) : faqs.length === 0 ? (
              <p style={{ color: "var(--fg-muted, #888)", fontSize: 13, margin: 0 }}>Nenhum FAQ gerado ainda.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {faqs.map((faq) => (
                  <div key={faq.id} style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 500, flex: 1 }}>{faq.pergunta}</p>
                    </div>
                    <div style={{ marginTop: 4, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, background: "var(--bg-subtle, rgba(0,0,0,0.05))", padding: "1px 6px", borderRadius: 4 }}>
                        {faq.categoria}
                      </span>
                      <span style={{ fontSize: 11, background: "var(--bg-subtle, rgba(0,0,0,0.05))", padding: "1px 6px", borderRadius: 4 }}>
                        {faq.tipo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
          <button
            onClick={handleReprocess}
            disabled={actionLoading || doc.status === "processando"}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "9px 16px", background: "var(--bg-subtle, rgba(0,0,0,0.05))", border: "1px solid var(--border)",
              borderRadius: 8, fontWeight: 500, fontSize: 13, cursor: "pointer",
              opacity: actionLoading || doc.status === "processando" ? 0.5 : 1,
            }}
          >
            <RefreshCw size={14} />
            Reprocessar
          </button>
          <button
            onClick={handleDelete}
            disabled={actionLoading}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "9px 16px", background: "#fef2f2", border: "1px solid #fca5a5",
              borderRadius: 8, fontWeight: 500, fontSize: 13, cursor: "pointer", color: "#dc2626",
              opacity: actionLoading ? 0.5 : 1,
            }}
          >
            {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Excluir
          </button>
        </div>
      </div>
    </>
  );
}
