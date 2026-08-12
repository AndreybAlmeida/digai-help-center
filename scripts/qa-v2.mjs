/**
 * Checklist §10 do SPEC-central-ajuda-v2, verificado no navegador.
 * Uso: npm run build && npm start && node scripts/qa-v2.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const TZ = { timezoneId: "America/Sao_Paulo", locale: "pt-BR" };
const browser = await chromium.launch();
let fail = 0;

const ok = (cond, label, extra = "") => {
  if (!cond) fail++;
  console.log(`  ${cond ? "✅" : "❌"} ${label}${extra ? "  " + extra : ""}`);
};

async function page(width = 1440, height = 900) {
  const ctx = await browser.newContext({ ...TZ, viewport: { width, height } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message.split("\n")[0]));
  p.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
  return { p, ctx, errs };
}

console.log("\n── cards e conteúdo ──");
{
  const { p, ctx, errs } = await page();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });

  const cards = await p.$$eval(".card", (els) =>
    els.map((e) => ({
      titulo: e.querySelector("h3")?.textContent?.trim() ?? "",
      bullets: e.querySelectorAll(".peek li").length,
      dur: e.querySelector(".dur")?.textContent ?? "",
      kind: e.querySelector(".kind")?.textContent ?? "",
      ai: !!e.querySelector(".ai"),
      href: e.getAttribute("href"),
    }))
  );
  ok(cards.length > 0, `grid renderizou ${cards.length} cards`);
  ok(cards.every((c) => c.bullets === 3), "todo card tem exatamente 3 bullets de learn",
     cards.filter((c) => c.bullets !== 3).map((c) => c.titulo).join(", "));
  ok(cards.every((c) => c.dur && c.kind), "todo card tem duração e tipo na capa");
  ok(await p.$$eval(".card a", (a) => a.length === 0), "nenhum <a> aninhado dentro do card");

  // capas são CSS/SVG: zero <img> no grid
  ok(await p.$$eval(".grid img", (i) => i.length === 0), "zero requisição de imagem no grid (capas em CSS/SVG)");

  // categorias vazias
  const cats = await p.$$eval(".cat", (els) => els.map((e) => ({
    label: e.querySelector("h3")?.textContent ?? "",
    count: Number(e.querySelector(".count")?.textContent?.match(/\d+/)?.[0] ?? 0),
    soon: !!e.querySelector(".soon"),
    clicavel: e.tagName === "A" && !!e.getAttribute("href"),
  })));
  ok(cats.length === 12, `12 cards de categoria (${cats.length})`);
  ok(cats.every((c) => c.clicavel), "categoria sem material continua clicável");

  // A contagem tem que bater com o que a página da categoria realmente entrega:
  // artigos estáticos + itens publicados da base. Foi por não somar a base que
  // metade do rail apareceu zerada, sugerindo categorias vazias que têm material.
  const railCounts = await p.$$eval(".rail-item .n", (els) =>
    els.map((e) => ({ label: e.previousElementSibling?.textContent?.trim() ?? "", n: Number(e.textContent) }))
  );
  const base = await (await fetch(BASE + "/api/knowledge/items")).json();
  const pub = (base.items ?? []).filter((i) => i.publicado);
  const porCategoria = {};
  for (const i of pub) porCategoria[i.categoria] = (porCategoria[i.categoria] ?? 0) + 1;
  porCategoria["faq"] = pub.filter((i) => i.tipo === "faq").length;

  const artigosPorLabel = await p.$$eval(".card .row .tag:first-child", (els) => {
    const m = {};
    els.forEach((e) => { const k = e.textContent.trim(); m[k] = (m[k] ?? 0) + 1; });
    return m;
  });

  const divergentes = railCounts.filter((r) => r.n === 0);
  ok(divergentes.length === 0, "nenhuma categoria com material aparece como 0",
     divergentes.map((d) => d.label).join(", "));
  ok(cats.filter((c) => c.soon).length === railCounts.filter((r) => r.n === 0).length,
     `"Em produção" só onde o material é realmente 0 (${cats.filter((c) => c.soon).length})`);
  ok(railCounts.every((r) => r.n >= (artigosPorLabel[r.label] ?? 0)),
     "contagem do rail nunca é menor que os artigos já visíveis no grid");

  ok(errs.length === 0, "sem erro de console na home", errs.slice(0, 2).join(" | "));
  await ctx.close();
}

console.log("\n── busca e filtro ──");
{
  const { p, ctx } = await page();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const nCards = () => p.$$eval(".card", (e) => e.filter((x) => x.offsetParent !== null).length);
  const total = await nCards();

  // ⌘K foca
  await p.keyboard.press("Meta+k");
  ok(await p.evaluate(() => document.activeElement?.id === "q"), "⌘K foca a busca");

  await p.fill("#q", "gupy");
  await p.waitForTimeout(400);
  ok((await nCards()) < total && (await nCards()) > 0, `busca "gupy" filtra (${await nCards()} de ${total})`);
  ok(await p.$$eval(".hero", (e) => e.length === 0), "busca esconde o hero");
  ok(await p.$$eval(".shortcuts", (e) => e.length === 0), "busca esconde atalhos/categorias/ANA");
  ok((await p.textContent("h2"))?.includes("resultado"), "cabeçalho vira 'N resultados para …'");

  // Esc limpa
  await p.keyboard.press("Escape");
  await p.waitForTimeout(400);
  ok((await p.inputValue("#q")) === "", "Esc limpa a busca");
  ok((await nCards()) === total, "seções voltam ao limpar");

  // chip + busca por AND -> vazio
  await p.click('.chip:has-text("API & Técnico")');
  await p.fill("#q", "gupy");
  await p.waitForTimeout(400);
  ok(await p.$(".empty") !== null, "chip + busca combinam por AND e chegam ao estado vazio");

  await ctx.close();
}

console.log("\n── preview por teclado ──");
{
  const { p, ctx } = await page();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelector(".card")?.focus());
  await p.waitForTimeout(300);
  const op = await p.$eval(".card .peek", (e) => getComputedStyle(e).opacity);
  ok(op === "1", `preview abre no :focus-within (opacity=${op})`);
  await ctx.close();
}

console.log("\n── rail: expandido / mini / drawer ──");
{
  const { p, ctx } = await page();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const railW = () => p.$eval(".rail", (e) => Math.round(e.getBoundingClientRect().width));
  ok((await railW()) === 248, `expandido = 248px (${await railW()})`);

  await p.click("#railToggle, .icon-btn");
  await p.waitForTimeout(400);
  ok((await railW()) === 76, `mini = 76px (${await railW()})`);
  ok((await p.evaluate(() => document.cookie)).includes("digai_rail=mini"), "preferência gravada em cookie");

  // persistência sem flash: recarrega e mede na primeira pintura
  await p.reload({ waitUntil: "domcontentloaded" });
  ok((await railW()) === 76, "preferência persiste após reload, sem flash");
  await ctx.close();
}
{
  const { p, ctx } = await page(390, 844);
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const visivel = () => p.$eval(".rail", (e) => e.getBoundingClientRect().x >= 0);
  ok(!(await visivel()), "mobile: rail começa fora da tela (drawer)");
  await p.click(".icon-btn");
  await p.waitForTimeout(400);
  ok(await visivel(), "mobile: drawer abre");
  await p.keyboard.press("Escape");
  await p.waitForTimeout(400);
  ok(!(await visivel()), "mobile: Esc fecha o drawer");
  await ctx.close();
}

console.log("\n── breakpoints, sem sobreposição ──");
for (const [w, h] of [[390, 844], [768, 1024], [1280, 800], [1600, 1000]]) {
  const { p, ctx, errs } = await page(w, h);
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  // FAB não pode cobrir CTA nenhum
  const colide = await p.evaluate(() => {
    const fab = document.querySelector(".fab")?.getBoundingClientRect();
    if (!fab) return false;
    return [...document.querySelectorAll("a.btn, button.btn")].some((el) => {
      const r = el.getBoundingClientRect();
      return r.width && !(r.right < fab.left || r.left > fab.right || r.bottom < fab.top || r.top > fab.bottom);
    });
  });
  ok(!overflow && !colide && errs.length === 0, `${w}px — sem scroll horizontal, FAB não sobrepõe CTA, sem erro`);
  await ctx.close();
}

console.log("\n── outras rotas seguem de pé ──");
for (const r of ["/chat", "/faq", "/contato", "/comece-aqui", "/categoria/triagem-inteligente", "/categoria/ranking", "/artigo/como-criar-triagem"]) {
  const { p, ctx, errs } = await page();
  await p.goto(BASE + r, { waitUntil: "networkidle" });
  const temShell = await p.$(".topbar") !== null;
  ok(errs.length === 0 && temShell, `${r} — shell aplicado, sem erro`, errs.slice(0, 1).join(""));
  await ctx.close();
}

await browser.close();
console.log(`\n${fail === 0 ? "✅ CHECKLIST §10 FECHADO" : `❌ ${fail} item(ns) reprovado(s)`}`);
process.exit(fail ? 1 : 0);
