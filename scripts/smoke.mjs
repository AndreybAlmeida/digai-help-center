import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const browser = await chromium.launch();
let fails = 0;

// O build da Vercel roda em UTC e os usuários estão em UTC-3. Rodar o navegador
// em America/Sao_Paulo é o que expõe hydration mismatch de data — rodando tudo
// no mesmo fuso, esse tipo de bug só aparece em produção.
const TZ = { timezoneId: "America/Sao_Paulo", locale: "pt-BR" };

async function check(name, { route = "/", storage = {}, act = null, mobile = false } = {}) {
  const ctx = await browser.newContext(
    mobile ? { ...TZ, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { ...TZ }
  );
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message.split("\n")[0]));
  page.on("console", (m) => {
    const t = m.text();
    if (m.type() === "error" && !/Failed to load resource/.test(t)) errors.push(`[console] ${t.slice(0, 300)}`);
  });

  await page.addInitScript((s) => {
    for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v);
  }, storage);

  await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  let extra = "";
  if (act) extra = (await act(page).catch((e) => errors.push("act: " + e.message))) || "";

  const broken = await page.evaluate(() => document.documentElement.id === "__next_error__");
  const ok = !broken && errors.length === 0;
  if (!ok) fails++;

  console.log(`${ok ? "✅" : "❌"} ${name}${extra ? "  " + extra : ""}`);
  errors.slice(0, 4).forEach((e) => console.log(`      ⚠ ${e.slice(0, 220)}`));
  await ctx.close();
}

const corrupt = { digai_knowledge: "{}" };
const legacy = {
  digai_knowledge: JSON.stringify({
    items: [{ id: "x", pergunta: "teste vaga", resposta: "resp" }],
    version: 1,
  }),
};

const type = async (p, sel, val) => { await p.fill(sel, val); await p.waitForTimeout(1200); return ""; };

console.log("── rotas públicas (navegador limpo) ──");
for (const r of ["/", "/chat", "/faq", "/comece-aqui", "/contato", "/categoria/triagem-inteligente", "/categoria/boas-praticas", "/artigo/como-criar-triagem"]) {
  await check(r, { route: r });
}

console.log("\n── 404 e mobile ──");
await check("/categoria/slug-inexistente → 404", {
  route: "/categoria/slug-que-nao-existe",
  act: async (p) => {
    const t = await p.evaluate(() => document.body.innerText);
    return t.includes("Página não encontrada") ? "(página 404 própria ✓)" : "(SEM 404 próprio!)";
  },
});
await check("/chat mobile 390px", { route: "/chat", mobile: true });

console.log("\n── localStorage corrompido (regressão knowledgeStore) ──");
await check("/ + storage={} + busca", { route: "/", storage: corrupt, act: (p) => type(p, '#q', "vaga") });
await check("/ + storage legado + busca", { route: "/", storage: legacy, act: (p) => type(p, '#q', "vaga") });
await check("/faq + storage={} + busca", { route: "/faq", storage: corrupt, act: (p) => type(p, 'input[placeholder*="Buscar perguntas"]', "vaga") });
await check("/faq + storage legado + busca", { route: "/faq", storage: legacy, act: (p) => type(p, 'input[placeholder*="Buscar perguntas"]', "vaga") });

console.log("\n── fluxo real da ANA (a regressão original) ──");
await check("/chat → 3 mensagens seguidas", {
  route: "/chat",
  act: async (p) => {
    for (const q of ["Como criar uma vaga?", "E como faço a triagem?", "Obrigado!"]) {
      await p.fill('input[placeholder*="Escreva sua dúvida"]', q);
      await p.keyboard.press("Enter");
      await p.waitForTimeout(14000);
    }
    const t = (await p.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
    const links = await p.evaluate(() =>
      [...document.querySelectorAll('a[href*="/categoria/"], a[href^="http"]')].map((a) => a.getAttribute("href")).slice(-3)
    );
    return `(${t.length} chars renderizados, links da ANA: ${JSON.stringify(links)})`;
  },
});

await browser.close();
console.log(`\n${fails === 0 ? "✅ TUDO PASSOU" : `❌ ${fails} FALHA(S)`}`);
process.exit(fails ? 1 : 0);
