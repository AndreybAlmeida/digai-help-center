import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { readFileSync } from "fs";

// Lê .env.local manualmente
function loadEnv() {
  try {
    const lines = readFileSync(".env.local", "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  } catch {
    // sem .env.local — usa env do sistema
  }
}

loadEnv();

if (!process.env.DATABASE_URL) {
  console.error("❌  DATABASE_URL não encontrada no .env.local");
  process.exit(1);
}

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const migrations = [
  "db/migrations/001_init_documents.sql",
  "db/migrations/002_knowledge_published.sql",
  "db/migrations/003_unanswered_questions.sql",
  "db/migrations/004_unanswered_questions_v2.sql",
];

for (const file of migrations) {
  console.log(`⏳  Rodando ${file}...`);
  const sql = readFileSync(file, "utf-8");
  await pool.query(sql);
  console.log(`✅  ${file} concluída!`);
}

await pool.end();
console.log("✅  Todas as migrations concluídas!");
