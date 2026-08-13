"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase/client";
import { formatQualityValue, projectSchoolQuality, SCHOOL_QUALITY_SOURCE, type SchoolQualityIndicator } from "../lib/school-quality.mjs";
import { AlertBanner, DataTable, EmptyState, LoadingState, MetricCard, SectionHeader, StatusBadge } from "./SuperBIUI";

export type SchoolQualityState = { rows:SchoolQualityIndicator[]; loading:boolean; error:string };

export function useSchoolQualityData(schoolId:string, disabled=false):SchoolQualityState {
  const [state,setState]=useState<SchoolQualityState>({rows:[],loading:!disabled,error:""});
  useEffect(()=>{
    if(disabled||!schoolId){queueMicrotask(()=>setState({rows:[],loading:false,error:""}));return}
    let active=true;queueMicrotask(()=>{if(active)setState(previous=>({...previous,loading:true,error:""}))});
    void getSupabaseBrowserClient().from("school_quality_indicators").select("id,school_id,indicator_key,indicator_name,dimension,value,value_unit,scale_min,scale_max,classification,regional_value,reference_period,source,source_updated_at,is_primary").eq("school_id",schoolId).order("reference_period",{ascending:true}).then(({data,error})=>{
      if(!active)return;
      const unavailable=error&&(error.code==="42P01"||error.code==="PGRST205");
      setState({rows:(data??[]) as unknown as SchoolQualityIndicator[],loading:false,error:error&&!unavailable?"Não foi possível carregar os indicadores de Qualidade da Aula.":""});
    });
    return()=>{active=false};
  },[disabled,schoolId]);
  return state;
}

const date=(value:string|null)=>value?new Intl.DateTimeFormat("pt-BR",{timeZone:"UTC"}).format(new Date(value)):null;
const gap=(row:SchoolQualityIndicator)=>`${Number(row.value)-Number(row.regional_value)>=0?"+":""}${(Number(row.value)-Number(row.regional_value)).toLocaleString("pt-BR",{maximumFractionDigits:1})}${row.value_unit==="PERCENT"?" p.p.":""}`;

function QualityEmpty({compact=false}:{compact?:boolean}) {
  return <EmptyState title={compact?"Dados ainda não disponíveis":"Dados de Qualidade da Aula ainda não disponíveis"} description={compact?"A fonte Escola Total – Qualidade Educacional ainda não foi importada.":"Dados de Qualidade da Aula ainda não disponíveis para esta unidade no período selecionado."}/>;
}

export function SchoolQualitySummary({state,onOpenDetails}:{state:SchoolQualityState;onOpenDetails:()=>void}) {
  const view=useMemo(()=>projectSchoolQuality(state.rows),[state.rows]);
  if(state.loading)return <section className="school-quality-summary"><LoadingState title="Carregando Qualidade da Aula…"/></section>;
  return <section className="school-quality-summary school-360-layer"><SectionHeader title="Qualidade da Aula" description={SCHOOL_QUALITY_SOURCE} action={<button className="quality-link" onClick={onOpenDetails}>Ver detalhes</button>}/>
    {state.error?<AlertBanner tone="danger">{state.error}</AlertBanner>:!view.current.length?<QualityEmpty compact/>:<><div className="quality-summary-cards">
      {view.primary&&<MetricCard label={view.primary.indicator_name} value={formatQualityValue(view.primary)} detail={view.primary.regional_value==null?`Período ${view.period}`:`URE: ${Number(view.primary.regional_value).toLocaleString("pt-BR",{maximumFractionDigits:1})}${view.primary.value_unit==="PERCENT"?"%":""} · ${gap(view.primary)}`} tone="teal"/>}
      <MetricCard label="Dimensões acompanhadas" value={view.dimensions.length} detail={`Período ${view.period}`} tone="blue"/>
      {view.best&&<MetricCard label="Destaque no período" value={view.best.indicator_name} detail={formatQualityValue(view.best)} tone="cyan"/>}
      {view.lowest&&<MetricCard label="Menor resultado no período" value={view.lowest.indicator_name} detail={formatQualityValue(view.lowest)} tone="amber"/>}
    </div>{view.dimensions.length>1&&<div className="quality-mini-bars" aria-label="Resultados por dimensão">{view.dimensions.slice(0,5).map(row=><div key={row.id}><span>{row.indicator_name}</span><progress max={row.scale_max??100} value={Number(row.value)} aria-label={`${row.indicator_name}: ${formatQualityValue(row)}`}/><strong>{formatQualityValue(row)}</strong></div>)}</div>}</>}
  </section>;
}

