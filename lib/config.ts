// ─── Configuração de Canais de Suporte ───────────────────────────────────────
// Edite este arquivo para configurar os canais de suporte da DigAI

export const SUPPORT_CONFIG = {
  whatsapp: {
    enabled: true,
    phone: "+5511983869977",
    message: "Olá! Preciso de ajuda com a DigAI.",
  },
  email: {
    enabled: true,
    address: "suporte@digai.ai", // ← Substituir pelo e-mail real de suporte
    subject: "Suporte DigAI - Central de Ajuda",
  },
  ticket: {
    enabled: false, // ← Ativar quando o sistema de tickets estiver disponível
    url: "",
  },
};

// ─── Configuração da IA ───────────────────────────────────────────────────────
// Ponto de conexão com a IA — edite a rota /api/chat/route.ts para conectar

export const AI_CONFIG = {
  enabled: true,
  name: "ANA",
  avatar: "/gai-ai-avatar.svg",
  welcomeMessage:
    "Olá! Sou a ANA, assistente da DigAI. Como posso ajudar você hoje? Pode me perguntar sobre vagas, candidatos, integrações ou qualquer funcionalidade da plataforma.",
  suggestedQuestions: [
    "Como criar minha primeira vaga?",
    "Como convidar usuários para a equipe?",
    "Como integrar com o LinkedIn?",
    "Como exportar relatórios?",
    "Como mover um candidato de etapa?",
  ],
};

// ─── Configuração do Site ─────────────────────────────────────────────────────

export const SITE_CONFIG = {
  name: "Central de Ajuda DigAI",
  description:
    "Tutoriais, artigos e suporte para você usar a DigAI com confiança.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  platformUrl: "https://people.digai.ai/pt-BR/auth/login-business?_gl=1*1m5sjgx*_gcl_au*MTcwOTg1Mzc1OS4xNzY5NjE3NDA3",
};
