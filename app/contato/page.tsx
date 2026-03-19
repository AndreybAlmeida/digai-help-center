import Breadcrumb from "@/components/layout/Breadcrumb";
import { SUPPORT_CONFIG } from "@/lib/config";
import { Bot, Clock, ExternalLink, Mail, MessageCircle, Ticket } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato e Suporte",
  description: "Entre em contato com a equipe de suporte da DigAI.",
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    description: "Atendimento rápido pelo WhatsApp Business. Ideal para dúvidas urgentes.",
    detail: "Resposta em até 2 horas úteis",
    cta: "Abrir WhatsApp",
    iconBg: "rgba(37,211,102,0.1)",
    iconColor: "#25D366",
    btnBg: "#25D366",
    btnColor: "#fff",
    href: SUPPORT_CONFIG.whatsapp.enabled
      ? `https://wa.me/${SUPPORT_CONFIG.whatsapp.phone.replace(/\D/g, "")}?text=${encodeURIComponent(SUPPORT_CONFIG.whatsapp.message)}`
      : null,
  },
  {
    icon: Mail,
    label: "E-mail",
    description: "Envie um e-mail detalhado com seu problema, prints e informações relevantes.",
    detail: "Resposta em até 24 horas úteis",
    cta: "Enviar e-mail",
    iconBg: "var(--brand-dim)",
    iconColor: "var(--brand)",
    btnBg: "var(--brand)",
    btnColor: "#fff",
    href: SUPPORT_CONFIG.email.enabled
      ? `mailto:${SUPPORT_CONFIG.email.address}?subject=${encodeURIComponent(SUPPORT_CONFIG.email.subject)}`
      : null,
  },
  {
    icon: Ticket,
    label: "Abrir Ticket",
    description: "Para problemas técnicos complexos. Acompanhe o status em tempo real.",
    detail: "Em breve",
    cta: "Em breve",
    iconBg: "rgba(139,92,246,0.08)",
    iconColor: "#7c3aed",
    btnBg: "var(--bg-muted)",
    btnColor: "var(--fg-muted)",
    href: null,
    disabled: true,
  },
];

export default function ContatoPage() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px 64px" }}>
      <Breadcrumb items={[{ label: "Contato e Suporte" }]} />

      <div style={{ marginTop: "28px", marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "26px",
            fontWeight: 700,
            color: "var(--fg)",
            letterSpacing: "-0.02em",
          }}
        >
          Canais de suporte
        </h1>
        <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--fg-muted)" }}>
          Antes de entrar em contato, tente{" "}
          <Link href="/" style={{ color: "var(--brand)", textDecoration: "none" }}>
            buscar na Central de Ajuda
          </Link>
          .
        </p>
      </div>

      {/* Channels */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <div
              key={ch.label}
              style={{
                display: "flex",
                gap: "16px",
                padding: "18px 20px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: ch.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon style={{ width: "18px", height: "18px", color: ch.iconColor }} />
              </div>
              <div style={{ flex: 1, minWidth: "160px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>
                  {ch.label}
                </h3>
                <p style={{ marginTop: "2px", fontSize: "12px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
                  {ch.description}
                </p>
                <p style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--fg-subtle)" }}>
                  <Clock style={{ width: "10px", height: "10px" }} />
                  {ch.detail}
                </p>
              </div>
              {ch.href && !ch.disabled ? (
                <a
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: ch.btnBg,
                    color: ch.btnColor,
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  {ch.cta}
                  <ExternalLink style={{ width: "12px", height: "12px" }} />
                </a>
              ) : (
                <button
                  disabled
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: ch.btnBg,
                    color: ch.btnColor,
                    fontSize: "13px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "not-allowed",
                    flexShrink: 0,
                  }}
                >
                  {ch.cta}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Horário */}
      <div
        style={{
          marginBottom: "24px",
          padding: "20px 20px",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <h3 style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)", marginBottom: "12px" }}>
          Horário de atendimento
        </h3>
        {[
          { day: "Segunda a Sexta", hours: "09:00 às 18:00" },
          { day: "Sábado", hours: "09:00 às 13:00" },
          { day: "Domingo e Feriados", hours: "Indisponível" },
        ].map((item, i, arr) => (
          <div
            key={item.day}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "var(--fg-muted)" }}>{item.day}</span>
            <span style={{ fontWeight: 500, color: "var(--fg)" }}>{item.hours}</span>
          </div>
        ))}
      </div>

      {/* ANA CTA */}
      <div
        style={{
          padding: "20px 20px",
          borderRadius: "12px",
          border: "1px solid var(--border-strong)",
          background: "var(--bg-subtle)",
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "var(--brand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Bot style={{ width: "18px", height: "18px", color: "#fff" }} />
        </div>
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>
            Resposta imediata? Experimente a ANA
          </h3>
          <p style={{ marginTop: "4px", fontSize: "13px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
            ANA, assistente da DigAI, responde dúvidas sobre a plataforma em segundos, 24h por dia.
          </p>
          <Link
            href="/chat"
            style={{
              marginTop: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              borderRadius: "8px",
              background: "var(--brand)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Falar com a ANA agora
          </Link>
        </div>
      </div>
    </div>
  );
}
