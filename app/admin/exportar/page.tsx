"use client";

import { useEffect } from "react";
import { initStore } from "@/lib/knowledgeStore";
import ExportImport from "@/components/admin/ExportImport";

export default function ExportarPage() {
  useEffect(() => {
    initStore();
  }, []);

  return (
    <div style={{ maxWidth: "640px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--fg)", marginBottom: "24px" }}>
        Exportar / Publicar
      </h1>
      <ExportImport onRefresh={() => {}} />
    </div>
  );
}
