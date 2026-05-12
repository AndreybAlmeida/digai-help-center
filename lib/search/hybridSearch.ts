import { readFile } from "fs/promises";
import { join } from "path";
import { knowledgeSeed } from "@/data/knowledgeBase";
import type { KnowledgeItem } from "@/types/knowledge";

export interface ContextItem {
  source: "faq" | "doc";
  label: string; // "[FAQ]" or "[DOC: filename, p.N]"
  pergunta?: string;
  content: string;
}

// ─── Lexical search (mantém lógica atual) ─────────────────────────────────────

async function loadKnowledgeItems(): Promise<KnowledgeItem[]> {
  try {
    const filePath = join(process.cwd(), "public", "knowledge-export.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    if (Array.isArray(data.items)) return data.items as KnowledgeItem[];
  } catch {
    // fallback
  }
  return knowledgeSeed.filter((i) => i.publicado);
}

function lexicalSearch(query: string, items: KnowledgeItem[], limit = 3): KnowledgeItem[] {
  const q = query.toLowerCase();
  const scored = items.map((item) => {
    let score = 0;
    if (item.pergunta.toLowerCase().includes(q)) score += 3;
    if (item.palavrasChave.some((k) => k.toLowerCase().includes(q))) score += 2;
    if (item.resposta.toLowerCase().includes(q)) score += 1;
    const words = q.split(/\s+/).filter((w) => w.length > 2);
    for (const word of words) {
      if (item.pergunta.toLowerCase().includes(word)) score += 1;
      if (item.palavrasChave.some((k) => k.toLowerCase().includes(word))) score += 0.5;
    }
    return { item, score };
  });
  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

// ─── Vector search ─────────────────────────────────────────────────────────────

async function vectorSearch(
  query: string,
  limit = 3
): Promise<Array<{ content: string; filename: string; page_number: number | null }>> {
  try {
    if (!process.env.DATABASE_URL || !process.env.OPENAI_API_KEY) return [];

    const { embedSingle } = await import("@/lib/documents/embeddings");
    const { searchChunksByEmbedding } = await import("@/lib/db/queries");

    const queryEmbedding = await embedSingle(query);
    return searchChunksByEmbedding(queryEmbedding, limit);
  } catch {
    return [];
  }
}

// ─── Hybrid search ─────────────────────────────────────────────────────────────

export async function findRelevantContextHybrid(query: string, k = 6): Promise<ContextItem[]> {
  const [knowledgeItems, docResults] = await Promise.all([
    loadKnowledgeItems(),
    vectorSearch(query, 3),
  ]);

  const faqItems = lexicalSearch(query, knowledgeItems, 3);

  const results: ContextItem[] = [];

  for (const item of faqItems) {
    results.push({
      source: "faq",
      label: "[FAQ]",
      pergunta: item.pergunta,
      content: `P: ${item.pergunta}\nR: ${item.resposta}`,
    });
  }

  for (const doc of docResults) {
    const page = doc.page_number ? `, p.${doc.page_number}` : "";
    results.push({
      source: "doc",
      label: `[DOC: ${doc.filename}${page}]`,
      content: doc.content,
    });
  }

  return results.slice(0, k);
}

export function formatHybridContext(items: ContextItem[]): string {
  return items
    .map((item) => `${item.label}\n${item.content}`)
    .join("\n\n---\n\n");
}
