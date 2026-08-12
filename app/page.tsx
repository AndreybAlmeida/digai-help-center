import HomeSections from "@/components/home/HomeSections";
import { MosaicDefs } from "@/components/home/HeroFeature";
import type { QuickAction } from "@/components/home/QuickActions";
import type { TrackStep } from "@/components/home/TrackCard";
import { ARTICLES, CATEGORIAS_COM_CONTEUDO, CATEGORIES_WITH_COUNT } from "@/lib/content/articles";
import { CATEGORIES } from "@/lib/content/categories";
import { KIND_LABEL } from "@/lib/content/types";
import type { IconName } from "@/components/icons/Sprite";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Central de Ajuda — DigAI",
  description: "Documentação, tutoriais e suporte para a plataforma DigAI Talent Intelligence.",
};

const HERO_SLUG = "como-usar-digai-tutorial-completo";

const TRILHA: TrackStep[] = [
  { title: "Tour pela plataforma", minutes: 10 },
  { title: "Crie seu primeiro Workspace", minutes: 5 },
  { title: "Configure uma Triagem", minutes: 7 },
  { title: "Compartilhe com candidatos", minutes: 4 },
];

const ACOES_RAPIDAS = [
  { slug: "como-criar-workspace", label: "Criar minha primeira vaga" },
  { slug: "como-criar-triagem", label: "Configurar triagem com IA" },
  { slug: "como-filtrar-avaliar-candidatos", label: "Filtrar e avaliar candidatos" },
  { slug: "job-slot-linkedin", label: "Publicar vaga no LinkedIn" },
  { slug: "ativando-integracao-gupy", label: "Integrar com o Gupy" },
  { slug: "api-digai-introducao", label: "Começar com a API" },
];

export default function HomePage() {
  const hero = ARTICLES.find((a) => a.slug === HERO_SLUG);

  // O grid da home exclui o artigo que já está em destaque no hero.
  const artigos = ARTICLES.filter((a) => a.slug !== HERO_SLUG);

  const acoes: QuickAction[] = ACOES_RAPIDAS.flatMap(({ slug, label }) => {
    const artigo = ARTICLES.find((a) => a.slug === slug);
    if (!artigo) return [];
    const cat = CATEGORIES[artigo.category];
    return [{
      slug,
      label,
      meta: `${KIND_LABEL[artigo.kind]} · ${artigo.minutes} min`,
      icon: cat.icon as IconName,
      c1: cat.c1,
      c2: cat.c2,
    }];
  });

  return (
    <div className="wrap">
      <MosaicDefs />
      <HomeSections
        articles={artigos}
        categorias={CATEGORIES_WITH_COUNT}
        categoriasComConteudo={CATEGORIAS_COM_CONTEUDO}
        hero={{ href: `/artigo/${HERO_SLUG}`, minutes: hero?.minutes ?? 10 }}
        trilha={TRILHA}
        acoes={acoes}
      />

      <footer className="foot">
        <div className="links">
          <Link href="/comece-aqui">Comece por aqui</Link>
          <Link href="/categoria/integracoes">Integrações</Link>
          <Link href="/categoria/api-tecnico">API</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/chat">Chat com a ANA</Link>
          <Link href="/contato">Contato</Link>
          <a href="https://www.digai.ai" target="_blank" rel="noopener noreferrer">digai.ai</a>
        </div>
        <span className="cr">© 2026 DigAI — Talent Intelligence Platform</span>
      </footer>
    </div>
  );
}
