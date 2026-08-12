// ─── Configuração de Canais de Suporte ───────────────────────────────────────
// Edite este arquivo para configurar os canais de suporte da DigAI

// Não existe canal de acionamento direto de CS por WhatsApp aqui, e não deve
// voltar a existir: esta Central de Ajuda é pública, então um número exposto
// vira porta de entrada para candidatos pedindo status de candidatura. O
// suporte ao cliente acontece no grupo de WhatsApp da conta, com o CS
// responsável — ver SUPPORT_CHANNEL_NOTE.
export const SUPPORT_CONFIG = {
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

/** Texto único de orientação sobre o canal correto de suporte ao cliente. */
export const SUPPORT_CHANNEL_NOTE = {
  title: "Suporte ao cliente é no grupo da sua conta",
  description:
    "Dúvidas, solicitações e problemas devem ser tratados no grupo de WhatsApp da sua conta, onde o CS responsável pela DigAI já está. É por lá que o time acompanha o histórico e responde.",
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
