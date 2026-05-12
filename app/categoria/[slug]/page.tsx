"use client";

import ArticleCard from "@/components/article/ArticleCard";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { AccordionItem } from "@/components/ui/Accordion";
import RelatedItems from "@/components/faq/RelatedItems";
import { getArticlesByCategory } from "@/data/articles";
import { getCategoryBySlug } from "@/data/categories";
import { initStore, getItemsByCategoria } from "@/lib/knowledgeStore";
import { KnowledgeItem, KnowledgeCategorySlug } from "@/types/knowledge";
import { ContentType } from "@/types/content";
import { Bot, CircleHelp } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

const typeOptions = [
  { label: "Todos", value: "all" },
  { label: "Artigos", value: "article" },
  { label: "Tutoriais", value: "tutorial" },
  { label: "Vídeos", value: "video" },
];

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const allArticles = getArticlesByCategory(slug);
  const [filter, setFilter] = useState("all");
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const faqItems = knowledgeItems.filter((i) => i.tipo === "faq");
  const cardItems = knowledgeItems.filter((i) => i.tipo !== "faq");

  useEffect(() => {
    fetch("/knowledge-export.json")
      .then((r) => r.json())
      .then((data) => {
        const items: KnowledgeItem[] = (data.items ?? []).filter(
          (i: KnowledgeItem) => i.publicado && i.categoria === slug
        );
        setKnowledgeItems(items);
      })
      .catch(() => {
        initStore();
        setKnowledgeItems(
          getItemsByCategoria(slug as KnowledgeCategorySlug).filter((i) => i.publicado)
        );
      });
  }, [slug]);

  const filtered =
    filter === "all"
      ? allArticles
      : allArticles.filter((a) => a.contentType === (filter as ContentType));

  const FAQ_PREVIEW = 5;
  const visibleFaq = showAllFaq ? faqItems : faqItems.slice(0, FAQ_PREVIEW);

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 64px" }}>
      <Breadcrumb items={[{ label: category.label }]} />

      <div style={{ marginTop: "24px", marginBottom: "24px" }}>
        <h1
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "26px",
            fontWeight: 700,
            color: "var(--fg)",
            letterSpacing: "-0.02em",
          }}
        >
          {category.label}
        </h1>
        <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--fg-muted)" }}>
          {category.description}
        </p>
        <p style={{ marginTop: "4px", fontSize: "12px", color: "var(--fg-subtle)" }}>
          {allArticles.length + cardItems.length} {allArticles.length + cardItems.length === 1 ? "artigo" : "artigos"}
          {faqItems.length > 0 && (
            <span> · {faqItems.length} {faqItems.length === 1 ? "pergunta" : "perguntas"}</span>
          )}
        </p>
      </div>

      {/* Articles section */}
      {allArticles.length > 0 && (
        <>
          <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: filter === opt.value ? 600 : 400,
                  color: filter === opt.value ? "var(--brand)" : "var(--fg-muted)",
                  background: filter === opt.value ? "var(--brand-dim)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.15s, background 0.15s",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", marginBottom: "40px" }}>
              {filtered.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div
              style={{
                borderRadius: "12px",
                border: "1px dashed var(--border)",
                padding: "32px 24px",
                textAlign: "center",
                fontSize: "14px",
                color: "var(--fg-muted)",
                marginBottom: "40px",
              }}
            >
              Nenhum conteúdo encontrado para este filtro.
            </div>
          )}
        </>
      )}

      {/* Knowledge cards (tutorial, onboarding, boas-praticas, api) */}
      {cardItems.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {cardItems.map((item) => {
              const isOpen = expandedCard === item.id;
              const tipoLabel: Record<string, string> = {
                tutorial: "Tutorial", onboarding: "Onboarding",
                "boas-praticas": "Boas Práticas", api: "API",
              };
              return (
                <div
                  key={item.id}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    overflow: "hidden",
                    transition: "box-shadow 0.15s, border-color 0.15s",
                  }}
                >
                  <div style={{ height: "80px", background: "linear-gradient(135deg,#00B896 0%,#0284c7 100%)", display: "flex", alignItems: "center", padding: "0 16px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.25)", padding: "3px 10px", borderRadius: "100px" }}>
                      {tipoLabel[item.tipo] ?? item.tipo}
                    </span>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", lineHeight: 1.4, margin: 0 }}>
                      {item.pergunta}
                    </h3>
                    {isOpen ? (
                      <div style={{ marginTop: "10px", fontSize: "13px", color: "var(--fg-muted)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                        {item.resposta}
                      </div>
                    ) : (
                      <p style={{ marginTop: "6px", fontSize: "12px", color: "var(--fg-muted)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {item.resposta}
                      </p>
                    )}
                    <button
                      onClick={() => setExpandedCard(isOpen ? null : item.id)}
                      style={{ marginTop: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, color: "var(--brand)", padding: 0 }}
                    >
                      {isOpen ? "Mostrar menos ↑" : "Ler mais →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Knowledge / FAQ section */}
      {faqItems.length > 0 && (
        <div>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <CircleHelp style={{ width: "16px", height: "16px", color: "var(--brand)" }} />
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--fg)" }}>
              Perguntas frequentes
            </h2>
            <span style={{
              marginLeft: "4px",
              padding: "2px 8px",
              borderRadius: "100px",
              background: "var(--brand-dim)",
              color: "var(--brand)",
              fontSize: "11px",
              fontWeight: 600,
            }}>
              {faqItems.length}
            </span>
          </div>

          {/* Accordion */}
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              padding: "0 20px",
            }}
          >
            {visibleFaq.map((item) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                question={item.pergunta}
                answer={item.resposta}
                footer={<RelatedItems ids={item.relacionados} />}
              />
            ))}
          </div>

          {/* Show more / less */}
          {faqItems.length > FAQ_PREVIEW && (
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button
                onClick={() => setShowAllFaq((v) => !v)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--brand)",
                  cursor: "pointer",
                }}
              >
                {showAllFaq
                  ? "Mostrar menos"
                  : `Ver mais ${faqItems.length - FAQ_PREVIEW} perguntas`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty state when no articles AND no knowledge items */}
      {allArticles.length === 0 && knowledgeItems.length === 0 && cardItems.length === 0 && (
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
          Nenhum conteúdo encontrado para esta categoria.
        </div>
      )}

      {/* ANA CTA */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px 24px",
          borderRadius: "12px",
          border: "1px solid var(--border-strong)",
          background: "var(--bg-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>
            Não encontrou o que procurava?
          </p>
          <p style={{ marginTop: "4px", fontSize: "13px", color: "var(--fg-muted)" }}>
            Converse com a ANA — nossa IA responde sobre qualquer funcionalidade da DigAI.
          </p>
        </div>
        <Link
          href="/chat"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 20px",
            borderRadius: "8px",
            background: "var(--brand)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <Bot style={{ width: "13px", height: "13px" }} />
          Perguntar à ANA
        </Link>
      </div>
    </div>
  );
}
