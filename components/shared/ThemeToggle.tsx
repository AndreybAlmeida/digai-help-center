"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ width: "28px", height: "28px" }} />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        width: "28px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: "var(--fg-muted)",
        transition: "color 0.15s",
      }}
      aria-label="Alternar tema"
    >
      {theme === "dark" ? (
        <Sun style={{ width: "14px", height: "14px" }} />
      ) : (
        <Moon style={{ width: "14px", height: "14px" }} />
      )}
    </button>
  );
}
