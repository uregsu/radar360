import fs from "node:fs";
import postgres from "postgres";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/)
    .filter((line) => line.trim() && !line.startsWith("#"))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "")];
    }),
);
const projectRef = new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname.split(".")[0];
const sql = postgres({
  host: `db.${projectRef}.supabase.co`,
  database: "postgres",
  username: "postgres",
  password: env.SUPABASE_DB_PASSWORD,
  ssl: "require",
  max: 1,
});

const asUser = async (tx, userId, operation) => {
  await tx.unsafe("set local role authenticated");
  await tx`select set_config('request.jwt.claim.sub', ${userId}, true)`;
  try {
    return await operation();
  } finally {
    await tx.unsafe("reset role");
  }
};

try {
  const results = await sql.begin(async (tx) => {
    const [admin] = await tx`
      select u.id, p.role, p.active, ip.profile_type
      from auth.users u join public.profiles p on p.user_id = u.id
      join public.institutional_profiles ip on ip.id = p.institutional_profile_id
      where lower(u.email) = 'gsu.seintec@educacao.sp.gov.br'
    `;
    const [seom] = await tx`
      select u.id, p.role, p.active, p.sector_id, s.code
      from auth.users u join public.profiles p on p.user_id = u.id
      join public.sectors s on s.id = p.sector_id
      where lower(u.email) = 'gsu.seom@educacao.sp.gov.br'
    `;
    if (!admin || !seom) throw new Error("Perfis reais ADMIN ou SEOM não localizados.");

    const adminScope = await asUser(tx, admin.id, async () => {
      const [sectorCount] = await tx`select count(*)::int as count from public.sectors where active`;
      const [schoolCount] = await tx`select count(*)::int as count from public.schools where active`;
      const [hubCount] = await tx`select count(*)::int as count from public.hubs where active`;
      const [seomItemCount] = await tx`select count(*)::int as count from public.institutional_items where sector_id = ${seom.sector_id}`;
      return { sectors: sectorCount.count, schools: schoolCount.count, hubs: hubCount.count, seom_items: seomItemCount.count };
    });
    const seomScope = await asUser(tx, seom.id, async () => {
      const hubs = await tx`select sector_id from public.hubs where active`;
      const [ownItems] = await tx`select count(*)::int as count from public.institutional_items where sector_id = ${seom.sector_id}`;
      const [foreignRestricted] = await tx`select count(*)::int as count from public.institutional_items where sector_id <> ${seom.sector_id} and visibility = 'RESTRITO_SETOR'`;
      return { visible_hubs: hubs.length, own_items: ownItems.count, foreign_restricted_items: foreignRestricted.count };
    });

    return {
      admin_profile_valid: admin.role === "ADMIN" && admin.profile_type === "REGIONAL" && admin.active,
      seom_profile_valid: seom.role === "GESTAO" && seom.code === "SEOM" && seom.active,
      admin_scope: adminScope,
      seom_scope: seomScope,
    };
  });
  const passed = results.admin_profile_valid
    && results.seom_profile_valid
    && results.admin_scope.sectors === 16
    && results.admin_scope.schools === 82
    && results.admin_scope.hubs === 3
    && results.admin_scope.seom_items >= 1
    && results.seom_scope.visible_hubs === 1
    && results.seom_scope.own_items >= 1
    && results.seom_scope.foreign_restricted_items === 0;
  console.log(JSON.stringify({ passed, results }));
  if (!passed) process.exitCode = 1;
} catch (error) {
  console.error(JSON.stringify({
    passed: false,
    code: error.code ?? error.name,
    message: String(error.message ?? "").replaceAll(env.SUPABASE_DB_PASSWORD, "[redacted]"),
  }));
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 2 });
}
