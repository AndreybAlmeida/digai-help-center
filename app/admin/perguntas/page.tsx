"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCheck, MessageCircleQuestion, Trash2 } from "lucide-react";

interface UnansweredQuestion {
  id: string;
  pergunta: string;
  resposta: string | null;
  motivo: string | null;
  ocorrencias: number;
  ultima_ocorrencia: string | null;
  session_id: string | null;
  created_at: string;
  resolved: boolean;
  resolved_at: string | null;
  notes: string | null;
}

const MOTIVO_LABEL: Record<string, string> = {
  ana_desistiu: "ANA admitiu não saber",
  sem_contexto: "Nada encontrado na base",
  v1_sem_contexto: "Registro antigo (v1)",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PerguntasPage() {
  const [items, setItems] = useState<UnansweredQuestion[]>([]);
  const [showResolved, setShowResolved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/unanswered-questions?resolved=${showResolved}`);
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [showResolved]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleResolve(id: string) {
    setResolving(id);
    await fetch(`/api/admin/unanswered-questions/${id}`, { method: "PATCH" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setResolving(null);
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    await fetch(`/api/admin/unanswered-questions/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleting(null);
  }

  const pending = items.filter((i) => !i.resolved);
  const resolved = items.filter((i) => i.resolved);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--fg)" }}>Perguntas sem resposta</h1>
          <p style={{ marginTop: "4px", fontSize: "13px", color: "var(--fg-muted)" }}>
            Perguntas em que a ANA não soube responder. Ordenadas por quantas vezes se repetiram —
            comece pelas do topo.
          </p>
        </div>
        <button
          onClick={() => setShowResolved((v) => !v)}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: showResolved ? "var(--brand-dim)" : "var(--surface)",
            color: showResolved ? "var(--brand)" : "var(--fg-muted)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {showResolved ? "Mostrar pendentes" : "Mostrar resolvidas"}
        </button>
      </div>

      {/* Stats */}
      {!showResolved && (
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <div style={{ padding: "12px 20px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface)", minWidth: "120px" }}>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "var(--fg)" }}>{pending.length}</p>
            <p style={{ fontSize: "12px", color: "var(--fg-muted)", marginTop: "2px" }}>Pendentes</p>
          </div>
          <div style={{ padding: "12px 20px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface)", minWidth: "120px" }}>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#00896d" }}>{resolved.length}</p>
            <p style={{ fontSize: "12px", color: "var(--fg-muted)", marginTop: "2px" }}>Resolvidas</p>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div style={{ padding: "48px", textAlign: "center", color: "var(--fg-muted)", fontSize: "14px" }}>
          Carregando…
        </div>
      ) : items.length === 0 ? (
        <div style={{
          borderRadius: "12px",
          border: "1px dashed var(--border)",
          padding: "48px 24px",
          textAlign: "center",
        }}>
          <MessageCircleQuestion style={{ width: "32px", height: "32px", color: "var(--fg-subtle)", margin: "0 auto 12px" }} />
          <p style={{ fontSize: "14px", color: "var(--fg-muted)", fontWeight: 600 }}>
            {showResolved ? "Nenhuma pergunta resolvida ainda." : "Nenhuma pergunta sem resposta. Ótimo!"}
          </p>
          <p style={{ fontSize: "13px", color: "var(--fg-subtle)", marginTop: "4px" }}>
            {showResolved ? "" : "Quando a ANA não encontrar contexto para uma pergunta, ela aparecerá aqui."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                padding: "14px 16px",
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                opacity: item.resolved ? 0.65 : 1,
              }}
            >
              {/* Icon */}
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: item.resolved ? "rgba(0,184,150,0.1)" : "rgba(245,158,11,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "2px",
              }}>
                <MessageCircleQuestion style={{ width: "15px", height: "15px", color: item.resolved ? "#00896d" : "#d97706" }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                  {item.ocorrencias > 1 && (
                    <span
                      title={`Perguntada ${item.ocorrencias} vezes`}
                      style={{
                        padding: "1px 7px",
                        borderRadius: "100px",
                        background: "rgba(220,38,38,0.1)",
                        color: "#991b1b",
                        fontSize: "11px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {item.ocorrencias}×
                    </span>
                  )}
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)", lineHeight: 1.4 }}>
                    {item.pergunta}
                  </p>
                </div>

                {item.resposta && (
                  <details style={{ marginTop: "6px" }}>
                    <summary style={{ fontSize: "12px", color: "var(--brand)", cursor: "pointer", fontWeight: 500 }}>
                      Ver o que a ANA respondeu
                    </summary>
                    <p style={{
                      marginTop: "6px",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      background: "var(--bg-muted)",
                      fontSize: "12px",
                      color: "var(--fg-muted)",
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                    }}>
                      {item.resposta}
                    </p>
                  </details>
                )}

                <p style={{ fontSize: "12px", color: "var(--fg-subtle)", marginTop: "4px" }}>
                  {formatDate(item.ultima_ocorrencia ?? item.created_at)}
                  {item.motivo && (
                    <span style={{ marginLeft: "12px" }}>
                      · {MOTIVO_LABEL[item.motivo] ?? item.motivo}
                    </span>
                  )}
                  {item.resolved && item.resolved_at && (
                    <span style={{ marginLeft: "12px", color: "#00896d" }}>
                      ✓ Resolvida em {formatDate(item.resolved_at)}
                    </span>
                  )}
                </p>
              </div>

              {/* Actions */}
              {!item.resolved && (
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <Link
                    href={`/admin/novo?pergunta=${encodeURIComponent(item.pergunta)}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--brand)",
                      background: "var(--brand-dim)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--brand)",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    + Criar FAQ
                  </Link>
                  <button
                    onClick={() => handleResolve(item.id)}
                    disabled={resolving === item.id}
                    title="Marcar como resolvida"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      cursor: resolving === item.id ? "default" : "pointer",
                      opacity: resolving === item.id ? 0.5 : 1,
                    }}
                  >
                    <CheckCheck style={{ width: "13px", height: "13px", color: "#00896d" }} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    title="Apagar"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      cursor: deleting === item.id ? "default" : "pointer",
                      opacity: deleting === item.id ? 0.5 : 1,
                    }}
                  >
                    <Trash2 style={{ width: "13px", height: "13px", color: "#991b1b" }} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
