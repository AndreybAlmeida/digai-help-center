"use client";

import ChatMessage from "@/components/chat/ChatMessage";
import ChatSuggestions from "@/components/chat/ChatSuggestions";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Article } from "@/types/content";
import { Bot, Loader2, MessageCircle, Send, Sparkles } from "lucide-react";
import { useState as useStateInner } from "react";

function AnaAvatarInline({ size }: { size: number }) {
  const [failed, setFailed] = useStateInner(false);
  if (failed) {
    return (
      <div style={{ width: size, height: size, borderRadius: "50%", background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Bot style={{ width: size * 0.5, height: size * 0.5, color: "#fff" }} />
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
      <img src="/ana-avatar.png" alt="ANA" onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
    </div>
  );
}
import { useEffect, useRef, useState } from "react";
import { SUPPORT_CONFIG } from "@/lib/config";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedArticles?: Article[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply || "Desculpe, não consegui processar. Tente novamente.",
          suggestedArticles: data.suggestedArticles,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Ocorreu um erro. Tente novamente ou entre em contato com o suporte.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = SUPPORT_CONFIG.whatsapp.enabled
    ? `https://wa.me/${SUPPORT_CONFIG.whatsapp.phone.replace(/\D/g, "")}?text=${encodeURIComponent(SUPPORT_CONFIG.whatsapp.message)}`
    : null;

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "24px 24px 0",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 56px)",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <Breadcrumb items={[{ label: "Chat com ANA" }]} />
      </div>

      {/* Chat Header */}
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <AnaAvatarInline size={36} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <p style={{ fontFamily: "'Switzer', sans-serif", fontSize: "14px", fontWeight: 700, color: "var(--fg)" }}>
                ANA
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3px",
                  padding: "1px 7px",
                  borderRadius: "100px",
                  background: "var(--brand-dim)",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "var(--brand)",
                }}
              >
                <Sparkles style={{ width: "8px", height: "8px" }} />
                IA
              </span>
            </div>
            <p style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#16a34a" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
              Online
            </p>
          </div>
        </div>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              fontSize: "12px",
              color: "var(--fg-muted)",
              textDecoration: "none",
            }}
          >
            <MessageCircle style={{ width: "13px", height: "13px", color: "#25D366" }} />
            Suporte humano
          </a>
        )}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "16px",
        }}
      >
        {messages.length === 0 ? (
          <ChatSuggestions onSelect={sendMessage} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                suggestedArticles={msg.suggestedArticles}
              />
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <AnaAvatarInline size={32} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 14px",
                    borderRadius: "4px 16px 16px 16px",
                    background: "var(--bg-muted)",
                    fontSize: "14px",
                    color: "var(--fg-muted)",
                  }}
                >
                  <Loader2 style={{ width: "14px", height: "14px", animation: "spin 1s linear infinite" }} />
                  ANA está pensando...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        style={{ padding: "12px 0 16px", display: "flex", gap: "8px", flexShrink: 0 }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva sua dúvida para a ANA..."
          disabled={loading}
          style={{
            flex: 1,
            height: "44px",
            padding: "0 16px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            fontSize: "14px",
            color: "var(--fg)",
            outline: "none",
            opacity: loading ? 0.5 : 1,
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            border: "none",
            background: "var(--brand)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: !input.trim() || loading ? "default" : "pointer",
            opacity: !input.trim() || loading ? 0.4 : 1,
            flexShrink: 0,
          }}
        >
          <Send style={{ width: "15px", height: "15px" }} />
        </button>
      </form>

      <p style={{ paddingBottom: "16px", textAlign: "center", fontSize: "11px", color: "var(--fg-subtle)", flexShrink: 0 }}>
        ANA pode cometer erros.{" "}
        <a href="/contato" style={{ color: "var(--brand)", textDecoration: "none" }}>
          Contate o suporte
        </a>{" "}
        para informações críticas.
      </p>
    </div>
  );
}
