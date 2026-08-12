"use client";

import { recoverFromChunkError, reportClientError } from "@/lib/reportClientError";
import { useEffect } from "react";

/**
 * Último boundary: substitui o root layout, então não herda globals.css.
 * Todas as cores ficam hardcoded de propósito.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (recoverFromChunkError(error)) return;
    reportClientError(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: "#fff", color: "#0f172a", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "24px" }}>
            <span style={{ color: "#0034AB" }}>dig</span>
            <span style={{ color: "#00B896" }}>AI</span>
          </span>

          <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
            A Central de Ajuda travou
          </h1>
          <p style={{ marginTop: "10px", fontSize: "15px", color: "#64748b", maxWidth: "440px", lineHeight: 1.6 }}>
            O erro foi registrado automaticamente. Recarregue a página para continuar.
          </p>

          {error?.digest && (
            <p style={{ marginTop: "16px", fontSize: "12px", color: "#94a3b8", fontFamily: "monospace" }}>
              Código: {error.digest}
            </p>
          )}

          <div style={{ marginTop: "28px", display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                padding: "9px 20px",
                borderRadius: "8px",
                border: "none",
                background: "#0034AB",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Tentar novamente
            </button>
            <a
              href="/"
              style={{
                padding: "9px 20px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                color: "#64748b",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Voltar ao início
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
