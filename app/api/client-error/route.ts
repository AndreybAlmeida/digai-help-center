import { NextRequest, NextResponse } from "next/server";

/**
 * Recebe erros de client (enviados pelos error boundaries) e escreve no log
 * do servidor — aparece nos Runtime Logs da Vercel. Sem isso, uma exceção
 * de hidratação vira uma tela branca muda, sem nenhum rastro.
 */
export async function POST(req: NextRequest) {
  try {
    const { message, stack, digest, url, userAgent } = await req.json();

    console.error("[client-error]", JSON.stringify({
      message: String(message ?? "").slice(0, 500),
      digest: digest ? String(digest).slice(0, 100) : undefined,
      url: String(url ?? "").slice(0, 300),
      userAgent: String(userAgent ?? "").slice(0, 300),
      stack: String(stack ?? "").slice(0, 2000),
    }));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
