"use client";

import { useRef, useState } from "react";
import { exportStore, importStore } from "@/lib/knowledgeStore";
import { Download, Upload, Send } from "lucide-react";

interface ExportImportProps {
  onRefresh: () => void;
}

export default function ExportImport({ onRefresh }: ExportImportProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [importResult, setImportResult] = useState<{ success: boolean; count: number; errors: string[] } | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<string | null>(null);

  function handleExport() {
    const json = exportStore();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `digai-knowledge-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const result = importStore(text);
      setImportResult(result);
      if (result.success) onRefresh();
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  async function handlePublish() {
    setPublishing(true);
    setPublishResult(null);
    try {
      const res = await fetch("/api/knowledge/publish", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setPublishResult(`✓ ${data.count} itens publicados para a ANA`);
      } else {
        setPublishResult(`Erro: ${data.error ?? "Falha ao publicar"}`);
      }
    } catch {
      setPublishResult("Erro de conexão");
    } finally {
      setPublishing(false);
    }
  }

  const btnBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Export */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", marginBottom: "8px" }}>Exportar JSON</h3>
        <p style={{ fontSize: "13px", color: "var(--fg-muted)", marginBottom: "16px" }}>
          Baixa todos os itens da base de conhecimento como arquivo JSON com timestamp.
        </p>
        <button onClick={handleExport} style={{ ...btnBase, background: "var(--brand)", color: "#fff" }}>
          <Download style={{ width: "16px", height: "16px" }} />
          Exportar base de conhecimento
        </button>
      </div>

      {/* Import */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", marginBottom: "8px" }}>Importar JSON</h3>
        <p style={{ fontSize: "13px", color: "var(--fg-muted)", marginBottom: "16px" }}>
          Importa itens de um arquivo JSON. <strong>Atenção:</strong> substitui toda a base atual.
        </p>
        <input ref={fileRef} type="file" accept=".json" onChange={handleFileChange} style={{ display: "none" }} />
        <button
          onClick={() => fileRef.current?.click()}
          style={{ ...btnBase, background: "var(--surface)", color: "var(--fg)", border: "1px solid var(--border)" }}
        >
          <Upload style={{ width: "16px", height: "16px" }} />
          Selecionar arquivo JSON
        </button>
        {importResult && (
          <div style={{
            marginTop: "12px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: importResult.success ? "rgba(0,184,150,0.08)" : "rgba(239,68,68,0.08)",
            border: `1px solid ${importResult.success ? "rgba(0,184,150,0.3)" : "rgba(239,68,68,0.3)"}`,
            fontSize: "13px",
            color: importResult.success ? "#00896d" : "#991b1b",
          }}>
            {importResult.success
              ? `✓ ${importResult.count} itens importados com sucesso`
              : `Erro na importação`}
            {importResult.errors.length > 0 && (
              <ul style={{ margin: "8px 0 0 16px" }}>
                {importResult.errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Publish */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", marginBottom: "8px" }}>Publicar para a ANA</h3>
        <p style={{ fontSize: "13px", color: "var(--fg-muted)", marginBottom: "16px" }}>
          Salva os itens publicados em <code style={{ fontSize: "12px", background: "var(--bg-subtle)", padding: "2px 6px", borderRadius: "4px" }}>/public/knowledge-export.json</code>, tornando-os disponíveis para o chat da ANA.
        </p>
        <button
          onClick={handlePublish}
          disabled={publishing}
          style={{ ...btnBase, background: "#00B896", color: "#fff", opacity: publishing ? 0.7 : 1 }}
        >
          <Send style={{ width: "16px", height: "16px" }} />
          {publishing ? "Publicando…" : "Publicar para a ANA"}
        </button>
        {publishResult && (
          <p style={{
            marginTop: "12px",
            fontSize: "13px",
            color: publishResult.startsWith("✓") ? "#00896d" : "#991b1b",
          }}>
            {publishResult}
          </p>
        )}
      </div>
    </div>
  );
}
