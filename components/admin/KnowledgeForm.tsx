"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KnowledgeItem, KnowledgeCategorySlug, KnowledgeItemType, KnowledgeLevel } from "@/types/knowledge";
import { createItem, updateItem } from "@/lib/knowledgeStore";
import { nivelLabel, tipoLabel } from "@/lib/utils";

interface KnowledgeFormProps {
  initial?: KnowledgeItem;
}

const ALL_CATEGORIAS: KnowledgeCategorySlug[] = [
  "primeiros-passos", "gestao-de-vagas", "triagem-inteligente", "hunting",
  "integracoes", "relatorios", "api-tecnico", "faq",
  "entrevista-inteligente", "ranking", "boas-praticas", "posicionamento",
];

const ALL_TIPOS: KnowledgeItemType[] = ["faq", "tutorial", "api", "onboarding", "boas-praticas"];
const ALL_NIVEIS: KnowledgeLevel[] = ["basico", "intermediario", "avancado"];

export default function KnowledgeForm({ initial }: KnowledgeFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initial);

  const [pergunta, setPergunta] = useState(initial?.pergunta ?? "");
  const [resposta, setResposta] = useState(initial?.resposta ?? "");
  const [categoria, setCategoria] = useState<KnowledgeCategorySlug>(initial?.categoria ?? "primeiros-passos");
  const [tipo, setTipo] = useState<KnowledgeItemType>(initial?.tipo ?? "faq");
  const [nivel, setNivel] = useState<KnowledgeLevel>(initial?.nivel ?? "basico");
  const [palavrasChave, setPalavrasChave] = useState(initial?.palavrasChave?.join(", ") ?? "");
  const [fonte, setFonte] = useState(initial?.fonte ?? "");
  const [relacionados, setRelacionados] = useState(initial?.relacionados?.join(", ") ?? "");
  const [publicado, setPublicado] = useState(initial?.publicado ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (pergunta.trim().length < 10) e.pergunta = "Mínimo de 10 caracteres";
    if (resposta.trim().length < 20) e.resposta = "Mínimo de 20 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    const data = {
      pergunta: pergunta.trim(),
      resposta: resposta.trim(),
      categoria,
      tipo,
      nivel,
      palavrasChave: palavrasChave.split(",").map((k) => k.trim()).filter(Boolean),
      fonte: fonte.trim() || undefined,
      relacionados: relacionados.split(",").map((k) => k.trim()).filter(Boolean),
      publicado,
    };

    if (isEditing && initial) {
      updateItem(initial.id, data);
    } else {
      createItem(data);
    }

    setSaving(false);
    router.push("/admin/base");
    router.refresh();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    fontSize: "14px",
    color: "var(--fg)",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--fg)",
    marginBottom: "6px",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#991b1b",
    marginTop: "4px",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Pergunta */}
        <div>
          <label style={labelStyle}>Pergunta *</label>
          <input
            type="text"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            placeholder="Ex: Como faço para criar uma vaga?"
            style={{ ...inputStyle, borderColor: errors.pergunta ? "#ef4444" : "var(--border)" }}
          />
          {errors.pergunta && <p style={errorStyle}>{errors.pergunta}</p>}
        </div>

        {/* Resposta */}
        <div>
          <label style={labelStyle}>Resposta * (suporta Markdown)</label>
          <textarea
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            placeholder="Escreva a resposta em markdown…"
            rows={8}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6, borderColor: errors.resposta ? "#ef4444" : "var(--border)" }}
          />
          {errors.resposta && <p style={errorStyle}>{errors.resposta}</p>}
        </div>

        {/* Row: Categoria + Tipo + Nível */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Categoria *</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value as KnowledgeCategorySlug)} style={inputStyle}>
              {ALL_CATEGORIAS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Tipo *</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value as KnowledgeItemType)} style={inputStyle}>
              {ALL_TIPOS.map((t) => (
                <option key={t} value={t}>{tipoLabel[t]}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Nível *</label>
            <select value={nivel} onChange={(e) => setNivel(e.target.value as KnowledgeLevel)} style={inputStyle}>
              {ALL_NIVEIS.map((n) => (
                <option key={n} value={n}>{nivelLabel[n]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Palavras-chave */}
        <div>
          <label style={labelStyle}>Palavras-chave (separadas por vírgula)</label>
          <input
            type="text"
            value={palavrasChave}
            onChange={(e) => setPalavrasChave(e.target.value)}
            placeholder="Ex: login, acesso, senha, primeiro acesso"
            style={inputStyle}
          />
        </div>

        {/* Fonte */}
        <div>
          <label style={labelStyle}>Fonte (URL opcional)</label>
          <input
            type="url"
            value={fonte}
            onChange={(e) => setFonte(e.target.value)}
            placeholder="https://…"
            style={inputStyle}
          />
        </div>

        {/* Relacionados */}
        <div>
          <label style={labelStyle}>Relacionados (IDs separados por vírgula)</label>
          <input
            type="text"
            value={relacionados}
            onChange={(e) => setRelacionados(e.target.value)}
            placeholder="Ex: ki-f01, ki-ps03"
            style={inputStyle}
          />
        </div>

        {/* Publicado */}
        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={publicado}
            onChange={(e) => setPublicado(e.target.checked)}
            style={{ width: "16px", height: "16px", cursor: "pointer" }}
          />
          <span style={{ fontSize: "14px", color: "var(--fg)" }}>Publicado</span>
        </label>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "8px" }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: "9px 20px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              fontSize: "14px",
              color: "var(--fg)",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "9px 24px",
              borderRadius: "8px",
              border: "none",
              background: "var(--brand)",
              fontSize: "14px",
              fontWeight: 600,
              color: "#fff",
              cursor: saving ? "default" : "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Salvando…" : isEditing ? "Salvar alterações" : "Criar item"}
          </button>
        </div>
      </div>
    </form>
  );
}
