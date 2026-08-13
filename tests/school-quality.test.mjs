import test from "node:test";
import assert from "node:assert/strict";
import { formatQualityValue, projectSchoolQuality } from "../lib/school-quality.mjs";

const row=(id,period,value,extra={})=>({id,reference_period:period,value,value_unit:"PERCENT",indicator_name:id,is_primary:false,regional_value:null,classification:null,...extra});

test("seleciona o período mais recente sem inventar dados",()=>{
  const view=projectSchoolQuality([row("a","2025",70),row("b","2026",80)]);assert.equal(view.period,"2026");assert.equal(view.current.length,1);
});

test("mantém indicador oficial principal separado das dimensões",()=>{
  const view=projectSchoolQuality([row("geral","2026",75,{is_primary:true}),row("dimensão","2026",80)]);assert.equal(view.primary.indicator_name,"geral");assert.equal(view.dimensions.length,1);
});

test("calcula somente leituras suportadas pelos valores recebidos",()=>{
  const view=projectSchoolQuality([row("a","2026",80,{regional_value:70}),row("b","2026",60,{regional_value:65,classification:"Atenção oficial"})]);assert.equal(view.aboveRegional.length,1);assert.equal(view.best.indicator_name,"a");assert.equal(view.lowest.indicator_name,"b");assert.equal(view.officialAttention.length,1);
});

test("formata unidade original e preserva ausência",()=>{
  assert.equal(formatQualityValue(row("a","2026",78.25)),"78,3%");assert.equal(formatQualityValue(null),"—");
});
