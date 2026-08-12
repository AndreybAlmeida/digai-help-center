/**
 * Fonte única da identidade de cada categoria: capa do card, chip, dot do rail
 * e banda do CategoryCard leem daqui. Cor de categoria nunca é decidida no JSX.
 *
 * Regra obrigatória: teal (#3FB6A4) e mint (#66D8C6) são reservados a IA.
 * Nenhuma categoria com `ai: false` pode usá-los, em nenhum estado.
 */
export const CATEGORIES = {
  "primeiros-passos":       { label: "Primeiros Passos",       icon: "rocket",    c1: "#0B1470", c2: "#121896", ai: false },
  "gestao-de-vagas":        { label: "Gestão de Vagas",        icon: "briefcase", c1: "#0C2A84", c2: "#2C4CB4", ai: false },
  "triagem-inteligente":    { label: "Triagem Inteligente",    icon: "funnel",    c1: "#0A6A5C", c2: "#3FB6A4", ai: true  },
  "hunting":                { label: "Hunting com IA",         icon: "radar",     c1: "#0E3A34", c2: "#3FB6A4", ai: true  },
  "integracoes":            { label: "Integrações",            icon: "plug",      c1: "#243C9C", c2: "#4A64C8", ai: false },
  "api-tecnico":            { label: "API & Técnico",          icon: "code",      c1: "#242C55", c2: "#364272", ai: false },
  "entrevista-inteligente": { label: "Entrevista Inteligente", icon: "mic",       c1: "#0A6A5C", c2: "#3FB6A4", ai: true  },
  "ranking":                { label: "Ranking e Scores",       icon: "trophy",    c1: "#0C2A84", c2: "#2C4CB4", ai: false },
  "relatorios":             { label: "Relatórios e Análises",  icon: "chart",     c1: "#243C9C", c2: "#4A64C8", ai: false },
  "boas-praticas":          { label: "Boas Práticas de RH",    icon: "bulb",      c1: "#364272", c2: "#5A6AA8", ai: false },
  "faq":                    { label: "Perguntas Frequentes",   icon: "help",      c1: "#1B3390", c2: "#3B57B8", ai: false },
  "posicionamento":         { label: "Sobre a DigAI",          icon: "building",  c1: "#0B1470", c2: "#121896", ai: false },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export const CATEGORY_ORDER = Object.keys(CATEGORIES) as CategorySlug[];

/** Descrições exibidas no CategoryCard e na página da categoria. */
export const CATEGORY_DESCRIPTIONS: Record<CategorySlug, string> = {
  "primeiros-passos": "Configure a conta, crie seu primeiro Workspace e faça o tour pela plataforma.",
  "gestao-de-vagas": "Crie vagas, gerencie candidatos, compartilhe links e acompanhe o pipeline.",
  "triagem-inteligente": "Triagens automatizadas com IA: perguntas, critérios e avaliação das respostas.",
  "hunting": "Encontre candidatos ativos e passivos com a busca global de Talent Intelligence.",
  "integracoes": "Conecte Gupy, Greenhouse, LinkedIn, WhatsApp e outras ferramentas ao seu stack.",
  "api-tecnico": "API REST, webhooks, autenticação e integrações feitas via código.",
  "entrevista-inteligente": "Entrevistas por áudio no WhatsApp, perguntas personalizadas e avaliação com IA.",
  "ranking": "Ranking dinâmico, pesos por critério e comparação entre candidatos.",
  "relatorios": "Dashboards, métricas de funil, time to hire e exportação de dados.",
  "boas-praticas": "Como escrever vagas, critérios e perguntas que aumentam a assertividade.",
  "faq": "Respostas curtas para as dúvidas mais comuns da plataforma.",
  "posicionamento": "Posicionamento, diferenciais, LGPD e casos de uso da plataforma.",
};

export const isCategorySlug = (v: string): v is CategorySlug => v in CATEGORIES;

export const getCategory = (slug: CategorySlug) => CATEGORIES[slug];

/** Gradiente da capa/banda. Sempre 135deg — não variar por componente. */
export const coverGradient = (slug: CategorySlug) => {
  const { c1, c2 } = CATEGORIES[slug];
  return `linear-gradient(135deg, ${c1}, ${c2})`;
};
