import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { knowledgeSeed } from "@/data/knowledgeBase";

export async function POST(req: NextRequest) {
  try {
    // Try to parse a custom payload from the request (sent by ExportImport component)
    let items = knowledgeSeed;
    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => null);
      if (body?.items && Array.isArray(body.items)) {
        items = body.items;
      }
    }

    const published = items.filter((i) => i.publicado);
    const payload = {
      items: published,
      lastUpdated: new Date().toISOString().slice(0, 10),
      count: published.length,
    };

    const filePath = join(process.cwd(), "public", "knowledge-export.json");
    await writeFile(filePath, JSON.stringify(payload, null, 2), "utf-8");

    return NextResponse.json({ ok: true, count: published.length });
  } catch (err) {
    console.error("[publish]", err);
    return NextResponse.json({ error: "Falha ao escrever arquivo" }, { status: 500 });
  }
}
