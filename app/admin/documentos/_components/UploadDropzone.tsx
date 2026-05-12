"use client";

import { useRef, useState, DragEvent } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";

interface UploadDropzoneProps {
  onUploaded: (id: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadDropzone({ onUploaded }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      setError("Apenas PDF e DOCX são aceitos.");
      return;
    }
    setError(null);
    setPending(file);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  async function upload() {
    if (!pending) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", pending);
      const res = await fetch("/api/admin/documents", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro no upload");
      setPending(null);
      onUploaded(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !pending && inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? "var(--brand)" : "var(--border)"}`,
          borderRadius: 12,
          padding: "32px 24px",
          textAlign: "center",
          cursor: pending ? "default" : "pointer",
          background: dragging ? "color-mix(in srgb, var(--brand) 6%, transparent)" : "var(--bg-subtle, transparent)",
          transition: "all 0.15s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />

        {pending ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <FileText size={20} style={{ color: "var(--brand)" }} />
            <span style={{ fontWeight: 500 }}>{pending.name}</span>
            <span style={{ color: "var(--fg-muted, #888)", fontSize: 13 }}>({formatBytes(pending.size)})</span>
            <button
              onClick={(e) => { e.stopPropagation(); setPending(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "var(--fg-muted, #888)" }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Upload size={28} style={{ color: "var(--fg-muted, #888)" }} />
            <p style={{ margin: 0, fontWeight: 500 }}>Arraste um arquivo ou clique para selecionar</p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-muted, #888)" }}>PDF ou DOCX · máx. 25 MB</p>
          </div>
        )}
      </div>

      {error && (
        <p style={{ margin: 0, color: "#ef4444", fontSize: 13 }}>{error}</p>
      )}

      {pending && (
        <button
          onClick={upload}
          disabled={uploading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "10px 20px",
            background: "var(--brand)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            cursor: uploading ? "not-allowed" : "pointer",
            opacity: uploading ? 0.7 : 1,
            alignSelf: "flex-end",
          }}
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Enviando..." : "Enviar documento"}
        </button>
      )}
    </div>
  );
}
