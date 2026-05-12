import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { del } from "@vercel/blob";
import {
  getDocumentById,
  deleteDocument,
  getGeneratedFaqsByDocumentId,
} from "@/lib/db/queries";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "1";
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const doc = await getDocumentById(id);
  if (!doc) return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });

  const faqs = await getGeneratedFaqsByDocumentId(id);
  return NextResponse.json({ document: doc, faqs });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const doc = await getDocumentById(id);
  if (!doc) return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });

  try {
    await del(doc.blob_url);
  } catch {
    // Non-fatal: proceed with DB deletion even if blob removal fails
  }

  // Cascades to document_chunks and generated_faqs via FK
  await deleteDocument(id);

  return NextResponse.json({ ok: true });
}
