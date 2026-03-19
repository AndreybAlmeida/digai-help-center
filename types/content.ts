export type CategorySlug =
  | "primeiros-passos"
  | "gestao-de-vagas"
  | "triagem-inteligente"
  | "hunting"
  | "integracoes"
  | "relatorios"
  | "api-tecnico"
  | "faq"
  | "novidades"
  | "entrevista-inteligente"
  | "ranking"
  | "boas-praticas"
  | "posicionamento";

export type ContentType = "article" | "video" | "tutorial" | "faq";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Persona = "rh" | "gestor" | "admin" | "todos";

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: CategorySlug;
  contentType: ContentType;
  sourceUrl?: string;
  youtubeId?: string;
  driveUrl?: string;
  difficulty: Difficulty;
  targetPersona: Persona[];
  keywords: string[];
  tags: string[];
  readTime?: number;
  priority: number;
  updatedAt: string;
  relatedContent: string[];
  content?: string;
  published: boolean;
  featured?: boolean;
}

export interface Category {
  slug: CategorySlug;
  label: string;
  description: string;
  icon: string;
  color: string;
  articleCount?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: CategorySlug;
  tags: string[];
  helpful?: number;
}

export interface OnboardingStep {
  id: string;
  order: number;
  title: string;
  description: string;
  articleSlug?: string;
  estimatedTime: number;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedArticles?: Article[];
  timestamp: Date;
}
