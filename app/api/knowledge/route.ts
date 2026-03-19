import { NextResponse } from "next/server";
import { knowledgeSeed } from "@/data/knowledgeBase";

// Server-side: reads from seed (client localStorage is unavailable on server)
export async function GET() {
  return NextResponse.json({ items: knowledgeSeed, total: knowledgeSeed.length });
}
