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

test("cada fluxo usa exclusivamente o Google Form correspondente", () => {
  const data = read("app/avaliacao/evaluation-data.ts");
  const schoolsFlow = data.match(/slug: "escolas-avaliam-setores"[\s\S]*?icon: "school"/)?.[0] ?? "";
  const sectorsFlow = data.match(/slug: "setores-avaliam-escolas"[\s\S]*?icon: "sectors"/)?.[0] ?? "";
  assert.match(schoolsFlow, /1FAIpQLSeCv_MP9l2eM5aE0lN2qOwrn5szus2ySn6H8oli3NmkCo5TiQ/);
  assert.doesNotMatch(schoolsFlow, /1FAIpQLScv4pA4-0lJm5a-UJ2BLZLy4JTVc-gT83zrUBwqmqpWZOUIoQ/);
  assert.match(sectorsFlow, /1FAIpQLScv4pA4-0lJm5a-UJ2BLZLy4JTVc-gT83zrUBwqmqpWZOUIoQ/);
  assert.doesNotMatch(sectorsFlow, /1FAIpQLSeCv_MP9l2eM5aE0lN2qOwrn5szus2ySn6H8oli3NmkCo5TiQ/);
});
