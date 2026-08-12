import { searchArticles } from "@/data/articles";
import { NextRequest, NextResponse, after } from "next/server";
import { findRelevantContextHybrid, formatHybridContext, type ContextItem } from "@/lib/search/hybridSearch";
import { detectarLacuna } from "@/lib/search/detectUnanswered";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  sessionId?: string;
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

// ─── Geração da resposta ──────────────────────────────────────────────────────

/**
 * Isolado num helper para existir um único ponto onde `reply` é conhecido —
 * é lá que a detecção de lacuna precisa acontecer. Com um `return` por
 * provedor, como era antes, a detecção teria que ser repetida três vezes.
 */
async function gerarResposta(
  systemWithContext: string,
  messages: ChatMessage[],
  contextItems: ContextItem[],
  perguntaUsuario: string
): Promise<string> {
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

    return response.choices[0]?.message?.content ?? "";
  }

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

    const bloco = response.content[0];
    return bloco && bloco.type === "text" ? bloco.text : "";
  }

  await new Promise((r) => setTimeout(r, 400));
  return generateMockReply(perguntaUsuario, contextItems);
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { messages, sessionId } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Nenhuma mensagem enviada" }, { status: 400 });
    }

    const lastUserMessage = messages.filter((m) => m.role === "user").at(-1);
    if (!lastUserMessage) {
      return NextResponse.json({ error: "Nenhuma mensagem do usuário" }, { status: 400 });
    }

    const contextItems = await findRelevantContextHybrid(lastUserMessage.content);
    const suggestedArticles = searchArticles(lastUserMessage.content).slice(0, 3);

    const systemWithContext = contextItems.length > 0
      ? `${SYSTEM_PROMPT}\n\nCONTEXTO DA BASE DE CONHECIMENTO:\n\n${formatHybridContext(contextItems)}`
      : SYSTEM_PROMPT;

    const reply = await gerarResposta(
      systemWithContext,
      messages,
      contextItems,
      lastUserMessage.content
    );

    // ── Registro de lacuna da base ────────────────────────────────────────────
    // after() é obrigatório aqui: sem ele a função serverless devolve a resposta
    // e congela antes do insert completar — foi exatamente por isso que a v1
    // nunca gravou nada em produção.
    const lacuna = detectarLacuna({
      pergunta: lastUserMessage.content,
      resposta: reply,
      contextItems,
      suggestedArticlesCount: suggestedArticles.length,
    });

    if (lacuna.registrar && process.env.DATABASE_URL) {
      after(async () => {
        try {
          const { logUnansweredQuestion } = await import("@/lib/db/queries");
          await logUnansweredQuestion({
            pergunta: lastUserMessage.content,
            resposta: reply,
            motivo: lacuna.motivo!,
            melhorScore: lacuna.melhorScore,
            contexto: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
            sessionId,
          });
        } catch (err) {
          // Erro engolido em silêncio foi o que escondeu a falha da v1.
          console.error("[chat] falha ao registrar lacuna:", err);
        }
      });
    }

    return NextResponse.json({ reply, suggestedArticles });

  } catch (err) {
    console.error("[chat]", err);
    return NextResponse.json({ error: "Erro ao processar mensagem" }, { status: 500 });
  }
}