export function SchoolQualityOverview({state}:{state:SchoolQualityState}) {
  const [period,setPeriod]=useState("");const view=useMemo(()=>projectSchoolQuality(state.rows,period),[state.rows,period]);
  if(state.loading)return <LoadingState title="Carregando Qualidade da Aula…" description="Consultando a fonte institucional autorizada."/>;
  if(state.error)return <AlertBanner tone="danger">{state.error}</AlertBanner>;
  if(!view.current.length)return <section className="school-quality-overview"><SectionHeader title="Qualidade da Aula" description="Indicadores de acompanhamento da qualidade educacional da unidade escolar."/><p className="quality-source">Fonte: {SCHOOL_QUALITY_SOURCE}</p><QualityEmpty/></section>;
  const updated=view.current.map(row=>row.source_updated_at).filter(Boolean).sort().at(-1)??null;
  return <div className="school-quality-overview"><header><div><h2>Qualidade da Aula</h2><p>Indicadores de acompanhamento da qualidade educacional da unidade escolar.</p><small>Fonte: {SCHOOL_QUALITY_SOURCE}</small></div><div className="quality-period"><label>Período de referência<select value={view.period??""} onChange={event=>setPeriod(event.target.value)}>{view.periods.map(item=><option key={item}>{item}</option>)}</select></label>{updated&&<span>Última atualização: {date(updated)}</span>}</div></header>
    <section><SectionHeader title="Visão geral" description="Indicadores disponíveis na fonte institucional, sem métricas derivadas não oficiais."/><div className="quality-overview-cards">{view.primary&&<MetricCard label={view.primary.indicator_name} value={formatQualityValue(view.primary)} detail={view.primary.classification??`Período ${view.period}`} tone="teal"/>}<MetricCard label="Indicadores disponíveis" value={view.current.length} detail={`Período ${view.period}`} tone="blue"/><MetricCard label="Dimensões acompanhadas" value={view.dimensions.length} detail="Conforme estrutura da fonte" tone="cyan"/>{view.officialAttention.length>0&&<MetricCard label="Classificação oficial de atenção" value={view.officialAttention.length} detail="Conforme classificação recebida" tone="amber"/>}</div></section>
    {view.dimensions.length>0&&<section><SectionHeader title="Dimensões da Qualidade da Aula" description="Resultados preservados na escala original da fonte."/><div className="quality-dimensions">{view.dimensions.map(row=><article key={row.id}><div><span>{row.dimension??"Dimensão"}</span>{row.classification&&<StatusBadge tone="neutral">{row.classification}</StatusBadge>}</div><h3>{row.indicator_name}</h3><strong>{formatQualityValue(row)}</strong>{row.scale_min!=null&&row.scale_max!=null&&<small>Escala: {row.scale_min} a {row.scale_max}</small>}</article>)}</div></section>}
    {view.comparable.length>0&&<section><SectionHeader title="Escola x URE Guarulhos Sul" description="Comparações disponíveis na própria base institucional."/><DataTable><caption>Comparação entre escola e resultado regional</caption><thead><tr><th>Indicador</th><th>Escola</th><th>URE Guarulhos Sul</th><th>Diferença</th></tr></thead><tbody>{view.comparable.map(row=><tr key={row.id}><th scope="row">{row.indicator_name}</th><td>{formatQualityValue(row)}</td><td>{Number(row.regional_value).toLocaleString("pt-BR",{maximumFractionDigits:1})}{row.value_unit==="PERCENT"?"%":""}</td><td>{gap(row)}</td></tr>)}</tbody></DataTable></section>}
    {view.periods.length>1&&<section><SectionHeader title="Evolução" description="Série histórica descritiva; não implica causalidade."/><DataTable><caption>Evolução dos indicadores por período</caption><thead><tr><th>Período</th><th>Indicador</th><th>Resultado</th><th>Classificação</th></tr></thead><tbody>{state.rows.map(row=><tr key={row.id}><th scope="row">{row.reference_period}</th><td>{row.indicator_name}</td><td>{formatQualityValue(row)}</td><td>{row.classification??"—"}</td></tr>)}</tbody></DataTable></section>}
    <section><SectionHeader title="Leitura da unidade" description="Observações calculadas exclusivamente a partir dos indicadores disponíveis."/><ul className="quality-insights">{view.best&&<li><strong>{view.best.indicator_name}</strong> apresenta o maior resultado registrado no período ({formatQualityValue(view.best)}).</li>}{view.lowest&&<li><strong>{view.lowest.indicator_name}</strong> apresenta o menor resultado registrado no período ({formatQualityValue(view.lowest)}).</li>}{view.comparable.length>0&&<li>A escola apresenta resultado superior ao regional em <strong>{view.aboveRegional.length}</strong> de {view.comparable.length} indicadores comparáveis.</li>}{view.largestPositiveGap&&Number(view.largestPositiveGap.value)>Number(view.largestPositiveGap.regional_value)&&<li>A maior diferença positiva está em <strong>{view.largestPositiveGap.indicator_name}</strong> ({gap(view.largestPositiveGap)}).</li>}</ul></section>
    {view.officialAttention.length>0&&<section><SectionHeader title="Pontos de atenção" description="Somente classificações oficiais recebidas da fonte."/><ul className="quality-attention">{view.officialAttention.map(row=><li key={row.id}><strong>{row.indicator_name}</strong><span>{row.classification} · {formatQualityValue(row)}</span></li>)}</ul></section>}
  </div>;
}
