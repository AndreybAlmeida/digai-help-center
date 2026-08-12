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
