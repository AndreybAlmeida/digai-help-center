import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { after } from "next/server";
import { getDocumentById } from "@/lib/db/queries";
import { processDocument } from "@/lib/documents/pipeline";

/**
 * O processamento roda dentro de after(), e o tempo dele conta para a duração
 * da função. Sem isto, o padrão curto da Vercel matava a invocação no meio de
 * PDFs grandes — e como o processo é morto pela plataforma, o catch nunca
 * roda: o documento ficava preso em "processando" para sempre, sem erro.
 */
export const maxDuration = 300;

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "1";
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const doc = await getDocumentById(id);
  if (!doc) return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });

  after(async () => {
    try {
      await processDocument(id);
    } catch {
      // Status set to 'erro' inside processDocument
    }
  });

  return NextResponse.json({ id, status: "processando" });
}
