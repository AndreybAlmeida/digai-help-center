"use client";

import AnaBanner from "@/components/home/AnaBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ChipBar from "@/components/home/ChipBar";
import HeroFeature from "@/components/home/HeroFeature";
import QuickActions, { type QuickAction } from "@/components/home/QuickActions";
import TrackCard, { type TrackStep } from "@/components/home/TrackCard";
import ArticleCard from "@/components/ui/ArticleCard";
import EmptyState from "@/components/ui/EmptyState";
import { Icon } from "@/components/icons/Sprite";
import { useSearch } from "@/components/shell/SearchContext";
import type { Article, Category } from "@/lib/content/types";
import { filterArticles, type ChipId } from "@/lib/filters";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function HomeSections({
  articles,
  categorias,
  categoriasComConteudo,
  hero,
  trilha,
  acoes,
}: {
  articles: Article[];
  categorias: Category[];
  categoriasComConteudo: Category[];
  hero: { href: string; minutes: number };
  trilha: TrackStep[];
  acoes: QuickAction[];
}) {
  const { query } = useSearch();
  const [chip, setChip] = useState<ChipId>("all");
  const [debounced, setDebounced] = useState("");

  // 120ms: o suficiente para não filtrar a cada tecla, sem parecer travado.
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 120);
    return () => clearTimeout(t);
  }, [query]);

  const resultados = useMemo(
    () => filterArticles(articles, { chip, query: debounced }),
    [articles, chip, debounced]
  );

  const buscando = query.trim().length > 0;

  return (
    <>
      <ChipBar categorias={categoriasComConteudo} value={chip} onChange={setChip} />

      {!buscando && (
        <section className="hero">
          <HeroFeature href={hero.href} minutes={hero.minutes} />
          <TrackCard steps={trilha} />
        </section>
      )}

      <section className="sec">
        <div className="sec-head">
          <div>
            <span className="kicker">[ 01 ] {buscando ? "Resultados" : "Mais acessados"}</span>
            <h2>
              {buscando
                ? `${resultados.length} ${resultados.length === 1 ? "resultado" : "resultados"} para “${query.trim()}”`
                : "O que os clientes mais consultam"}
            </h2>
            {!buscando && <p>Tutoriais que resolvem 80% das dúvidas do dia a dia.</p>}
          </div>
          <div className="spacer" />
          {!buscando && (
            <Link className="link-all" href="/categoria/primeiros-passos">
              Ver todos
              <Icon name="arrow" size={15} />
            </Link>
          )}
        </div>

        {resultados.length > 0 ? (
          <div className="grid">
            {resultados.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {!buscando && (
        <>
          <section className="sec">
            <div className="sec-head">
              <div>
                <span className="kicker">[ 02 ] Explorar por categoria</span>
                <h2>Documentação por área da plataforma</h2>
                <p>Cada área tem sua cor. As em cinza estão em produção.</p>
              </div>
            </div>
            <CategoryGrid categorias={categorias} />
          </section>

          <section className="sec">
            <div className="sec-head">
              <div>
                <span className="kicker">[ 03 ] Ações rápidas</span>
                <h2>Preciso fazer isso agora</h2>
                <p>As tarefas mais comuns, direto ao ponto.</p>
              </div>
            </div>
            <QuickActions acoes={acoes} />
          </section>

          <section className="sec">
            <AnaBanner />
          </section>
        </>
      )}
    </>
  );
}
