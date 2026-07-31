import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

function readLocalEnv() {
  return Object.fromEntries(
    fs.readFileSync(".env.local", "utf8")
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.trim().startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
        return [key, value];
      }),
  );
}

const env = readLocalEnv();
const projectRef = new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname.split(".")[0];
const sql = postgres({
  host: `db.${projectRef}.supabase.co`,
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: env.SUPABASE_DB_PASSWORD,
  ssl: "require",
  max: 1,
  connect_timeout: 20,
  idle_timeout: 5,
});

try {
  await sql`
    create table if not exists public.radar360_schema_migrations (
      version text primary key,
      applied_at timestamptz not null default now()
    )
  `;

  const migrationDirectory = "supabase/migrations";
  const migrationFiles = fs.readdirSync(migrationDirectory)
    .filter((name) => name.endsWith(".sql"))
    .sort();

  const appliedRows = await sql`select version from public.radar360_schema_migrations`;
  const applied = new Set(appliedRows.map((row) => row.version));
  const appliedNow = [];

  for (const filename of migrationFiles) {
    if (applied.has(filename)) continue;
    const source = fs.readFileSync(path.join(migrationDirectory, filename), "utf8");
    await sql.begin(async (transaction) => {
      await transaction.unsafe(source);
      await transaction`
        insert into public.radar360_schema_migrations (version)
        values (${filename})
      `;
    });
    appliedNow.push(filename);
  }

  const seed = fs.readFileSync("supabase/seed.sql", "utf8");
  await sql.unsafe(seed);

  const counts = await sql`
    select
      (select count(*)::int from public.organizations) as organizations,
      (select count(*)::int from public.sectors) as sectors,
      (select count(*)::int from public.schools) as schools,
      (select count(*)::int from public.institutional_profiles) as institutional_profiles,
      (select count(*)::int from public.demand_categories) as demand_categories,
      (select count(*)::int from public.hubs) as hubs
  `;
  console.log(JSON.stringify({ ok: true, applied: appliedNow, counts: counts[0] }));
} catch (error) {
  console.error(JSON.stringify({
    ok: false,
    code: error.code ?? error.name,
    message: String(error.message ?? "").replaceAll(env.SUPABASE_DB_PASSWORD, "[redacted]"),
  }));
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 2 });
}
