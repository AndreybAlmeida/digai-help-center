import { searchArticles } from "@/data/articles";
import { knowledgeSeed } from "@/data/knowledgeBase";
import { KnowledgeItem } from "@/types/knowledge";
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

// ─── Knowledge base ───────────────────────────────────────────────────────────

async function loadKnowledgeItems(): Promise<KnowledgeItem[]> {
  try {
    const filePath = join(process.cwd(), "public", "knowledge-export.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    if (Array.isArray(data.items)) return data.items as KnowledgeItem[];
  } catch {
    // fallback to seed
  }
  return knowledgeSeed.filter((i) => i.publicado);
}

function findRelevantContext(query: string, items: KnowledgeItem[], limit = 5): KnowledgeItem[] {
  const q = query.toLowerCase();
  const scored = items.map((item) => {
    let score = 0;
    if (item.pergunta.toLowerCase().includes(q)) score += 3;
    if (item.palavrasChave.some((k) => k.toLowerCase().includes(q))) score += 2;
    if (item.resposta.toLowerCase().includes(q)) score += 1;
    const words = q.split(/\s+/).filter((w) => w.length > 2);
    for (const word of words) {
      if (item.pergunta.toLowerCase().includes(word)) score += 1;
      if (item.palavrasChave.some((k) => k.toLowerCase().includes(word))) score += 0.5;
    }
    return { item, score };
  });
  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

function formatContext(items: KnowledgeItem[]): string {
  return items.map((i) => `P: ${i.pergunta}\nR: ${i.resposta}`).join("\n\n---\n\n");
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
- Não substitua o recrutador — reforce que a DigAI potencializa o trabalho humano`;

// ─── Mock fallback ────────────────────────────────────────────────────────────

function generateMockReply(userMessage: string, contextItems: KnowledgeItem[]): string {
  if (contextItems.length > 0) {
    const best = contextItems[0];
    return best.resposta;
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

    const knowledgeItems = await loadKnowledgeItems();
    const contextItems = findRelevantContext(lastUserMessage.content, knowledgeItems);
    const suggestedArticles = searchArticles(lastUserMessage.content).slice(0, 3);

    const systemWithContext = contextItems.length > 0
      ? `${SYSTEM_PROMPT}\n\nCONTEXTO DA BASE DE CONHECIMENTO:\n\n${formatContext(contextItems)}`
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
