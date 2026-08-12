import type { ContextItem } from "@/lib/search/hybridSearch";

/**
 * Decide se uma interação com a ANA deve virar registro de lacuna na base.
 *
 * A v1 gravava quando a busca não retornava contexto — o que quase nunca
 * acontece, porque a busca lexical pontua qualquer palavra com mais de 2 letras
 * presente em qualquer item. Na prática ela capturava saudação e ignorava
 * pergunta real: "Qual a capital da Mongólia?" casava com 23 itens.
 *
 * O sinal confiável é a própria ANA admitindo que não sabe — o system prompt
 * manda ela responder exatamente isso quando falta informação.
 */

/** Frases de desistência. A primeira é a que o system prompt determina. */
const DESISTENCIA = [
  /não encontrei informa(ç|c)(ã|a)o suficiente/i,
  /não tenho (essa )?informa(ç|c)(ã|a)o/i,
  /não (consigo|posso) (responder|ajudar) (com )?(isso|essa)/i,
  /não (sei|tenho como saber)/i,
  /entre em contato com (o |nosso )?suporte/i,
];

/** Saudação, agradecimento e afins — não são lacuna de conteúdo. */
const CORTESIA =
  /^(oi|ol[áa]|e a[íi]|bom dia|boa tarde|boa noite|tudo (bem|bom)|obrigad[oa]|valeu|vlw|blz|beleza|ok(ay)?|certo|entendi|tchau|at[ée] mais|test(e|ando)?)\b/i;

export type MotivoLacuna = "ana_desistiu" | "sem_contexto";

export interface DeteccaoLacuna {
  registrar: boolean;
  motivo?: MotivoLacuna;
  melhorScore: number;
}

/** Ruído não vira registro: encheria o painel e esconderia o que importa. */
export function isRuido(pergunta: string): boolean {
  const t = (pergunta ?? "").trim();
  if (t.length < 8) return true;
  if (CORTESIA.test(t)) return true;

  const palavras = t.split(/\s+/).filter(Boolean);
  // Uma palavra solta sem interrogação é quase sempre teclado aleatório.
  if (palavras.length < 3 && !t.includes("?")) return true;

  return false;
}

export function detectarLacuna(params: {
  pergunta: string;
  resposta: string;
  contextItems: ContextItem[];
  suggestedArticlesCount: number;
}): DeteccaoLacuna {
  const { pergunta, resposta, contextItems, suggestedArticlesCount } = params;
  const melhorScore = contextItems.length;

  if (isRuido(pergunta)) return { registrar: false, melhorScore };

  // Sinal forte: a ANA disse que não sabe, independente do que a busca achou.
  if (DESISTENCIA.some((re) => re.test(resposta ?? ""))) {
    return { registrar: true, motivo: "ana_desistiu", melhorScore };
  }

  // Sinal fraco, mantido da v1: nada foi encontrado em lugar nenhum.
  if (contextItems.length === 0 && suggestedArticlesCount === 0) {
    return { registrar: true, motivo: "sem_contexto", melhorScore };
  }

  return { registrar: false, melhorScore };
}
