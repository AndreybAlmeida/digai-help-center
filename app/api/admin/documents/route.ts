import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";
import { insertDocument, getDocuments } from "@/lib/db/queries";
import { after } from "next/server";
import { processDocument } from "@/lib/documents/pipeline";

/**
 * O processamento roda dentro de after(), e o tempo dele conta para a duração
 * da função. Sem isto, o padrão curto da Vercel matava a invocação no meio de
 * PDFs grandes — e como o processo é morto pela plataforma, o catch nunca
 * roda: o documento ficava preso em "processando" para sempre, sem erro.
 */
export const maxDuration = 300;

const ALLOWED_MIMES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "1";
}

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const { rows, total } = await getDocuments(page);
  return NextResponse.json({ documents: rows, total, page });
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    if (!ALLOWED_MIMES.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de arquivo não suportado. Use PDF ou DOCX." }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Arquivo muito grande. Máximo: 25 MB." }, { status: 400 });
    }

    const blob = await put(`documents/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    const doc = await insertDocument({
      filename: file.name,
      mime_type: file.type,
      blob_url: blob.url,
      size_bytes: file.size,
    });

    after(async () => {
      try {
        await processDocument(doc.id);
      } catch {
        // Status already set to 'erro' inside processDocument
      }
    });

    return NextResponse.json({ id: doc.id, status: "processando" }, { status: 201 });
  } catch (err) {
    console.error("[documents/upload]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro interno" },
      { status: 500 }
    );
  }
}
