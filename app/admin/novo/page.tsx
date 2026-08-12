"use client";

import { useEffect, useState } from "react";
import KnowledgeForm from "@/components/admin/KnowledgeForm";

export default function NovoItemPage() {
  const [perguntaParam, setPerguntaParam] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("pergunta");
    if (p) setPerguntaParam(p);
  }, []);

  return (
    <div style={{ maxWidth: "720px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--fg)", marginBottom: "24px" }}>
        Novo item de conhecimento
      </h1>
      <KnowledgeForm initialPergunta={perguntaParam} />
    </div>
  );
}
