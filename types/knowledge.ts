export type KnowledgeItemType =
  | "faq"
  | "tutorial"
  | "api"
  | "onboarding"
  | "boas-praticas";

export type KnowledgeLevel = "basico" | "intermediario" | "avancado";

export type KnowledgeCategorySlug =
  | "primeiros-passos"
  | "gestao-de-vagas"
  | "triagem-inteligente"
  | "hunting"
  | "integracoes"
  | "relatorios"
  | "api-tecnico"
  | "faq"
  | "entrevista-inteligente"
  | "ranking"
  | "boas-praticas"
  | "posicionamento";

export interface KnowledgeItem {
  id: string;                    // "ki-f1", "ki-e01", etc.
  pergunta: string;
  resposta: string;              // suporta markdown
  categoria: KnowledgeCategorySlug;
  palavrasChave: string[];
  tipo: KnowledgeItemType;
  nivel: KnowledgeLevel;
  fonte?: string;                // URL de referência opcional
  updatedAt: string;             // "2026-03-18"
  publicado: boolean;
  relacionados?: string[];       // ids de outros KnowledgeItems
}

export interface KnowledgeStore {
  items: KnowledgeItem[];
  lastUpdated: string;
  version: number;               // incrementar ao mudar o seed
}
