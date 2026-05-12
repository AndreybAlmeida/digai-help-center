CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('processando', 'concluido', 'erro')),
  error_message TEXT,
  chunks_count INTEGER DEFAULT 0,
  faqs_generated_count INTEGER DEFAULT 0,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536) NOT NULL,
  page_number INTEGER,
  token_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON document_chunks
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON document_chunks(document_id);

CREATE TABLE IF NOT EXISTS generated_faqs (
  id TEXT PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  pergunta TEXT NOT NULL,
  resposta TEXT NOT NULL,
  categoria TEXT NOT NULL,
  tipo TEXT NOT NULL,
  nivel TEXT NOT NULL,
  palavras_chave TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Publicado',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_document_id ON generated_faqs(document_id);
CREATE INDEX IF NOT EXISTS idx_faqs_status ON generated_faqs(status);
