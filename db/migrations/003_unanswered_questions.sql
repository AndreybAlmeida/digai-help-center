CREATE TABLE IF NOT EXISTS unanswered_questions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  pergunta TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_unanswered_questions_resolved ON unanswered_questions(resolved);
CREATE INDEX IF NOT EXISTS idx_unanswered_questions_created_at ON unanswered_questions(created_at DESC);
