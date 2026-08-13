import test from "node:test";
import assert from "node:assert/strict";
import { calculateSchoolExperience, normalizeSchoolName, parseExperienceCsv, prepareExperienceImport, toSchoolExperienceInsert } from "../lib/school-experience.mjs";

const values = (value) => ({ class_quality:value, school_climate:value, spaces_and_bathrooms:value, learning_support:value, engagement_life_project:value, overall_satisfaction:value });

test("calcula média e Índice de Atenção", () => {
  const result=calculateSchoolExperience(values(7.5));assert.equal(result.averageScore,7.5);assert.equal(result.attentionScore,25);assert.equal(result.baseLevel,"REGULAR");
});

test("limita os resultados válidos nos extremos 0 e 100", () => {
  assert.equal(calculateSchoolExperience(values(10)).attentionScore,0);assert.equal(calculateSchoolExperience(values(0)).attentionScore,100);
});

test("classifica todas as faixas base", () => {
  assert.equal(calculateSchoolExperience(values(8.01)).baseLevel,"FAVORAVEL");assert.equal(calculateSchoolExperience(values(7)).baseLevel,"REGULAR");assert.equal(calculateSchoolExperience(values(6)).baseLevel,"ATENCAO");assert.equal(calculateSchoolExperience(values(4)).baseLevel,"ELEVADA");assert.equal(calculateSchoolExperience(values(3)).baseLevel,"PRIORIDADE");
});

test("gatilho abaixo de 3 cria prioridade explicável", () => {
  const result=calculateSchoolExperience({...values(8),spaces_and_bathrooms:2.9});assert.equal(result.hasCriticalTrigger,true);assert.equal(result.attentionLevel,"PRIORIDADE");assert.equal(result.reasons[0].severity,"CRITICO");
});

test("gatilho abaixo de 4 cria atenção elevada", () => {
  const result=calculateSchoolExperience({...values(8),school_climate:3.9});assert.equal(result.attentionLevel,"ELEVADA");assert.equal(result.below4Count,1);
});

test("duas dimensões abaixo de 5 criam atenção elevada", () => {
  const result=calculateSchoolExperience({...values(8),school_climate:4.8,overall_satisfaction:4.9});assert.equal(result.attentionLevel,"ELEVADA");assert.equal(result.below5Count,2);
});

test("três dimensões abaixo de 6 criam prioridade", () => {
  const result=calculateSchoolExperience({...values(8),school_climate:5.8,overall_satisfaction:5.7,learning_support:5.9});assert.equal(result.attentionLevel,"PRIORIDADE");assert.equal(result.below6Count,3);
});

test("recusa vazio, texto, NaN, Infinity e fora da escala", () => {
  for (const invalid of [-1,11,Number.NaN,Number.POSITIVE_INFINITY,"5",null]) assert.throws(()=>calculateSchoolExperience({...values(5),class_quality:invalid}),/entre 0 e 10/);
});

test("normaliza nome apenas para matching", () => {
  assert.equal(normalizeSchoolName("  Rafael Rodrigues Filho Prefeito  "),normalizeSchoolName("RAFAEL RODRIGUES FILHO,PREF"));
});

test("escola não encontrada fica pendente e não é importada", () => {
  const report=prepareExperienceImport([{row:2,schoolName:"DESCONHECIDA",values:values(7)}],[{id:"1",name:"ESCOLA EXISTENTE",organization_id:"o"}],{referencePeriod:"2026-1",source:"Pesquisa"});assert.equal(report.accepted.length,0);assert.match(report.pending[0].errors.join(" "),/não encontrada/);
});

test("duplicidade no arquivo é recusada", () => {
  const school={id:"1",name:"ESCOLA A",organization_id:"o"};const report=prepareExperienceImport([{row:2,schoolName:"ESCOLA A",values:values(7)},{row:3,schoolName:"escola a",values:values(8)}],[school],{referencePeriod:"2026-1",source:"Pesquisa"});assert.equal(report.accepted.length,1);assert.match(report.pending[0].errors.join(" "),/duplicada/);
});

test("múltiplos períodos permanecem identificáveis", () => {
  const school={id:"1",name:"ESCOLA A",organization_id:"o"};const row=[{row:2,schoolName:"ESCOLA A",values:values(7)}];assert.equal(prepareExperienceImport(row,[school],{referencePeriod:"2026-1",source:"Pesquisa"}).accepted[0].reference_period,"2026-1");assert.equal(prepareExperienceImport(row,[school],{referencePeriod:"2026-2",source:"Pesquisa"}).accepted[0].reference_period,"2026-2");
});

test("casos representativos preservam valores e gatilhos", () => {
  const joao=calculateSchoolExperience({class_quality:8.294117647,school_climate:5.369281046,spaces_and_bathrooms:2.411764706,learning_support:6.323529412,engagement_life_project:6.745098039,overall_satisfaction:3.5625});assert.equal(joao.hasCriticalTrigger,true);assert.equal(joao.criticalDimension,"spaces_and_bathrooms");
  const fusco=calculateSchoolExperience({class_quality:4.703333333,school_climate:3.916666667,spaces_and_bathrooms:2.636666667,learning_support:2.79,engagement_life_project:4.31,overall_satisfaction:4.808510638});assert.equal(fusco.attentionLevel,"PRIORIDADE");assert.ok(fusco.triggerCount>=5);
});

test("parser CSV preserva seis números originais", () => {
  const parsed=parseExperienceCsv("Escola;1. Qualidade da Aula;2. Clima Escolar;3. Banheiro e Uso dos Espaços;4. Apoio à Aprendizagem;5. Engajamento e Projeto de Vida;6. Satisfação Geral\nESCOLA A;8,2;7,1;6;5;4;3");assert.equal(parsed[0].values.class_quality,8.2);assert.equal(parsed[0].values.overall_satisfaction,3);
});

test("parser CSV associa dimensões pelo cabeçalho mesmo fora da ordem", () => {
  const parsed=parseExperienceCsv("Escola;6. Satisfação Geral;1. Qualidade da Aula;2. Clima Escolar;3. Banheiro e Uso dos Espaços;4. Apoio à Aprendizagem;5. Engajamento e Projeto de Vida\nESCOLA A;3;8,2;7,1;6;5;4");assert.equal(parsed[0].values.class_quality,8.2);assert.equal(parsed[0].values.overall_satisfaction,3);
});

test("relatório separa não encontrados, duplicidades e inválidos", () => {
  const school={id:"1",name:"ESCOLA A",organization_id:"o"};const report=prepareExperienceImport([{row:2,schoolName:"DESCONHECIDA",values:values(7)},{row:3,schoolName:"ESCOLA A",values:values(7)},{row:4,schoolName:"ESCOLA A",values:{...values(7),class_quality:12}}],[school],{referencePeriod:"2026-1",source:"Pesquisa"});assert.equal(report.notFound,1);assert.equal(report.duplicates,1);assert.equal(report.invalid,1);assert.equal(report.matched,1);
});

test("payload de INSERT delega campos derivados ao banco", () => {
  const prepared={school_id:"s",organization_id:"o",reference_period:"2026",source:"Pesquisa",class_quality:7,average_score:7,attention_score:30,critical_dimension:"class_quality",below_3_count:0};
  const payload=toSchoolExperienceInsert(prepared,"admin");assert.equal(payload.class_quality,7);assert.equal(payload.imported_by,"admin");assert.equal("average_score" in payload,false);assert.equal("attention_score" in payload,false);assert.equal("critical_dimension" in payload,false);assert.equal("below_3_count" in payload,false);
});
