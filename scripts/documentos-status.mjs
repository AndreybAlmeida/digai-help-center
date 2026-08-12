/**
 * Auditoria da fila de documentos: mostra o que travou, o que deu erro e se as
 * FAQs geradas realmente chegaram à base que a ANA lê.
 *
 * Uso:
 *   node scripts/documentos-status.mjs             # só relatório
 *   node scripts/documentos-status.mjs --publicar  # republica as FAQs pendentes
 *   node scripts/documentos-status.mjs --destravar # marca travados como erro
 *
 * Um documento em "processando" há mais de 10 minutos está morto: o pipeline
 * leva menos de 2 min mesmo nos PDFs maiores, e quando a plataforma mata a
 * função por timeout o catch não roda — o status nunca sai de "processando".
 */
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { readFileSync } from "fs";

neonConfig.webSocketConstructor = ws;
for (const linha of readFileSync(".env.local", "utf8").split("\n")) {
  const t = linha.trim();
  if (!t || t.startsWith("#") || !t.includes("=")) continue;
  const i = t.indexOf("=");
  process.env[t.slice(0, i).trim()] ??= t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}

const TRAVADO_MIN = 10;
const publicar = process.argv.includes("--publicar");
const destravar = process.argv.includes("--destravar");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const q = async (sql, p = []) => (await pool.query(sql, p)).rows;

const docs = await q(`
  SELECT id, filename, status, chunks_count, faqs_generated_count, error_message,
         ROUND(size_bytes/1048576.0, 1) AS mb,
         EXTRACT(EPOCH FROM (NOW() - updated_at))::int AS parado_seg
    FROM documents ORDER BY created_at DESC`);

const travados = docs.filter((d) => d.status === "processando" && d.parado_seg > TRAVADO_MIN * 60);
const comErro = docs.filter((d) => d.status === "erro");
const ok = docs.filter((d) => d.status === "concluido");

console.log(`=== DOCUMENTOS (${docs.length}) ===`);
for (const d of docs) {
  const marca = d.status === "concluido" ? "✅" : travados.includes(d) ? "⛔" : d.status === "erro" ? "❌" : "⏳";
  console.log(
    `  ${marca} ${String(d.status).padEnd(11)} ${String(d.mb).padStart(4)}MB  chunks=${String(d.chunks_count ?? 0).padStart(3)} faqs=${String(d.faqs_generated_count ?? 0).padStart(3)}  ${d.filename}` +
      (d.error_message ? `\n        erro: ${d.error_message.slice(0, 100)}` : "") +
      (travados.includes(d) ? `\n        travado há ${Math.round(d.parado_seg / 60)} min — a função morreu antes de terminar` : "")
  );
}
console.log(`\n  concluídos=${ok.length}  travados=${travados.length}  erro=${comErro.length}`);

// As FAQs geradas só valem se estiverem na base publicada — é ela que a ANA lê.
const geradas = await q(`SELECT id FROM generated_faqs WHERE status = 'Publicado'`);
const [{ items }] = await q(`SELECT items FROM knowledge_published WHERE id = 'singleton'`);
const publicados = new Set((items ?? []).map((i) => i.id));
const faltando = geradas.filter((g) => !publicados.has(g.id));

console.log(`\n=== FAQs GERADAS vs BASE PUBLICADA ===`);
console.log(`  geradas pelo pipeline : ${geradas.length}`);
console.log(`  na base publicada     : ${(items ?? []).length}`);
console.log(`  ${faltando.length === 0 ? "✅" : "⚠️"} geradas ausentes da base: ${faltando.length}`);

if (destravar && travados.length) {
  for (const d of travados) {
    await pool.query(`UPDATE documents SET status='erro', error_message=$2, updated_at=NOW() WHERE id=$1`, [
      d.id,
      `Processamento interrompido (sem retorno há mais de ${TRAVADO_MIN} min). Reprocesse pelo painel.`,
    ]);
  }
  console.log(`\n⛔ ${travados.length} documento(s) travado(s) marcado(s) como erro — agora aparecem no painel para reprocessar.`);
}

if (publicar && faltando.length) {
  const rows = await q(`SELECT * FROM generated_faqs WHERE status = 'Publicado' ORDER BY created_at`);
  const gerados = rows.map((r) => ({
    id: r.id,
    pergunta: r.pergunta,
    resposta: r.resposta,
    categoria: r.categoria,
    palavrasChave: r.palavras_chave,
    tipo: r.tipo,
    nivel: r.nivel,
    updatedAt: new Date(r.created_at).toISOString().slice(0, 10),
    publicado: true,
  }));
  const preservados = (items ?? []).filter((i) => !String(i.id).startsWith("ki-doc-"));
  const merged = [...preservados, ...gerados];
  await pool.query(
    `INSERT INTO knowledge_published (id, items, updated_at) VALUES ('singleton', $1::jsonb, NOW())
     ON CONFLICT (id) DO UPDATE SET items = $1::jsonb, updated_at = NOW()`,
    [JSON.stringify(merged)]
  );
  console.log(`\n✅ base republicada: ${(items ?? []).length} → ${merged.length} itens (${gerados.length} vindas de documentos)`);
}

await pool.end();
