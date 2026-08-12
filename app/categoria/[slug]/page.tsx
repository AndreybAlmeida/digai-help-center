"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleCard from "@/components/ui/ArticleCard";
import EmptyState from "@/components/ui/EmptyState";
import { AccordionItem } from "@/components/ui/Accordion";
import RelatedItems from "@/components/faq/RelatedItems";
import { ARTICLES } from "@/lib/content/articles";
import { CATEGORIES, CATEGORY_DESCRIPTIONS, isCategorySlug } from "@/lib/content/categories";
import { initStore, getItemsByCategoria, getItemsByTipo } from "@/lib/knowledgeStore";
import { KnowledgeItem, KnowledgeCategorySlug } from "@/types/knowledge";
import { Icon } from "@/components/icons/Sprite";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

const FAQ_PREVIEW = 5;

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  // Guardar o slug já estreitado mantém a narrowing viva depois do notFound().
  const catSlug = isCategorySlug(slug) ? slug : null;
  const artigos = catSlug ? ARTICLES.filter((a) => a.category === catSlug) : [];

  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/knowledge/items")
      .then((r) => r.json())
      .then((data) => {
        const publicados: KnowledgeItem[] = (data.items ?? []).filter((i: KnowledgeItem) => i.publicado);
        setKnowledgeItems(
          slug === "faq"
            ? publicados.filter((i) => i.tipo === "faq")
            : publicados.filter((i) => i.categoria === slug)
        );
      })
      .catch(() => {
        initStore();
        setKnowledgeItems(
          slug === "faq"
            ? getItemsByTipo("faq").filter((i) => i.publicado)
            : getItemsByCategoria(slug as KnowledgeCategorySlug).filter((i) => i.publicado)
        );
      });
  }, [slug]);

  // Depois de todos os hooks — chamar antes tornaria a ordem deles condicional.
  if (!catSlug) notFound();
  const cat = CATEGORIES[catSlug];

  const faqItems = knowledgeItems.filter((i) => i.tipo === "faq");
  const cardItems = knowledgeItems.filter((i) => i.tipo !== "faq");
  const visibleFaq = showAllFaq ? faqItems : faqItems.slice(0, FAQ_PREVIEW);
  const vazia = artigos.length === 0 && knowledgeItems.length === 0;

  return (
    <div className="wrap">
      <div style={{ paddingTop: "28px" }}>
        <Breadcrumb items={[{ label: cat.label }]} />
      </div>

      <section className="sec" style={{ marginTop: "24px" }}>
        <div className="sec-head">
          <div>
            <span className="kicker">Categoria</span>
            <h2>{cat.label}</h2>
            <p>{CATEGORY_DESCRIPTIONS[catSlug]}</p>
          </div>
        </div>

        {artigos.length > 0 && (
          <div className="grid">
            {artigos.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}

        {/* Itens da base de conhecimento que não são FAQ (tutorial, onboarding…) */}
        {cardItems.length > 0 && (
          <div className="grid g-cat" style={{ marginTop: artigos.length ? "26px" : 0 }}>
            {cardItems.map((item) => {
              const aberto = expandedCard === item.id;
              return (
                <div key={item.id} className="cat" style={{ ["--c1" as string]: cat.c1, ["--c2" as string]: cat.c2 }}>
                  <div className="band">
                    <Icon name={cat.icon as never} className="glyph" />
                  </div>
                  <div className="body">
                    <h3>{item.pergunta}</h3>
                    <p style={aberto ? { WebkitLineClamp: "unset", whiteSpace: "pre-wrap" } : undefined}>
                      {item.resposta}
                    </p>
                    <div className="foot">
                      <button className="count" onClick={() => setExpandedCard(aberto ? null : item.id)}>
                        {aberto ? "Mostrar menos ↑" : "Ler mais →"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {faqItems.length > 0 && (
        <section className="sec">
          <div className="sec-head">
            <div>
              <span className="kicker">Perguntas frequentes</span>
              <h2>{faqItems.length} {faqItems.length === 1 ? "pergunta" : "perguntas"}</h2>
            </div>
          </div>

          <div style={{ borderRadius: "var(--r-card)", border: "1px solid var(--border)", background: "var(--bg)", padding: "0 20px" }}>
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

          {faqItems.length > FAQ_PREVIEW && (
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button className="btn btn-ghost" onClick={() => setShowAllFaq((v) => !v)}>
                {showAllFaq ? "Mostrar menos" : `Ver mais ${faqItems.length - FAQ_PREVIEW} perguntas`}
              </button>
            </div>
          )}
        </section>
      )}

      {vazia && (
        <EmptyState
          title="Esta área ainda está em produção"
          description="Os artigos desta categoria estão sendo escritos. A ANA já responde sobre o tema — ela lê toda a base, inclusive o que ainda não virou artigo."
        />
      )}
    </div>
  );
}
