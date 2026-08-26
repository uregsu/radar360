import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const sourcePath="supabase/migrations/20260813000100_repair_school_modules_unicode.sql";
const fixPath="supabase/migrations/20260813000200_fix_school_experience_attention_enum.sql";
const original=fs.readFileSync(sourcePath,"utf8");
const fixBytes=fs.readFileSync(fixPath);
const fix=new TextDecoder("utf-8",{fatal:true}).decode(fixBytes);
const enumValues=["FAVORAVEL","REGULAR","ATENCAO","ELEVADA","PRIORIDADE"];

function extractFunction(sql){
  return sql.match(/create or replace function public\.validate_school_experience_metrics\(\)[\s\S]*?\$\$;/)?.[0]??"";
}

function withoutEnumCasts(sql){
  return sql
    .replace(/::public\.school_experience_attention_level/g,"")
    .replace(/case\s*\n\s*when calculated_base = 'PRIORIDADE' then 'PRIORIDADE'\s*\n\s*else 'ELEVADA'\s*\n\s*end/g,"case when calculated_base = 'PRIORIDADE' then 'PRIORIDADE' else 'ELEVADA' end");
}

test("00400 usa CREATE OR REPLACE e tipa todos os literais do CASE resultante",()=>{
  assert.match(fix,/^create or replace function public\.validate_school_experience_metrics\(\)/);
  assert.match(fix,/calculated_level public\.school_experience_attention_level;/);
  const resultCase=fix.match(/calculated_level := case[\s\S]*?\n  end;/)?.[0]??"";
  assert.ok(resultCase);
  const returnedLiterals=[...resultCase.matchAll(/(?:then|else)\s+'([A-Z]+)'(?:::public\.school_experience_attention_level)?/gi)];
  assert.equal(returnedLiterals.length,4);
  for(const returned of returnedLiterals)assert.match(returned[0],/::public\.school_experience_attention_level$/);
  assert.match(resultCase,/else calculated_base/);
});

test("casts usam somente os cinco valores reais do enum",()=>{
  const migration001=fs.readFileSync("supabase/migrations/20260812000100_school_experience_metrics.sql","utf8");
  for(const value of enumValues)assert.match(migration001,new RegExp(`'${value}'`));
  const castValues=[...fix.matchAll(/'([A-Z]+)'::public\.school_experience_attention_level/g)].map((match)=>match[1]);
  assert.ok(castValues.length>=4);
  for(const value of castValues)assert.ok(enumValues.includes(value),`valor fora do enum: ${value}`);
});

test("diff funcional se restringe aos casts explícitos do enum",()=>{
  assert.equal(withoutEnumCasts(extractFunction(fix)),extractFunction(original));
});

test("00400 preserva UTF-8 e não altera dados, segurança ou estrutura",()=>{
  assert.ok(fixBytes.length>0);
  for(const literal of ["dimensões","média","atenção","índice","importação","não"])assert.ok(fix.includes(literal));
  assert.doesNotMatch(fix,/\?|ï¿½|â€“|Ã§|Ã£|Ã©|�/);
  assert.doesNotMatch(fix,/^\s*(insert|update|delete|truncate|drop|alter)\b/im);
  assert.doesNotMatch(fix,/\b(create|drop)\s+(table|type|policy|trigger|index)\b/i);
  assert.doesNotMatch(fix,/\b(row level security|grant|revoke|auth\.users|profiles|roles)\b/i);
  assert.equal((fix.match(/create or replace function/gi)??[]).length,1);
});
