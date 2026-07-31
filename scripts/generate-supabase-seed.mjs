import crypto from "node:crypto";
import fs from "node:fs";
import { schools } from "../config/schools.ts";
import { sectors } from "../config/sectors.ts";

const output = "supabase/seed.sql";
const organizationId = stableUuid("organization:ure-guarulhos-sul");
const operationalSectors = sectors.filter((sector) => sector.shortName !== "GAB");

function stableUuid(value) {
  const hex = crypto.createHash("sha256").update(`radar360:${value}`).digest("hex").slice(0, 32).split("");
  hex[12] = "4";
  hex[16] = ((parseInt(hex[16], 16) & 3) | 8).toString(16);
  const joined = hex.join("");
  return `${joined.slice(0, 8)}-${joined.slice(8, 12)}-${joined.slice(12, 16)}-${joined.slice(16, 20)}-${joined.slice(20)}`;
}

const q = (value) => `'${String(value).replaceAll("'", "''")}'`;
const slugify = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const lines = [
  "begin;",
  "",
  `insert into public.organizations (id, name, slug) values (${q(organizationId)}, 'URE Guarulhos Sul', 'ure-guarulhos-sul')`,
  "on conflict (slug) do update set name = excluded.name, active = true;",
  "",
];

for (const sector of operationalSectors) {
  const id = stableUuid(`sector:${sector.shortName}`);
  lines.push(
    `insert into public.sectors (id, organization_id, code, slug, name, description) values (${q(id)}, ${q(organizationId)}, ${q(sector.shortName)}, ${q(sector.slug)}, ${q(sector.name)}, ${q(sector.description)})`,
    "on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;",
  );
}

lines.push("");
for (const school of schools) {
  const id = stableUuid(`school:${school.id}`);
  lines.push(
    `insert into public.schools (id, organization_id, internal_code, slug, name, pei) values (${q(id)}, ${q(organizationId)}, ${q(school.id)}, ${q(school.slug)}, ${q(school.name)}, ${school.pei})`,
    "on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;",
  );
}

lines.push("");
const regionalId = stableUuid("institutional-profile:regional");
lines.push(
  `insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, default_role, scope, description) values (${q(regionalId)}, ${q(organizationId)}, 'REGIONAL', 'Dirigente / Coordenador Regional', 'Visão Regional', 'ADMIN', 'regional:guarulhos-sul', 'Visão estratégica e integrada da Unidade Regional de Ensino Guarulhos Sul.')`,
  "on conflict (organization_id, scope) do update set name = excluded.name, active = true;",
);
for (const sector of operationalSectors) {
  const profileId = stableUuid(`institutional-profile:sector:${sector.shortName}`);
  const sectorId = stableUuid(`sector:${sector.shortName}`);
  lines.push(
    `insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values (${q(profileId)}, ${q(organizationId)}, 'SECTOR', ${q(`${sector.name} – ${sector.shortName}`)}, ${q(sector.shortName)}, ${q(sectorId)}, 'GESTAO', ${q(`sector:${sector.shortName}`)}, ${q(`Perfil institucional de ${sector.name}.`)})`,
    "on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;",
  );
}
for (const school of schools) {
  const profileId = stableUuid(`institutional-profile:school:${school.id}`);
  const schoolId = stableUuid(`school:${school.id}`);
  lines.push(
    `insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values (${q(profileId)}, ${q(organizationId)}, 'SCHOOL', ${q(school.name)}, ${q(school.name)}, ${q(schoolId)}, 'ESCOLA', ${q(`school:${school.id}`)}, ${q(`Perfil institucional da unidade escolar ${school.name}.`)})`,
    "on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;",
  );
}
const demoId = stableUuid("institutional-profile:demo");
lines.push(
  `insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, default_role, scope, description) values (${q(demoId)}, ${q(organizationId)}, 'DEMO', 'Visitante', 'Ambiente demonstrativo', 'VISITANTE', 'demo', 'Versão demonstrativa do RADAR 360.')`,
  "on conflict (organization_id, scope) do update set name = excluded.name, active = true;",
  "",
);

for (const sector of operationalSectors) {
  const sectorId = stableUuid(`sector:${sector.shortName}`);
  const seen = new Set();
  for (const category of sector.menu) {
    const slug = slugify(category);
    if (seen.has(slug)) continue;
    seen.add(slug);
    const categoryId = stableUuid(`category:${sector.shortName}:${slug}`);
    lines.push(
      `insert into public.demand_categories (id, organization_id, sector_id, name, slug) values (${q(categoryId)}, ${q(organizationId)}, ${q(sectorId)}, ${q(category)}, ${q(slug)})`,
      "on conflict (sector_id, slug) do update set name = excluded.name, active = true;",
    );
  }
}

const hubs = [
  ["SETEC", "SETEC Hub", "https://setec-hub.vercel.app/login", "Acessar plataforma operacional do SETEC"],
  ["SEOM", "SGE / SEOM Hub", "https://sge-gsu.vercel.app/", "Acessar plataforma de gestão do SEOM"],
  ["ESE", "ESE Hub GSU", "https://ese-hub-gsu.vercel.app/login?redirectTo=%2F", "Acessar plataforma da Equipe de Supervisão de Ensino"],
];
for (const [code, name, url, description] of hubs) {
  const sectorId = stableUuid(`sector:${code}`);
  const hubId = stableUuid(`hub:${code}`);
  lines.push(
    `insert into public.hubs (id, organization_id, sector_id, name, url, external_url, description, integration_status, integration_type, status) values (${q(hubId)}, ${q(organizationId)}, ${q(sectorId)}, ${q(name)}, ${q(url)}, ${q(url)}, ${q(description)}, 'ATIVO', 'LINK_EXTERNO', 'ATIVO')`,
    "on conflict (id) do update set name = excluded.name, url = excluded.url, external_url = excluded.external_url, description = excluded.description, integration_status = excluded.integration_status, integration_type = excluded.integration_type, status = excluded.status, active = true;",
  );
}

lines.push("", "commit;", "");
fs.writeFileSync(output, lines.join("\n"), "utf8");
console.log(JSON.stringify({
  output,
  organizations: 1,
  sectors: operationalSectors.length,
  schools: schools.length,
  institutionalProfiles: 2 + operationalSectors.length + schools.length,
  categories: operationalSectors.reduce((total, sector) => total + new Set(sector.menu.map(slugify)).size, 0),
  hubs: hubs.length,
}));
