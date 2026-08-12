import { ARTICLES } from "@/lib/content/articles";
import { CATEGORY_DESCRIPTIONS, CATEGORY_ORDER, type CategorySlug } from "@/lib/content/categories";
import type { Category } from "@/lib/content/types";

/**
 * MÓDULO SERVIDOR — não importar de componente client: puxaria o driver do
 * banco e o JSON inteiro da base para o bundle.
 *
 * Cada categoria tem dois números diferentes, e confundi-los foi o bug que
 * deixou metade do rail zerada:
 *
 *  - `articleCount`  → só os artigos de data/articles.ts. É o dataset do grid
 *                      da home, então é ele que decide quais chips existem.
 *  - `materialCount` → tudo que a página da categoria realmente mostra:
 *                      artigos + itens publicados da base de conhecimento.
 *                      É este que vai no rail e no card.
 */

interface ItemBase {
  categoria?: string;
  tipo?: string;
  publicado?: boolean;
}

async function carregarBase(): Promise<ItemBase[]> {
  // Banco primeiro: o public/knowledge-export.json é só um snapshot do último
  // publish feito localmente. Em produção a escrita dele não persiste (o
  // filesystem da Vercel é efêmero), então ele vive defasado.
  try {
    if (process.env.DATABASE_URL) {
      const { loadPublishedKnowledge } = await import("@/lib/db/queries");
      const items = (await loadPublishedKnowledge()) as ItemBase[];
      if (items.length > 0) return items;
    }
  } catch {
    // cai para o arquivo
  }

  try {
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    const raw = await readFile(join(process.cwd(), "public", "knowledge-export.json"), "utf-8");
    const data = JSON.parse(raw);
    if (Array.isArray(data.items)) return data.items as ItemBase[];
  } catch {
    // sem base: o rail mostra só a contagem de artigos
  }

  return [];
}

export async function getCategorias(): Promise<Category[]> {
  const base = (await carregarBase()).filter((i) => i?.publicado);

  const categorias = CATEGORY_ORDER.map((slug) => {
    const artigos = ARTICLES.filter((a) => a.category === slug).length;
    // A página de /categoria/faq lista os FAQs de TODAS as categorias, então a
    // contagem dela precisa seguir a mesma regra, senão o número não bate com
    // o que o usuário encontra ao clicar.
    const daBase =
      slug === "faq"
        ? base.filter((i) => i.tipo === "faq").length
        : base.filter((i) => i.categoria === slug).length;

    return {
      slug: slug as CategorySlug,
      description: CATEGORY_DESCRIPTIONS[slug],
      articleCount: artigos,
      materialCount: artigos + daBase,
    };
  });

  // Ordem fixa: com material primeiro, na ordem do mapa; vazias depois.
  return [
    ...categorias.filter((c) => c.materialCount > 0),
    ...categorias.filter((c) => c.materialCount === 0),
  ];
}

/** Chips da home filtram o grid, que só tem artigos — logo, só categorias com artigo. */
export const categoriasComArtigo = (todas: Category[]) => todas.filter((c) => c.articleCount > 0);
