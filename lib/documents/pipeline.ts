import {
  updateDocumentStatus,
  insertChunks,
  insertGeneratedFaqs,
  deleteChunksByDocumentId,
  deleteFaqsByDocumentId,
  getDocumentById,
  getPublishedGeneratedFaqs,
  loadPublishedKnowledge,
  savePublishedKnowledge,
} from "@/lib/db/queries";
import { extractText } from "./parser";
import { chunkText } from "./chunker";
import { embedBatch } from "./embeddings";
import { generateFaqsFromDocument } from "./faqGenerator";
import { knowledgeSeed } from "@/data/knowledgeBase";
import type { KnowledgeItem } from "@/types/knowledge";

function shortId(len = 6): string {
  return Math.random().toString(36).slice(2, 2 + len);
}

export async function processDocument(documentId: string): Promise<void> {
  const doc = await getDocumentById(documentId);
  if (!doc) throw new Error(`Document ${documentId} not found`);

  try {
    // Reset previous processing results (idempotent)
    await deleteChunksByDocumentId(documentId);
    await deleteFaqsByDocumentId(documentId);
    await updateDocumentStatus(documentId, "processando");

    // Fetch file from Blob
    const response = await fetch(doc.blob_url);
    if (!response.ok) throw new Error(`Failed to fetch blob: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse text
    const parsed = await extractText(buffer, doc.mime_type);

    // Chunk text
    const chunks = chunkText(parsed.text);
    if (chunks.length === 0) throw new Error("No text content extracted from document");

    // Generate embeddings
    const embeddings = await embedBatch(chunks.map((c) => c.content));

    // Store chunks
    await insertChunks(
      chunks.map((chunk, i) => ({
        document_id: documentId,
        chunk_index: i,
        content: chunk.content,
        embedding: embeddings[i],
        page_number: chunk.pageNumber,
        token_count: chunk.tokenCount,
      }))
    );

    // Generate FAQs from full text
    const faqs = await generateFaqsFromDocument(parsed.text, doc.filename);

    // Store generated FAQs
    const faqRows = faqs.map((faq) => ({
      id: `ki-doc-${shortId()}`,
      document_id: documentId,
      pergunta: faq.pergunta,
      resposta: faq.resposta,
      categoria: faq.categoria,
      tipo: faq.tipo,
      nivel: faq.nivel,
      palavras_chave: faq.palavrasChave,
      status: "Publicado",
    }));

    await insertGeneratedFaqs(faqRows);

    await updateDocumentStatus(documentId, "concluido", {
      chunks_count: chunks.length,
      faqs_generated_count: faqs.length,
    });

    // Publica na base que a ANA lê. Se falhar aqui, o documento vai para
    // 'erro' — antes a falha era engolida e o material sumia sem aviso.
    await autoPublishKnowledge();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await updateDocumentStatus(documentId, "erro", { error_message: message });
    throw err;
  }
}

/**
 * Publica as FAQs geradas na base que a ANA realmente lê.
 *
 * Antes, esta função escrevia só em `public/knowledge-export.json`. O
 * filesystem da Vercel é efêmero: a escrita "funcionava" (sem erro), mas o
 * arquivo desaparecia no fim da invocação — e o `catch` engolia qualquer falha.
 * Resultado: as FAQs ficavam em `generated_faqs` e nunca chegavam a
 * `knowledge_published`, que é a fonte de /api/knowledge/items e da busca da
 * ANA. 114 de 185 FAQs estavam invisíveis quando isso foi descoberto.
 *
 * O merge preserva o que não veio deste pipeline (seed e itens ingeridos à
 * mão): só as entradas `ki-doc-*` são substituídas, para reprocessar um
 * documento não duplicar nem apagar conteúdo de outra origem.
 */
export async function autoPublishKnowledge(): Promise<{ total: number; geradas: number }> {
  const generatedRows = await getPublishedGeneratedFaqs();
  const generatedItems: KnowledgeItem[] = generatedRows.map((row) => ({
    id: row.id,
    pergunta: row.pergunta,
    resposta: row.resposta,
    categoria: row.categoria as KnowledgeItem["categoria"],
    palavrasChave: row.palavras_chave,
    tipo: row.tipo as KnowledgeItem["tipo"],
    nivel: row.nivel as KnowledgeItem["nivel"],
    updatedAt: new Date(row.created_at).toISOString().slice(0, 10),
    publicado: true,
  }));

  const atuais = (await loadPublishedKnowledge()) as KnowledgeItem[];
  const base = atuais.length > 0 ? atuais : knowledgeSeed.filter((i) => i.publicado);

  // Tudo que não é gerado por documento é preservado como está.
  const preservados = base.filter((i) => !String(i.id).startsWith("ki-doc-"));

  const merged = [...preservados, ...generatedItems];
  await savePublishedKnowledge(merged);

  return { total: merged.length, geradas: generatedItems.length };
}
