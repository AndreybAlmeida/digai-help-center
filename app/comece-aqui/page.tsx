"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import { onboardingSteps } from "@/data/onboarding";
import { getFAQsByCategory } from "@/data/faq";
import { AccordionItem } from "@/components/ui/Accordion";
import {
  BarChart3, Bot, Briefcase, Building2, CheckCircle2,
  Circle, Clock, Rocket, UserCircle, Users, Users2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ style?: React.CSSProperties }>> = {
  UserCircle, Building2, Users, Briefcase, Users2, BarChart3, Rocket,
};

export default function ComeceAquiPage() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const onboardingFAQs = getFAQsByCategory("primeiros-passos").slice(0, 4);
  const progress = Math.round((completed.size / onboardingSteps.length) * 100);

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px 64px" }}>
      <Breadcrumb items={[{ label: "Comece por Aqui" }]} />

      {/* Hero */}
      <div style={{ marginTop: "28px", marginBottom: "36px", textAlign: "center" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "var(--brand-dim)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <Rocket style={{ width: "22px", height: "22px", color: "var(--brand)" }} />
        </div>
        <h1
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "var(--fg)",
            letterSpacing: "-0.02em",
          }}
        >
          Comece por aqui
        </h1>
        <p style={{ marginTop: "8px", fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
          Um guia passo a passo para você configurar a DigAI e criar seu primeiro processo seletivo.
        </p>
      </div>

      {/* Progress */}
      <div
        style={{
          marginBottom: "28px",
          padding: "20px 20px",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--fg-muted)" }}>Seu progresso</p>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand)" }}>
            {completed.size}/{onboardingSteps.length} etapas
          </span>
        </div>
        <div
          style={{
            height: "6px",
            borderRadius: "100px",
            background: "var(--bg-muted)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: "100px",
              background: "var(--brand)",
              width: `${progress}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        {progress === 100 && (
          <p style={{ marginTop: "8px", fontSize: "12px", color: "#16a34a" }}>
            Parabéns! Você completou o guia de configuração.
          </p>
        )}
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "40px" }}>
        {onboardingSteps.map((step) => {
          const isCompleted = completed.has(step.id);
          const Icon = iconMap[step.icon] || Rocket;
          return (
            <div
              key={step.id}
              style={{
                display: "flex",
                gap: "16px",
                padding: "16px 18px",
                borderRadius: "12px",
                border: `1px solid ${isCompleted ? "rgba(32,189,90,0.25)" : "var(--border)"}`,
                background: isCompleted ? "rgba(32,189,90,0.04)" : "var(--surface)",
                transition: "border-color 0.15s, background 0.15s",
              }}
            >
              {/* Check button */}
              <button
                onClick={() => toggle(step.id)}
                style={{ marginTop: "2px", flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                aria-label={isCompleted ? "Marcar como pendente" : "Marcar como concluído"}
              >
                {isCompleted ? (
                  <CheckCircle2 style={{ width: "18px", height: "18px", color: "#16a34a" }} />
                ) : (
                  <Circle style={{ width: "18px", height: "18px", color: "var(--border-strong)" }} />
                )}
              </button>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: isCompleted ? "#16a34a" : "var(--fg)",
                        textDecoration: isCompleted ? "line-through" : "none",
                      }}
                    >
                      {step.order}. {step.title}
                    </p>
                    <p style={{ marginTop: "3px", fontSize: "13px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
                      {step.description}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      flexShrink: 0,
                      fontSize: "11px",
                      color: "var(--fg-subtle)",
                    }}
                  >
                    <Clock style={{ width: "11px", height: "11px" }} />
                    {step.estimatedTime}min
                  </div>
                </div>

                {step.articleSlug && !isCompleted && (
                  <Link
                    href={`/artigo/${step.articleSlug}`}
                    style={{
                      marginTop: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--brand)",
                      textDecoration: "none",
                    }}
                  >
                    Ver tutorial completo →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Primeiros Passos */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--fg)",
            letterSpacing: "-0.01em",
            marginBottom: "16px",
          }}
        >
          Dúvidas frequentes de novos usuários
        </h2>
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            padding: "0 20px",
          }}
        >
          {onboardingFAQs.map((faq) => (
            <AccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* AI CTA */}
      <div
        style={{
          padding: "28px 28px",
          borderRadius: "14px",
          background: "var(--brand)",
          textAlign: "center",
        }}
      >
        <Bot style={{ width: "28px", height: "28px", color: "rgba(255,255,255,0.7)", margin: "0 auto 12px" }} />
        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff" }}>
          Ainda com dúvidas?
        </h3>
        <p style={{ marginTop: "6px", fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
          ANA, a IA da DigAI, responde perguntas em tempo real e orienta você no processo de configuração.
        </p>
        <Link
          href="/chat"
          style={{
            marginTop: "18px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 22px",
            borderRadius: "8px",
            background: "#fff",
            color: "var(--brand)",
            fontSize: "13px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Falar com a ANA
        </Link>
      </div>
    </div>
  );
}
