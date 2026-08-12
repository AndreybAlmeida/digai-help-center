"use client";

import { CATEGORIES } from "@/lib/content/categories";
import type { Category } from "@/lib/content/types";
import type { ChipId } from "@/lib/filters";
import { useRef } from "react";

interface Chip {
  id: ChipId;
  label: string;
  cor?: string;
}

export default function ChipBar({
  categorias,
  value,
  onChange,
}: {
  categorias: Category[];
  value: ChipId;
  onChange: (id: ChipId) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const chips: Chip[] = [
    { id: "all", label: "Tudo" },
    { id: "novo", label: "Novidades" },
    ...categorias.map((c) => ({ id: c.slug as ChipId, label: CATEGORIES[c.slug].label, cor: CATEGORIES[c.slug].c1 })),
    { id: "iniciante", label: "Nível iniciante" },
    { id: "curto", label: "Até 5 min" },
  ];

  // ←/→ movem o foco entre os chips, como um tablist de verdade.
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const botoes = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const i = botoes.indexOf(document.activeElement as HTMLButtonElement);
    if (i === -1) return;
    e.preventDefault();
    const prox = e.key === "ArrowRight" ? (i + 1) % botoes.length : (i - 1 + botoes.length) % botoes.length;
    botoes[prox]?.focus();
  }

  return (
    <div className="chipbar">
      <div className="chips" role="tablist" aria-label="Filtrar por categoria" ref={ref} onKeyDown={onKeyDown}>
        {chips.map((c) => {
          const on = value === c.id;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              className={`chip${on ? " is-on" : ""}`}
              style={c.cor ? { ["--c" as string]: c.cor } : undefined}
              onClick={() => onChange(c.id)}
            >
              {c.cor && <span className="cdot" />}
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
