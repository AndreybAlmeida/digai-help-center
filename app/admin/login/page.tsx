"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Senha incorreta");
      }
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--brand)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--fg)", margin: 0 }}>
            Administração DigAI
          </h1>
          <p style={{ fontSize: "14px", color: "var(--fg-muted)", marginTop: "4px" }}>
            Acesso restrito à equipe interna
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--fg)", marginBottom: "8px" }}
          >
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha de acesso"
            required
            autoFocus
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: error ? "1.5px solid #ef4444" : "1.5px solid var(--border)",
              background: "var(--bg)",
              color: "var(--fg)",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "8px",
            }}
          />
          {error && (
            <p style={{ fontSize: "13px", color: "#ef4444", marginBottom: "16px" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "8px",
              background: loading || !password ? "var(--border)" : "var(--brand)",
              color: "white",
              fontWeight: 600,
              fontSize: "15px",
              border: "none",
              cursor: loading || !password ? "not-allowed" : "pointer",
              marginTop: error ? "0" : "16px",
              transition: "background 0.15s",
            }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
