"use client";

import React from "react";
import ArticleCard from "@/components/article/ArticleCard";
import { Article } from "@/types/content";
import { Bot, User } from "lucide-react";
import { useState } from "react";

function AnaSmall() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Bot style={{ width: 14, height: 14, color: "#fff" }} />
      </div>
    );
  }
  return (
    <img
      src="/ana-avatar.png"
      alt="ANA"
      onError={() => setFailed(true)}
      style={{ width: 32, height: 32, objectFit: "cover", objectPosition: "top", borderRadius: "50%" }}
    />
  );
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  suggestedArticles?: Article[];
}

function renderChatMarkdown(text: string): React.ReactNode[] {
  // Split on numbered lists, bold, and markdown links
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];

  lines.forEach((line, li) => {
    if (li > 0) result.push(<br key={`br-${li}`} />);

    // Tokenize: **bold**, [label](url), plain text
    const tokens = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    tokens.forEach((token, ti) => {
      if (token.startsWith("**") && token.endsWith("**")) {
        result.push(
          <strong key={`${li}-${ti}`} style={{ fontWeight: 600 }}>
            {token.slice(2, -2)}
          </strong>
        );
      } else {
        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          result.push(
            <a
              key={`${li}-${ti}`}
              href={linkMatch[2]}
              target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
              rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "underline" }}
            >
              {linkMatch[1]}
            </a>
          );
        } else {
          result.push(<span key={`${li}-${ti}`}>{token}</span>);
        }
      }
    });
  });

  return result;
}

export default function ChatMessage({ role, content, suggestedArticles }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div style={{ display: "flex", gap: "12px", flexDirection: isUser ? "row-reverse" : "row" }}>
      {/* Avatar */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isUser ? "var(--brand)" : "transparent",
          overflow: "hidden",
        }}
      >
        {isUser ? (
          <User style={{ width: "14px", height: "14px", color: "#fff" }} />
        ) : (
          <AnaSmall />
        )}
      </div>

      {/* Bubble */}
      <div style={{ maxWidth: "80%", display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
        <div
          style={{
            padding: "10px 14px",
            borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
            fontSize: "14px",
            lineHeight: 1.6,
            background: isUser ? "var(--brand)" : "var(--bg-muted)",
            color: isUser ? "#fff" : "var(--fg)",
          }}
        >
          {renderChatMarkdown(content)}
        </div>

        {/* Suggested articles */}
        {!isUser && suggestedArticles && suggestedArticles.length > 0 && (
          <div style={{ marginTop: "12px", width: "100%" }}>
            <p style={{ marginBottom: "8px", fontSize: "11px", fontWeight: 500, color: "var(--fg-subtle)" }}>
              Artigos relacionados:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {suggestedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
