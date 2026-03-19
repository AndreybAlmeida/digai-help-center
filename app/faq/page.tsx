"use client";

import { useEffect, useState } from "react";
import { AccordionItem } from "@/components/ui/Accordion";
import Breadcrumb from "@/components/layout/Breadcrumb";
import RelatedItems from "@/components/faq/RelatedItems";
import { initStore, getItemsByTipo, searchKnowledge } from "@/lib/knowledgeStore";
import { KnowledgeItem, KnowledgeCategorySlug } from "@/types/knowledge";
import { Bot, Search } from "lucide-react";
import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  "primeiros-passos": "Primeiros Passos",
  "gestao-de-vagas": "Gestão de Vagas",
  "triagem-inteligente": "Triagem",
  "hunting": "Hunting",
  "integracoes": "Integrações",
  "relatorios": "Relatórios",
  "api-tecnico": "API",
  "faq": "FAQ",
  "entrevista-inteligente": "Entrevista",
  "ranking": "Ranking",
  "boas-praticas": "Boas Práticas",
  "posicionamento": "Sobre a DigAI",
};

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [allItems, setAllItems] = useState<KnowledgeItem[]>([]);

  useEffect(() => {
    initStore();
    setAllItems(getItemsByTipo("faq"));
  }, []);

  const searched =
    query.trim().length >= 2 ? searchKnowledge(query, 30).filter((i) => i.tipo === "faq") : allItems;

  const filtered =
    categoryFilter === "all"
      ? searched
      : searched.filter((i) => i.categoria === (categoryFilter as KnowledgeCategorySlug));

  // Build category options from loaded items
  const uniqueCats = [...new Set(allItems.map((i) => i.categoria))];
  const categoryOptions = [
    { label: "Todos", value: "all" },
    ...uniqueCats.map((c) => ({ label: CATEGORY_LABELS[c] ?? c, value: c })),
  ];

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px 64px" }}>
      <Breadcrumb items={[{ label: "Perguntas Frequentes" }]} />

      {/* Header */}
      <div style={{ marginTop: "28px", marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "var(--fg)",
            letterSpacing: "-0.02em",
          }}
        >
          Perguntas Frequentes
        </h1>
        <p style={{ marginTop: "8px", fontSize: "15px", color: "var(--fg-muted)" }}>
          Respostas rápidas para as dúvidas mais comuns sobre a DigAI.
        </p>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "16px" }}>
        <Search
          style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "15px",
            height: "15px",
            color: "var(--fg-muted)",
            pointerEvents: "none",
          }}
        />
        <input
          placeholder="Buscar perguntas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            height: "44px",
            paddingLeft: "42px",
            paddingRight: "16px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            fontSize: "14px",
            color: "var(--fg)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "28px" }}>
        {categoryOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setCategoryFilter(opt.value)}
            style={{
              padding: "5px 12px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: categoryFilter === opt.value ? 600 : 400,
              color: categoryFilter === opt.value ? "var(--brand)" : "var(--fg-muted)",
              background: categoryFilter === opt.value ? "var(--brand-dim)" : "transparent",
              border: "none",
              cursor: "pointer",
              transition: "color 0.15s, background 0.15s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* FAQ list */}
      {allItems.length === 0 ? (
        <div style={{ padding: "32px", textAlign: "center", color: "var(--fg-muted)", fontSize: "14px" }}>
          Carregando…
        </div>
      ) : filtered.length > 0 ? (
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            padding: "0 20px",
          }}
        >
          {filtered.map((item) => (
            <AccordionItem
              key={item.id}
              id={item.id}
              question={item.pergunta}
              answer={item.resposta}
              footer={<RelatedItems ids={item.relacionados} />}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            borderRadius: "12px",
            border: "1px dashed var(--border)",
            padding: "48px 24px",
            textAlign: "center",
            fontSize: "14px",
            color: "var(--fg-muted)",
          }}
        >
          Nenhuma pergunta encontrada. Tente outra busca.
        </div>
      )}

      {/* ANA CTA */}
      <div
        style={{
          marginTop: "32px",
          padding: "20px 24px",
          borderRadius: "12px",
          border: "1px solid var(--border-strong)",
          background: "var(--bg-subtle)",
        }}
      >
        <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>
          Não encontrou sua resposta?
        </p>
        <p style={{ marginTop: "4px", fontSize: "13px", color: "var(--fg-muted)" }}>
          Converse com a ANA — nossa IA responde sobre qualquer funcionalidade da DigAI.
        </p>
        <Link
          href="/chat"
          style={{
            marginTop: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 18px",
            borderRadius: "8px",
            background: "var(--brand)",
            color: "#fff",
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
