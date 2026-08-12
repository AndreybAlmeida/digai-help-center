import { Bot, Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
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
        <Compass style={{ width: "22px", height: "22px", color: "var(--brand)" }} />
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
        Página não encontrada
      </h1>
      <p style={{ marginTop: "10px", fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
        Este conteúdo não existe ou foi movido. Tente a busca na página inicial, ou pergunte direto à ANA.
      </p>

      <div style={{ marginTop: "28px", display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{
            padding: "9px 20px",
            borderRadius: "8px",
            background: "var(--brand)",
            color: "#fff",
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
          Perguntar à ANA
        </Link>
      </div>
    </div>
  );
}
