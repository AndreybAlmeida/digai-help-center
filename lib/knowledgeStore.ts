"use client";

import { knowledgeSeed, knowledgeStoreInitial, SEED_VERSION } from "@/data/knowledgeBase";
import { KnowledgeItem, KnowledgeCategorySlug, KnowledgeItemType, KnowledgeStore } from "@/types/knowledge";

const STORAGE_KEY = "digai_knowledge";

// ─── Internal helpers ────────────────────────────────────────────────────────

function readStore(): KnowledgeStore {
  if (typeof window === "undefined") return knowledgeStoreInitial;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return knowledgeStoreInitial;
    return JSON.parse(raw) as KnowledgeStore;
  } catch {
    return knowledgeStoreInitial;
  }
}

function writeStore(store: KnowledgeStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage might be full or unavailable
  }
}

function generateId(): string {
  return `ki-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

// ─── Initialization ──────────────────────────────────────────────────────────

/**
 * Call once on app boot (inside useEffect).
 * - First visit: seeds localStorage with knowledgeSeed
 * - Subsequent visits: if SEED_VERSION > stored version, appends new seed items
 *   without overwriting user edits to existing items.
 */
export function initStore(): void {
  if (typeof window === "undefined") return;

  const stored = readStore();

  if (stored.version >= SEED_VERSION && localStorage.getItem(STORAGE_KEY)) {
    // Already initialized — check if there are new seed items to append
    const storedIds = new Set(stored.items.map((i) => i.id));
    const newSeedItems = knowledgeSeed.filter((i) => !storedIds.has(i.id));
    if (newSeedItems.length === 0) return;

    writeStore({
      ...stored,
      items: [...stored.items, ...newSeedItems],
      lastUpdated: new Date().toISOString().slice(0, 10),
      version: SEED_VERSION,
    });
    return;
  }

  // First init or version bump — seed the store
  writeStore(knowledgeStoreInitial);
}

// ─── Read ────────────────────────────────────────────────────────────────────

export function getAllItems(): KnowledgeItem[] {
  return readStore().items;
}

export function getPublishedItems(): KnowledgeItem[] {
  return readStore().items.filter((i) => i.publicado);
}

export function getItemById(id: string): KnowledgeItem | undefined {
  return readStore().items.find((i) => i.id === id);
}

export function getItemsByCategoria(cat: KnowledgeCategorySlug): KnowledgeItem[] {
  return readStore().items.filter((i) => i.categoria === cat);
}

export function getItemsByTipo(tipo: KnowledgeItemType): KnowledgeItem[] {
  return readStore().items.filter((i) => i.tipo === tipo);
}

// ─── Search ──────────────────────────────────────────────────────────────────

/**
 * Scores items against a query string.
 * Boost: pergunta match (+3) > palavrasChave match (+2) > resposta match (+1)
 * Returns items sorted by score desc, score > 0 only.
 */
export function searchKnowledge(query: string, limit = 10): KnowledgeItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const store = readStore();

  const scored = store.items
    .filter((i) => i.publicado)
    .map((item) => {
      let score = 0;
      if (item.pergunta.toLowerCase().includes(q)) score += 3;
      if (item.palavrasChave.some((k) => k.toLowerCase().includes(q))) score += 2;
      if (item.resposta.toLowerCase().includes(q)) score += 1;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ item }) => item);
}

// ─── Write ───────────────────────────────────────────────────────────────────

export function createItem(
  data: Omit<KnowledgeItem, "id" | "updatedAt">
): KnowledgeItem {
  const store = readStore();
  const newItem: KnowledgeItem = {
    ...data,
    id: generateId(),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  writeStore({
    ...store,
    items: [...store.items, newItem],
    lastUpdated: new Date().toISOString().slice(0, 10),
  });
  return newItem;
}

export function updateItem(
  id: string,
  patch: Partial<Omit<KnowledgeItem, "id">>
): KnowledgeItem | null {
  const store = readStore();
  const idx = store.items.findIndex((i) => i.id === id);
  if (idx === -1) return null;

  const updated: KnowledgeItem = {
    ...store.items[idx],
    ...patch,
    id,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  const items = [...store.items];
  items[idx] = updated;
  writeStore({ ...store, items, lastUpdated: new Date().toISOString().slice(0, 10) });
  return updated;
}

/** Soft-delete: sets publicado = false */
export function deleteItem(id: string): void {
  updateItem(id, { publicado: false });
}

/** Hard-delete: removes the item entirely */
export function hardDeleteItem(id: string): void {
  const store = readStore();
  writeStore({
    ...store,
    items: store.items.filter((i) => i.id !== id),
    lastUpdated: new Date().toISOString().slice(0, 10),
  });
}

// ─── Export / Import ─────────────────────────────────────────────────────────

export function exportStore(): string {
  return JSON.stringify(readStore(), null, 2);
}

export function importStore(json: string): {
  success: boolean;
  count: number;
  errors: string[];
} {
  const errors: string[] = [];
  let parsed: KnowledgeStore;

  try {
    parsed = JSON.parse(json) as KnowledgeStore;
  } catch {
    return { success: false, count: 0, errors: ["JSON inválido"] };
  }

  if (!Array.isArray(parsed.items)) {
    return { success: false, count: 0, errors: ["Campo 'items' ausente ou inválido"] };
  }

  const validItems: KnowledgeItem[] = [];
  parsed.items.forEach((item, idx) => {
    if (!item.id || !item.pergunta || !item.resposta) {
      errors.push(`Item ${idx}: campos obrigatórios ausentes (id, pergunta, resposta)`);
    } else {
      validItems.push(item as KnowledgeItem);
    }
  });

  if (validItems.length === 0) {
    return { success: false, count: 0, errors };
  }

  writeStore({
    items: validItems,
    lastUpdated: new Date().toISOString().slice(0, 10),
    version: parsed.version ?? SEED_VERSION,
  });

  return { success: true, count: validItems.length, errors };
}

export function resetToSeed(): void {
  writeStore(knowledgeStoreInitial);
}

export function getStoreStats() {
  const store = readStore();
  const total = store.items.length;
  const published = store.items.filter((i) => i.publicado).length;
  const drafts = total - published;
  const categories = new Set(store.items.map((i) => i.categoria)).size;
  return { total, published, drafts, categories };
}
