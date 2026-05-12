"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { UploadDropzone } from "./_components/UploadDropzone";
import { DocumentList, type DocumentRow } from "./_components/DocumentList";
import { DocumentDetailDrawer } from "./_components/DocumentDetailDrawer";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function DocumentosPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<DocumentRow | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(message: string, type: "success" | "error") {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }

  function handleUploaded(id: string) {
    addToast("Documento enviado! Processando em segundo plano...", "success");
    setRefreshTrigger((n) => n + 1);
  }

  function handleDeleted() {
    addToast("Documento excluído.", "success");
    setRefreshTrigger((n) => n + 1);
  }

  function handleReprocessed() {
    addToast("Reprocessamento iniciado.", "success");
    setRefreshTrigger((n) => n + 1);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FileText size={20} style={{ color: "var(--brand)" }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Documentos</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-muted, #888)" }}>
              Faça upload de PDFs e DOCXs para enriquecer a base de conhecimento automaticamente.
            </p>
          </div>
        </div>
      </div>

      {/* Upload zone */}
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "var(--card-bg, var(--bg))" }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>Enviar novo documento</h2>
        <UploadDropzone onUploaded={handleUploaded} />
      </div>

      {/* Document list */}
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "var(--card-bg, var(--bg))" }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>Documentos enviados</h2>
        <DocumentList refreshTrigger={refreshTrigger} onSelect={setSelectedDoc} />
      </div>

      {/* Detail drawer */}
      <DocumentDetailDrawer
        doc={selectedDoc}
        onClose={() => setSelectedDoc(null)}
        onDeleted={handleDeleted}
        onReprocessed={handleReprocessed}
      />

      {/* Toasts */}
      <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 8, zIndex: 100 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              background: t.type === "success" ? "#22c55e" : "#ef4444",
              color: "#fff",
              maxWidth: 320,
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
