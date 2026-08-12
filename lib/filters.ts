import { CATEGORIES, isCategorySlug } from "@/lib/content/categories";
import { isNovidade, type Article } from "@/lib/content/types";

export type ChipId = "all" | "novo" | "iniciante" | "curto" | (string & {});

/** lowercase + remove acento. "Integrações" e "integracoes" precisam casar. */
export function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function matchChip(a: Article, chip: ChipId, agora: number): boolean {
  switch (chip) {
    case "all": return true;
    case "novo": return isNovidade(a.publishedAt, agora);
    case "iniciante": return a.level === "iniciante";
    case "curto": return a.minutes <= 5;
    default: return isCategorySlug(chip) && a.category === chip;
  }
}

function matchQuery(a: Article, query: string): boolean {
  const q = normalize(query.trim());
  if (!q) return true;
  const alvo = normalize(
    [a.title, a.excerpt, CATEGORIES[a.category].label, ...(a.searchTags ?? [])].join(" ")
  );
  return alvo.includes(q);
}

/**
 * Filtro puro, sem React. Chip e busca combinam por AND.
 * `agora` entra por parâmetro para a função continuar determinística e testável.
 */
export function filterArticles(
  articles: Article[],
  { chip, query, agora = Date.now() }: { chip: ChipId; query: string; agora?: number }
): Article[] {
  return articles.filter((a) => matchChip(a, chip, agora) && matchQuery(a, query));
}
