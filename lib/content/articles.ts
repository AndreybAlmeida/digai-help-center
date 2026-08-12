import { articles as rawArticles } from "@/data/articles";
import { isCategorySlug, type CategorySlug } from "@/lib/content/categories";
import type { Article, Kind, Level } from "@/lib/content/types";

/**
 * Adapta a fonte de conteúdo existente (`data/articles.ts`) para o modelo da v2.
 * A fonte segue sendo a mesma — aqui só normalizamos os nomes e acrescentamos
 * o que o card novo exige.
 */

const LEVEL_MAP: Record<string, Level> = {
  beginner: "iniciante",
  intermediate: "intermediario",
  advanced: "avancado",
};

/** `kind` do card. O tipo do dado antigo não distingue guia de tutorial. */
const KIND_OVERRIDE: Record<string, Kind> = {
  "como-usar-busca-global-hunting": "guia",
  "job-slot-linkedin": "guia",
  "whatsapp-numero-dedicado": "guia",
  "whatsapp-custos-mensageria": "guia",
  "api-digai-introducao": "tecnico",
  "api-webhooks": "tecnico",
  "api-candidatos": "tecnico",
};

/**
 * Os 3 bullets de "VOCÊ VAI APRENDER". Campo obrigatório do card — cada trio foi
 * extraído das seções do próprio artigo, não inventado. Artigo ausente daqui
 * quebra o build de propósito (ver `assertLearn`), para nenhum card renderizar
 * preview vazio.
 */
