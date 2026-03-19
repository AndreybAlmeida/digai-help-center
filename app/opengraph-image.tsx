import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DigAI — Central de Ajuda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 100px",
          background: "#0A0F1E",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,184,150,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,52,171,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #0034AB 0%, #00B896 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 8h8a8 8 0 0 1 0 16H8V8z" fill="white" fillOpacity="0.9" />
              <circle cx="22" cy="22" r="4" fill="#00B896" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0px" }}>
            <span style={{ fontSize: "42px", fontWeight: 800, color: "#0034AB", letterSpacing: "-1px" }}>
              dig
            </span>
            <span style={{ fontSize: "42px", fontWeight: 800, color: "#00B896", letterSpacing: "-1px" }}>
              AI
            </span>
          </div>
          <div
            style={{
              marginLeft: "8px",
              padding: "4px 12px",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              display: "flex",
            }}
          >
            Central de Ajuda
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginBottom: "24px",
            maxWidth: "800px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          The First Talent Intelligence{" "}
          <span style={{ color: "#00B896", display: "flex" }}>&nbsp;Platform</span>
          <span style={{ color: "rgba(255,255,255,0.4)", display: "flex" }}>&nbsp;in Brazil.</span>
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 400,
            letterSpacing: "-0.3px",
            display: "flex",
          }}
        >
          Documentação, tutoriais e suporte para a plataforma DigAI.
        </div>

        {/* URL badge */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "100px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 500,
          }}
        >
          digaihelp.com
        </div>
      </div>
    ),
    { ...size }
  );
}
