import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const { loadPublishedKnowledge } = await import("@/lib/db/queries");
      const items = await loadPublishedKnowledge();
      if (items.length > 0) {
        return NextResponse.json({ items, count: items.length });
      }
    }
  } catch {
    // fallback below
  }

  // Fallback: read from file (local dev or before first publish)
  try {
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    const filePath = join(process.cwd(), "public", "knowledge-export.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ items: [], count: 0 });
  }
}
