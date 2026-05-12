import { neon } from "@neondatabase/serverless";
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

const sql = neon(process.env.DATABASE_URL);
const migration = readFileSync("db/migrations/001_init_documents.sql", "utf-8");

console.log("⏳  Rodando migration...");
await sql.unsafe(migration);
console.log("✅  Migration concluída!");
