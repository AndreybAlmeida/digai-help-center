import { Category } from "@/types/content";

export const categories: Category[] = [
  {
    slug: "primeiros-passos",
    label: "Primeiros Passos",
    description: "Configure sua conta, crie seu primeiro Workspace e faça o tour pela plataforma.",
    icon: "Rocket",
    color: "blue",
  },
  {
    slug: "gestao-de-vagas",
    label: "Gestão de Vagas",
    description: "Crie vagas, gerencie candidatos, compartilhe links e acompanhe o pipeline.",
    icon: "Briefcase",
    color: "violet",
  },
  {
    slug: "triagem-inteligente",
    label: "Triagem Inteligente",
    description: "Configure triagens automatizadas com IA, defina perguntas e avalie respostas.",
    icon: "Cpu",
    color: "emerald",
  },
  {
    slug: "hunting",
    label: "Hunting com IA",
    description: "Encontre candidatos ativos e passivos com a busca global de Talent Intelligence.",
    icon: "SearchCheck",
    color: "indigo",
  },
  {
    slug: "integracoes",
    label: "Integrações",
    description: "Conecte Gupy, Greenhouse, LinkedIn, WhatsApp e outras ferramentas ao seu stack.",
    icon: "Plug",
    color: "teal",
  },
  {
    slug: "relatorios",
    label: "Relatórios e Análises",
    description: "Dashboards, métricas de funil, time to hire e exportação de dados.",
    icon: "BarChart3",
    color: "amber",
  },
  {
    slug: "api-tecnico",
    label: "API & Técnico",
    description: "Documentação da API REST, webhooks, autenticação e integrações via código.",
    icon: "Code2",
    color: "slate",
  },
  {
    slug: "faq",
    label: "Perguntas Frequentes",
    description: "Respostas objetivas para as dúvidas mais comuns da plataforma.",
    icon: "CircleHelp",
    color: "rose",
  },
  {
    slug: "entrevista-inteligente",
    label: "Entrevista Inteligente",
    description: "Configure entrevistas por áudio via WhatsApp, personalize perguntas e avalie respostas com IA.",
    icon: "Video",
    color: "purple",
  },
  {
    slug: "ranking",
    label: "Ranking e Scores",
    description: "Entenda como funciona o ranking dinâmico, pesos por critério e comparação de candidatos.",
    icon: "ListOrdered",
    color: "orange",
  },
  {
    slug: "boas-praticas",
    label: "Boas Práticas de RH",
    description: "Dicas para configurar vagas, critérios e perguntas que aumentam a assertividade.",
    icon: "BookOpen",
    color: "teal",
  },
  {
    slug: "posicionamento",
    label: "Sobre a DigAI",
    description: "Entenda o posicionamento da DigAI, diferenciais, LGPD e casos de uso.",
    icon: "Info",
    color: "slate",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
