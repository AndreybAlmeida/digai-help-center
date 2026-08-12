"use client";

import { recoverFromChunkError, reportClientError } from "@/lib/reportClientError";
import { AlertTriangle, Bot, RotateCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
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
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "var(--bg-muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        <AlertTriangle style={{ width: "22px", height: "22px", color: "var(--brand)" }} />
      </div>

      <h1
        style={{
          fontFamily: "'Switzer', sans-serif",
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--fg)",
          letterSpacing: "-0.02em",
        }}
      >
        Algo deu errado nesta página
      </h1>
      <p style={{ marginTop: "10px", fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
        O erro já foi registrado. Você pode tentar de novo — o resto da Central de Ajuda continua funcionando.
      </p>

      {error?.digest && (
        <p style={{ marginTop: "16px", fontSize: "12px", color: "var(--fg-subtle)", fontFamily: "monospace" }}>
          Código: {error.digest}
        </p>
      )}

      <div style={{ marginTop: "28px", display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 20px",
            borderRadius: "8px",
            border: "none",
            background: "var(--brand)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <RotateCw style={{ width: "13px", height: "13px" }} />
          Tentar novamente
        </button>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 20px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            color: "var(--fg-muted)",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Voltar ao início
        </Link>
        <Link
          href="/chat"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 20px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            color: "var(--fg-muted)",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <Bot style={{ width: "13px", height: "13px" }} />
          Falar com a ANA
        </Link>
      </div>
    </div>
  );
}
