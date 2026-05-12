import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { knowledgeSeed } from "@/data/knowledgeBase";
import type { KnowledgeItem } from "@/types/knowledge";

async function loadGeneratedFaqs(): Promise<KnowledgeItem[]> {
  try {
    if (!process.env.DATABASE_URL) return [];
    const { getPublishedGeneratedFaqs } = await import("@/lib/db/queries");
    const rows = await getPublishedGeneratedFaqs();
    return rows.map((row) => ({
      id: row.id,
      pergunta: row.pergunta,
      resposta: row.resposta,
      categoria: row.categoria as KnowledgeItem["categoria"],
      palavrasChave: row.palavras_chave,
      tipo: row.tipo as KnowledgeItem["tipo"],
      nivel: row.nivel as KnowledgeItem["nivel"],
      updatedAt: new Date(row.created_at).toISOString().slice(0, 10),
      publicado: true,
    }));
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    let manualItems: KnowledgeItem[] = knowledgeSeed;
    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => null);
      if (body?.items && Array.isArray(body.items)) {
        manualItems = body.items;
      }
    }

    const publishedManual = manualItems.filter((i) => i.publicado);
    const generatedFaqs = await loadGeneratedFaqs();

    // Merge: manual items first, then generated (dedup by id)
    const existingIds = new Set(publishedManual.map((i) => i.id));
    const mergedItems = [
      ...publishedManual,
      ...generatedFaqs.filter((i) => !existingIds.has(i.id)),
    ];

    const payload = {
      items: mergedItems,
      lastUpdated: new Date().toISOString().slice(0, 10),
      count: mergedItems.length,
    };

    const filePath = join(process.cwd(), "public", "knowledge-export.json");
    await writeFile(filePath, JSON.stringify(payload, null, 2), "utf-8");

    return NextResponse.json({ ok: true, count: mergedItems.length });
  } catch (err) {
    console.error("[publish]", err);
    return NextResponse.json({ error: "Falha ao escrever arquivo" }, { status: 500 });
  }
}
