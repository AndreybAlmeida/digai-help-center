CREATE TABLE IF NOT EXISTS knowledge_published (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  items JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO knowledge_published (id, items)
VALUES ('singleton', '[]')
ON CONFLICT DO NOTHING;
