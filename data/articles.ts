import { Article } from "@/types/content";

export const articles: Article[] = [

  // ─── PRIMEIROS PASSOS ────────────────────────────────────────────────────────
  {
    id: "art-01",
    slug: "como-usar-digai-tutorial-completo",
    title: "Como usar a DigAI — Tutorial completo",
    summary: "Tour interativo pela plataforma DigAI. Conheça todos os módulos principais em uma única demonstração guiada.",
    category: "primeiros-passos",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh", "admin", "gestor"],
    keywords: ["tutorial", "visão geral", "plataforma", "demo", "começar"],
    tags: ["onboarding", "tutorial", "completo"],
    readTime: 10,
    priority: 10,
    updatedAt: "2026-03-01",
    relatedContent: ["art-02", "art-03"],
    featured: true,
    published: true,
    sourceUrl: "https://app.getdemo.com.br/s/3e9be4df-054f-466f-8770-8c707b22fdb0",
    content: `
## Como usar a DigAI — Tutorial completo

Este tutorial interativo apresenta uma visão geral completa da plataforma DigAI, cobrindo os principais módulos e funcionalidades.

### O que você vai aprender

- Navegar pela interface da DigAI
- Entender os módulos: Workspaces, Triagens, Hunting, Relatórios
- Configurar seu primeiro processo seletivo
- Usar a IA para acelerar o recrutamento

### Como acessar

Clique no link abaixo para iniciar a demonstração interativa. Avance no seu próprio ritmo e explore cada funcionalidade.

> **Dica:** Tenha o tutorial em uma aba e a plataforma em outra para praticar enquanto aprende.
    `,
  },
  {
    id: "art-02",
    slug: "como-criar-workspace",
    title: "Como criar um Workspace",
    summary: "Aprenda a criar e configurar um Workspace na DigAI para organizar seus processos seletivos por vaga ou cliente.",
    category: "primeiros-passos",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh", "admin"],
    keywords: ["workspace", "criar", "configurar", "organizar"],
    tags: ["workspace", "configuração", "primeiros-passos"],
    readTime: 5,
    priority: 9,
    updatedAt: "2026-03-01",
    relatedContent: ["art-03", "art-01"],
    featured: true,
    published: true,
    sourceUrl: "https://app.getdemo.com.br/d/83ee3563-ebbc-418d-a2b6-3a1d6f902c62",
    content: `
## Como criar um Workspace

O Workspace é a unidade central da DigAI. Cada workspace corresponde a uma vaga, processo seletivo ou cliente.

### O que é um Workspace?

- Agrupa candidatos, triagens e entrevistas de um processo específico
- Permite acompanhar métricas por vaga
- Pode ser compartilhado com gestores e stakeholders

### Passo a passo

1. Acesse o menu **Workspaces** na barra lateral
2. Clique em **+ Adicionar Workspace**
3. Informe o nome da vaga ou processo
4. Configure as etapas de triagem desejadas
5. Salve e comece a receber candidatos

### Boas práticas

- Use nomes descritivos: "Analista de RH Sênior — Mar/2026"
- Configure as perguntas de triagem antes de publicar
- Defina quem terá acesso ao workspace
    `,
  },

  // ─── GESTÃO DE VAGAS ─────────────────────────────────────────────────────────
  {
    id: "art-03",
    slug: "como-compartilhar-entrevistas-candidatos",
    title: "Como compartilhar entrevistas com candidatos",
    summary: "Envie o link de triagem por e-mail, WhatsApp ou link direto e acompanhe em tempo real quem acessou e respondeu.",
    category: "gestao-de-vagas",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh", "gestor"],
    keywords: ["compartilhar", "entrevista", "link", "candidato", "enviar", "whatsapp"],
    tags: ["compartilhar", "candidatos", "link"],
    readTime: 4,
    priority: 8,
    updatedAt: "2026-03-10",
    relatedContent: ["art-04", "art-05"],
    featured: true,
    published: true,
    sourceUrl: "https://app.getdemo.com.br/d/1f48c88d-9cd5-4574-bf77-1ab1057e54fb",
    content: `
## Como compartilhar entrevistas com candidatos

Depois de criar a triagem, você pode convidar candidatos de várias formas.

### Formas de compartilhamento

- **Link direto** — copie e cole em qualquer plataforma
- **E-mail automático** — a DigAI envia por você com template personalizado
- **WhatsApp** — link formatado pronto para envio
- **Job board** — integrado a portais de vagas

### Copiando o link

1. Acesse o Workspace → Triagens
2. Clique nos três pontos da triagem desejada
3. Selecione **Copiar link**
4. Compartilhe com os candidatos

### Monitorando o acesso

Na aba **Candidatos** você vê em tempo real quem recebeu, acessou, iniciou e concluiu a triagem.
    `,
  },
  {
    id: "art-04",
    slug: "como-filtrar-avaliar-candidatos",
    title: "Como filtrar e avaliar candidatos",
    summary: "Use os filtros inteligentes e os critérios de avaliação da DigAI para identificar os melhores perfis rapidamente.",
    category: "gestao-de-vagas",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh", "gestor"],
    keywords: ["filtrar", "avaliar", "candidatos", "nota", "ranking", "IA"],
    tags: ["candidatos", "avaliação", "filtros"],
    readTime: 6,
    priority: 9,
    updatedAt: "2026-03-08",
    relatedContent: ["art-05", "art-03"],
    featured: true,
    published: true,
    sourceUrl: "https://app.getdemo.com.br/d/8901e1bd-10df-41be-98d9-8fc744f97ac3",
    content: `
## Como filtrar e avaliar candidatos

A DigAI gera notas automáticas e permite filtros avançados para encontrar os melhores perfis.

### Avaliação automática por IA

A IA analisa cada resposta e atribui:
- **Nota geral** (0 a 10)
- **Score por critério** (comunicação, aderência, experiência)
- **Resumo automático** da performance

### Filtros disponíveis

- Por nota mínima
- Por palavra-chave nas respostas
- Por data de envio
- Por status (novo, em avaliação, aprovado, reprovado)

### Avaliação manual

- Assistir às respostas em vídeo
- Adicionar sua própria nota
- Deixar comentários para o time
- Avançar ou reprovar com um clique
    `,
  },

  // ─── TRIAGEM INTELIGENTE ─────────────────────────────────────────────────────
  {
    id: "art-05",
    slug: "como-criar-triagem",
    title: "Como criar uma Triagem",
    summary: "Configure entrevistas de triagem automatizadas com IA para avaliar candidatos de forma objetiva e escalável.",
    category: "triagem-inteligente",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh", "gestor"],
    keywords: ["triagem", "entrevista", "IA", "automatizar", "criar"],
    tags: ["triagem", "entrevista", "automação"],
    readTime: 7,
    priority: 10,
    updatedAt: "2026-03-05",
    relatedContent: ["art-04", "art-02"],
    featured: true,
    published: true,
    sourceUrl: "https://app.getdemo.com.br/d/a08ebb27-9309-4b68-b3a4-0d0e68015ed7",
    content: `
## Como criar uma Triagem

A triagem automatizada usa IA para realizar entrevistas com candidatos de forma escalável, 24h por dia.

### Tipos de triagem

- **Por vídeo** — candidato grava respostas em vídeo
- **Por texto** — respostas escritas avaliadas pela IA
- **Mista** — combinação de vídeo e texto

### Passo a passo

1. Acesse o Workspace desejado
2. Clique em **Triagens → Nova triagem**
3. Escolha o tipo
4. Adicione perguntas (a IA sugere baseado na vaga)
5. Configure tempo de resposta e tentativas
6. Ative para começar a receber respostas

### Dicas

- Use entre 3 a 5 perguntas focadas
- Inclua ao menos uma pergunta situacional
- Defina critérios claros antes de criar as perguntas
    `,
  },

  // ─── HUNTING ─────────────────────────────────────────────────────────────────
  {
    id: "art-06",
    slug: "como-usar-busca-global-hunting",
    title: "Como usar a Busca Global — IA de Hunting",
    summary: "Encontre candidatos ativos e passivos em toda a base da DigAI com a busca inteligente de Talent Intelligence.",
    category: "hunting",
    contentType: "tutorial",
    difficulty: "intermediate",
    targetPersona: ["rh"],
    keywords: ["hunting", "busca global", "IA", "candidatos passivos", "sourcing"],
    tags: ["hunting", "busca", "IA"],
    readTime: 8,
    priority: 8,
    updatedAt: "2026-02-20",
    relatedContent: ["art-05", "art-04"],
    featured: true,
    published: true,
    sourceUrl: "https://app.getdemo.com.br/d/1d57e883-9bdf-49eb-bb50-e511c122a364",
    content: `
## Busca Global — IA de Hunting

A IA de Hunting permite encontrar candidatos em toda a base de talentos, mesmo os que não se candidataram à vaga atual.

### Como funciona

A busca cruza perfis com os requisitos da vaga usando **Talent Intelligence**:
- Histórico de triagens anteriores
- Palavras-chave do perfil
- Score de compatibilidade

### Fazendo uma busca

1. Clique em **Buscar** na barra lateral
2. Digite o cargo ou habilidades desejadas
3. Refine com filtros: localização, experiência, disponibilidade
4. Selecione candidatos e adicione ao workspace

### Convidando candidatos

Após identificar um candidato, clique em **Convidar para triagem** para enviar um link personalizado diretamente.
    `,
  },

  // ─── INTEGRAÇÕES ─────────────────────────────────────────────────────────────
  {
    id: "art-07",
    slug: "ativando-integracao-gupy",
    title: "Ativando Integração com Gupy",
    summary: "Conecte a DigAI ao Gupy para importar vagas e candidatos automaticamente, eliminando trabalho duplicado.",
    category: "integracoes",
    contentType: "tutorial",
    difficulty: "intermediate",
    targetPersona: ["admin", "rh"],
    keywords: ["gupy", "integração", "ats", "importar", "conectar"],
    tags: ["integração", "gupy", "ats"],
    readTime: 8,
    priority: 9,
    updatedAt: "2026-03-01",
    relatedContent: ["art-08", "art-09"],
    featured: true,
    published: true,
    sourceUrl: "https://app.getdemo.com.br/d/37dd6e67-fc41-4ee5-8e1e-b3c0d67d2d6c",
    content: `
## Integrando DigAI com Gupy

Sincronize vagas e candidatos automaticamente entre as duas plataformas.

### Pré-requisitos

- Conta ativa no Gupy com permissão de admin
- Acesso de admin na DigAI

### Configuração

1. Acesse **Configurações → Integrações** na DigAI
2. Localize o card **Gupy** e clique em **Conectar**
3. Informe as credenciais de API do Gupy
4. Selecione quais dados sincronizar
5. Salve e aguarde a primeira sincronização

### O que é sincronizado

- Vagas abertas → Workspaces na DigAI
- Candidatos do Gupy → Banco de talentos DigAI
- Status de aprovação → Atualizado em ambas

> Configure webhooks no Gupy para sincronização em tempo real.
    `,
  },
  {
    id: "art-08",
    slug: "ativando-integracao-greenhouse",
    title: "Ativando Integração com Greenhouse",
    summary: "Configure a integração entre DigAI e Greenhouse para unificar seu processo de recrutamento em uma única visão.",
    category: "integracoes",
    contentType: "tutorial",
    difficulty: "intermediate",
    targetPersona: ["admin"],
    keywords: ["greenhouse", "integração", "ats", "conectar"],
    tags: ["integração", "greenhouse", "ats"],
    readTime: 10,
    priority: 8,
    updatedAt: "2026-02-15",
    relatedContent: ["art-07", "art-09"],
    published: true,
    driveUrl: "https://drive.google.com/drive/folders/1Of9lT9NZekIwyrlk88EI4RBdt6AjFDoq?usp=sharing",
    content: `
## Integrando DigAI com Greenhouse

O guia completo está disponível no Google Drive (link acima).

### Resumo

- Sincronização bidirecional de candidatos
- Importação automática de vagas abertas
- Mapeamento de estágios do funil
- Webhooks para atualizações em tempo real

Para dúvidas na configuração, entre em contato com nosso suporte técnico.
    `,
  },
  {
    id: "art-09",
    slug: "job-slot-linkedin",
    title: "Job Slot — Publicar vagas no LinkedIn",
    summary: "Configure e ative Job Slots no LinkedIn para publicar vagas da DigAI diretamente na maior rede profissional.",
    category: "integracoes",
    contentType: "tutorial",
    difficulty: "intermediate",
    targetPersona: ["rh", "admin"],
    keywords: ["linkedin", "job slot", "publicar vaga", "rede profissional"],
    tags: ["linkedin", "vagas", "publicação"],
    readTime: 8,
    priority: 8,
    updatedAt: "2026-03-05",
    relatedContent: ["art-07", "art-08"],
    published: true,
    sourceUrl: "https://docs.google.com/document/d/12E5KzB4KInRXGUKDeSMV6_RyfH2MnBeSXxZc6LqHPUI/edit?usp=sharing",
    content: `
## Job Slot — LinkedIn

Configure Job Slots para publicar vagas da DigAI diretamente no LinkedIn.

### O que são Job Slots?

Vagas de publicação no LinkedIn que colocam suas oportunidades em destaque.

### Benefícios

- Alcance de mais de 900 milhões de profissionais
- Candidaturas diretas integradas à DigAI
- Analytics de performance das vagas

### Pré-requisitos

- Página de empresa ativa no LinkedIn
- Contrato de Job Slots com o LinkedIn
- Permissão de admin na DigAI

Consulte o documento vinculado para o passo a passo completo.
    `,
  },
  {
    id: "art-10",
    slug: "whatsapp-numero-dedicado",
    title: "WhatsApp Business — Número dedicado e personalizado",
    summary: "Configure um número WhatsApp Business dedicado para a DigAI em 3 fases: pré-requisitos, configuração técnica e finalização.",
    category: "integracoes",
    contentType: "article",
    difficulty: "intermediate",
    targetPersona: ["admin"],
    keywords: ["whatsapp", "número dedicado", "whatsapp business", "meta", "api"],
    tags: ["whatsapp", "integração", "configuração"],
    readTime: 12,
    priority: 7,
    updatedAt: "2026-03-01",
    relatedContent: ["art-11", "art-07"],
    published: true,
    content: `
## WhatsApp Business — Número dedicado e personalizado

Configure um número WhatsApp Business dedicado integrado à DigAI em 3 fases.

### Fase 1 — Pré-requisitos (antes da call)

Esses itens precisam estar prontos antes de qualquer configuração:

- **Login administrador do Facebook Business Manager** — acesso total à conta
- **Número dedicado** (móvel ou fixo) — nunca pode ter tido WhatsApp anteriormente
- **Termos de Serviço** da empresa — página pública e ativa
- **Política de Privacidade** — página pública e ativa (obrigatório para aprovação da Meta)
- **Logo e nome do perfil** — logo em boa resolução

### Fase 2 — Configuração técnica (call guiada)

Durante a call realizada com o time DigAI:
- Vincular o número ao Facebook Business
- Criar e validar a conta WhatsApp Business
- Configurar perfil, identidade e permissões
- Integrar o número à DigAI
- Garantir compliance e aprovação da Meta

### Fase 3 — Finalização

Após a configuração:
- Número ativo e operacional
- Pronto para automações, IA e uso produtivo

> Para agendar a call: [calendar.app.google/JuqPzsoeE4SRsBsV6](https://calendar.app.google/JuqPzsoeE4SRsBsV6)
    `,
  },
  {
    id: "art-11",
    slug: "whatsapp-custos-mensageria",
    title: "Custos de mensageria WhatsApp (Meta)",
    summary: "Entenda como funcionam os custos oficiais da Meta ao usar o WhatsApp Business API integrado à DigAI.",
    category: "integracoes",
    contentType: "article",
    difficulty: "intermediate",
    targetPersona: ["admin", "gestor"],
    keywords: ["whatsapp", "custos", "meta", "mensageria", "cobrança"],
    tags: ["whatsapp", "custos", "financeiro"],
    readTime: 6,
    priority: 6,
    updatedAt: "2026-03-01",
    relatedContent: ["art-10"],
    published: true,
    content: `
## Custos de mensageria WhatsApp (Meta)

Ao usar o WhatsApp Business API, a empresa opera dentro das políticas oficiais da Meta.

> "Todos os custos de envio de mensagens ativas passam a ser de responsabilidade direta da contratante. A DigAI não realiza qualquer markup sobre esses valores."

### Referência de custos no Brasil

| Tipo | Custo médio |
|------|-------------|
| Mensagens de recrutamento/utilidade | R$ 0,03 – R$ 0,07 por conversa |
| Mensagens de marketing | R$ 0,15 – R$ 0,40 por conversa |
| Mensagens de serviço (resposta em 24h) | Gratuitas |

A cobrança é por conversa, não por mensagem individual. Cada conversa tem janela de 24 horas.

### Boas práticas

- Definir limites de disparo por vaga ou campanha
- Monitorar volume de conversas iniciadas
- Acompanhar custo por contratação (ROI)
    `,
  },

  // ─── API & TÉCNICO ────────────────────────────────────────────────────────────
  {
    id: "art-12",
    slug: "api-digai-introducao",
    title: "DigAI API — Introdução",
    summary: "A API REST da DigAI segue a especificação OpenAPI 3. Acesse triagens, workspaces, candidatos e resultados via código.",
    category: "api-tecnico",
    contentType: "article",
    difficulty: "advanced",
    targetPersona: ["admin"],
    keywords: ["api", "rest", "openapi", "integração", "developer", "técnico"],
    tags: ["api", "técnico", "desenvolvedor"],
    readTime: 10,
    priority: 8,
    updatedAt: "2026-03-01",
    relatedContent: ["art-13", "art-14"],
    featured: true,
    published: true,
    sourceUrl: "https://digai.readme.io/reference/introduction",
    content: `
## DigAI API — Introdução

A API da DigAI fornece acesso programático para gerenciar triagens, workspaces e candidatos via endpoints REST com especificação OpenAPI 3.

### Autenticação

Todos os endpoints requerem autenticação via Bearer Token:

\`\`\`
Authorization: Bearer {seu_token}
\`\`\`

Gere seu token em **Configurações → Desenvolvedor → API Keys**.

### Recursos principais

| Recurso | Descrição |
|---------|-----------|
| Screenings | Criar, atualizar e deletar triagens |
| Workspaces | Recuperar workspaces ativos |
| Results | Resultados de candidatos por triagem |
| Questions | Perguntas geradas por IA |
| Candidates | Cadastrar e listar candidatos |
| Webhooks | Eventos em tempo real |

### Documentação completa

Acesse [digai.readme.io/reference/introduction](https://digai.readme.io/reference/introduction) para a referência completa da API.
    `,
  },
  {
    id: "art-13",
    slug: "api-webhooks",
    title: "Webhooks — Eventos em tempo real",
    summary: "Configure webhooks para receber notificações automáticas quando candidatos se inscrevem, respondem ou são aprovados.",
    category: "api-tecnico",
    contentType: "article",
    difficulty: "advanced",
    targetPersona: ["admin"],
    keywords: ["webhook", "eventos", "tempo real", "api", "notificação"],
    tags: ["webhook", "api", "técnico"],
    readTime: 8,
    priority: 7,
    updatedAt: "2026-03-01",
    relatedContent: ["art-12"],
    published: true,
    content: `
## Webhooks — Eventos em tempo real

Configure webhooks para integrar a DigAI com seus sistemas via eventos HTTP.

### Eventos disponíveis

- **New Application** — novo candidato se inscreveu
- **New Approval** — candidato aprovado na triagem

### Criando um webhook

1. Acesse **Configurações → Desenvolvedor → Webhooks**
2. Clique em **+ Novo webhook**
3. Informe a URL do seu endpoint
4. Selecione os eventos desejados
5. Salve e teste o endpoint

### Payload de exemplo (New Application)

\`\`\`json
{
  "event": "new_application",
  "screening_id": "scr_xxx",
  "candidate_email": "joao@empresa.com",
  "workspace_id": "ws_xxx",
  "timestamp": "2026-03-01T10:30:00Z"
}
\`\`\`

### Segurança

Valide o payload usando o header \`X-DigAI-Signature\` enviado em cada requisição.
    `,
  },
  {
    id: "art-14",
    slug: "api-candidatos",
    title: "API de Candidatos — Cadastro e listagem",
    summary: "Use a API para cadastrar candidatos antes do sign-up, listar candidatos por triagem e gerar links personalizados.",
    category: "api-tecnico",
    contentType: "article",
    difficulty: "advanced",
    targetPersona: ["admin"],
    keywords: ["api", "candidatos", "cadastrar", "listar", "partner user id"],
    tags: ["api", "candidatos", "técnico"],
    readTime: 7,
    priority: 6,
    updatedAt: "2026-03-01",
    relatedContent: ["art-12", "art-13"],
    published: true,
    content: `
## API de Candidatos

Use a API para gerenciar candidatos programaticamente.

### Endpoints principais

**Cadastrar candidato (pré-sign-up)**
\`\`\`
POST /v1/candidates
\`\`\`

**Listar candidatos**
\`\`\`
GET /v1/candidates?screening_id={id}
\`\`\`

**Gerar link WhatsApp com Partner User ID**
\`\`\`
POST /v1/candidates/{id}/whatsapp-link
\`\`\`

### Partner User ID

O Partner User ID permite rastrear candidatos originados de sistemas externos (ex: ATS parceiro). Passe o parâmetro \`partner_user_id\` ao criar o candidato para rastreamento completo.

### LGPD — Remoção de dados

\`\`\`
DELETE /v1/candidates/{id}/data
\`\`\`

Remove todos os dados pessoais em conformidade com a LGPD.
    `,
  },
];

// ─── Utilitários ─────────────────────────────────────────────────────────────

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug && a.published);

export const getArticleById = (id: string): Article | undefined =>
  articles.find((a) => a.id === id && a.published);

export const getArticlesByCategory = (category: string): Article[] =>
  articles.filter((a) => a.category === category && a.published);

export const getFeaturedArticles = (): Article[] =>
  articles
    .filter((a) => a.featured && a.published)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6);

export const getRecentArticles = (limit = 6): Article[] =>
  articles
    .filter((a) => a.published)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);

export const searchArticles = (query: string): Article[] => {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.published &&
      (a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)) ||
        a.tags.some((t) => t.toLowerCase().includes(q)))
  );
};
