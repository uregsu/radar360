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

class RollbackWithResults extends Error {
  constructor(results) {
    super("rollback security fixtures");
    this.results = results;
  }
}

const ids = {
  admin: "10000000-0000-4000-8000-000000000001",
  seom: "10000000-0000-4000-8000-000000000002",
  escolaA: "10000000-0000-4000-8000-000000000003",
  escolaB: "10000000-0000-4000-8000-000000000004",
  visitor: "10000000-0000-4000-8000-000000000005",
};

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
  await sql.begin(async (tx) => {
    const [organization] = await tx`select id from public.organizations limit 1`;
    const [regional] = await tx`select id from public.institutional_profiles where profile_type = 'REGIONAL' limit 1`;
    const [demo] = await tx`select id from public.institutional_profiles where profile_type = 'DEMO' limit 1`;
    const [seom] = await tx`select s.id, ip.id as profile_id from public.sectors s join public.institutional_profiles ip on ip.sector_id = s.id where s.code = 'SEOM'`;
    const [setec] = await tx`select s.id from public.sectors s where s.code = 'SETEC'`;
    const schoolRows = await tx`select s.id, ip.id as profile_id from public.schools s join public.institutional_profiles ip on ip.school_id = s.id order by s.internal_code limit 2`;
    const [seomCategory] = await tx`select id from public.demand_categories where sector_id = ${seom.id} limit 1`;
    const [setecCategory] = await tx`select id from public.demand_categories where sector_id = ${setec.id} limit 1`;

    for (const [key, id] of Object.entries(ids)) {
      await tx`insert into auth.users (id, email) values (${id}, ${`rls-${key}@radar360.test`})`;
    }
    await tx`insert into public.profiles (organization_id,user_id,name,email,role,institutional_profile_id) values (${organization.id},${ids.admin},'Teste Admin','rls-admin@radar360.test','ADMIN',${regional.id})`;
    await tx`insert into public.profiles (organization_id,user_id,name,email,role,institutional_profile_id,sector_id) values (${organization.id},${ids.seom},'Teste SEOM','rls-seom@radar360.test','GESTAO',${seom.profile_id},${seom.id})`;
    await tx`insert into public.profiles (organization_id,user_id,name,email,role,institutional_profile_id,school_id) values (${organization.id},${ids.escolaA},'Teste Escola A','rls-a@radar360.test','ESCOLA',${schoolRows[0].profile_id},${schoolRows[0].id})`;
    await tx`insert into public.profiles (organization_id,user_id,name,email,role,institutional_profile_id,school_id) values (${organization.id},${ids.escolaB},'Teste Escola B','rls-b@radar360.test','ESCOLA',${schoolRows[1].profile_id},${schoolRows[1].id})`;
    await tx`insert into public.profiles (organization_id,user_id,name,email,role,institutional_profile_id) values (${organization.id},${ids.visitor},'Teste Visitante','rls-visitor@radar360.test','VISITANTE',${demo.id})`;

    const [seomItem] = await tx`insert into public.institutional_items (organization_id,sector_id,school_id,category_id,record_type,title,status,priority,created_by,visibility) values (${organization.id},${seom.id},${schoolRows[0].id},${seomCategory.id},'DEMANDA','Teste SEOM','NOVA','NORMAL',${ids.admin},'ESCOLAS') returning id`;
    const [setecItem] = await tx`insert into public.institutional_items (organization_id,sector_id,school_id,category_id,record_type,title,status,priority,created_by,visibility) values (${organization.id},${setec.id},${schoolRows[1].id},${setecCategory.id},'DEMANDA','Teste SETEC','NOVA','NORMAL',${ids.admin},'RESTRITO_SETOR') returning id`;
    const [publicContent] = await tx`insert into public.institutional_contents (organization_id,sector_id,title,content,content_type,visibility,created_by) values (${organization.id},${seom.id},'Orientação pública de teste','Conteúdo público transacional','ORIENTACAO','PUBLICO',${ids.admin}) returning id`;
    const [restrictedContent] = await tx`insert into public.institutional_contents (organization_id,sector_id,title,content,content_type,visibility,created_by) values (${organization.id},${setec.id},'Documento restrito SETEC','Conteúdo restrito transacional','DOCUMENTO','RESTRITO_SETOR',${ids.admin}) returning id`;

    const adminReadsSeom = await asUser(tx, ids.admin, async () => (await tx`select count(*)::int as count from public.institutional_items where id = ${seomItem.id}`)[0].count === 1);
    const adminReadsSchoolB = await asUser(tx, ids.admin, async () => (await tx`select count(*)::int as count from public.institutional_items where school_id = ${schoolRows[1].id}`)[0].count === 1);
    const adminReadsThreeHubs = await asUser(tx, ids.admin, async () => (await tx`select count(*)::int as count from public.hubs where active`)[0].count === 3);
    const seomReadsOwnHubOnly = await asUser(tx, ids.seom, async () => {
      const rows = await tx`select sector_id from public.hubs where active`;
      return rows.length === 1 && rows[0].sector_id === seom.id;
    });
    const seomUpdatesOwn = await asUser(tx, ids.seom, async () => (await tx`update public.institutional_items set priority = 'ALTA', updated_by = ${ids.seom} where id = ${seomItem.id} returning id`).length === 1);
    const seomCannotUpdateSetec = await asUser(tx, ids.seom, async () => (await tx`update public.institutional_items set priority = 'CRITICA', updated_by = ${ids.seom} where id = ${setecItem.id} returning id`).length === 0);
    const seomInsertsOwn = await asUser(tx, ids.seom, async () => (await tx`insert into public.institutional_items (organization_id,sector_id,school_id,category_id,record_type,title,status,priority,created_by,updated_by,visibility) values (${organization.id},${seom.id},${schoolRows[0].id},${seomCategory.id},'DEMANDA','Inserção SEOM','EM_ANALISE','NORMAL',${ids.seom},${ids.seom},'GESTAO') returning id`).length === 1);
    let seomCannotInsertSetec = false;
    try {
      await tx.savepoint(async (sp) => asUser(sp, ids.seom, async () => sp`insert into public.institutional_items (organization_id,sector_id,school_id,category_id,record_type,title,status,priority,created_by,updated_by,visibility) values (${organization.id},${setec.id},${schoolRows[1].id},${setecCategory.id},'DEMANDA','Inserção SETEC indevida','NOVA','NORMAL',${ids.seom},${ids.seom},'GESTAO') returning id`));
    } catch (error) {
      seomCannotInsertSetec = error.code === "42501";
    }
    const schoolAReadsOwn = await asUser(tx, ids.escolaA, async () => (await tx`select count(*)::int as count from public.institutional_items where school_id = ${schoolRows[0].id}`)[0].count === 1);
    const schoolACannotReadB = await asUser(tx, ids.escolaA, async () => (await tx`select count(*)::int as count from public.institutional_items where school_id = ${schoolRows[1].id}`)[0].count === 0);
    const visitorReadsNoRealItems = await asUser(tx, ids.visitor, async () => (await tx`select count(*)::int as count from public.institutional_items`)[0].count === 0);
    const visitorReadsNoHubUrls = await asUser(tx, ids.visitor, async () => (await tx`select count(*)::int as count from public.hubs`)[0].count === 0);
    const seomReadsPublicContent = await asUser(tx, ids.seom, async () => (await tx`select count(*)::int as count from public.institutional_contents where id = ${publicContent.id}`)[0].count === 1);
    const seomCannotReadSetecRestrictedContent = await asUser(tx, ids.seom, async () => (await tx`select count(*)::int as count from public.institutional_contents where id = ${restrictedContent.id}`)[0].count === 0);
    const visitorReadsNoRealContent = await asUser(tx, ids.visitor, async () => (await tx`select count(*)::int as count from public.institutional_contents`)[0].count === 0);

    const results = {
      admin_reads_seom: adminReadsSeom,
      admin_reads_school_b: adminReadsSchoolB,
      admin_reads_three_hubs: adminReadsThreeHubs,
      seom_reads_own_hub_only: seomReadsOwnHubOnly,
      seom_updates_own: seomUpdatesOwn,
      seom_cannot_update_setec: seomCannotUpdateSetec,
      seom_inserts_own: seomInsertsOwn,
      seom_cannot_insert_setec: seomCannotInsertSetec,
      school_a_reads_own: schoolAReadsOwn,
      school_a_cannot_read_b: schoolACannotReadB,
      visitor_reads_no_real_items: visitorReadsNoRealItems,
      visitor_reads_no_hub_urls: visitorReadsNoHubUrls,
      seom_reads_public_content: seomReadsPublicContent,
      seom_cannot_read_setec_restricted_content: seomCannotReadSetecRestrictedContent,
      visitor_reads_no_real_content: visitorReadsNoRealContent,
    };
    throw new RollbackWithResults(results);
  });
} catch (error) {
  if (error instanceof RollbackWithResults) {
    const passed = Object.values(error.results).every(Boolean);
    console.log(JSON.stringify({ passed, results: error.results }));
    if (!passed) process.exitCode = 1;
  } else {
    console.error(JSON.stringify({
      passed: false,
      code: error.code ?? error.name,
      message: String(error.message ?? "").replaceAll(env.SUPABASE_DB_PASSWORD, "[redacted]"),
    }));
    process.exitCode = 1;
  }
} finally {
  await sql.end({ timeout: 2 });
}
