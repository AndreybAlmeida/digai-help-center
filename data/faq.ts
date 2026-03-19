import { FAQItem } from "@/types/content";

export const faqs: FAQItem[] = [
  // ─── PRIMEIROS PASSOS ────────────────────────────────────────────────────────
  {
    id: "f1",
    question: "Como faço para acessar a plataforma DigAI?",
    answer: "Acesse app.digai.ai com seu e-mail e senha. Caso seja seu primeiro acesso, use as credenciais enviadas pela equipe DigAI. Se precisar redefinir a senha, clique em 'Esqueci minha senha' na tela de login.",
    category: "primeiros-passos",
    tags: ["acesso", "login", "senha"],
  },
  {
    id: "f2",
    question: "Por onde devo começar na DigAI?",
    answer: "Recomendamos seguir o guia 'Comece por Aqui': 1) Assista ao tutorial completo da plataforma, 2) Crie seu primeiro Workspace, 3) Configure uma Triagem, 4) Compartilhe o link com candidatos. O tutorial interativo cobre tudo em menos de 30 minutos.",
    category: "primeiros-passos",
    tags: ["onboarding", "começar", "tutorial"],
  },
  {
    id: "f3",
    question: "Posso usar a DigAI no celular?",
    answer: "Sim. A interface da DigAI é responsiva e funciona em smartphones e tablets via navegador. Para a melhor experiência, recomendamos o uso no desktop para configurações iniciais e análise de candidatos.",
    category: "primeiros-passos",
    tags: ["mobile", "celular", "responsivo"],
  },
  {
    id: "f4",
    question: "Como adicionar novos usuários à conta?",
    answer: "Para incluir novos usuários na plataforma, é necessário solicitar ao time de Customer Success da DigAI. Entre em contato pelo suporte informando nome, e-mail e função do colaborador. Nossa equipe cuidará do acesso.",
    category: "primeiros-passos",
    tags: ["usuários", "convite", "equipe", "customer success", "cs"],
  },

  // ─── GESTÃO DE VAGAS ─────────────────────────────────────────────────────────
  {
    id: "f5",
    question: "Como mover um candidato de etapa no pipeline?",
    answer: "Na visão Kanban, arraste o card do candidato para a etapa desejada. Ou abra o perfil do candidato e clique em 'Avançar etapa'. O candidato recebe notificação automática por e-mail ao ser movido.",
    category: "gestao-de-vagas",
    tags: ["candidato", "etapa", "pipeline", "kanban"],
  },
  {
    id: "f6",
    question: "Como reprovar um candidato e enviar feedback?",
    answer: "Abra o perfil do candidato e clique em 'Reprovar'. Selecione o motivo e ative o envio de e-mail automático de feedback. O e-mail é profissional e pode ser personalizado em Configurações → Comunicação.",
    category: "gestao-de-vagas",
    tags: ["reprovar", "candidato", "feedback", "e-mail"],
  },
  {
    id: "f7",
    question: "Posso personalizar as etapas do processo seletivo?",
    answer: "Sim. Ao criar ou editar um Workspace, você pode adicionar, remover e renomear as etapas do funil de acordo com seu processo.",
    category: "gestao-de-vagas",
    tags: ["etapas", "funil", "processo seletivo", "personalizar"],
  },

  // ─── TRIAGEM INTELIGENTE ─────────────────────────────────────────────────────
  {
    id: "f8",
    question: "A IA gera perguntas de triagem automaticamente?",
    answer: "Sim. Ao criar uma triagem, a IA sugere perguntas baseadas no título e descrição da vaga. Você pode aceitar, editar ou substituir qualquer pergunta sugerida.",
    category: "triagem-inteligente",
    tags: ["perguntas", "IA", "triagem", "automático"],
  },
  {
    id: "f9",
    question: "Como a IA avalia as respostas dos candidatos?",
    answer: "A IA analisa cada resposta e gera: uma nota de 0 a 10, scores por critério (comunicação, aderência técnica, experiência) e um resumo textual da performance. Você pode ver essa avaliação no perfil de cada candidato.",
    category: "triagem-inteligente",
    tags: ["avaliação", "nota", "IA", "score"],
  },
  {
    id: "f10",
    question: "O candidato precisa instalar algum aplicativo para fazer a triagem?",
    answer: "Não. A triagem acontece 100% via navegador. O candidato acessa o link recebido, sem necessidade de download ou cadastro prévio.",
    category: "triagem-inteligente",
    tags: ["candidato", "acesso", "navegador", "link"],
  },

  // ─── HUNTING ─────────────────────────────────────────────────────────────────
  {
    id: "f11",
    question: "O que é a IA de Hunting?",
    answer: "A IA de Hunting é a busca global da DigAI que encontra candidatos em toda a base de talentos — incluindo pessoas que não se candidataram à vaga atual. Ela cruza perfis com os requisitos da posição e retorna candidatos compatíveis ranqueados por score.",
    category: "hunting",
    tags: ["hunting", "busca global", "IA", "sourcing"],
  },
  {
    id: "f12",
    question: "De onde vêm os candidatos da busca global?",
    answer: "A base de talentos da DigAI inclui candidatos de triagens anteriores, candidatos convidados e importados de integrações (Gupy, Greenhouse, etc.). Quanto mais sua empresa usa a DigAI, mais rica fica a base.",
    category: "hunting",
    tags: ["base de talentos", "candidatos", "hunting"],
  },

  // ─── INTEGRAÇÕES ─────────────────────────────────────────────────────────────
  {
    id: "f13",
    question: "A DigAI se integra com outros ATSs?",
    answer: "Sim. A DigAI tem integrações nativas com Gupy e Greenhouse. Para outros sistemas, oferecemos integração via API REST e webhooks. Consulte a documentação técnica ou fale com nosso suporte.",
    category: "integracoes",
    tags: ["ATS", "integração", "gupy", "greenhouse"],
  },
  {
    id: "f14",
    question: "O número de WhatsApp da DigAI é compartilhado com outros clientes?",
    answer: "Depende do seu plano. No plano padrão, usamos um número compartilhado gerenciado pela DigAI. Com o número dedicado, você tem um número exclusivo da sua empresa integrado ao WhatsApp Business API da Meta.",
    category: "integracoes",
    tags: ["whatsapp", "número", "dedicado", "compartilhado"],
  },
  {
    id: "f15",
    question: "Como funciona a autenticação da API?",
    answer: "A API usa Bearer Token. Gere seu token em Configurações → Desenvolvedor → API Keys. O token deve ser enviado no header Authorization de todas as requisições: 'Authorization: Bearer {token}'.",
    category: "api-tecnico",
    tags: ["api", "autenticação", "token", "bearer"],
  },

  // ─── RELATÓRIOS ──────────────────────────────────────────────────────────────
  {
    id: "f16",
    question: "Onde encontro os relatórios de recrutamento?",
    answer: "Acesse Relatórios no menu lateral. Você encontra dashboards de métricas, relatórios de funil, tempo de contratação, taxa de conversão e diversidade.",
    category: "relatorios",
    tags: ["relatórios", "dashboard", "métricas"],
  },
  {
    id: "f17",
    question: "Como exportar dados para Excel?",
    answer: "Em qualquer relatório ou lista de candidatos, clique em 'Exportar' e selecione o formato (Excel, PDF ou CSV). Para exportações automáticas recorrentes, use a API.",
    category: "relatorios",
    tags: ["exportar", "excel", "csv", "download"],
  },
];

export const getFAQsByCategory = (category: string): FAQItem[] =>
  faqs.filter((f) => f.category === category);

export const getAllFAQs = (): FAQItem[] => faqs;

export const searchFAQs = (query: string): FAQItem[] => {
  const q = query.toLowerCase();
  return faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.tags.some((t) => t.toLowerCase().includes(q))
  );
};
