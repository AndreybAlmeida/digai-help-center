"use client";

import Brand from "@/components/shell/Brand";
import { useSearch } from "@/components/shell/SearchContext";
import { Icon } from "@/components/icons/Sprite";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Topbar({ onToggleRail }: { onToggleRail: () => void }) {
  const { query, setQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // ⌘K / Ctrl+K foca e seleciona; Esc limpa e desfoca.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setQuery]);

  function handleChange(v: string) {
    setQuery(v);
    // O grid de resultados vive na home. Buscar de outra rota sem levar o
    // usuário para lá deixaria o campo sem efeito visível.
    if (v && pathname !== "/") router.push("/");
  }

  return (
    <header className="topbar">
      <div className="tb-left">
        <button className="icon-btn" onClick={onToggleRail} aria-label="Alternar menu de categorias">
          <Icon name="menu" size={22} />
        </button>
        <Brand />
      </div>

      <div className="searchwrap">
        <div className="search">
          <Icon name="search" size={19} />
          <input
            ref={inputRef}
            id="q"
            type="search"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Buscar tutoriais, integrações, API…"
            aria-label="Buscar na Central de Ajuda"
          />
          <span className="kbd">⌘K</span>
        </div>
      </div>

      <div className="tb-right">
        <a className="btn btn-ana" href="/chat">
          <Icon name="spark" size={17} />
          <span className="lbl">Falar com a ANA</span>
        </a>
        <a className="btn btn-app" href="https://people.digai.ai" target="_blank" rel="noopener noreferrer">
          Acessar a DigAI
        </a>
      </div>
    </header>
  );
}
