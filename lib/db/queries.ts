import { getPool } from "./client";

export interface DocumentRow {
  id: string;
  filename: string;
  mime_type: string;
  blob_url: string;
  size_bytes: number;
  status: "processando" | "concluido" | "erro";
  error_message: string | null;
  chunks_count: number;
  faqs_generated_count: number;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChunkRow {
  id: string;
  document_id: string;
  chunk_index: number;
  content: string;
  page_number: number | null;
  token_count: number | null;
  created_at: string;
}

export interface GeneratedFaqRow {
  id: string;
  document_id: string | null;
  pergunta: string;
  resposta: string;
  categoria: string;
  tipo: string;
  nivel: string;
  palavras_chave: string[];
  status: string;
  created_at: string;
}

export async function insertDocument(doc: {
  filename: string;
  mime_type: string;
  blob_url: string;
  size_bytes: number;
  uploaded_by?: string;
}): Promise<DocumentRow> {
  const pool = getPool();
  const { rows } = await pool.query(
    `INSERT INTO documents (filename, mime_type, blob_url, size_bytes, status, uploaded_by)
     VALUES ($1, $2, $3, $4, 'processando', $5)
     RETURNING *`,
    [doc.filename, doc.mime_type, doc.blob_url, doc.size_bytes, doc.uploaded_by ?? null]
  );
  return rows[0] as DocumentRow;
}

export async function updateDocumentStatus(
  id: string,
  status: "processando" | "concluido" | "erro",
  extras?: { error_message?: string; chunks_count?: number; faqs_generated_count?: number }
): Promise<void> {
  const pool = getPool();
  await pool.query(
    `UPDATE documents
     SET status = $1,
         error_message = $2,
         chunks_count = COALESCE($3, chunks_count),
         faqs_generated_count = COALESCE($4, faqs_generated_count),
         updated_at = NOW()
     WHERE id = $5`,
    [
      status,
      extras?.error_message ?? null,
      extras?.chunks_count ?? null,
      extras?.faqs_generated_count ?? null,
      id,
    ]
  );
}

export async function getDocuments(page = 1, pageSize = 20): Promise<{ rows: DocumentRow[]; total: number }> {
  const pool = getPool();
  const offset = (page - 1) * pageSize;
  const { rows } = await pool.query(
    `SELECT * FROM documents ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
    [pageSize, offset]
  );
  const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM documents`);
  return { rows: rows as DocumentRow[], total: countResult.rows[0].total };
}

export async function getDocumentById(id: string): Promise<DocumentRow | null> {
  const pool = getPool();
  const { rows } = await pool.query(`SELECT * FROM documents WHERE id = $1`, [id]);
  return (rows[0] as DocumentRow) ?? null;
}

export async function deleteDocument(id: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM documents WHERE id = $1`, [id]);
}

export async function insertChunks(
  chunks: Array<{
    document_id: string;
    chunk_index: number;
    content: string;
    embedding: number[];
    page_number?: number;
    token_count?: number;
  }>
): Promise<void> {
  const pool = getPool();
  for (const chunk of chunks) {
    const embeddingStr = `[${chunk.embedding.join(",")}]`;
    await pool.query(
      `INSERT INTO document_chunks (document_id, chunk_index, content, embedding, page_number, token_count)
       VALUES ($1, $2, $3, $4::vector, $5, $6)`,
      [chunk.document_id, chunk.chunk_index, chunk.content, embeddingStr, chunk.page_number ?? null, chunk.token_count ?? null]
    );
  }
}

export async function deleteChunksByDocumentId(documentId: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM document_chunks WHERE document_id = $1`, [documentId]);
}

export async function searchChunksByEmbedding(
  queryEmbedding: number[],
  limit = 3
): Promise<Array<{ content: string; filename: string; page_number: number | null; score: number }>> {
  const pool = getPool();
  const embeddingStr = `[${queryEmbedding.join(",")}]`;
  const { rows } = await pool.query(
    `SELECT
       dc.content,
       d.filename,
       dc.page_number,
       1 - (dc.embedding <=> $1::vector) AS score
     FROM document_chunks dc
     JOIN documents d ON d.id = dc.document_id
     WHERE d.status = 'concluido'
     ORDER BY dc.embedding <=> $1::vector
     LIMIT $2`,
    [embeddingStr, limit]
  );
  return rows as Array<{ content: string; filename: string; page_number: number | null; score: number }>;
}

