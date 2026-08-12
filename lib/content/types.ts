import type { CategorySlug } from "@/lib/content/categories";

export type { CategorySlug };

export type Level = "iniciante" | "intermediario" | "avancado";
export type Kind = "tutorial" | "guia" | "tecnico";

export interface Article {
  slug: string;
  title: string;
  /** 1–2 linhas; o card trunca em 2. */
  excerpt: string;
  category: CategorySlug;
  kind: Kind;
  level: Level;
  minutes: number;
  /** ISO. "Novidade" é derivado disto, nunca uma flag manual. */
  publishedAt: string;
  /** Os 3 bullets do preview no hover. Obrigatório: card sem isso não entra no grid. */
  learn: [string, string, string];
  searchTags?: string[];
}

export interface Category {
  slug: CategorySlug;
  description: string;
  /** Derivado da contagem real de artigos — nunca escrito à mão. */
  articleCount: number;
}

export const LEVEL_LABEL: Record<Level, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export const KIND_LABEL: Record<Kind, string> = {
  tutorial: "Tutorial",
  guia: "Guia",
  tecnico: "Técnico",
};

/** Novidade = publicado nos últimos 30 dias. */
export const NOVIDADE_DIAS = 30;

export function isNovidade(publishedAt: string, agora: number): boolean {
  const t = new Date(publishedAt).getTime();
  if (Number.isNaN(t)) return false;
  return agora - t <= NOVIDADE_DIAS * 24 * 60 * 60 * 1000;
}

/** Data curta do card: "08 mar 2026". UTC fixo — o build roda em UTC e o
 *  usuário não, e sem isso servidor e cliente renderizam dias diferentes. */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).replace(".", "");
}
