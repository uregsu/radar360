import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const repairPath="supabase/migrations/20260813000100_repair_school_modules_unicode.sql";
const experiencePath="supabase/migrations/20260812000100_school_experience_metrics.sql";
const qualityPath="supabase/migrations/20260812000200_school_quality_indicators.sql";
const repairBytes=fs.readFileSync(repairPath);
const decode=(bytes)=>new TextDecoder("utf-8",{fatal:true}).decode(bytes);
const repair=decode(repairBytes);
const experience=fs.readFileSync(experiencePath,"utf8");
const quality=fs.readFileSync(qualityPath,"utf8");

function extractFunction(sql,name){
  const pattern=new RegExp(`create(?: or replace)? function public\\.${name}\\(\\)[\\s\\S]*?\\$\\$;`);
  return sql.match(pattern)?.[0]??"";
}

function normalizeCreateFunction(sql){
  return sql.replace(/^create or replace function/i,"create function");
}

test("migration corretiva é UTF-8 válido e preserva os caracteres oficiais",()=>{
  assert.ok(repairBytes.length>0);
  assert.match(repair,/Escola Total – Qualidade Educacional/);
  for(const literal of ["dimensões","média","atenção","índice","importação","não","Métricas","período","Experiência"]){
    assert.ok(repair.includes(literal),`literal ausente: ${literal}`);
  }
  assert.doesNotMatch(repair,/\?{1,}/);
  assert.doesNotMatch(repair,/&(?:#\d+|#x[\da-f]+|[a-z]+);/i);
  assert.doesNotMatch(repair,/â€“|Ã§|Ã£|Ã©|�/);
});

test("default de source usa exatamente o texto oficial",()=>{
  assert.match(repair,/alter table public\.school_quality_indicators\s+alter column source set default 'Escola Total – Qualidade Educacional';/);
});

test("funções mantêm integralmente a lógica versionada em 00100 e 00200",()=>{
  const repairedExperience=extractFunction(repair,"validate_school_experience_metrics");
  const repairedQuality=extractFunction(repair,"preserve_school_quality_provenance");
  assert.ok(repairedExperience);
  assert.ok(repairedQuality);
  assert.equal(normalizeCreateFunction(repairedExperience),extractFunction(experience,"validate_school_experience_metrics"));
  assert.equal(normalizeCreateFunction(repairedQuality),extractFunction(quality,"preserve_school_quality_provenance"));
});

test("comments são copiados literalmente das migrations oficiais",()=>{
  for(const comment of [
    "Métricas preservadas por escola e período para o Índice de Atenção à Experiência Escolar; instrumento de priorização, não avaliação definitiva da qualidade escolar.",
    "Indicadores oficiais de Qualidade da Aula provenientes do Escola Total – Qualidade Educacional; fonte independente da pesquisa Experiência Escolar.",
  ]){
    assert.ok(repair.includes(comment));
    assert.ok(experience.includes(comment)||quality.includes(comment));
  }
});

test("migration é cirúrgica e não altera dados, segurança ou objetos estruturais",()=>{
  assert.doesNotMatch(repair,/^\s*(drop|truncate|delete\s+from|insert\s+into|update\s+public\.)\b/im);
  assert.doesNotMatch(repair,/alter\s+column\s+\w+\s+type\b/i);
  assert.doesNotMatch(repair,/\b(create|drop)\s+(table|type|policy|trigger|index)\b/i);
  assert.doesNotMatch(repair,/\b(row level security|grant|revoke|auth\.users|profiles|roles)\b/i);
  assert.match(repair,/^alter table public\.school_quality_indicators/m);
  assert.equal((repair.match(/create or replace function/gi)??[]).length,2);
  assert.equal((repair.match(/comment on table/gi)??[]).length,2);
});
