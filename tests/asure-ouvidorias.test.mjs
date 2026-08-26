import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appUrl = new URL("../app/RadarApp.tsx", import.meta.url);
const permissionsUrl = new URL("../lib/permissions.ts", import.meta.url);
const configUrl = new URL("../config/ouvidorias.ts", import.meta.url);

test("restringe Ouvidorias a ADMIN e GESTAO na rota e no componente", async () => {
  const [app, permissions, config] = await Promise.all([
    readFile(appUrl, "utf8"),
    readFile(permissionsUrl, "utf8"),
    readFile(configUrl, "utf8"),
  ]);
  assert.match(config, /processos-expedientes\/ouvidorias/);
  assert.match(permissions, /\[ASURE_OUVIDORIAS_ROUTE\]: \["ADMIN", "GESTAO"\]/);
  assert.match(app, /canAccessAsureOuvidorias\(user\.role\)/);
  assert.match(app, /path===ASURE_OUVIDORIAS_ROUTE\?<OuvidoriasModule\/>/);
});

test("não expõe o relatório fora do módulo autorizado", async () => {
  const [app, config] = await Promise.all([readFile(appUrl, "utf8"), readFile(configUrl, "utf8")]);
  assert.doesNotMatch(app, /datastudio\.google\.com\/embed\/reporting/);
  assert.match(config, /datastudio\.google\.com\/embed\/reporting/);
  assert.match(app, /title="Painel de Ouvidorias da ASURE"/);
  assert.match(app, /rel="noopener noreferrer"/);
});

test("mantém menu, iframe e ação externa dentro da área protegida", async () => {
  const app = await readFile(appUrl, "utf8");
  const guardPosition = app.indexOf("canAccessAsureOuvidorias(user.role)");
  const menuPosition = app.indexOf(">Ouvidorias<", guardPosition);
  const modulePosition = app.indexOf("function OuvidoriasModule()");
  const iframePosition = app.indexOf("<iframe", modulePosition);
  const externalActionPosition = app.indexOf("Abrir painel completo", modulePosition);
  assert.ok(guardPosition >= 0 && menuPosition > guardPosition);
  assert.ok(modulePosition >= 0 && iframePosition > modulePosition && externalActionPosition > modulePosition);
});
