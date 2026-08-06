import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the SuperBI 360 application shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>SuperBI 360 \| GSU — URE Guarulhos Sul<\/title>/i);
  assert.match(html, /Plataforma Integrada de Gestão, Evidências e Inteligência da URE Guarulhos Sul/i);
  assert.match(html, /SuperBI/);
  assert.match(html, /GSU/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps Supabase credentials out of tracked source", async () => {
  const [example, config, app] = await Promise.all([
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
    readFile(new URL("../lib/supabase/config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/RadarApp.tsx", import.meta.url), "utf8"),
  ]);
  const exampleVariables = Object.fromEntries(example.trim().split(/\r?\n/).map(line => {
    const separator = line.indexOf("=");
    return [line.slice(0, separator), line.slice(separator + 1)];
  }));
  assert.equal(exampleVariables.NEXT_PUBLIC_SUPABASE_URL, "");
  assert.equal(exampleVariables.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, "");
  assert.equal(exampleVariables.NEXT_PUBLIC_PAINEL_MDI_URL, "https://biguarulhossul.my.canva.site/integracaomdi/");
  assert.match(config, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(app, /localStorage|service_role|SUPABASE_DB_PASSWORD|senha fixa/i);
});

test("renders password recovery deep links", async () => {
  const response = await render("/redefinir-senha");
  assert.equal(response.status, 200);
});
