/**
 * Ingere na base publicada os itens destilados dos materiais do Drive.
 *
 * Idempotente: cada item recebe um id estável derivado do documento de origem
 * (`kb-<doc>-NN`), então rodar de novo atualiza em vez de duplicar. É o que
 * permite reprocessar um material corrigido sem sujar a base.
 *
 * Uso: node scripts/ingest-drive.mjs <pasta-com-os-json> [--dry]
 */
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

neonConfig.webSocketConstructor = ws;

for (const linha of readFileSync(".env.local", "utf8").split("\n")) {
  const t = linha.trim();
  if (!t || t.startsWith("#") || !t.includes("=")) continue;
  const i = t.indexOf("=");
  process.env[t.slice(0, i).trim()] ??= t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}

const dir = process.argv[2];
const dry = process.argv.includes("--dry");
if (!dir) {
  console.error("uso: node scripts/ingest-drive.mjs <pasta> [--dry]");
  process.exit(1);
}

const hoje = new Date().toISOString().slice(0, 10);
const arquivos = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();

const novos = [];
for (const arquivo of arquivos) {
  const doc = JSON.parse(readFileSync(join(dir, arquivo), "utf8"));
  const base = arquivo.replace(/\.json$/, "");
  doc.faqs.forEach((f, i) => {
    novos.push({
      id: `kb-${base}-${String(i + 1).padStart(2, "0")}`,
      tipo: "faq",
      nivel: "basico",
      pergunta: f.p,
      resposta: f.r,
      categoria: doc.categoria,
      publicado: true,
      updatedAt: hoje,
      palavrasChave: f.chaves,
      fonte: doc.doc,
    });
  });
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await pool.query(`SELECT items FROM knowledge_published WHERE id = 'singleton'`);
const atuais = Array.isArray(rows[0]?.items) ? rows[0].items : [];

const porId = new Map(atuais.map((i) => [i.id, i]));
let criados = 0, atualizados = 0;
for (const item of novos) {
  if (porId.has(item.id)) atualizados++;
  else criados++;
  porId.set(item.id, item);
}

const finais = [...porId.values()];
console.log(`itens na base : ${atuais.length} → ${finais.length}`);
console.log(`novos         : ${criados}`);
console.log(`atualizados   : ${atualizados}`);
console.log(`documentos    : ${arquivos.length}`);

if (dry) {
  console.log("\n(dry-run — nada foi gravado)");
  await pool.end();
  process.exit(0);
}

await pool.query(
  `INSERT INTO knowledge_published (id, items, updated_at)
   VALUES ('singleton', $1::jsonb, NOW())
   ON CONFLICT (id) DO UPDATE SET items = $1::jsonb, updated_at = NOW()`,
  [JSON.stringify(finais)]
);
console.log("\n✅ base publicada atualizada");
await pool.end();