export async function insertGeneratedFaqs(faqs: Array<Omit<GeneratedFaqRow, "created_at">>): Promise<void> {
  const pool = getPool();
  for (const faq of faqs) {
    await pool.query(
      `INSERT INTO generated_faqs (id, document_id, pergunta, resposta, categoria, tipo, nivel, palavras_chave, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO UPDATE
         SET pergunta = EXCLUDED.pergunta,
             resposta = EXCLUDED.resposta,
             categoria = EXCLUDED.categoria,
             tipo = EXCLUDED.tipo,
             nivel = EXCLUDED.nivel,
             palavras_chave = EXCLUDED.palavras_chave,
             status = EXCLUDED.status`,
      [faq.id, faq.document_id ?? null, faq.pergunta, faq.resposta, faq.categoria, faq.tipo, faq.nivel, faq.palavras_chave, faq.status]
    );
  }
}

export async function deleteFaqsByDocumentId(documentId: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM generated_faqs WHERE document_id = $1`, [documentId]);
}

export async function getGeneratedFaqsByDocumentId(documentId: string): Promise<GeneratedFaqRow[]> {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT * FROM generated_faqs WHERE document_id = $1 ORDER BY created_at`,
    [documentId]
  );
  return rows as GeneratedFaqRow[];
}

export async function getPublishedGeneratedFaqs(): Promise<GeneratedFaqRow[]> {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT * FROM generated_faqs WHERE status = 'Publicado' ORDER BY created_at`
  );
  return rows as GeneratedFaqRow[];
}

export async function savePublishedKnowledge(items: unknown[]): Promise<void> {
  const pool = getPool();
  await pool.query(
    `INSERT INTO knowledge_published (id, items, updated_at)
     VALUES ('singleton', $1::jsonb, NOW())
     ON CONFLICT (id) DO UPDATE SET items = $1::jsonb, updated_at = NOW()`,
    [JSON.stringify(items)]
  );
}

// ─── Unanswered Questions ──────────────────────────────────────────────────────

export interface UnansweredQuestionRow {
  id: string;
  pergunta: string;
  created_at: string;
  resolved: boolean;
  resolved_at: string | null;
  notes: string | null;
}

export async function logUnansweredQuestion(pergunta: string): Promise<void> {
  const pool = getPool();
  await pool.query(
    `INSERT INTO unanswered_questions (pergunta) VALUES ($1)`,
    [pergunta]
  );
}

export async function getUnansweredQuestions(
  showResolved = false,
  limit = 100
): Promise<UnansweredQuestionRow[]> {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT * FROM unanswered_questions
     ${showResolved ? "" : "WHERE resolved = FALSE"}
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit]
  );
  return rows as UnansweredQuestionRow[];
}

export async function resolveUnansweredQuestion(
  id: string,
  notes?: string
): Promise<void> {
  const pool = getPool();
  await pool.query(
    `UPDATE unanswered_questions
     SET resolved = TRUE, resolved_at = NOW(), notes = COALESCE($2, notes)
     WHERE id = $1`,
    [id, notes ?? null]
  );
}

export async function deleteUnansweredQuestion(id: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM unanswered_questions WHERE id = $1`, [id]);
}

// ─── Published Knowledge ───────────────────────────────────────────────────────

export async function loadPublishedKnowledge(): Promise<unknown[]> {
  try {
    const pool = getPool();
    const { rows } = await pool.query(
      `SELECT items FROM knowledge_published WHERE id = 'singleton'`
    );
    if (rows.length > 0 && Array.isArray(rows[0].items)) {
      return rows[0].items;
    }
  } catch {
    // fallback to empty
  }
  return [];
}
