"use client";

import CategoryRail from "@/components/shell/CategoryRail";
import Topbar from "@/components/shell/Topbar";
import { Icon } from "@/components/icons/Sprite";
import { SearchProvider } from "@/components/shell/SearchContext";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const MOBILE = 1000;
const COOKIE = "digai_rail";

export default function AppShell({ children }: { children: React.ReactNode }) {
  // Inicializa lendo o mesmo cookie que o script inline do layout já usou, para
  // o estado do React não discordar da classe que está no DOM e removê-la logo
  // após a hidratação. Nada do que este componente renderiza depende de `mini`,
  // então não há divergência de hidratação.
  const [mini, setMini] = useState(
    () => typeof document !== "undefined" && document.cookie.includes(`${COOKIE}=mini`)
  );
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle("rail-collapsed", mini);
  }, [mini]);

  useEffect(() => {
    document.body.classList.toggle("rail-open", open);
  }, [open]);

  // O drawer fecha ao navegar — senão fica cobrindo a página de destino.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const toggleRail = useCallback(() => {
    if (window.innerWidth <= MOBILE) {
      setOpen((v) => !v);
      return;
    }
    setMini((v) => {
      const next = !v;
      // Cookie, não localStorage: a página é server-rendered e o estado precisa
      // chegar já na primeira pintura.
      document.cookie = `${COOKIE}=${next ? "mini" : "full"}; path=/; max-age=31536000; samesite=lax`;
      return next;
    });
  }, []);

  // O /admin tem cabeçalho próprio e é área interna: o shell público (rail de
  // categorias, busca da Central, FAB da ANA) não faz sentido lá.
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <SearchProvider>
      <Topbar onToggleRail={toggleRail} />
      <CategoryRail />
      <div
        className="rail-scrim"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="shell">{children}</div>
      <a className="fab" href="/chat" aria-label="Falar com a ANA">
        <Icon name="spark" size={19} />
        <span className="lbl">ANA</span>
      </a>
    </SearchProvider>
  );
}
