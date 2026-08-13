import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const experience=fs.readFileSync("supabase/migrations/20260812000100_school_experience_metrics.sql","utf8");
const quality=fs.readFileSync("supabase/migrations/20260812000200_school_quality_indicators.sql","utf8");
const updatePolicy=(sql,name)=>sql.match(new RegExp(`create policy ${name}[\\s\\S]*?;`))?.[0]??"";

test("UPDATE de Qualidade da Aula mantém escola na organização autenticada",()=>{
  const policy=updatePolicy(quality,"school_quality_admin_update");
  assert.match(policy,/exists\s*\([\s\S]*school\.id = school_id/);
  assert.match(policy,/school\.organization_id = public\.current_organization_id\(\)/);
  assert.match(policy,/school\.active/);
});

test("percentuais escolares e regionais recusam valores fora de 0 a 100",()=>{
  assert.match(quality,/constraint school_quality_percent_valid/);
  assert.match(quality,/value between 0 and 100/);
  assert.match(quality,/regional_value is null or regional_value between 0 and 100/);
});

test("escala explícita valida value e regional_value",()=>{
  assert.match(quality,/value between scale_min and scale_max/);
  assert.match(quality,/regional_value is null or regional_value between scale_min and scale_max/);
});

test("somente um indicador principal é permitido por escola, período e fonte",()=>{
  assert.match(quality,/create unique index school_quality_one_primary_idx[\s\S]*\(school_id, reference_period, source\)[\s\S]*where is_primary;/);
});

test("Experiência Escolar rejeita média e índice divergentes",()=>{
  assert.match(experience,/average_score diverge das seis dimensões/);
  assert.match(experience,/attention_score diverge da média calculada/);
  assert.match(experience,/calculated_average := round/);
  assert.match(experience,/calculated_attention := round\(greatest\(0, least\(100/);
});

test("Experiência Escolar rejeita dimensões crítica e favorável divergentes",()=>{
  assert.match(experience,/critical_dimension diverge da menor dimensão/);
  assert.match(experience,/best_dimension diverge da maior dimensão/);
  assert.match(experience,/select min\(score\), max\(score\)/);
  assert.match(experience,/array_positions\(dimension_scores, calculated_best_score\)/);
  assert.match(experience,/array_length\(calculated_best_positions, 1\)/);
});

test("Experiência Escolar deriva contadores e níveis no banco",()=>{
  for(const field of ["below_3_count","below_4_count","below_5_count","below_6_count","trigger_count","base_attention_level","attention_level"]){
    assert.match(experience,new RegExp(`${field} diverge`));
  }
});

test("imported_by é preservado e updated_by registra atualizações",()=>{
  for(const sql of [experience,quality]){
    assert.match(sql,/updated_by uuid references auth\.users\(id\) on delete set null/);
    assert.match(sql,/new\.imported_by is distinct from old\.imported_by/);
    assert.match(sql,/new\.updated_by := auth\.uid\(\)/);
    assert.match(sql,/and updated_by = auth\.uid\(\)/);
    assert.match(sql,/new\.imported_at is distinct from old\.imported_at/);
  }
  assert.match(quality,/new\.created_at is distinct from old\.created_at/);
});

test("policies vinculam autoria e escola ativa ao usuário autenticado",()=>{
  for(const [sql,prefix] of [[experience,"school_experience"],[quality,"school_quality"]]){
    const insertPolicy=updatePolicy(sql,`${prefix}_admin_insert`);
    const adminUpdatePolicy=updatePolicy(sql,`${prefix}_admin_update`);
    assert.match(insertPolicy,/imported_by = auth\.uid\(\)/);
    assert.match(insertPolicy,/updated_by is null/);
    assert.match(insertPolicy,/school\.organization_id = public\.current_organization_id\(\)/);
    assert.match(adminUpdatePolicy,/updated_by = auth\.uid\(\)/);
    assert.match(adminUpdatePolicy,/school\.organization_id = public\.current_organization_id\(\)/);
    assert.match(adminUpdatePolicy,/school\.active/);
  }
});

test("DELETE permanece sem grant e sem policy nas duas tabelas",()=>{
  for(const sql of [experience,quality]){
    assert.doesNotMatch(sql,/grant[^;]*delete/i);
    assert.doesNotMatch(sql,/for\s+delete/i);
  }
});
