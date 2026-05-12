import type { KnowledgeCategorySlug, KnowledgeItemType, KnowledgeLevel } from "@/types/knowledge";

export interface GeneratedFaq {
  pergunta: string;
  resposta: string;
  categoria: KnowledgeCategorySlug;
  tipo: KnowledgeItemType;
  nivel: KnowledgeLevel;
  palavrasChave: string[];
}

const VALID_CATEGORIES: KnowledgeCategorySlug[] = [
  "primeiros-passos",
  "gestao-de-vagas",
  "triagem-inteligente",
  "hunting",
  "integracoes",
  "relatorios",
  "api-tecnico",
  "faq",
  "entrevista-inteligente",
  "ranking",
  "boas-praticas",
  "posicionamento",
];

const VALID_TIPOS: KnowledgeItemType[] = ["faq", "tutorial", "api", "onboarding", "boas-praticas"];
const VALID_NIVEIS: KnowledgeLevel[] = ["basico", "intermediario", "avancado"];

function normalizeCategory(raw: string): KnowledgeCategorySlug {
  const map: Record<string, KnowledgeCategorySlug> = {
    "primeiros-passos": "primeiros-passos",
    "primeiros passos": "primeiros-passos",
    "gestao-de-vagas": "gestao-de-vagas",
    "gestão de vagas": "gestao-de-vagas",
    "gestao de vagas": "gestao-de-vagas",
    "triagem-inteligente": "triagem-inteligente",
    "triagem inteligente": "triagem-inteligente",
    hunting: "hunting",
    integracoes: "integracoes",
    "integrações": "integracoes",
    integracão: "integracoes",
    relatorios: "relatorios",
    "relatórios": "relatorios",
    "api-tecnico": "api-tecnico",
    "api técnico": "api-tecnico",
    api: "api-tecnico",
    faq: "faq",
    "entrevista-inteligente": "entrevista-inteligente",
    "entrevista inteligente": "entrevista-inteligente",
    ranking: "ranking",
    "boas-praticas": "boas-praticas",
    "boas práticas": "boas-praticas",
    "boas praticas": "boas-praticas",
    posicionamento: "posicionamento",
    outros: "faq",
    other: "faq",
  };
  const normalized = raw.toLowerCase().trim();
  return map[normalized] ?? (VALID_CATEGORIES.includes(normalized as KnowledgeCategorySlug) ? (normalized as KnowledgeCategorySlug) : "faq");
}

function normalizeTipo(raw: string): KnowledgeItemType {
  const map: Record<string, KnowledgeItemType> = {
    faq: "faq",
    FAQ: "faq",
    tutorial: "tutorial",
    Tutorial: "tutorial",
    api: "api",
    API: "api",
    onboarding: "onboarding",
    Onboarding: "onboarding",
    "boas-praticas": "boas-praticas",
    "boas práticas": "boas-praticas",
    "Boas Práticas": "boas-praticas",
  };
  return map[raw] ?? (VALID_TIPOS.includes(raw as KnowledgeItemType) ? (raw as KnowledgeItemType) : "faq");
}

function normalizeNivel(raw: string): KnowledgeLevel {
  const map: Record<string, KnowledgeLevel> = {
    basico: "basico",
    básico: "basico",
    Básico: "basico",
    basic: "basico",
    Básica: "basico",
    intermediario: "intermediario",
    "intermediário": "intermediario",
    Intermediário: "intermediario",
    intermediate: "intermediario",
    avancado: "avancado",
    "avançado": "avancado",
    Avançado: "avancado",
    advanced: "avancado",
  };
  return map[raw] ?? (VALID_NIVEIS.includes(raw as KnowledgeLevel) ? (raw as KnowledgeLevel) : "basico");
}

function parseJson(raw: string): unknown {
  // Try direct parse
  try {
    return JSON.parse(raw);
  } catch {
    // Strip markdown fences
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      // Try extracting JSON array from text
      const match = raw.match(/\[[\s\S]*\]/);
      if (match) return JSON.parse(match[0]);
      throw new Error("Could not parse FAQ JSON response");
    }
  }
}

const SYSTEM_PROMPT = `Você é um especialista em documentação da DigAI, plataforma de recrutamento com IA.
Leia o documento fornecido e extraia entre 3 e 15 pares de Pergunta/Resposta úteis para o FAQ de clientes.

Cada Q&A deve ser autossuficiente (não depender de outros).

Responda APENAS um JSON array, sem markdown fences, no seguinte formato:
[
  {
    "pergunta": "string",
    "resposta": "string em markdown, 2-6 frases",
    "categoria": "um de: primeiros-passos, gestao-de-vagas, triagem-inteligente, hunting, integracoes, relatorios, api-tecnico, faq, entrevista-inteligente, ranking, boas-praticas, posicionamento",
    "tipo": "um de: faq, tutorial, api, onboarding, boas-praticas",
    "nivel": "um de: basico, intermediario, avancado",
    "palavrasChave": ["3 a 6 termos relevantes"]
  }
]`;

export async function generateFaqsFromDocument(
  text: string,
  filename: string
): Promise<GeneratedFaq[]> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is required for FAQ generation");
  }

  // Truncate to ~12k tokens (~48k chars) to stay within context limits
  const truncated = text.slice(0, 48000);

  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Arquivo: ${filename}\n\n${truncated}`,
      },
    ],
  });

  const rawText = message.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("");

  const parsed = parseJson(rawText);
  if (!Array.isArray(parsed)) throw new Error("FAQ response is not an array");

  return (parsed as Record<string, unknown>[])
    .filter((item) => item.pergunta && item.resposta)
    .map((item) => ({
      pergunta: String(item.pergunta),
      resposta: String(item.resposta),
      categoria: normalizeCategory(String(item.categoria ?? "faq")),
      tipo: normalizeTipo(String(item.tipo ?? "faq")),
      nivel: normalizeNivel(String(item.nivel ?? "basico")),
      palavrasChave: Array.isArray(item.palavrasChave)
        ? (item.palavrasChave as unknown[]).map(String).slice(0, 6)
        : [],
    }));
}
