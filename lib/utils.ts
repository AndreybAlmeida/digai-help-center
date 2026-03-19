import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export const difficultyLabel: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

export const difficultyColor: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export const contentTypeLabel: Record<string, string> = {
  article: "Artigo",
  tutorial: "Tutorial",
  video: "Vídeo",
  faq: "FAQ",
};

export const contentTypeIcon: Record<string, string> = {
  article: "FileText",
  tutorial: "GraduationCap",
  video: "Play",
  faq: "CircleHelp",
};

export const categoryColorMap: Record<string, string> = {
  "primeiros-passos": "blue",
  "gestao-de-vagas": "violet",
  integracoes: "emerald",
  relatorios: "amber",
  faq: "rose",
  novidades: "cyan",
};

export const nivelLabel: Record<string, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export const tipoLabel: Record<string, string> = {
  faq: "FAQ",
  tutorial: "Tutorial",
  api: "API",
  onboarding: "Onboarding",
  "boas-praticas": "Boas Práticas",
};
