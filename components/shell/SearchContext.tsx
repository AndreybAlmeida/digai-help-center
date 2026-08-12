"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface SearchCtx {
  /** Valor cru do input — atualiza a cada tecla. */
  query: string;
  setQuery: (v: string) => void;
}

const Ctx = createContext<SearchCtx | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const value = useMemo(() => ({ query, setQuery }), [query]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSearch(): SearchCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSearch precisa estar dentro de <SearchProvider>");
  return ctx;
}
