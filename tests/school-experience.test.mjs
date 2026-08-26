import test from "node:test";
import assert from "node:assert/strict";
import { calculateSchoolExperience, countExperienceLevels, experienceHeatmapTooltip, filterExperienceMetrics, normalizeSchoolName, parseExperienceCsv, prepareExperienceImport, projectExperiencePriorities, toSchoolExperienceInsert, toggleExperienceLevel } from "../lib/school-experience.mjs";

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

test("classifica exatamente as fronteiras oficiais do índice", () => {
  for(const [attention,expected] of [[19.9,"FAVORAVEL"],[20,"REGULAR"],[34.9,"REGULAR"],[35,"ATENCAO"],[49.9,"ATENCAO"],[50,"ELEVADA"],[64.9,"ELEVADA"],[65,"PRIORIDADE"]]){
    assert.equal(calculateSchoolExperience(values(10-attention/10)).baseLevel,expected,`índice ${attention}`);
  }
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
  const rafael=calculateSchoolExperience({...values(7),overall_satisfaction:1.830188679});assert.equal(rafael.hasCriticalTrigger,true);assert.equal(rafael.criticalDimension,"overall_satisfaction");assert.equal(rafael.attentionLevel,"PRIORIDADE");
  const fusco=calculateSchoolExperience({class_quality:4.703333333,school_climate:3.916666667,spaces_and_bathrooms:2.636666667,learning_support:2.79,engagement_life_project:4.31,overall_satisfaction:4.808510638});assert.equal(fusco.attentionLevel,"PRIORIDADE");assert.ok(fusco.triggerCount>=5);
  const favoravel=calculateSchoolExperience(values(8.5));assert.equal(favoravel.baseLevel,"FAVORAVEL");assert.equal(favoravel.attentionLevel,"FAVORAVEL");
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

test("prioridades possuem projeção própria, independente da ordem e dos filtros do heatmap", () => {
  const metric=(id,overrides={})=>({id,reference_period:"2026",attention_level:"ATENCAO",attention_score:40,average_score:6,critical_dimension_score:5,trigger_count:1,below_3_count:0,below_4_count:0,below_5_count:0,below_6_count:1,schools:{name:id},...overrides});
  const metrics=[metric("regular",{attention_level:"REGULAR",attention_score:30}),metric("priority-b",{attention_level:"PRIORIDADE",attention_score:55,below_6_count:3}),metric("priority-a",{attention_level:"PRIORIDADE",attention_score:45,below_3_count:1}),metric("other-period",{reference_period:"2025",attention_level:"PRIORIDADE"})];
  const expected=["priority-a","priority-b","regular"];
  assert.deepEqual(projectExperiencePriorities(metrics,"2026").map(row=>row.id),expected);
  assert.deepEqual(projectExperiencePriorities([...metrics].reverse(),"2026").map(row=>row.id),expected);
  const visuallyFiltered=metrics.filter(row=>row.attention_level==="REGULAR");
  assert.deepEqual(projectExperiencePriorities(metrics,"2026").map(row=>row.id),expected);
  assert.deepEqual(visuallyFiltered.map(row=>row.id),["regular"]);
});

test("card de nível aplica e remove o mesmo estado usado pelo dropdown", () => {
  let level="";
  level=toggleExperienceLevel(level,"ELEVADA");assert.equal(level,"ELEVADA");
  level=toggleExperienceLevel(level,"ELEVADA");assert.equal(level,"");
});

test("dropdown e cards permanecem sincronizados ao trocar de nível", () => {
  let level="REGULAR";
  assert.equal(level,"REGULAR");
  level=toggleExperienceLevel(level,"PRIORIDADE");
  assert.equal(level,"PRIORIDADE");
});

test("filtro de nível combina com os demais filtros", () => {
  const rows=[
    {id:"elevada-a",reference_period:"2026",attention_level:"ELEVADA",critical_dimension:"school_climate",trigger_count:2,average_score:4.5,schools:{name:"ESCOLA ALFA"}},
    {id:"elevada-b",reference_period:"2026",attention_level:"ELEVADA",critical_dimension:"class_quality",trigger_count:0,average_score:5.2,schools:{name:"ESCOLA BETA"}},
    {id:"regular",reference_period:"2026",attention_level:"REGULAR",critical_dimension:"school_climate",trigger_count:2,average_score:7,schools:{name:"ESCOLA ALFA"}},
  ];
  assert.deepEqual(filterExperienceMetrics(rows,{referencePeriod:"2026",level:"ELEVADA"}).map(row=>row.id),["elevada-a","elevada-b"]);
  assert.deepEqual(filterExperienceMetrics(rows,{referencePeriod:"2026",level:"ELEVADA",query:"alfa",dimension:"school_climate",trigger:"yes",averageMax:"5"}).map(row=>row.id),["elevada-a"]);
});

test("distribuição completa permanece independente do filtro de nível", () => {
  const expected={FAVORAVEL:18,REGULAR:28,ATENCAO:9,ELEVADA:14,PRIORIDADE:13};
  const rows=Object.entries(expected).flatMap(([attention_level,total])=>Array.from({length:total},(_,index)=>({id:`${attention_level}-${index}`,reference_period:"2026",attention_level})));
  assert.deepEqual(countExperienceLevels(rows,"2026"),expected);
  assert.equal(filterExperienceMetrics(rows,{referencePeriod:"2026",level:"ELEVADA"}).length,14);
  assert.deepEqual(countExperienceLevels(rows,"2026"),expected);
});

test("casos de controle preservam resultados oficiais", () => {
  const cases=[
    ["JOAO DE ALMEIDA BARBOSA",{class_quality:8.294117647,school_climate:5.369281046,spaces_and_bathrooms:2.411764706,learning_support:6.323529412,engagement_life_project:6.745098039,overall_satisfaction:3.5625},5.4511,45.489,"ATENCAO","PRIORIDADE"],
    ["SEBASTIAO WALTER FUSCO",{class_quality:4.703333333,school_climate:3.916666667,spaces_and_bathrooms:2.636666667,learning_support:2.79,engagement_life_project:4.31,overall_satisfaction:4.808510638},3.8609,61.391,"ELEVADA","PRIORIDADE"],
    ["JOAO CRISPINIANO SOARES",values(8.5),8.5,15,"FAVORAVEL","FAVORAVEL"],
    ["VICTOR CIVITA",values(8.5),8.5,15,"FAVORAVEL","FAVORAVEL"],
  ];
  for(const [name,input,average,attention,base,resulting] of cases){const result=calculateSchoolExperience(input);assert.ok(Math.abs(result.averageScore-average)<0.001,`${name}: média`);assert.ok(Math.abs(result.attentionScore-attention)<0.001,`${name}: índice`);assert.equal(result.baseLevel,base);assert.equal(result.attentionLevel,resulting)}
  const rafael=calculateSchoolExperience({...values(7),overall_satisfaction:1.830188679});assert.ok(Math.abs(rafael.criticalDimensionScore-1.8302)<0.001);assert.equal(rafael.attentionLevel,"PRIORIDADE");
});

test("tooltip recebe escola, dimensão, valor e classificação contextuais", () => {
  assert.deepEqual(experienceHeatmapTooltip("RAFAEL RODRIGUES FILHO PREFEITO","Satisfação Geral",1.8302),{school:"RAFAEL RODRIGUES FILHO PREFEITO",dimension:"Satisfação Geral",value:1.8302,classification:"Crítica"});
  assert.equal(experienceHeatmapTooltip("ESCOLA","Clima Escolar",5.5).classification,"Acompanhamento");assert.equal(experienceHeatmapTooltip("ESCOLA","Qualidade da Aula",8).classification,"Favorável");
});
