"use client";

import { MessageCircle } from "lucide-react";
import { SUPPORT_CONFIG } from "@/lib/config";

export default function WhatsAppButton() {
  if (!SUPPORT_CONFIG.whatsapp.enabled) return null;

  const { phone, message } = SUPPORT_CONFIG.whatsapp;
  const url = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 18px",
        borderRadius: "100px",
        background: "#25D366",
        color: "#fff",
        fontSize: "13px",
        fontWeight: 600,
        textDecoration: "none",
        boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(37,211,102,0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(37,211,102,0.35)";
      }}
    >
      <MessageCircle style={{ width: "18px", height: "18px" }} />
      <span>Falar com suporte</span>
    </a>
  );
}
