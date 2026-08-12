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
    published: false,
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
  {
    id: "art-15",
    slug: "boas-praticas-uso-digai",
    title: "Guia de Boas Práticas para uso da DigAI",
    summary: "As 6 práticas que aumentam a assertividade da triagem: descrição da vaga, curadoria das perguntas, critérios, volume, tentativas e calibração do ranking.",
    category: "boas-praticas",
    contentType: "article",
    difficulty: "beginner",
    targetPersona: ["rh"],
    keywords: ["boas práticas", "descrição da vaga", "critérios", "tentativas", "calibração", "ranking"],
    tags: ["boas práticas", "triagem", "qualidade"],
    readTime: 8,
    priority: 1,
    updatedAt: "2026-08-12",
    relatedContent: ["art-05", "art-16"],
    published: true,
    content: `
## Boas práticas para uso da DigAI

A qualidade da resposta da IA depende diretamente da qualidade da informação inserida na plataforma. Este guia reúne seis práticas que aumentam a assertividade do processo.

### 1. Capriche na descrição da vaga

É o campo mais importante da DigAI. É a partir dele que a IA entende o contexto da posição, sugere perguntas, propõe critérios e estrutura a triagem.

Uma boa descrição traz responsabilidades, requisitos técnicos obrigatórios e desejáveis, nível de experiência esperado, principais desafios, soft skills, perfil comportamental, cultura da empresa, contexto da área, expectativas do gestor e os pontos que diferenciam um bom candidato de um candidato médio.

> **Regra simples:** se a informação foi discutida no alinhamento com o gestor, ela deve estar na descrição da vaga.

### 2. Faça curadoria das perguntas sugeridas

A IA sugere perguntas seguindo entrevista por competência com métodos estruturados, como o STAR. O recrutador valida. Avalie se cada pergunta está alinhada à necessidade da vaga, se está clara, se não é genérica ou repetitiva, e se avalia uma competência realmente importante.

### 3. Revise os critérios de avaliação

O critério é a régua: ele indica o que a IA vai observar nas respostas.

| | Exemplo |
|---|---|
| Ruim | "Avaliar comunicação." |
| Melhor | "Avaliar se o candidato consegue explicar experiências anteriores com clareza, objetividade e capacidade de estruturar raciocínio diante de situações complexas." |

### 4. Calibre a quantidade de perguntas

| Perfil da vaga | Principais | Adicionais |
|---|---|---|
| Operacional e cargos de entrada | 3 a 5 | até 2 |
| Middle level e gestão tática | 3 a 6 | até 3 |
| Gestão, sênior e especialista | 3 a 6 | até 3 |
| Técnicas e tecnologia (pleno e sênior) | 3 a 6 | até 4 |

As adicionais podem ser feitas até 2 vezes por pergunta principal. **Perguntas em demasia derrubam a adesão** — você troca profundidade por candidatos que não concluem.

### 5. Ajuste a quantidade de tentativas

| Perfil da vaga | Tentativas | O que a régua comunica |
|---|---|---|
| Operacional e cargos de entrada | 2 a 3 | Espaço para o nervosismo |
| Middle level e gestão tática | 2 | Equilíbrio entre chance e objetividade |
| Gestão estratégica, sênior e especialista | 1 | Assertividade é parte da avaliação |

Tentativa não é complacência, é equidade: você dá ao candidato a mesma margem que daria numa entrevista presencial para aquele nível.

### 6. Faça o ajuste fino no início do ranking

A cada 10 candidatos iniciais, avalie se as notas estão coerentes. Os mais fortes estão bem avaliados? Os fracos estão recebendo notas menores? Algum critério pesa demais ou é pouco relevante? Critérios, perguntas e tentativas são ajustáveis a qualquer momento.

### As 4 rotinas que precisam virar hábito

1. Criar uma descrição de vaga robusta
2. Fazer curadoria das perguntas e critérios
3. Dimensionar perguntas e tentativas pela senioridade
4. Calibrar os primeiros candidatos do ranking

A DigAI não substitui o critério do recrutador. Ela potencializa.
    `,
  },
  {
    id: "art-16",
    slug: "filtros-digai-priorizar-candidatos",
    title: "Filtros na DigAI — como priorizar candidatos",
    summary: "Os três filtros da plataforma, o que cada flag significa e em que ordem analisar para montar a shortlist.",
    category: "boas-praticas",
    contentType: "article",
    difficulty: "beginner",
    targetPersona: ["rh"],
    keywords: ["filtros", "pré-requisitos", "experiência", "provável leitura", "shortlist", "flags"],
    tags: ["boas práticas", "filtros", "triagem"],
    readTime: 5,
    priority: 2,
    updatedAt: "2026-08-12",
    relatedContent: ["art-15", "art-04"],
    published: true,
    content: `
## Filtros na DigAI

Os filtros existem para ajudar o recrutador a encontrar, com mais velocidade, os candidatos com maior aderência à vaga — sem nunca substituir a análise humana.

### 1. Filtro de pré-requisitos

Mostra o quanto o candidato atende aos requisitos definidos para a vaga.

| Flag | Significado | Leitura |
|---|---|---|
| Verde | Atende todos os pré-requisitos | É prioridade |
| Amarelo | Atende parcialmente | Pode ser oportunidade |
| Vermelho | Não atende | Tende a não seguir |

**Pode flexibilizar:** a vaga exige experiência em um sistema específico, mas o candidato já trabalhou com ferramentas semelhantes.

**Não flexibilizar:** requisito legal, regulatório ou operacionalmente indispensável — certificação obrigatória, registro profissional, disponibilidade real de horário.

> O erro mais comum é tratar todos os pré-requisitos com o mesmo peso.

### 2. Filtro de experiência

Classifica a leitura da IA sobre o nível de experiência entre baixa, média e alta.

Para vagas plenas, seniores e especialistas, comece pelos de alta experiência. Para vagas de entrada, estágio e jovem aprendiz, o filtro funciona como leitura de aderência — e baixa experiência **não** deve ser interpretada automaticamente como ponto negativo.

Nessas vagas, observe outros sinais: interesse pela oportunidade, clareza nas respostas, comunicação, disponibilidade, aderência comportamental, motivação, trajetória acadêmica e experiências informais ou projetos.

### 3. Filtro de provável leitura

Indica se há sinal de que o candidato leu ou preparou excessivamente a resposta. A DigAI foi desenhada para capturar respostas espontâneas: quando a resposta perde espontaneidade, a entrevista deixa de medir com precisão comunicação, raciocínio e repertório profissional.

Flag vermelha significa alto grau de provável leitura — a recomendação é não seguir com o candidato.

### A ordem de análise na prática

1. Comece pelos candidatos **verdes** em pré-requisitos
2. Priorize por **maior experiência** ou aderência
3. **Elimine** os candidatos com provável leitura em vermelho
4. Se a shortlist estiver pequena, avalie os **amarelos** — apenas com flexibilização real
    `,
  },
  {
    id: "art-17",
    slug: "movimentacao-automatica-candidatos",
    title: "Movimentação automática de candidatos",
    summary: "Avance candidatos em lote por critérios, nota de corte ou os dois combinados — no Pipeline DigAI ou integrado à sua ATS.",
    category: "gestao-de-vagas",
    contentType: "tutorial",
    difficulty: "intermediate",
    targetPersona: ["rh", "admin"],
    keywords: ["movimentação automática", "nota de corte", "critérios", "ATS", "pipeline", "automação"],
    tags: ["automação", "pipeline", "ats"],
    readTime: 8,
    priority: 2,
    updatedAt: "2026-08-12",
    relatedContent: ["art-18", "art-04"],
    published: true,
    content: `
## Movimentação automática de candidatos

Uma única ação move todos os candidatos que atendem aos parâmetros definidos — por critérios, por pontuação, ou por ambos.

### Os dois cenários

**Dentro do Pipeline DigAI** — mais flexibilidade: você move para a próxima etapa ou para outras etapas do fluxo, e pode encadear automações no mesmo movimento (agendamento automático por IA, coleta de documentos).

**Integrado à sua ATS** — a DigAI sempre avança o candidato para a próxima etapa configurada. Funciona com Gupy, Greenhouse, SuccessFactors, PandaPé e Inhire.

### Antes de automatizar

Automação sem régua é volume sem qualidade. Dois elementos precisam estar definidos:

1. **Critérios de seleção** — leitura provável (detectada / não detectada) e experiência (baixa / média / alta)
2. **Nota de corte** — a régua de pontuação que define quem avança

### Como escolher a nota de corte

| Cenário da vaga | Nota | Efeito no funil |
|---|---|---|
| Vaga crítica ou de difícil preenchimento | 4 | Funil mais largo |
| Operação em regime normal | 5 | Equilíbrio entre volume e qualidade |
| Alto volume de candidaturas | 6 – 7 | Funil enxuto, alta aderência |

Um comparativo real: mesma vaga, mesmos critérios. Com nota 6, **6 candidatos** atendiam a 100% dos parâmetros. Baixando para 5, o número subiu para **11** — uma ampliação de 83% com um único ponto.

### Onde acionar

Na etapa **Triagem com IA**, clique em **Movimentação com base em critérios** — o botão fica ao lado do Assistente IA, acima da lista de candidatos ranqueados.

1. Abrir o painel (modal "Mover para próxima etapa")
2. Definir critérios
3. Definir a nota de corte — o contador atualiza na hora
4. Confirmar

> **Dica:** marque "Salvar aprovação automática com base nestes critérios" para que novos candidatos que atenderem aos parâmetros avancem sozinhos.

### Como estruturar as etapas na sua ATS

Crie uma etapa dedicada logo após a Entrevista Inteligente:

**Entrevista Inteligente → Buffer / Análise → Avaliação humana → Contratação**

Nomeie como fizer sentido na sua operação e configure-a preferencialmente sem visibilidade para o candidato — é um estágio operacional interno.

> **Regra de ouro:** automatizou? Garanta que exista, logo depois, uma etapa clara onde esses candidatos serão avaliados.

### Checklist antes de ativar

- Critérios definidos refletindo os pré-requisitos reais da vaga
- Nota de corte calibrada por perfil, volume e SLA
- Contador conferido — o número faz sentido para a sua capacidade de avaliação
- Etapa de destino criada
- Fluxo de feedback definido para quem não avançou
    `,
  },
  {
    id: "art-18",
    slug: "status-do-candidato",
    title: "Status do candidato: o que fazer em cada um",
    summary: "Pendente, Em andamento e Concluído — o que cada status libera, o que bloqueia e por que a nota só existe no final.",
    category: "gestao-de-vagas",
    contentType: "article",
    difficulty: "beginner",
    targetPersona: ["rh"],
    keywords: ["status", "pendente", "em andamento", "concluído", "nota", "etapa"],
    tags: ["pipeline", "status", "operação"],
    readTime: 6,
    priority: 1,
    updatedAt: "2026-08-12",
    relatedContent: ["art-17", "art-04"],
    published: true,
    content: `
## Status do candidato

Antes de tudo: **Etapa** e **Status** são informações diferentes, em colunas diferentes.

- **Etapa** — onde o candidato está no processo: Convidados, Triagem com IA, Em avaliação, Contratação (ou Desclassificados)
- **Status** — a situação da tarefa que ele precisa cumprir: Pendente, Em andamento, Concluído

Pense num prédio: a etapa diz em qual sala ele está; o status diz se ele já terminou o que precisava fazer ali. Os três status valem para **todas** as etapas.

### Os três status, lado a lado

| Status | Significa | Tem nota e ranking? | Posso mover? | De quem é a bola? |
|---|---|---|---|---|
| Pendente | Recebeu o convite, não começou | Não | Não | Candidato |
| Em andamento | Está respondendo ou parou no meio | Não | Não | Candidato |
| Concluído | Terminou a entrevista 100% | Sim | Sim | Você / RH |

### Por que a nota só existe em Concluído

A IA avalia a entrevista completa: precisa de todas as respostas para comparar o candidato com o que a vaga pede, gerar o score e posicioná-lo no ranking. Uma entrevista pela metade não gera nota pela metade — é o mesmo motivo pelo qual uma prova só é corrigida depois de entregue.

### Pendente

O convite foi enviado por WhatsApp e/ou e-mail, mas o candidato ainda não abriu o link. **Pendente não é erro, é espera.**

**Você pode:** aguardar, reenviar o convite, cobrar pelo WhatsApp, conferir telefone e e-mail no cadastro (dado errado é a causa nº 1 de Pendente parado) e abrir o Histórico para ver quando o convite saiu.

### Em andamento

O candidato iniciou a entrevista e já respondeu uma ou mais perguntas, mas não finalizou. Não existe nota parcial nem percentual de conclusão, e a movimentação fica bloqueada **de propósito** — é uma proteção da qualidade da seleção.

Siga trabalhando os candidatos Concluídos em paralelo; não pare a vaga por causa dele.

### Concluído

Agora você tem nota, posição no ranking, resumo com evidências e liberdade total de movimentação.

**Você não pode:** refazer a entrevista pelo painel (fale com o seu CS), editar a nota da IA (é evidência auditável, não opinião), nem decidir apenas pela nota — ela organiza a fila, a decisão final é humana.

> Concluído se refere à **tarefa**, não ao processo seletivo. É o começo do seu trabalho, não o fim.

### Quando chamar a DigAI

- O convite não consta no Histórico do candidato
- O candidato afirma que finalizou e o status segue Em andamento
- Um candidato Concluído está sem nota

Nesses casos, envie nome, CPF e vaga para o seu Customer Success.
    `,
  },
  {
    id: "art-19",
    slug: "whatsapp-numero-dedicado-manual",
    title: "Manual do número de WhatsApp dedicado",
    summary: "As 3 fases da configuração do WhatsApp Business API, os custos oficiais da Meta e como personalizar os textos da IA.",
    category: "integracoes",
    contentType: "article",
    difficulty: "intermediate",
    targetPersona: ["admin"],
    keywords: ["whatsapp", "número dedicado", "meta", "business manager", "custos", "mensageria"],
    tags: ["whatsapp", "integração", "configuração"],
    readTime: 6,
    priority: 3,
    updatedAt: "2026-08-12",
    relatedContent: ["art-10", "art-11"],
    published: true,
    content: `
## Número de WhatsApp dedicado e personalizado

Como configurar a conta WhatsApp Business com número dedicado, integrada à DigAI. Todo o preenchimento é feito pelo painel da DigAI.

### Fase 1 — Pré-requisitos (antes da call)

- **Login administrador do Facebook Business Manager**, com acesso total à conta que vai vincular o WhatsApp
- **Número dedicado** (móvel ou fixo) que **nunca** pode ter tido WhatsApp ou WhatsApp Business antes
- **Termos de Serviço** da empresa em página pública e ativa
- **Política de Privacidade** em página pública e ativa — obrigatória para a aprovação do WhatsApp
- **Logo** em boa resolução e o nome exatamente como a marca opera

### Fase 2 — Configuração técnica (call guiada)

Com os itens validados, o time DigAI conduz a call para validar a conta WhatsApp Business, configurar perfil, identidade e permissões, integrar o número à DigAI e garantir compliance e aprovação da Meta.

### Fase 3 — Finalização

O número fica ativo e operacional, pronto para automações e IA, sem risco de bloqueio ou retrabalho.

### Custos de mensageria

Com o WhatsApp Business API, a empresa passa a operar dentro das políticas oficiais da Meta e os custos de mensagens ativas passam a ser responsabilidade direta da contratante. **A DigAI não aplica markup.**

| Tipo de conversa | Valor de referência (BR) |
|---|---|
| Recrutamento / utilidade | ~ R$ 0,03 a R$ 0,07 por conversa |
| Marketing (início ativo pela empresa) | ~ R$ 0,15 a R$ 0,40 por conversa |
| Serviço (resposta em até 24h) | Gratuita na janela de atendimento |

A cobrança é **por conversa iniciada**, não por mensagem individual, e cada conversa tem janela de 24 horas.

**Boas práticas:** definir limites de disparo por vaga ou campanha, monitorar o volume de conversas iniciadas e acompanhar o custo por contratação.

### Personalização dos textos da IA

Todo conteúdo variável — identificado entre colchetes — é fixo e não pode ser modificado. Apenas os textos fora dos colchetes são editáveis.

1. Baixe a planilha de referência
2. Altere apenas os textos permitidos
3. Envie a planilha completa para o time DigAI

**SLA de personalização:** 10 dias após o recebimento da planilha.
    `,
  },
  {
    id: "art-20",
    slug: "escrever-atribuicoes-da-vaga",
    title: "Como escrever as atribuições de uma vaga",
    summary: "Um prompt pronto para gerar responsabilidades, hard skills e soft skills de qualquer cargo em segundos — e alimentar a triagem com a informação certa.",
    category: "gestao-de-vagas",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh", "gestor"],
    keywords: ["atribuições", "descrição de vaga", "prompt", "hard skills", "soft skills", "cadastro de vagas"],
    tags: ["vagas", "boas práticas", "prompt"],
    readTime: 6,
    priority: 2,
    updatedAt: "2026-08-12",
    relatedContent: ["art-15", "art-02"],
    published: true,
    content: `
## Como escrever as atribuições de uma vaga

O que você escreve no campo de atribuições não fica só na descrição pública: é a partir dele que a IA entende o que a posição exige e conduz a entrevista.

- **Orienta a entrevista da IA** — responsabilidades e competências viram a matéria-prima dos critérios de avaliação
- **Alinha recrutador e gestor** — escrever antes de abrir a vaga força a conversa sobre o dia a dia real
- **Melhora a autosseleção** — candidatos que entendem o escopo se candidatam com mais consciência
- **Acelera a abertura** — com um prompt padronizado, o time revisa em vez de redigir do zero

> **Regra de ouro:** entrada genérica gera critério genérico.

### O que o prompt entrega — e o que não entrega

| Entrega | Não entrega |
|---|---|
| 8 a 12 atribuições, com verbos no infinitivo | Benefícios, salário ou faixa de remuneração |
| 5 a 10 hard skills técnicas | Modelo de trabalho (presencial, híbrido, remoto) |
| 5 a 8 soft skills comportamentais | Escolaridade, certificações ou tempo de experiência |
| Descrição ampla e reutilizável entre vagas | Requisitos eliminatórios ou critérios de corte |

Misturar tudo no mesmo campo polui a leitura da IA e da pessoa candidata. As atribuições devem falar apenas de **atividade e competência**.

### Como usar em quatro passos

1. **Cole o prompt no assistente** — ele define papel, regras e formato de saída
2. **Informe apenas o nome do cargo** — "Analista Financeiro", "Coordenador de Logística"
3. **Revise e ajuste ao seu contexto** — remova o que não se aplica, acrescente o que faltou
4. **Reaproveite a mesma conversa** — para a próxima vaga, basta digitar o novo cargo

### O prompt

**Papel.** Você é um especialista em Recursos Humanos, desenho de cargos e recrutamento. Sua função é ajudar recrutadores e gestores a preencher a seção de atribuições do cargo quando eles informarem apenas o nome da posição. Seu objetivo não é criar uma Job Description completa, mas gerar uma descrição objetiva das principais responsabilidades, competências técnicas (hard skills) e comportamentais (soft skills) normalmente esperadas para aquele cargo.

**Regras.** Considere as práticas mais comuns do mercado. Caso o cargo exista em diferentes segmentos, use uma descrição ampla e neutra. Não invente responsabilidades específicas de uma empresa. Não inclua benefícios, requisitos, salário, modelo de trabalho ou informações sobre a empresa. Não inclua qualificações, escolaridade ou tempo de experiência. O foco é apenas no que a pessoa fará e nas competências necessárias. Linguagem clara, objetiva e profissional, sem textos longos.

**Estrutura obrigatória.** *Principais atribuições* — 8 a 12 responsabilidades em bullets, sempre com verbos no infinitivo (Planejar, Elaborar, Atuar junto, Monitorar, Garantir, Desenvolver). *Hard Skills* — 5 a 10 competências técnicas. *Soft Skills* — 5 a 8 competências comportamentais.

**Instrução final.** Sempre que o usuário informar apenas o nome de um cargo, gere automaticamente as três seções seguindo exatamente esse formato. Se o cargo for genérico ou tiver múltiplas interpretações, use a versão mais comum do mercado.

### Antes de publicar

Confira se todas as atribuições existem na rotina do cargo **na sua empresa**, se nenhuma atividade crítica ficou de fora e se as hard skills refletem as ferramentas que o time usa de fato.

**Evite:** colar a saída sem leitura crítica; empilhar 20 atribuições para não deixar nada de fora; usar siglas internas sem explicação; repetir a mesma competência em hard e soft skills.

> Use a IA para vencer a página em branco — e o conhecimento do seu time para tornar a descrição verdadeira.
    `,
  },
  {
    id: "art-21",
    slug: "movimentar-candidatos-entre-vagas",
    title: "Como movimentar candidatos entre vagas",
    summary: "Aproveite talentos que já passaram pelo seu processo, sem perder histórico, notas da IA nem documentos.",
    category: "gestao-de-vagas",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh"],
    keywords: ["movimentar", "reaproveitar candidatos", "banco de talentos", "workspace", "triagem"],
    tags: ["pipeline", "candidatos", "workspace"],
    readTime: 4,
    priority: 3,
    updatedAt: "2026-08-12",
    relatedContent: ["art-17", "art-18"],
    published: true,
    content: `
## Como movimentar candidatos entre vagas

Em vez de recomeçar uma busca do zero, você move candidatos entre etapas da mesma triagem ou copia para outra vaga — em poucos cliques.

- **Zero retrabalho** — o histórico da entrevista e a pontuação da IA seguem junto
- **Decisão em lote** — selecione vários candidatos e movimente todos de uma vez
- **Banco vivo de talentos** — bons perfis voltam a circular como "Reaproveitado"

### Passo a passo

**1. Selecione os candidatos.** No ranking da triagem, marque a caixa de cada candidato. A barra de ações aparece automaticamente no rodapé mostrando quantos estão selecionados. Clique em **Movimentar candidatos**.

**2. Escolha o destino.** São duas rotas, uma decisão por vez:

| Rota | O que faz |
|---|---|
| Mover nesta triagem | Avança o candidato entre as etapas do funil da vaga atual — ou desclassifica |
| Levar para outra triagem | Copia o candidato para outra vaga ou workspace, mantendo o processo original intacto |

**3. Selecione a workspace de destino.** Abra o campo *Workspace destino* e use a busca para filtrar. Você só verá as workspaces às quais tem acesso.

> **Dica:** digite as primeiras letras do nome da empresa ou o prefixo numérico da workspace para chegar mais rápido.

**4. Escolha a triagem e confira o resumo.** A faixa azul confirma exatamente o que vai acontecer antes de você concluir. Os candidatos copiados entram sempre na **etapa inicial** da nova triagem — nada é sobrescrito na vaga de origem.

**5. Confirme a cópia.** O número no botão corresponde à quantidade de candidatos selecionados no passo 1.
    `,
  },
  {
    id: "art-22",
    slug: "background-check",
    title: "Background Check — verificação de antecedentes",
    summary: "Verificação do histórico jurídico do candidato em todas as esferas do direito, executada durante a entrevista e entregue no próprio ranking.",
    category: "triagem-inteligente",
    contentType: "article",
    difficulty: "intermediate",
    targetPersona: ["rh", "admin"],
    keywords: ["background check", "antecedentes", "processos", "jurídico", "compliance", "CPF"],
    tags: ["triagem", "compliance", "produto"],
    readTime: 6,
    priority: 2,
    updatedAt: "2026-08-12",
    relatedContent: ["art-05", "art-16"],
    published: true,
    content: `
## Background Check

Verificação do histórico jurídico do candidato em todas as esferas do direito, executada **durante** a entrevista com IA e entregue no mesmo lugar onde o recrutador já decide: o ranking e o card do candidato.

### O que está e o que não está incluído

| Incluído | Não incluído |
|---|---|
| Processos criminais em nome do candidato | Análise financeira, de crédito ou score |
| Processos judiciais nas demais esferas | Consulta a órgãos de proteção ao crédito |
| Classe e assunto do processo | Processos em segredo de justiça |
| Número, tribunal e instância | Registros não publicados pelos tribunais |
| Parte contrária e valor da causa | Juízo de valor ou recomendação automática |
| Data de ativação e última movimentação | Eliminação automática de candidatos |

Apresentamos apenas informações **publicamente disponíveis nos tribunais** — nada de fonte não oficial ou inferida. Processos em segredo de justiça são excluídos da apresentação, em respeito à legislação.

### Como funciona

1. **Solicitação do CPF na entrevista** — o roteiro passa a incluir a coleta do CPF, de forma natural na conversa pelo WhatsApp. É o único ajuste percebido no fluxo.
2. **Consulta em paralelo** — a verificação roda enquanto o candidato segue respondendo. Nenhum tempo de processo é consumido esperando.
3. **Resultado em até 5 minutos** — após a finalização da entrevista, aparece no ranking e no card.
4. **Aplicado ao top 50** — a verificação cobre os 50 candidatos melhor ranqueados, concentrando o recurso onde a decisão de avanço acontece.

O recrutador não precisa solicitar, disparar ou aguardar nada.

### Onde visualizar

No **ranking**, a coluna *Antecedentes* tem filtro próprio e dois estados:

- **Verde** — nenhum registro encontrado nas fontes públicas para o CPF informado
- **Vermelho** — foram encontrados registros; vale a análise antes de avançar ou descartar

> **Vermelho não significa reprovação.** A marcação indica existência de registro, não culpa, condenação ou impedimento. Boa parte dos registros é de natureza cível e pode não ter qualquer relação com a função.

No **card do candidato**, a seção *Verificação de antecedentes* traz a contagem por natureza e, para cada processo: classe e assunto, número, parte contrária, tribunal e instância, valor da causa, data de ativação e última movimentação. Quando não há registro em uma das naturezas, o campo aparece como "Nenhum".

### Conformidade e boas práticas

1. **Use o filtro para priorizar** — isole os candidatos com registro e concentre a leitura
2. **Leia o detalhe antes de decidir** — um processo cível de alienação fiduciária não equivale a um criminal
3. **Avalie a pertinência com o cargo** — critérios devem ser consistentes entre todos os candidatos do mesmo processo
4. **Registro não é condenação** — verifique a última movimentação para saber se o caso segue ativo
5. **Documente a decisão** — rastreabilidade protege a empresa e o candidato

Para ativar na sua conta, fale com o time de Customer Success.
    `,
  },
  {
    id: "art-23",
    slug: "ia-de-agendamento",
    title: "IA de Agendamento — guia operacional",
    summary: "Do calendário conectado à confirmação no WhatsApp: convites automáticos, disponibilidade por subetapa e acompanhamento de entrega.",
    category: "entrevista-inteligente",
    contentType: "tutorial",
    difficulty: "intermediate",
    targetPersona: ["rh", "admin"],
    keywords: ["agendamento", "calendário", "google meet", "teams", "convite automático", "lembretes"],
    tags: ["agendamento", "automação", "entrevista"],
    readTime: 9,
    priority: 1,
    updatedAt: "2026-08-12",
    relatedContent: ["art-17", "art-18"],
    published: true,
    content: `
## IA de Agendamento

O módulo conecta o funil de seleção aos calendários corporativos e aos canais do candidato, eliminando a troca manual de mensagens. Configurado uma vez por vaga, passa a rodar continuamente.

- **Calendários** — Google Workspace (Calendar) e Microsoft 365 (Outlook), verificados em tempo real para evitar conflitos
- **Videoconferência** — Google Meet ou Microsoft Teams, com link gerado automaticamente
- **Canais do candidato** — e-mail e WhatsApp recebem convite, lembretes e confirmação

### O fluxo em três movimentos

1. **Entrada** — o candidato entra na subetapa, por triagem manual ou avanço automático por pontuação da IA
2. **Sistema** — convite gerado com link de conferência e disparado nos canais integrados
3. **Candidato** — escolhe o horário; a agenda do recrutador é bloqueada e a confirmação retorna pelos dois canais

### 1. Conectar calendário e conferência

Na barra lateral, abra **Calendário** → seção de aplicativos de videoconferência → **Adicionar** → selecione o app (ex.: Google Meet) → três pontos → **Definir como padrão**.

Isso garante que todos os links enviados sejam criados pelo provedor correto, evitando falha de acesso na hora da entrevista. Conecte sempre a conta corporativa oficial.

### 2. Configurar o agendamento por subetapa

Em **Etapas de Avaliação**, habilite o módulo na subetapa correspondente:

| Parâmetro | O que define |
|---|---|
| Formato | Individual (1 para 1) ou em grupo, com vários candidatos no mesmo bloco |
| Convites na etapa | Limite máximo de convites automáticos; excedentes ficam pendentes |
| Convidados adicionais | E-mails de gestores e líderes técnicos, inseridos na agenda de todos |
| Modalidade | Online (link automático) ou Presencial (endereço obrigatório) |
| Link de conferência | Herdado das configurações padrão do calendário |

> Se a modalidade exige presença física, não avance sem o endereço — o candidato não recebe orientação de deslocamento sem ele.

### 3. Convite automático e fila de espera

- **Dentro do limite** — e-mail e WhatsApp saem no mesmo instante em que o candidato entra na subetapa
- **Teto atingido** — os envios pausam e os excedentes ficam como *Aguardando Candidato / Pendente*
- **Limite ampliado** — os pendentes são convidados automaticamente, sem seleção manual

> **Atenção:** o limite de convites não é um teto de vagas, é um controle de ritmo de agenda. Ampliar sem revisar a disponibilidade pode gerar sobrecarga de horários no mesmo dia.

### 4. Período e disponibilidade

| Cenário | Modalidade | Quando usar |
|---|---|---|
| Banco de talentos | Contínuo (data sem fim) — janela rolante de 14 dias | Vagas de grande volume ou processos contínuos |
| Processo estruturado | Datas fixas (início e fim) | Processos com prazos rígidos |

Com datas fixas, se a janela expirar e o candidato acessar o link depois, não haverá horários — é preciso atualizar a vigência.

Cada subetapa tem sua própria grade: **dias da semana** abertos, **duração** do bloco por entrevista e **janela horária** diária.

> **Alerta:** disponibilidades idênticas em processos simultâneos criam concorrência de agenda — ocupar um horário numa vaga bloqueia automaticamente as demais, porque a varredura é feita em tempo real contra a agenda principal do recrutador.

### 5. Status de entrega

| Status | Significa |
|---|---|
| Entregue | Recebido com sucesso em todos os canais integrados |
| Parcialmente entregue | Falha em um canal — diagnostique o contato antes de escalar ao suporte |
| Pendente | Convite na fila ou aguardando liberação de limite |

Clicando sobre o status, o sistema abre o relatório de rastreabilidade com canal de envio, tipo (recrutador ou automático) e confirmação de entrega.

### 6. Do lado do candidato

Recebe o convite por WhatsApp e e-mail com botão de acesso ao portal, escolhe data e horário num calendário interativo, recebe a confirmação no WhatsApp e dois lembretes automáticos: **24h antes** e **3h antes**.

**Reagendar** devolve o link para nova escolha de data. **Cancelar** encerra o compromisso e dispara aviso oficial.

### Boas práticas

1. Evite disponibilidades idênticas em vagas simultâneas
2. Prefira Contínuo para grande volume
3. Monitore os indicadores em vermelho — janela vencida ou limite atingido
4. Use o relatório de status antes de escalar ao suporte

O recrutador pode ajustar limite de convites e data limite direto no painel, sem pausar a vaga, com efeito instantâneo para os candidatos.
    `,
  },
  {
    id: "art-24",
    slug: "integracao-gupy-tutorial-completo",
    title: "Integração Gupy + DigAI — tutorial completo",
    summary: "Os dois passos para ativar a integração: configurar a etapa gatilho na Gupy e ativar a triagem na DigAI. Cerca de 15 minutos.",
    category: "integracoes",
    contentType: "tutorial",
    difficulty: "intermediate",
    targetPersona: ["rh", "admin"],
    keywords: ["gupy", "integração", "ats", "entrevista inteligente", "timeline", "api"],
    tags: ["gupy", "integração", "ats"],
    readTime: 10,
    priority: 1,
    updatedAt: "2026-08-12",
    relatedContent: ["art-25", "art-26"],
    published: true,
    content: `
## Integração Gupy + DigAI

A gestão de vagas que você já conhece na Gupy, com a triagem por IA no WhatsApp que a DigAI oferece. Quando um candidato avança para a etapa de entrevista, a DigAI entra em ação automaticamente — sem exportações e sem logins paralelos.

**O fluxo:** criar a vaga na Gupy → configurar a triagem na DigAI → candidato avança na Gupy → nota e hiperlink retornam na Timeline.

> A integração vale apenas para **vagas novas**. Não é possível incluí-la em triagens já ativas com candidatos.

## Passo 1 — Ativando a integração na Gupy

Preencha os campos da vaga normalmente. A integração começa em **Definição de Etapas** → role até **Incluir uma etapa**.

### O nome da etapa é o campo mais crítico

No campo "Dê um nome para esta etapa", digite **exatamente**:

\`\`\`
Entrevista Inteligente
\`\`\`

Não funciona com aspas ao redor, tudo em minúsculas, só a primeira palavra maiúscula, nem com espaço extra no final.

> Esse nome é o gatilho que a API monitora. Qualquer diferença — mesmo um espaço invisível — faz a integração **falhar silenciosamente**, sem aviso de erro.

### Os demais campos

| Campo | O que preencher |
|---|---|
| Fase do funil | Sugestão: Avaliação testes – testes – dinâmicas e/ou cases |
| Objetivo da etapa | Visível ao candidato — um texto bem escrito aumenta a adesão |
| Mensagem ao candidato | Sugestão: selecione *Entrevista* |
| **Recursos online** | **Sempre** "Não, farei a etapa presencialmente ou em outra plataforma" |

> **Nunca** selecione "Sim, utilizarei recursos de perguntas adicionais, testes ou vídeos" — isso quebra a integração completamente.

**Texto sugerido para o objetivo da etapa:**

> Nesta etapa, você realizará uma entrevista com a nossa Inteligência Artificial pelo WhatsApp. A entrevista é obrigatória para seguir no processo seletivo e tem como objetivo conhecer melhor sua experiência, trajetória profissional, interesses e perfil para a vaga. Você deverá responder às perguntas por áudio, com o máximo de detalhes possível. Reserve cerca de 10 a 15 minutos em um local tranquilo.

## Passo 2 — Ativando a triagem na DigAI

Após publicar a vaga, a DigAI recebe nome e descrição automaticamente via API.

1. **Encontre o Workspace** — menu lateral → *Workspaces*. Toda vaga da Gupy vai para **Integração Gupy - DigAI**
2. **Encontre a vaga** — ela aparece com status *Inativo*, aguardando configuração
3. **Edite a triagem** — clique na vaga → *Dados Gerais* → configure perguntas, pré-requisitos e critérios (cerca de 10 minutos)
4. **Etapas de Avaliação** → crie o pipeline → **Salvar e Ativar**

> Mesmo gerindo o processo pela Gupy, crie as Etapas de Avaliação na DigAI: elas desbloqueiam recursos exclusivos como o assistente de IA e o agendamento automático.

**Dica:** mova a vaga para o seu workspace de gestão em *Mais Opções → Mover*, para facilitar o acompanhamento.

## O que acontece depois

| Quando | O quê |
|---|---|
| Imediato | E-mail de convite disparado |
| Até 30 minutos | WhatsApp com o link da triagem |
| Até 10 min após a entrevista | Nota e hiperlink na aba **Timeline** do card na Gupy |

## Problemas comuns

**Não encontro a vaga no workspace da DigAI** — em 99% dos casos o problema é a nomenclatura da etapa na Gupy. Confirme que está exatamente "Entrevista Inteligente".

**O candidato não recebeu o link** — verifique se a triagem está com status *Ativo* na DigAI. Sem ativação, os disparos não acontecem mesmo com a Gupy correta.

**A nota não aparece na Gupy** — aguarde até 10 minutos e procure na aba *Timeline*, não na visão principal do card.

**Posso gerenciar tudo pela Gupy?** — Sim, com limitações. A Gupy recebe apenas nota e hiperlink. Ouvir os áudios, análises de IA em todas as etapas, agendamento por IA, coleta de documentos e background check ficam **exclusivamente na DigAI**. É regra de negócio, não limitação técnica.
    `,
  },
  {
    id: "art-25",
    slug: "avaliando-candidatos-gupy",
    title: "Avaliando candidatos na integração Gupy",
    summary: "Como identificar quem já fez a triagem, acessar a nota pela Timeline e aprofundar a análise dentro da DigAI.",
    category: "integracoes",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh"],
    keywords: ["gupy", "avaliar candidatos", "timeline", "tag digai", "nota", "transcrição"],
    tags: ["gupy", "avaliação", "integração"],
    readTime: 7,
    priority: 2,
    updatedAt: "2026-08-12",
    relatedContent: ["art-24", "art-26"],
    published: true,
    content: `
## Avaliando candidatos na integração Gupy

Na etapa Entrevista Inteligente convivem candidatos que já fizeram a triagem e candidatos que ainda não fizeram. O que os separa é uma tag.

### 1. Identificar quem já realizou

Na Gupy, acesse a vaga e clique na aba **Entrevista Int...** para filtrar a lista.

- **Realizou** — o candidato exibe a tag **DigAI: Realizado** ao lado do nome. Nota e hiperlink já disponíveis na Timeline
- **Ainda não realizou** — está na etapa, mas sem a tag. Pode não ter recebido o link ou não ter concluído

> **Atenção:** a tag *#Liberado* é gerada pela própria Gupy e não tem relação com a DigAI. A tag que indica triagem concluída é exclusivamente *DigAI: Realizado*.

### 2. Acessar a nota pela Timeline

Clique no card do candidato e abra a aba **Timeline**. É ali que a DigAI publica o resultado automaticamente, via Public API, junto com os demais eventos da candidatura — não há um campo exclusivo para o resultado na interface da Gupy.

Localize o evento **"Public API adicionou o comentário"** e expanda. Aparecem dois dados:

- **Nota** — pontuação arredondada, média ponderada das respostas de cada etapa
- **"Acesse o resultado aqui"** — hiperlink que abre a tela completa na DigAI

### 3. O resultado completo na DigAI

A tela concentra tudo em um lugar:

| Informação | O que traz |
|---|---|
| Pontuação | Nota geral calculada pela performance em cada etapa |
| Dados cadastrais | Nome, e-mail, CPF, celular, LinkedIn e Leitura Provável |
| Nível de Experiência | Classificação automática: Baixa, Média ou Alta |
| Proficiência no Idioma | Nível de comunicação oral identificado nos áudios |
| Pré-requisitos | Conformidade com os requisitos mínimos da vaga |
| Perfil Profissional | Análise comportamental inferida pela IA |

### A análise da IA

Dividida em três blocos:

- **Pontos fortes** — competências que se destacaram, conforme o perfil de vaga configurado
- **Pontos de melhoria** — lacunas identificadas: falta de exemplos específicos, dificuldade em demonstrar impacto, respostas genéricas. Útil para calibrar uma eventual entrevista presencial
- **Palavras-chave** — termos recorrentes que sintetizam o perfil e agilizam a comparação

### Respostas por etapa

Cada pergunta recebe uma **Pontuação da IA** individual, com dois recursos:

- **Carregar áudio** — a gravação feita pelo candidato no WhatsApp
- **Transcrição do áudio** — versão em texto, para leitura rápida

Expandindo a etapa, aparece a **Análise Detalhada da IA** daquela resposta: o que foi bem respondido, o que ficou superficial, o que poderia ter sido aprofundado.

> Os áudios **não** são enviados para a Gupy — ficam disponíveis apenas dentro da DigAI.
    `,
  },
  {
    id: "art-26",
    slug: "templates-de-triagem",
    title: "Usando Templates de triagem na DigAI",
    summary: "Crie um modelo de entrevista uma vez e vincule a qualquer vaga da Gupy pelo código do template.",
    category: "integracoes",
    contentType: "tutorial",
    difficulty: "intermediate",
    targetPersona: ["rh", "admin"],
    keywords: ["templates", "triagem", "gupy", "código da vaga", "dados internos", "padronização"],
    tags: ["templates", "gupy", "padronização"],
    readTime: 7,
    priority: 3,
    updatedAt: "2026-08-12",
    relatedContent: ["art-24", "art-25"],
    published: true,
    content: `
## Usando Templates de triagem

Um template é um **modelo reutilizável de entrevista por IA**: você define perguntas, perfil do cargo, tentativas, idioma e tempo de resposta uma vez, e aplica em quantas vagas quiser.

- **Padronização** — vagas do mesmo perfil recebem as mesmas perguntas e critérios; candidatos avaliados em igualdade de condições
- **Velocidade** — configure uma vez, vincule em segundos a cada nova vaga
- **Flexibilidade** — edite quando quiser; vagas já vinculadas seguem na versão anterior, sem impacto retroativo

> **Template ≠ Vaga.** O template é o modelo; a vaga é onde ele é aplicado. Um único template pode servir a dezenas de vagas.

### 1. Acesse a seção Templates

Menu lateral → seção **Pessoas** → **Templates** → aba **Templates de triagem**.

A outra aba, *Agendamento de entrevistas*, é para templates de agendamento — não use para triagem.

### 2. Crie o template com "Vaga com IA"

Clique em **+ Criar template** no canto superior direito e selecione **Vaga com IA** — a IA gera as perguntas automaticamente com base no cargo e nas configurações. É o tipo recomendado para a maioria das vagas operacionais e comerciais.

| Campo | Como preencher |
|---|---|
| Título | Descritivo: "Atendente Retenção SP", "Especialista Vendas — Comportamental" |
| Quantidade de perguntas | Slider de 1 a 10. Operacional: 3 a 5. Técnico: até 7 |
| Inclinação | Entre Técnico e Comportamental, conforme o perfil |
| Tempo de resposta | Padrão 120s. Aumente para respostas mais elaboradas |
| SLA de encerramento | Dias após os quais a triagem encerra automaticamente |
| Limite de tentativas | Padrão 1. Aumente só com justificativa de negócio |

> **Nível (senioridade) e Idioma** impactam diretamente na geração das perguntas. Perguntas para Júnior são diferentes das de Sênior.

### 3. Copie o código do template

Cada template recebe um **Código único e imutável** (ex.: \`7181\`) — ele não muda mesmo que você edite o template depois. Clique no ícone de cópia ao lado do número.

> Copie antes de sair da tela. Se precisar, cole num bloco de notas antes de abrir a Gupy.

### 4. Cole o código na Gupy

Na vaga, menu lateral → **Dados internos** → campo **Código da vaga**.

O campo já vem preenchido com um código padrão da Gupy (ex.: \`0646-9405645\`). **Não apague.** Posicione o cursor ao final, digite **exatamente um traço** — sem espaço antes ou depois — e cole o código do template:

\`\`\`
0646-9405645-7181
\`\`\`

Ao receber um candidato pela integração, a DigAI lê o Código da vaga e extrai o sufixo após o último traço. É esse número que identifica qual template aplicar.

### O que esperar

Na Definição de Etapas da Gupy, a **Etapa 2 — Entrevista Inteligente** aparece como "Presencial ou fora da plataforma". Isso é esperado: indica que a avaliação acontece fora da Gupy, conduzida pela DigAI via WhatsApp.

A partir daí, candidatos que chegam à etapa recebem o link automaticamente — sem ação adicional do recrutador para cada um.
    `,
  },
  {
    id: "art-27",
    slug: "integracao-pandape",
    title: "Integração Pandapé + DigAI",
    summary: "Configure a vaga no Pandapé, ative a Entrevista Inteligente e use templates para não repetir trabalho a cada abertura.",
    category: "integracoes",
    contentType: "tutorial",
    difficulty: "beginner",
    targetPersona: ["rh", "admin"],
    keywords: ["pandapé", "integração", "ats", "entrevista inteligente", "movimento automático", "templates"],
    tags: ["pandapé", "integração", "ats"],
    readTime: 10,
    priority: 2,
    updatedAt: "2026-08-12",
    relatedContent: ["art-24", "art-26"],
    published: true,
    content: `
## Integração Pandapé + DigAI

Configurada uma vez por vaga, a integração roda sozinha: o candidato se inscreve no Pandapé, é movido automaticamente para a etapa Entrevista Inteligente, recebe convite por e-mail e WhatsApp, e as respostas com a avaliação da IA ficam organizadas dentro da vaga na DigAI.

### As 3 regras de ouro

Se algo não funcionar, 9 em cada 10 vezes o motivo está aqui.

1. **O nome da etapa precisa ser exatamente "Entrevista Inteligente"** — sem erro de digitação, caractere especial ou espaço no final
2. **A etapa precisa ser a 2ª do processo**, logo abaixo de Inscritos. A integração acontece unicamente na fase 2
3. **A vaga precisa estar Publicada na DigAI** — publicar no Pandapé não basta

## Parte 1 — Configurando a vaga no Pandapé

1. Faça login e vá ao Dashboard
2. Clique em **Criar Processo** (botão azul no canto superior direito)
3. Escolha **Processo Padrão** — é o único compatível com a integração
4. Preencha os dados da vaga normalmente
5. Na etapa 3 (Gerenciamento), abra **Etapas do Processo**
6. Clique em **+ Incluir Nova Etapa**
7. Nomeie exatamente **Entrevista Inteligente**
8. Arraste para a **2ª posição**, logo abaixo de Inscritos
9. Ative a vaga na DigAI

> Se a vaga já existe no Pandapé, pule para o passo 5.

### O passo mais crítico do tutorial

| Assim funciona | Assim quebra |
|---|---|
| Entrevista Inteligente | Espaço invisível no final — o erro mais comum |
| | "Entrevista Inteligênte" — acento onde não existe |
| | "Entrevista inteligente" — minúscula |
| | "Entrevista DigAI", "Triagem IA" — nome diferente |

**Como conferir:** antes de salvar, clique no final do texto e pressione **End**. Se o cursor parar logo depois do "e", está certo. Se ficar um espaço à direita, apague com Backspace.

### Não esqueça o Movimento Automático

Ative o **Movimento Automático** entre Inscritos e Entrevista Inteligente — é ele que envia todo candidato inscrito para a DigAI. Sem isso, você teria que mover cada pessoa na mão.

Para conferir: na barra de etapas do topo, a ordem deve ser Inscritos → Entrevista Inteligente → demais etapas, e entre as duas primeiras deve aparecer a caixa **Movimento Automático Configurado** com a seta verde.

### Depois de publicar no Pandapé

A vaga cai na DigAI em **até 20 minutos**, no workspace **Integração Pandapé + DigaÍ**. Complete a construção e deixe o status como **Publicada**.

> **Vaga em rascunho na DigAI = nenhum candidato entrevistado.** É o erro mais comum depois da configuração.

## Parte 2 — Usando templates (opcional)

Templates evitam reescrever perguntas e critérios a cada nova vaga.

1. Na DigAI, abra a vaga → menu de três pontinhos → **Salvar como template**
2. Informe título, descrição e SLA de encerramento → **Salvar como template**
3. Vá em **Templates** na barra lateral
4. No card do template, copie o **Código** de 4 dígitos
5. No Pandapé, na etapa 1 (Descrição da vaga), role até o campo **Tags (Opcional)**
6. Cole o código e clique em **Incluir** — ele deve aparecer como etiqueta abaixo do campo
7. Siga a criação da vaga incluindo a etapa Entrevista Inteligente, como na Parte 1

> **Cuidado:** cole apenas o código (ex.: \`3782\`). Não escreva o nome do template nem inclua outras palavras no mesmo campo — a DigAI não vai reconhecer.

A vaga nasce na DigAI já com perguntas e critérios preenchidos. Criar uma vaga triada por IA passa a levar o mesmo tempo de publicar uma vaga comum.

## Checklist final

- O processo é do tipo **Processo Padrão**
- Existe uma etapa chamada exatamente **Entrevista Inteligente**, sem espaço no final
- Essa etapa é a **segunda** do funil
- O **Movimento Automático** está ativado
- A vaga está publicada e ativa no Pandapé
- Após 20 minutos, a vaga apareceu no workspace **Integração Pandapé + DigaÍ**
- A vaga foi finalizada na DigAI e está **Publicada**
- Se usou template: o código de 4 dígitos está no campo Tags

> **Boa prática:** depois de publicar, inscreva-se na vaga pelo link público com o seu próprio número e veja se o convite chega. É a forma mais rápida de confirmar a cadeia inteira antes de investir em divulgação.

## Problemas mais comuns

**A vaga não apareceu na DigAI** — confirme os 20 minutos, que está publicada e ativa no Pandapé, e que você está olhando o workspace certo.

**Os candidatos não recebem o convite** — a vaga ainda está em rascunho na DigAI, ou o Movimento Automático não foi ativado.

**Configurei tudo e nada acontece** — revise o nome da etapa caractere por caractere. Um espaço invisível não gera nenhum aviso de erro.

**As perguntas do template não vieram** — verifique se o código corresponde a um template **Ativo** e se a tag foi realmente incluída, aparecendo como etiqueta.
    `,
  },
  {
    id: "art-28",
    slug: "social-recruiting-anuncios",
    title: "Social Recruiting — boas práticas de anúncio",
    summary: "A anatomia da copy e da imagem que reduzem o custo por candidato, com casos reais de acerto e erro.",
    category: "boas-praticas",
    contentType: "article",
    difficulty: "beginner",
    targetPersona: ["rh"],
    keywords: ["social recruiting", "anúncio", "copy", "criativo", "CTR", "custo por lead"],
    tags: ["social recruiting", "boas práticas", "divulgação"],
    readTime: 6,
    priority: 3,
    updatedAt: "2026-08-12",
    relatedContent: ["art-15", "art-16"],
    published: true,
    content: `
## Social Recruiting — boas práticas de anúncio

Não é sobre design bonito. É sobre um formato que reduz o custo por entrevista e atrai candidatos qualificados.

> **Regra de ouro:** concreto vence o genérico. Cargo visível, atribuições e um único ponto de contato superam qualquer peça "bonita" cheia de efeito.

### Anatomia da copy vencedora

| # | Bloco | Por quê |
|---|---|---|
| 1 | Cargo + cidade na 1ª linha | É o que aparece antes do "Ver mais". Sem isso, ninguém abre |
| 2 | Gancho — pergunta no "você" | Faz a pessoa se autosselecionar: "sou eu" |
| 3 | Concreto — o que faz de verdade | Especificidade = credibilidade. É o que mais determina a performance |
| 4 | Valor — crescimento / salário | Em vaga operacional, salário explícito puxa muito |
| 5 | CTA único e direto | Um caminho só, verbo de ação e urgência |

Copy curta: 3 a 4 linhas.

### Anatomia da imagem vencedora

1. **Pessoa real na função** — uniforme e ambiente reais
2. **Logomarca visível** — credibilidade imediata
3. **Cargo é o herói** — destaque máximo, com cidade/UF
4. **1 linha de tarefa ou salário** — nada de parágrafo na arte
5. **Um CTA só** — faixa de contraste: "Inscreva-se agora"
6. **Limpo e na cor da marca** — alto contraste, sem poluição

### O formato que funciona vs. o que não funciona

Mesmo orçamento, resultado **até 8× diferente**. O que muda não é a verba — é onde cada elemento fica dentro da arte.

| ✓ Funciona | ✕ Não funciona |
|---|---|
| 1 pessoa ocupa a maior parte do quadro | Várias pessoas ou efeitos disputando atenção |
| Cargo gigante no topo | Cargo pequeno ou perdido no meio |
| 1 linha de tarefa/salário | 2 colunas de requisitos = poluição |
| 1 faixa de CTA na base | O olho não sabe onde parar no feed |

### Dois casos reais que não funcionaram

**Estágio · Brasília/DF** — R$ 14,11 por lead, CTR 0,61%, 141 leads. Poluição extrema: 4 pessoas, efeitos visuais e duas colunas de requisitos (skills, perfil, jornada, bolsa, idade). Não dá para ler no feed.

**Atendimento · Cariacica/ES** — R$ 14,71 por lead, CTR 0,68%, 66 leads. Peça 100% de marca ("VEM SER"), sem pessoa na função e sem ambiente. Cargo genérico e local vago ("na sua região"). A copy até era boa — foi a imagem que derrubou o CTR.

> Nenhum dos dois falhou por falta de verba. Falharam porque a arte disputava atenção com ela mesma, ou não mostrava ninguém trabalhando.

### Checklist antes de publicar

**Sempre:** cargo + cidade na 1ª linha · pessoa real na função · copy concreta com as tarefas reais · salário/benefício quando houver · um CTA só · arte limpa com cargo em destaque · copy de 3–4 linhas.

**Nunca:** frases de marca vazias ("vem ser", "protagonista") · local vago ("na sua região") · encher a arte de requisitos · fundo poluído · cargo escondido no texto · peça só de marca · mais de um CTA ou vários links.
    `,
  },
  {
    id: "art-29",
    slug: "jornada-do-candidato-whatsapp",
    title: "A entrevista pelo WhatsApp: a jornada do candidato",
    summary: "O que a ANA fala com o candidato do início ao fim, o que é obrigatório, o que dá para pular e as regras de alteração do roteiro.",
    category: "entrevista-inteligente",
    contentType: "article",
    difficulty: "beginner",
    targetPersona: ["rh"],
    keywords: ["candidato", "whatsapp", "entrevista", "áudio", "acessibilidade", "tentativas", "feedback"],
    tags: ["entrevista", "candidato", "experiência"],
    readTime: 6,
    priority: 2,
    updatedAt: "2026-08-12",
    relatedContent: ["art-23", "art-18"],
    published: true,
    content: `
## A jornada do candidato

Saber exatamente o que a ANA fala com o candidato ajuda o recrutador a responder dúvidas sem escalar para o suporte.

### A sequência da conversa

1. **Apresentação** — a ANA se identifica como IA da DigAI e informa a vaga e a empresa
2. **Número oficial** — informa que aquele é um número oficial e indica a lista pública em digai.ai/telefones-oficiais
3. **Dados** — confirma nome completo, e-mail e CPF
4. **Pré-requisitos** — perguntas simples e rápidas para conhecer o candidato
5. **Regras** — autorização para registrar o áudio e a política de privacidade
6. **Teste de áudio (icebreaker)** — não impacta a avaliação, só confirma que o microfone funciona
7. **Trajetória** — experiência profissional e formação
8. **Perguntas da triagem** — uma por etapa, com tempo definido para ler e responder
9. **Feedback, NPS e encerramento**

### O que o recrutador precisa saber

**Só funciona no aplicativo do celular.** WhatsApp Web ou PC não é suportado. Se o candidato não conseguir iniciar pelo computador, oriente a clicar de novo no link pelo app.

**Se o tempo acabar, a próxima pergunta é enviada automaticamente.** O candidato não deve responder depois disso — a resposta ficaria associada à pergunta errada.

**Tentativas.** Quando há mais de uma, a ANA informa quantas restam e considera a melhor participação.

**Reaproveitamento de respostas.** Se o candidato já participou de uma vaga similar, a ANA oferece reutilizar as respostas anteriores — opção habilitada pelo recrutador, sem prejuízo ao processo. Mesmo reutilizando, ele pode refazer a entrevista.

**Currículo e LinkedIn são opcionais.** Podem ser pulados. O currículo aceita PDF ou Word, até 25 MB.

**Acessibilidade.** O candidato tem um botão para sinalizar que precisa de algum recurso — a equipe então contata os responsáveis pela triagem para garantir o suporte.

**Suporte técnico do candidato:** ajuda@digai.ai.

### O feedback não é aprovação

A ANA deixa explícito ao candidato que o feedback serve para ele conhecer os próprios pontos fortes e o que pode melhorar, e **não** tem relação com passar para a próxima etapa — essa decisão é do recrutador.

### Alterar o roteiro de mensagens

Mudanças no roteiro levam **até 72 horas para entrar em vigor, e durante esse período não há envio de mensagens.**

> Não altere o roteiro com processos ativos em andamento sem considerar essa janela.

Isso é diferente do SLA de personalização: o time DigAI leva até **10 dias** para aplicar as alterações solicitadas por planilha. As 72 horas são o tempo de propagação depois de aplicada.
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
