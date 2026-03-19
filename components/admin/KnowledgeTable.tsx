"use client";

import { useState } from "react";
import Link from "next/link";
import { KnowledgeItem, KnowledgeCategorySlug, KnowledgeItemType, KnowledgeLevel } from "@/types/knowledge";
import { nivelLabel, tipoLabel } from "@/lib/utils";
import { deleteItem } from "@/lib/knowledgeStore";
import { Eye, EyeOff, Pencil } from "lucide-react";

interface KnowledgeTableProps {
  items: KnowledgeItem[];
  onRefresh: () => void;
}

const PAGE_SIZE = 20;

export default function KnowledgeTable({ items, onRefresh }: KnowledgeTableProps) {
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState<KnowledgeItemType | "">("");
  const [filterCat, setFilterCat] = useState<KnowledgeCategorySlug | "">("");
  const [filterNivel, setFilterNivel] = useState<KnowledgeLevel | "">("");
  const [filterStatus, setFilterStatus] = useState<"" | "published" | "draft">("");
  const [page, setPage] = useState(0);

  const filtered = items.filter((i) => {
    const q = search.toLowerCase();
    if (q && !i.pergunta.toLowerCase().includes(q) && !i.id.includes(q)) return false;
    if (filterTipo && i.tipo !== filterTipo) return false;
    if (filterCat && i.categoria !== filterCat) return false;
    if (filterNivel && i.nivel !== filterNivel) return false;
    if (filterStatus === "published" && !i.publicado) return false;
    if (filterStatus === "draft" && i.publicado) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const uniqueCats = [...new Set(items.map((i) => i.categoria))].sort();
  const uniqueTipos = [...new Set(items.map((i) => i.tipo))].sort();

  function handleTogglePublish(id: string) {
    deleteItem(id); // soft-delete = hide
    onRefresh();
  }

  const selectStyle: React.CSSProperties = {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    fontSize: "13px",
    color: "var(--fg)",
    cursor: "pointer",
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Buscar por pergunta ou ID…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          style={{
            flex: "1 1 240px",
            padding: "7px 12px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            fontSize: "13px",
            color: "var(--fg)",
            outline: "none",
          }}
        />
        <select value={filterTipo} onChange={(e) => { setFilterTipo(e.target.value as KnowledgeItemType | ""); setPage(0); }} style={selectStyle}>
          <option value="">Todos os tipos</option>
          {uniqueTipos.map((t) => (
            <option key={t} value={t}>{tipoLabel[t] ?? t}</option>
          ))}
        </select>
        <select value={filterCat} onChange={(e) => { setFilterCat(e.target.value as KnowledgeCategorySlug | ""); setPage(0); }} style={selectStyle}>
          <option value="">Todas as categorias</option>
          {uniqueCats.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={filterNivel} onChange={(e) => { setFilterNivel(e.target.value as KnowledgeLevel | ""); setPage(0); }} style={selectStyle}>
          <option value="">Todos os níveis</option>
          <option value="basico">{nivelLabel.basico}</option>
          <option value="intermediario">{nivelLabel.intermediario}</option>
          <option value="avancado">{nivelLabel.avancado}</option>
        </select>
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value as "" | "published" | "draft"); setPage(0); }} style={selectStyle}>
          <option value="">Todos os status</option>
          <option value="published">Publicado</option>
          <option value="draft">Rascunho</option>
        </select>
      </div>

      {/* Count */}
      <p style={{ fontSize: "13px", color: "var(--fg-muted)", marginBottom: "12px" }}>
        {filtered.length} {filtered.length === 1 ? "item" : "itens"}
      </p>

      {/* Table */}
      <div style={{ border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
              {["ID", "Pergunta", "Categoria", "Tipo", "Nível", "Status", "Ações"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "var(--fg-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "32px", textAlign: "center", color: "var(--fg-subtle)" }}>
                  Nenhum item encontrado
                </td>
              </tr>
            ) : (
              paged.map((item, idx) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: idx < paged.length - 1 ? "1px solid var(--border)" : "none",
                    background: "var(--surface)",
                  }}
                >
                  <td style={{ padding: "10px 14px", color: "var(--fg-subtle)", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                    {item.id}
                  </td>
                  <td style={{ padding: "10px 14px", color: "var(--fg)", maxWidth: "300px" }}>
                    <span style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.pergunta}
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px", color: "var(--fg-muted)", whiteSpace: "nowrap" }}>
                    {item.categoria}
                  </td>
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "100px",
                      background: "var(--brand-dim)",
                      color: "var(--brand)",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}>
                      {tipoLabel[item.tipo] ?? item.tipo}
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px", color: "var(--fg-muted)", whiteSpace: "nowrap" }}>
                    {nivelLabel[item.nivel] ?? item.nivel}
                  </td>
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "100px",
                      background: item.publicado ? "rgba(0,184,150,0.12)" : "rgba(0,0,0,0.06)",
                      color: item.publicado ? "#00896d" : "var(--fg-subtle)",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}>
                      {item.publicado ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link
                        href={`/admin/${item.id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "1px solid var(--border)",
                          background: "var(--surface)",
                          fontSize: "12px",
                          color: "var(--fg)",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Pencil style={{ width: "12px", height: "12px" }} />
                        Editar
                      </Link>
                      <button
                        onClick={() => handleTogglePublish(item.id)}
                        title={item.publicado ? "Ocultar" : "Publicar"}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "1px solid var(--border)",
                          background: "var(--surface)",
                          fontSize: "12px",
                          color: item.publicado ? "#991b1b" : "#00896d",
                          cursor: "pointer",
                        }}
                      >
                        {item.publicado ? (
                          <><EyeOff style={{ width: "12px", height: "12px" }} /> Ocultar</>
                        ) : (
                          <><Eye style={{ width: "12px", height: "12px" }} /> Ativar</>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
          <span style={{ fontSize: "13px", color: "var(--fg-muted)" }}>
            Página {page + 1} de {totalPages}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                fontSize: "13px",
                color: page === 0 ? "var(--fg-subtle)" : "var(--fg)",
                cursor: page === 0 ? "default" : "pointer",
              }}
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                fontSize: "13px",
                color: page === totalPages - 1 ? "var(--fg-subtle)" : "var(--fg)",
                cursor: page === totalPages - 1 ? "default" : "pointer",
              }}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
