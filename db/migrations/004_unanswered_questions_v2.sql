-- Enriquece unanswered_questions. A v1 só guardava a pergunta solta, o que não
-- permite nem entender o caso ("e como faço isso?") nem priorizar por volume.

ALTER TABLE unanswered_questions
  ADD COLUMN IF NOT EXISTS pergunta_normalizada TEXT,
  ADD COLUMN IF NOT EXISTS resposta             TEXT,
  ADD COLUMN IF NOT EXISTS contexto             JSONB,
  ADD COLUMN IF NOT EXISTS session_id           TEXT,
  ADD COLUMN IF NOT EXISTS motivo               TEXT,
  ADD COLUMN IF NOT EXISTS melhor_score         REAL,
  ADD COLUMN IF NOT EXISTS ocorrencias          INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS ultima_ocorrencia    TIMESTAMPTZ DEFAULT NOW();

-- Backfill das linhas da v1 para o índice único não deixá-las de fora.
UPDATE unanswered_questions
   SET pergunta_normalizada = lower(trim(pergunta)),
       ultima_ocorrencia    = COALESCE(ultima_ocorrencia, created_at),
       motivo               = COALESCE(motivo, 'v1_sem_contexto')
 WHERE pergunta_normalizada IS NULL;

-- Dedup por pergunta normalizada: repetição vira contador, não linha nova.
-- Sem isso a mesma dúvida aparece 40x e some no meio das outras.
DELETE FROM unanswered_questions a
 USING unanswered_questions b
 WHERE a.pergunta_normalizada = b.pergunta_normalizada
   AND a.created_at > b.created_at;

CREATE UNIQUE INDEX IF NOT EXISTS idx_unanswered_questions_normalizada
  ON unanswered_questions(pergunta_normalizada);

CREATE INDEX IF NOT EXISTS idx_unanswered_questions_ocorrencias
  ON unanswered_questions(ocorrencias DESC);
