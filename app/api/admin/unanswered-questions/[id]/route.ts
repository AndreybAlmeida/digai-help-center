import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get("admin_auth")?.value === "1";
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { resolveUnansweredQuestion } = await import("@/lib/db/queries");
  await resolveUnansweredQuestion(id, body.notes);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { deleteUnansweredQuestion } = await import("@/lib/db/queries");
  await deleteUnansweredQuestion(id);
  return NextResponse.json({ ok: true });
}
