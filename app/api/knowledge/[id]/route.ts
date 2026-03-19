import { NextResponse } from "next/server";
import { knowledgeSeed } from "@/data/knowledgeBase";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = knowledgeSeed.find((i) => i.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}
