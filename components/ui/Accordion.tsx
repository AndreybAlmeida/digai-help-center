"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  id?: string;
  footer?: React.ReactNode;
}

export function AccordionItem({ question, answer, defaultOpen = false, id, footer }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div id={id} style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "16px 0",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>
          {question}
        </span>
        <ChevronDown
          style={{
            width: "15px",
            height: "15px",
            flexShrink: 0,
            color: "var(--fg-muted)",
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "600px" : "0",
          transition: "max-height 0.25s ease",
          paddingBottom: open ? "16px" : "0",
        }}
      >
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--fg-muted)" }}>
          {answer}
        </p>
        {footer && open && (
          <div style={{ marginTop: "12px" }}>{footer}</div>
        )}
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
