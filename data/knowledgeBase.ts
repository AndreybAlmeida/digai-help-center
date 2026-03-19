import { KnowledgeItem, KnowledgeStore } from "@/types/knowledge";

export const SEED_VERSION = 2;

export const knowledgeSeed: KnowledgeItem[] = [
  // ─── PRIMEIROS PASSOS — migrados de faq.ts ───────────────────────────────────
  {
    id: "ki-f01",
    pergunta: "Como faço para acessar a plataforma DigAI?",
    resposta:
      "Acesse app.digai.ai com seu e-mail e senha. Caso seja seu primeiro acesso, use as credenciais enviadas pela equipe DigAI. Se precisar redefinir a senha, clique em **Esqueci minha senha** na tela de login.",
    categoria: "primeiros-passos",
    palavrasChave: ["acesso", "login", "senha", "primeiro acesso"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f02",
    pergunta: "Por onde devo começar na DigAI?",
    resposta:
      "Siga o guia **Comece por Aqui**: 1) Assista ao tutorial completo, 2) Crie seu primeiro Workspace, 3) Configure uma Triagem, 4) Compartilhe o link com candidatos. O tutorial cobre tudo em menos de 30 minutos.",
    categoria: "primeiros-passos",
    palavrasChave: ["onboarding", "começar", "tutorial", "workspace"],
    tipo: "onboarding",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f03",
    pergunta: "Posso usar a DigAI no celular?",
    resposta:
      "Sim. A interface é responsiva e funciona em smartphones via navegador. O recrutador obtém melhor experiência no desktop para configurações e análise. O candidato tem melhor experiência no celular via WhatsApp.",
    categoria: "primeiros-passos",
    palavrasChave: ["mobile", "celular", "responsivo", "smartphone"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f04",
    pergunta: "Como adicionar novos usuários à conta?",
    resposta:
      "Para incluir novos usuários na plataforma, é necessário **solicitar ao time de Customer Success da DigAI**. Entre em contato pelo suporte e informe o nome, e-mail e função do colaborador que deseja adicionar. Nossa equipe cuidará do acesso.",
    categoria: "primeiros-passos",
    palavrasChave: ["usuários", "convite", "equipe", "colaborador", "adicionar", "novo usuário", "cs", "customer success"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-19",
    publicado: true,
  },
  {
    id: "ki-ps01",
    pergunta: "Como faço meu primeiro acesso à plataforma?",
    resposta:
      "Acesse www.digai.ai, clique em **Login Empresas**, use seu e-mail corporativo, crie uma senha e valide com SMS.",
    categoria: "primeiros-passos",
    palavrasChave: ["primeiro acesso", "login empresas", "sms", "e-mail corporativo"],
    tipo: "onboarding",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-ps02",
    pergunta: "Preciso instalar algum aplicativo para usar a DigAI?",
    resposta: "Não. A DigAI é 100% web — não há instalação necessária.",
    categoria: "primeiros-passos",
    palavrasChave: ["instalar", "app", "web", "navegador"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-ps03",
    pergunta: "Como criar uma vaga na DigAI?",
    resposta:
      "Siga estes passos: 1) Crie um **workspace**, 2) Crie uma **triagem**, 3) Escolha o tipo de processo. Tenha em mãos uma boa descrição da vaga antes de começar.",
    categoria: "primeiros-passos",
    palavrasChave: ["criar vaga", "workspace", "triagem", "processo seletivo"],
    tipo: "tutorial",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-ps04",
    pergunta: "Posso duplicar uma vaga existente?",
    resposta:
      "Sim. Use a opção de **duplicação** ou crie a partir de **templates**. Isso agiliza a criação de vagas recorrentes com a mesma estrutura.",
    categoria: "primeiros-passos",
    palavrasChave: ["duplicar", "vaga", "template", "copiar"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── GESTÃO DE VAGAS — migrados de faq.ts ────────────────────────────────────
  {
    id: "ki-f05",
    pergunta: "Como mover um candidato de etapa no pipeline?",
    resposta:
      "Na visão Kanban, arraste o card para a etapa desejada. Ou abra o perfil do candidato e clique em **Avançar etapa**. O candidato recebe notificação automática por e-mail ao ser movido.",
    categoria: "gestao-de-vagas",
    palavrasChave: ["candidato", "etapa", "pipeline", "kanban", "mover"],
    tipo: "tutorial",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f06",
    pergunta: "Como reprovar um candidato e enviar feedback?",
    resposta:
      "Abra o perfil do candidato, clique em **Reprovar**, selecione o motivo e ative o envio de e-mail automático de feedback. O e-mail pode ser personalizado em Configurações → Comunicação.",
    categoria: "gestao-de-vagas",
    palavrasChave: ["reprovar", "candidato", "feedback", "e-mail", "reprovação"],
    tipo: "tutorial",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f07",
    pergunta: "Posso personalizar as etapas do processo seletivo?",
    resposta:
      "Sim. Ao criar ou editar um Workspace, você pode adicionar, remover e renomear as etapas do funil conforme seu processo.",
    categoria: "gestao-de-vagas",
    palavrasChave: ["etapas", "funil", "processo seletivo", "personalizar", "workspace"],
    tipo: "tutorial",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── TRIAGEM INTELIGENTE — migrados de faq.ts ────────────────────────────────
  {
    id: "ki-f08",
    pergunta: "A IA gera perguntas de triagem automaticamente?",
    resposta:
      "Sim. Ao criar uma triagem, a IA sugere perguntas baseadas no título e descrição da vaga. Você pode aceitar, editar ou substituir qualquer pergunta sugerida.",
    categoria: "triagem-inteligente",
    palavrasChave: ["perguntas", "IA", "triagem", "automático", "sugestão"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f09",
    pergunta: "Como a IA avalia as respostas dos candidatos na triagem?",
    resposta:
      "A IA analisa cada resposta e gera: uma **nota de 0 a 10**, scores por critério (comunicação, aderência técnica, experiência) e um resumo textual da performance. Veja isso no perfil de cada candidato.",
    categoria: "triagem-inteligente",
    palavrasChave: ["avaliação", "nota", "IA", "score", "critério"],
    tipo: "faq",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f10",
    pergunta: "O candidato precisa instalar algum aplicativo para fazer a triagem?",
    resposta:
      "Não. A triagem acontece 100% via navegador. O candidato acessa o link recebido sem necessidade de download ou cadastro prévio.",
    categoria: "triagem-inteligente",
    palavrasChave: ["candidato", "acesso", "navegador", "link", "app"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-t01",
    pergunta: "A triagem inteligente substitui a triagem manual?",
    resposta:
      "Sim. A DigAI automatiza toda a triagem, eliminando a necessidade de revisar currículos manualmente. O recrutador recebe os candidatos já ranqueados.",
    categoria: "triagem-inteligente",
    palavrasChave: ["triagem manual", "automatizar", "currículo", "substituir"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-t02",
    pergunta: "Como acompanhar candidatos durante a triagem?",
    resposta:
      "Acompanhe em tempo real pela DigAI ou pelo ATS integrado. Veja status de cada candidato (convite enviado, respondeu, aguardando) no painel da vaga.",
    categoria: "triagem-inteligente",
    palavrasChave: ["acompanhar", "candidatos", "status", "painel", "ATS"],
    tipo: "tutorial",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── HUNTING — migrados de faq.ts ────────────────────────────────────────────
  {
    id: "ki-f11",
    pergunta: "O que é a IA de Hunting?",
    resposta:
      "É a busca global da DigAI que encontra candidatos em toda a base de talentos — incluindo pessoas que não se candidataram à vaga atual. Ela cruza perfis com os requisitos da posição e retorna candidatos ranqueados por score.",
    categoria: "hunting",
    palavrasChave: ["hunting", "busca global", "IA", "sourcing", "talentos"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f12",
    pergunta: "De onde vêm os candidatos da busca global?",
    resposta:
      "A base inclui candidatos de triagens anteriores, convidados e importados via integrações (Gupy, Greenhouse, etc.). Quanto mais sua empresa usa a DigAI, mais rica fica a base.",
    categoria: "hunting",
    palavrasChave: ["base de talentos", "candidatos", "hunting", "importar"],
    tipo: "faq",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-h01",
    pergunta: "Como melhorar os resultados do hunting com IA?",
    resposta:
      "Forneça contexto claro na busca: **cargo específico**, **nível de senioridade** e **localização**. Quanto mais detalhada a descrição, mais preciso o resultado.",
    categoria: "hunting",
    palavrasChave: ["hunting", "melhorar resultado", "contexto", "cargo", "senioridade"],
    tipo: "boas-praticas",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── INTEGRAÇÕES — migrados de faq.ts ────────────────────────────────────────
  {
    id: "ki-f13",
    pergunta: "A DigAI se integra com outros ATSs?",
    resposta:
      "Sim. A DigAI tem integrações nativas com **Gupy** e **Greenhouse**. Para outros sistemas, oferecemos integração via API REST e webhooks.",
    categoria: "integracoes",
    palavrasChave: ["ATS", "integração", "gupy", "greenhouse", "api"],
    tipo: "faq",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f14",
    pergunta: "O número de WhatsApp da DigAI é compartilhado?",
    resposta:
      "Depende do plano. No padrão, usamos um número compartilhado gerenciado pela DigAI. Com o número dedicado, você tem um número exclusivo integrado ao WhatsApp Business API da Meta.",
    categoria: "integracoes",
    palavrasChave: ["whatsapp", "número", "dedicado", "compartilhado", "meta"],
    tipo: "faq",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-i01",
    pergunta: "Como funciona a integração com o ATS via API?",
    resposta:
      "Via **token de API**. A DigAI envia e recebe dados automaticamente: ranking, notas e respostas dos candidatos são sincronizados com o ATS em tempo real.",
    categoria: "integracoes",
    palavrasChave: ["integração", "api", "token", "sincronizar", "ranking"],
    tipo: "tutorial",
    nivel: "avancado",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-i02",
    pergunta: "O que acontece se o candidato já existir no ATS?",
    resposta:
      "Nada muda. A integração verifica duplicatas automaticamente. O candidato não é criado novamente — os dados são atualizados no registro existente.",
    categoria: "integracoes",
    palavrasChave: ["candidato existente", "duplicata", "ATS", "sincronizar"],
    tipo: "faq",
    nivel: "avancado",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── API TÉCNICO — migrado de faq.ts ─────────────────────────────────────────
  {
    id: "ki-f15",
    pergunta: "Como funciona a autenticação da API?",
    resposta:
      "A API usa **Bearer Token**. Gere seu token em Configurações → Desenvolvedor → API Keys. Envie no header: `Authorization: Bearer {token}` em todas as requisições.",
    categoria: "api-tecnico",
    palavrasChave: ["api", "autenticação", "token", "bearer", "header"],
    tipo: "api",
    nivel: "avancado",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── RELATÓRIOS — migrados de faq.ts ─────────────────────────────────────────
  {
    id: "ki-f16",
    pergunta: "Onde encontro os relatórios de recrutamento?",
    resposta:
      "Acesse **Relatórios** no menu lateral. Você encontra dashboards de métricas, relatórios de funil, tempo de contratação, taxa de conversão e diversidade.",
    categoria: "relatorios",
    palavrasChave: ["relatórios", "dashboard", "métricas", "funil"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-f17",
    pergunta: "Como exportar dados para Excel?",
    resposta:
      "Em qualquer relatório ou lista de candidatos, clique em **Exportar** e selecione o formato (Excel, PDF ou CSV). Para exportações automáticas recorrentes, use a API.",
    categoria: "relatorios",
    palavrasChave: ["exportar", "excel", "csv", "download", "dados"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-rel01",
    pergunta: "Quais métricas a DigAI acompanha?",
    resposta:
      "A DigAI fornece métricas de **SLA** (tempo de resposta), **adesão** (taxa de participação dos candidatos), **assertividade** (qualidade dos aprovados) e **ROI** (retorno sobre o investimento em recrutamento).",
    categoria: "relatorios",
    palavrasChave: ["métricas", "sla", "adesão", "assertividade", "roi"],
    tipo: "faq",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-rel02",
    pergunta: "Como medir o ROI com a DigAI?",
    resposta:
      "O ROI é calculado pela **redução de tempo de triagem** (horas salvas) + **ganho de produtividade** (vagas preenchidas mais rápido). A DigAI exibe esse comparativo nos relatórios.",
    categoria: "relatorios",
    palavrasChave: ["roi", "retorno", "produtividade", "tempo", "redução"],
    tipo: "faq",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── ENTREVISTA INTELIGENTE — nova categoria ──────────────────────────────────
  {
    id: "ki-e01",
    pergunta: "Como funciona a entrevista inteligente da DigAI?",
    resposta:
      "A IA entrevista candidatos via **áudio pelo WhatsApp** e gera um ranking automático. O processo é assíncrono — o candidato responde quando quiser, no celular.",
    categoria: "entrevista-inteligente",
    palavrasChave: ["entrevista", "áudio", "whatsapp", "ranking", "assíncrono"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-e02",
    pergunta: "A IA realiza a entrevista sozinha?",
    resposta:
      "Sim, mas não substitui o recrutador. A IA conduz as perguntas e avalia as respostas. O recrutador recebe o ranking e faz a análise final, focando nos melhores candidatos.",
    categoria: "entrevista-inteligente",
    palavrasChave: ["IA autônoma", "recrutador", "entrevista", "ranking"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-e03",
    pergunta: "Posso personalizar as perguntas da entrevista?",
    resposta:
      "Sim. Você define as perguntas, o número de tentativas e o tempo máximo de resposta. A IA também sugere perguntas com base na descrição da vaga.",
    categoria: "entrevista-inteligente",
    palavrasChave: ["perguntas", "personalizar", "tentativas", "tempo de resposta"],
    tipo: "tutorial",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-e04",
    pergunta: "Como enviar candidatos para a entrevista inteligente?",
    resposta:
      "De forma **automática** via integração com ATS, ou **manual** disparando diretamente pelo painel da vaga. Você pode enviar por WhatsApp, e-mail ou ambos.",
    categoria: "entrevista-inteligente",
    palavrasChave: ["enviar candidatos", "disparo", "whatsapp", "e-mail", "integração"],
    tipo: "tutorial",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-e05",
    pergunta: "O candidato precisa baixar algum aplicativo para a entrevista?",
    resposta:
      "Não. O candidato responde diretamente pelo **WhatsApp**, sem instalar nada. Há follow-up automático para quem não responder.",
    categoria: "entrevista-inteligente",
    palavrasChave: ["candidato", "app", "whatsapp", "download", "follow-up"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-e06",
    pergunta: "Como é a experiência do candidato na entrevista?",
    resposta:
      "Rápida e assíncrona. O candidato recebe o convite, responde por **áudio ou texto** no WhatsApp, e recebe feedback ao final. Pode responder no horário que preferir.",
    categoria: "entrevista-inteligente",
    palavrasChave: ["experiência", "candidato", "áudio", "texto", "feedback", "assíncrono"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── RANKING E SCORES — nova categoria ───────────────────────────────────────
  {
    id: "ki-r01",
    pergunta: "Como funciona o ranking de candidatos?",
    resposta:
      "O ranking é **dinâmico** e baseado nas respostas de cada candidato cruzadas com os critérios da vaga. Cada critério tem um peso e gera uma nota de 0 a 10.",
    categoria: "ranking",
    palavrasChave: ["ranking", "dinâmico", "critérios", "nota", "score"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-r02",
    pergunta: "O que significa estar bem posicionado no ranking?",
    resposta:
      "Alta pontuação indica **alta probabilidade de ser o candidato ideal** para a vaga, com base nos critérios definidos. Quanto mais bem definidos os critérios, mais preciso o ranking.",
    categoria: "ranking",
    palavrasChave: ["posicionamento", "ranking", "pontuação", "candidato ideal"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-r03",
    pergunta: "A IA elimina candidatos do processo?",
    resposta:
      "Não. A DigAI **apenas classifica** — nunca elimina automaticamente. O recrutador sempre toma a decisão final de avançar ou reprovar.",
    categoria: "ranking",
    palavrasChave: ["eliminar", "reprovar", "ranking", "decisão", "recrutador"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-r04",
    pergunta: "Como melhorar a precisão do ranking?",
    resposta:
      "Defina critérios claros e específicos para a vaga. Critérios vagos geram rankings menos precisos. Revise e ajuste os pesos de cada critério após as primeiras triagens.",
    categoria: "ranking",
    palavrasChave: ["precisão", "critérios", "pesos", "ajuste", "qualidade"],
    tipo: "boas-praticas",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── BOAS PRÁTICAS — nova categoria ──────────────────────────────────────────
  {
    id: "ki-bp01",
    pergunta: "Como atrair candidatos mais qualificados?",
    resposta:
      "Configure bem a **descrição da vaga**, as **perguntas** e os **critérios**. Vagas com contexto claro atraem candidatos mais aderentes e geram rankings mais precisos.",
    categoria: "boas-praticas",
    palavrasChave: ["qualificados", "vaga", "perguntas", "critérios", "contexto"],
    tipo: "boas-praticas",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-bp02",
    pergunta: "Como melhorar a assertividade das triagens?",
    resposta:
      "Ajuste os **critérios** e as **perguntas** após cada processo. Analise quais candidatos avançaram e calibre os pesos do ranking conforme o perfil aprovado.",
    categoria: "boas-praticas",
    palavrasChave: ["assertividade", "critérios", "perguntas", "calibrar", "ajuste"],
    tipo: "boas-praticas",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-bp03",
    pergunta: "Como acelerar o ciclo de contratação com a DigAI?",
    resposta:
      "Use a DigAI em **todos os processos seletivos**, não apenas para vagas de alto volume. Quanto mais consistente o uso, menor o SLA de contratação.",
    categoria: "boas-praticas",
    palavrasChave: ["acelerar", "contratação", "sla", "consistência", "processos"],
    tipo: "boas-praticas",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-bp04",
    pergunta: "Quais são os erros mais comuns ao usar a DigAI?",
    resposta:
      "Os principais são: **falta de contexto** na descrição da vaga e **critérios mal definidos**. Isso resulta em rankings imprecisos. Dedique tempo à configuração inicial — ela define a qualidade de todo o processo.",
    categoria: "boas-praticas",
    palavrasChave: ["erros comuns", "contexto", "critérios", "configuração", "ranking"],
    tipo: "boas-praticas",
    nivel: "intermediario",
    updatedAt: "2026-03-18",
    publicado: true,
  },

  // ─── POSICIONAMENTO — nova categoria ─────────────────────────────────────────
  {
    id: "ki-p01",
    pergunta: "A DigAI substitui o recrutador?",
    resposta:
      "Não. A DigAI **remove o trabalho operacional** (triagem, avaliação, ranking) para que o recrutador foque no que importa: relacionamento, decisão estratégica e experiência do candidato.",
    categoria: "posicionamento",
    palavrasChave: ["substitui recrutador", "operacional", "IA", "recrutamento"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-p02",
    pergunta: "Para quais tipos de vaga a DigAI funciona?",
    resposta:
      "Para **todas as vagas**. Desde operacional e alto volume até posições estratégicas e especializadas. Quanto maior o volume, maior o ganho de eficiência.",
    categoria: "posicionamento",
    palavrasChave: ["tipos de vaga", "volume", "operacional", "estratégico", "funciona"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-p03",
    pergunta: "A DigAI funciona bem em processos de alto volume?",
    resposta:
      "Sim. Alto volume é o cenário ideal — a DigAI escala sem perda de qualidade. Quanto mais candidatos, maior o benefício comparado à triagem manual.",
    categoria: "posicionamento",
    palavrasChave: ["alto volume", "escala", "triagem", "benefício"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
  {
    id: "ki-p04",
    pergunta: "Qual é o principal ganho com a DigAI?",
    resposta:
      "**Economia de tempo** (triagem automatizada), **assertividade** (melhores candidatos identificados) e **redução de SLA** (da abertura à contratação mais rápida).",
    categoria: "posicionamento",
    palavrasChave: ["ganho", "economia", "tempo", "assertividade", "sla", "benefício"],
    tipo: "faq",
    nivel: "basico",
    updatedAt: "2026-03-18",
    publicado: true,
  },
];

export const knowledgeStoreInitial: KnowledgeStore = {
  items: knowledgeSeed,
  lastUpdated: "2026-03-18",
  version: SEED_VERSION,
};
