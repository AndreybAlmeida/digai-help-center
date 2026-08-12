/**
 * MÓDULO SERVIDOR. Liga um artigo ao PDF de origem que foi enviado pelo painel
 * de documentos, para a página oferecer o download.
 *
 * O vínculo é resolvido em runtime pelo nome do arquivo, e não gravado no
 * artigo: assim, no momento em que o PDF é enviado por /admin/documentos, o
 * botão aparece sozinho — sem precisar de deploy para cada material.
 */

/** slug do artigo → nome do arquivo de origem, como está no Drive. */
export const ARTIGO_PDF: Record<string, string> = {
  "boas-praticas-uso-digai": "boas-praticas-digai.pdf",
  "filtros-digai-priorizar-candidatos": "Filtros na DigAI - Tutorial de Boas Práticas.pdf",
  "movimentacao-automatica-candidatos": "movimentacao-automatica-digai.pdf",
  "status-do-candidato": "Guia_Status_Candidato_DigAI (1).pdf",
  "whatsapp-numero-dedicado-manual": "manual_numero_personalizado_digai.pdf",
  "escrever-atribuicoes-da-vaga": "DigAI_Guia_Atribuicoes_de_Cargo.pdf",
  "movimentar-candidatos-entre-vagas": "Como movimentar candidatos entre vagas - DigAÍ.pdf",
  "background-check": "DigAI_Background_Check.pdf",
  "ia-de-agendamento": "DigAI - Guia IA de agendamento.pdf",
  "integracao-gupy-tutorial-completo": "Tutorial_Integracao_Gupy_DigAI_Documento.pdf",
  "avaliando-candidatos-gupy": "Avaliando_Candidatos_DigAI_Gupy.pdf",
  "templates-de-triagem": "Usando_Templates_DigAI_Gupy.pdf",
  "integracao-pandape": "Tutorial_Integracao_Pandape_DigAI.pdf",
  "social-recruiting-anuncios": "DigAI - Boas práticas de copy no Social Recruiting .pdf",
};

/** Normaliza para casar apesar de espaço duplo, "(1)" e diferença de acento. */
function chave(nome: string): string {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s*\(\d+\)\s*/g, " ")
    .replace(/[^a-z0-9]+/g, "");
}

export async function getPdfUrl(slug: string): Promise<string | null> {
  const alvo = ARTIGO_PDF[slug];
  if (!alvo || !process.env.DATABASE_URL) return null;

  try {
    const { getPool } = await import("@/lib/db/client");
    const { rows } = await getPool().query(
      `SELECT filename, blob_url FROM documents WHERE status = 'concluido'`
    );
    const k = chave(alvo);
    const achado = rows.find((r: { filename: string }) => chave(r.filename) === k);
    return achado?.blob_url ?? null;
  } catch {
    // Sem banco ou sem o documento: a página simplesmente não mostra o botão.
    return null;
  }
}