const LEARN: Record<string, [string, string, string]> = {
  "como-usar-digai-tutorial-completo": [
    "Conhecer todos os módulos numa demonstração guiada",
    "Acessar a plataforma e fazer o primeiro login",
    "Criar seu primeiro Workspace do zero",
  ],
  "como-criar-workspace": [
    "Criar um Workspace por vaga ou por cliente",
    "Convidar o time e definir permissões",
    "Organizar processos que já existem",
  ],
  "como-compartilhar-entrevistas-candidatos": [
    "Enviar o link por WhatsApp, e-mail ou QR",
    "Acompanhar acessos em tempo real",
    "Reenviar para quem não respondeu",
  ],
  "como-filtrar-avaliar-candidatos": [
    "Usar filtros inteligentes no pipeline",
    "Ler o score e comparar candidatos",
    "Aprovar, reprovar e mover em lote",
  ],
  "como-criar-triagem": [
    "Definir perguntas e critérios de avaliação",
    "Configurar pesos e notas de corte",
    "Publicar e testar antes de enviar",
  ],
  "como-usar-busca-global-hunting": [
    "Buscar candidatos ativos e passivos",
    "Refinar por skill, região e senioridade",
    "Puxar talentos direto para uma vaga",
  ],
  "ativando-integracao-gupy": [
    "Gerar e conectar as credenciais do Gupy",
    "Mapear vagas e etapas do funil",
    "Validar o primeiro sync sem duplicar",
  ],
  "ativando-integracao-greenhouse": [
    "Conectar DigAI e Greenhouse numa visão única",
    "Cumprir os pré-requisitos antes da ativação",
    "Publicar vagas usando Job Slots",
  ],
  "job-slot-linkedin": [
    "Conectar a conta e o Job Slot",
    "Publicar a vaga sem sair da DigAI",
    "Medir candidaturas por canal",
  ],
  "whatsapp-numero-dedicado": [
    "Reunir os pré-requisitos antes da call",
    "Fazer a configuração técnica guiada",
    "Finalizar e validar o número dedicado",
  ],
  "whatsapp-custos-mensageria": [
    "Entender como a Meta cobra a mensageria",
    "Consultar a referência de custos no Brasil",
    "Aplicar boas práticas para reduzir gasto",
  ],
  "api-digai-introducao": [
    "Autenticar e gerar seu primeiro token",
    "Conhecer os recursos principais da API",
    "Receber eventos via webhook",
  ],
  "api-webhooks": [
    "Conhecer os eventos disponíveis",
    "Criar um webhook e ler o payload",
    "Validar a assinatura por segurança",
  ],
  "api-candidatos": [
    "Cadastrar candidatos antes do sign-up",
    "Usar o Partner User ID nas chamadas",
    "Remover dados conforme a LGPD",
  ],

  // ─── Materiais vindos do Drive de conteúdo ──────────────────────────────────
  "boas-praticas-uso-digai": [
    "Escrever uma descrição de vaga que dá contexto à IA",
    "Calibrar perguntas e tentativas por senioridade",
    "Fazer o ajuste fino nos 10 primeiros do ranking",
  ],
  "filtros-digai-priorizar-candidatos": [
    "Ler as flags verde, amarela e vermelha",
    "Usar o filtro de experiência conforme a vaga",
    "Aplicar a ordem de análise da shortlist",
  ],
  "movimentacao-automatica-candidatos": [
    "Definir critérios e calibrar a nota de corte",
    "Estruturar a etapa de destino na sua ATS",
    "Fechar o ciclo com desclassificação e feedback",
  ],
  "status-do-candidato": [
    "Diferenciar Etapa de Status no painel",
    "Saber o que cada status libera e bloqueia",
    "Resolver dúvidas antes de abrir chamado",
  ],
  "whatsapp-numero-dedicado-manual": [
    "Reunir os pré-requisitos antes da call",
    "Entender os custos de mensageria da Meta",
    "Personalizar os textos da IA pela planilha",
  ],
  "escrever-atribuicoes-da-vaga": [
    "Usar o prompt pronto para gerar atribuições",
    "Saber o que entra e o que não entra no campo",
    "Revisar a saída da IA antes de publicar",
  ],
  "movimentar-candidatos-entre-vagas": [
    "Selecionar e movimentar candidatos em lote",
    "Escolher entre mover na triagem ou copiar",
    "Copiar para outra workspace sem retrabalho",
  ],
  "background-check": [
    "Entender o que a verificação cobre e o que não",
    "Ler a coluna Antecedentes no ranking e no card",
    "Aplicar as boas práticas de conformidade",
  ],
  "ia-de-agendamento": [
    "Conectar calendário e videoconferência padrão",
    "Configurar convite automático por subetapa",
    "Ler os status de entrega e os indicadores",
  ],
  "integracao-gupy-tutorial-completo": [
    "Criar a etapa gatilho na Gupy com o nome exato",
    "Ativar a triagem no workspace da DigAI",
    "Resolver as falhas mais comuns da integração",
  ],
  "avaliando-candidatos-gupy": [
    "Identificar a tag DigAI Realizado na lista",
    "Acessar nota e resultado pela aba Timeline",
    "Ler a análise da IA e as respostas por etapa",
  ],
  "templates-de-triagem": [
    "Criar um template com perguntas geradas por IA",
    "Copiar o código único do template",
    "Vincular o código nos Dados Internos da Gupy",
  ],
};

function assertLearn(slug: string): [string, string, string] {
  const bullets = LEARN[slug];
  if (!bullets || bullets.length !== 3 || bullets.some((b) => !b?.trim())) {
    // Falha explícita em build: o preview do card é a assinatura do design e
    // não pode renderizar vazio.
    throw new Error(
      `[content] artigo "${slug}" está sem os 3 bullets obrigatórios de "learn" (lib/content/articles.ts).`
    );
  }
  return bullets;
}

export const ARTICLES: Article[] = rawArticles
  .filter((a) => a.published && isCategorySlug(a.category))
  .map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.summary,
    category: a.category as CategorySlug,
    kind: KIND_OVERRIDE[a.slug] ?? "tutorial",
    level: LEVEL_MAP[a.difficulty] ?? "iniciante",
    minutes: a.readTime ?? 5,
    publishedAt: a.updatedAt,
    learn: assertLearn(a.slug),
    searchTags: [...(a.keywords ?? []), ...(a.tags ?? [])],
  }));

export const getArticlesByCategory = (slug: CategorySlug): Article[] =>
  ARTICLES.filter((a) => a.category === slug);

// A contagem exibida vive em lib/content/counts.ts: ela precisa somar a base de
// conhecimento, que só existe no servidor. Manter um contador aqui, só com
// artigos, foi o que deixou metade das categorias marcada como "0".
