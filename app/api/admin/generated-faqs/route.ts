import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPublishedGeneratedFaqs } from "@/lib/db/queries";
import type { KnowledgeItem } from "@/types/knowledge";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "1";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const rows = await getPublishedGeneratedFaqs();
  const items: KnowledgeItem[] = rows.map((row) => ({
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

  return NextResponse.json({ items });
}
