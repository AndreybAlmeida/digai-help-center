import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get("admin_auth")?.value === "1";
}

export async function GET(req: NextRequest) {
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const showResolved = req.nextUrl.searchParams.get("resolved") === "true";
  const { getUnansweredQuestions } = await import("@/lib/db/queries");
  const rows = await getUnansweredQuestions(showResolved);
  return NextResponse.json({ items: rows, total: rows.length });
}
