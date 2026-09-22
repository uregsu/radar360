import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (path) => fs.readFileSync(path, "utf8");

test("Avaliação 360 possui somente as três rotas públicas solicitadas", () => {
  const proxy = read("proxy.ts");
  for (const route of [
    "/avaliacao",
    "/avaliacao/escolas-avaliam-setores",
    "/avaliacao/setores-avaliam-escolas",
  ]) assert.match(proxy, new RegExp(`"${route}"`));
  assert.match(proxy, /PUBLIC_EVALUATION_ROUTES\.has\(request\.nextUrl\.pathname\)/);
  assert.doesNotMatch(proxy, /startsWith\("\/avaliacao/);
  assert.doesNotMatch(proxy, /dashboard.*return response/);
  for (const page of [
    "app/avaliacao/page.tsx",
    "app/avaliacao/escolas-avaliam-setores/page.tsx",
    "app/avaliacao/setores-avaliam-escolas/page.tsx",
  ]) assert.equal(fs.existsSync(page), true, `${page} deve existir`);
  assert.equal(fs.existsSync("app/avaliacao/resultados/page.tsx"), false);
});

test("Forms usam URLs completas incorporáveis e oferecem fallback externo", () => {
  const data = read("app/avaliacao/evaluation-data.ts");
  const embed = read("app/avaliacao/EvaluationFormEmbed.tsx");
  assert.doesNotMatch(data, /forms\.gle/);
  assert.equal((data.match(/viewform\?embedded=true/g) || []).length, 2);
  assert.match(embed, /<iframe/);
  assert.match(embed, /Abrir formulário em nova aba/);
  assert.match(embed, /title=\{title\}/);
});
