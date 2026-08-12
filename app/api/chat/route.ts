import { searchArticles } from "@/data/articles";
import { NextRequest, NextResponse } from "next/server";
import { findRelevantContextHybrid, formatHybridContext, type ContextItem } from "@/lib/search/hybridSearch";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

const SYSTEM_PROMPT = `Você é a ANA, assistente oficial da DigAI — plataforma de recrutamento com inteligência artificial.

Regras:
- Responda SEMPRE em português brasileiro
- Seja direto, objetivo e use formatação markdown quando útil (negrito para termos-chave, listas quando houver passos)
- Oriente com passos claros sempre que possível
- NUNCA invente funcionalidades, URLs ou dados que não estejam no contexto abaixo
- Se não souber, diga: "Não encontrei informação suficiente sobre isso. Entre em contato com nosso suporte."
- Mantenha o contexto da conversa — responda follow-ups com base nas mensagens anteriores
- Respostas curtas e práticas (máximo 3-4 parágrafos)
- Não substitua o recrutador — reforce que a DigAI potencializa o trabalho humano
- IMPORTANTE — links: quando o contexto incluir uma linha "URL:", SEMPRE finalize sua resposta com o link no formato markdown: [Ver na Central de Ajuda →](url). Use a URL exatamente como fornecida no contexto, sem inventar.`;

// ─── Mock fallback ────────────────────────────────────────────────────────────

function generateMockReply(userMessage: string, contextItems: ContextItem[]): string {
  if (contextItems.length > 0) {
    return contextItems[0].content;
  }
  const q = userMessage.toLowerCase();
  if (q.includes("vaga") || q.includes("criar")) {
    return "Para criar uma vaga: 1) Crie um **workspace**, 2) Configure uma **triagem**, 3) Escolha o tipo de processo.";
  }
  if (q.includes("candidato") || q.includes("pipeline")) {
    return "O pipeline funciona como Kanban — arraste os cards entre etapas ou use **Avançar etapa** no perfil do candidato.";
  }
  return "Olá! Sou a ANA, assistente da DigAI. Posso ajudar com vagas, triagem, ranking, integrações e relatórios. O que você precisa?";
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Nenhuma mensagem enviada" }, { status: 400 });
    }

    const lastUserMessage = messages.filter((m) => m.role === "user").at(-1);
    if (!lastUserMessage) {
      return NextResponse.json({ error: "Nenhuma mensagem do usuário" }, { status: 400 });
    }

    const contextItems = await findRelevantContextHybrid(lastUserMessage.content);
    const suggestedArticles = searchArticles(lastUserMessage.content).slice(0, 3);

    // Log questions with no knowledge context (fire-and-forget)
    if (contextItems.length === 0 && suggestedArticles.length === 0 && process.env.DATABASE_URL) {
      import("@/lib/db/queries")
        .then(({ logUnansweredQuestion }) => logUnansweredQuestion(lastUserMessage.content))
        .catch(() => {});
    }

    const systemWithContext = contextItems.length > 0
      ? `${SYSTEM_PROMPT}\n\nCONTEXTO DA BASE DE CONHECIMENTO:\n\n${formatHybridContext(contextItems)}`
      : SYSTEM_PROMPT;

    // ── OpenAI ────────────────────────────────────────────────────────────────
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      const { default: OpenAI } = await import("openai");
      const client = new OpenAI({ apiKey: openaiKey });

      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 1024,
        messages: [
          { role: "system", content: systemWithContext },
          ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        ],
      });

      const reply = response.choices[0]?.message?.content ?? "";
      return NextResponse.json({ reply, suggestedArticles });
    }

    // ── Anthropic (fallback) ──────────────────────────────────────────────────
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey: anthropicKey });

      const response = await client.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        system: systemWithContext,
        messages: messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      });

      const reply = response.content[0].type === "text" ? response.content[0].text : "";
      return NextResponse.json({ reply, suggestedArticles });
    }

    // ── Mock fallback (sem chave) ─────────────────────────────────────────────
    const reply = generateMockReply(lastUserMessage.content, contextItems);
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ reply, suggestedArticles });

  } catch (err) {
    console.error("[chat]", err);
    return NextResponse.json({ error: "Erro ao processar mensagem" }, { status: 500 });
  }
}
