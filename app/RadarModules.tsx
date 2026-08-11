"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase/client";
import { queryContents, queryDashboard, queryEvidences, queryIntegrationMatrix, queryItems, type RadarItem } from "../lib/radar/queries";
import { sectors as sectorCatalog } from "../config/sectors";
import { painelMdi } from "../config/products";
import { demoData } from "../lib/demo/data";
import type { User } from "../types";
import { PageHeader } from "./SuperBIUI";

export function ModuleHeader({eyebrow,title,text}:{eyebrow:string;title:string;text:string}) {
  return <PageHeader eyebrow={eyebrow} title={title} description={text}/>;
}
export function KpiCard({label,value,tone=""}:{label:string;value:string|number;tone?:string}) {
  return <article className={`kpi ${tone}`}><strong>{value}</strong><p>{label}</p></article>;
}
export function EmptyState({title,text,action}:{title:string;text:string;action?:React.ReactNode}) {
  return <div className="context-empty"><i>⌁</i><div><b>{title}</b><p>{text}</p></div>{action}</div>;
}
export function StatusBadge({value}:{value:string}) {return <span className="data-badge status-data">{value.replaceAll("_"," ")}</span>}
export function PriorityBadge({value}:{value:string}) {return <span className={`data-badge priority-${value.toLowerCase()}`}>{value}</span>}
export function ItemTable({items,onOpen}:{items:RadarItem[];onOpen?:(id:string)=>void}) {
  return <div className="real-table"><div className="real-table-head"><span>ITEM</span><span>SETOR</span><span>ESCOLA</span><span>PRIORIDADE</span><span>STATUS</span></div>{items.length?items.map(item=><button className="real-table-row" key={item.id} onClick={()=>onOpen?.(item.id)}><span><b>{item.title}</b><small>{item.record_type} · {item.demand_categories?.name||"Sem categoria"}</small></span><span>{item.sectors?.code||"—"}</span><span>{item.schools?.name||"Regional"}</span><PriorityBadge value={item.priority}/><StatusBadge value={item.status}/></button>):<EmptyState title="Nenhum item encontrado" text="Não existem registros autorizados para os filtros atuais."/>}</div>;
}
export function DataProvenanceReal({source="Supabase · SuperBI 360 | GSU"}:{source?:string}) {
  return <div className="provenance"><span><b>Fonte</b>{source}</span><span><b>Responsável</b>URE Guarulhos Sul</span><span><b>Acesso</b>Perfil + RLS</span><span><b>Integração</b>Dados institucionais reais</span></div>;
}

export function Radar360Module({user,go}:{user:User;go:(path:string)=>void}) {
  const [sectors,setSectors]=useState<any[]>([]);const [items,setItems]=useState<RadarItem[]>([]);const [hubs,setHubs]=useState<any[]>([]);
  useEffect(()=>{if(user.role==="VISITANTE")return;queueMicrotask(async()=>{const supabase=getSupabaseBrowserClient();const [{data:sectorData},{data:itemData},{data:hubData}]=await Promise.all([supabase.from("sectors").select("id,code,slug,name,description").eq("active",true).order("code"),queryItems(supabase,{limit:500}),supabase.from("hubs").select("id,sector_id,status").eq("active",true)]);setSectors(sectorData??[]);setItems(itemData);setHubs(hubData??[])})},[user.id,user.role]);
  const shownSectors=user.role==="VISITANTE"?sectorCatalog.filter(s=>s.shortName!=="GAB").map(s=>({id:s.shortName,code:s.shortName,slug:s.slug,name:s.name,description:s.description})):sectors;
  const shownHubs=user.role==="VISITANTE"?["SETEC","SEOM","ESE"].map(sector_id=>({sector_id,status:"DEMO"})):hubs;
  return <><ModuleHeader eyebrow="ECOSSISTEMA INTEGRADO" title="SuperBI 360 | GSU" text="Visão transversal dos setores, prioridades, escolas e integrações autorizadas."/><div className="sector-overview-grid">{shownSectors.map(s=>{const own=items.filter(i=>i.sector_id===s.id);return <button className={`sector-overview-card ${user.sectorId===s.id?"highlight":""}`} key={s.id} onClick={()=>go(`/radar360/setores/${s.slug}`)}><span>{s.code}</span><h3>{s.name}</h3><p>{s.description}</p><div><b>{user.role==="VISITANTE"?"—":own.filter(i=>!["CONCLUIDA","CANCELADA"].includes(i.status)).length}</b> ativos <b>{user.role==="VISITANTE"?"—":own.filter(i=>i.record_type==="PENDENCIA").length}</b> pendências</div><footer>{shownHubs.some(h=>h.sector_id===s.id)?"Hub disponível":"Em implantação"} <strong>→</strong></footer></button>})}</div><DataProvenanceReal source={user.role==="VISITANTE"?"Base demonstrativa local":"Supabase · SuperBI 360 | GSU"}/></>;
}

export function BigModule() {
  const [sources,setSources]=useState<any[]>([]);
  useEffect(()=>{queueMicrotask(async()=>{const {data}=await getSupabaseBrowserClient().from("data_sources").select("id,name,source_type,status,last_updated_at,sectors(code,name)").eq("active",true).order("name");setSources(data??[])})},[]);
  return <><ModuleHeader eyebrow="INTELIGÊNCIA DE DADOS" title="BIGuarulhosSul" text="Camada preparada para dashboards, indicadores, relatórios e fontes autorizadas."/><section className="panel"><header><div><span className="section-label">FONTES DE DADOS</span><h2>Integrações analíticas</h2></div></header>{sources.length?<div className="simple-list">{sources.map(s=><div key={s.id}><b>{s.name}</b><span>{s.source_type} · {s.status}</span><small>{s.sectors?.code||"Regional"} · {s.last_updated_at?new Date(s.last_updated_at).toLocaleDateString("pt-BR"):"Sem atualização registrada"}</small></div>)}</div>:<EmptyState title="Fonte ainda não integrada" text="Nenhuma fonte analítica foi autorizada para o BIGuarulhosSul."/>}</section><DataProvenanceReal source="Cadastro de fontes do Supabase"/></>;
}

export function MdiModule() {
  const [data,setData]=useState<any>({sectors:[],hubs:[],agreements:[],sources:[]});const [shared,setShared]=useState<RadarItem[]>([]);
  useEffect(()=>{queueMicrotask(async()=>{const supabase=getSupabaseBrowserClient();const [matrix,items]=await Promise.all([queryIntegrationMatrix(supabase),queryItems(supabase,{limit:200})]);setData(matrix);setShared(items.data.filter(i=>["PUBLICO","GESTAO","ESCOLAS"].includes(i.visibility)))})},[]);
  return <><ModuleHeader eyebrow="LEITURA INTEGRADA" title="Integração! Painel MDI" text="Leitura transversal baseada nas fontes, hubs e compartilhamentos já autorizados."/><div className="kpi-grid"><KpiCard label="Setores participantes" value={data.sectors.length}/><KpiCard label="Itens compartilhados" value={shared.length}/><KpiCard label="Fontes cadastradas" value={data.sources.length}/><KpiCard label="Integrações existentes" value={data.hubs.length}/></div><section className="panel"><header><div><span className="section-label">INDICADORES TRANSVERSAIS</span><h2>Itens institucionais compartilhados</h2></div></header><ItemTable items={shared.slice(0,12)}/></section><DataProvenanceReal/></>;
}

export function PainelMdiModule({go}:{go:(path:string)=>void}) {
  const dimensions = [
    {number:"DIMENSÃO 1",title:"Apoio e Orientação Pedagógica",items:["Formação e replicabilidade das pautas pedagógicas","Apoio presencial do pedagógico","Feedback e acompanhamento da evolução","Monitoramento e refinamento","Visão estratégica da equipe de especialistas em currículo"]},
    {number:"DIMENSÃO 2",title:"Gestão Administrativa e Financeira",items:["Monitoramento e refinamento dos processos administrativos e financeiros","Apoio presencial do administrativo e visitas técnicas","Infraestrutura e equipamentos"]},
    {number:"DIMENSÃO 3",title:"Clima Organizacional e Comunicação",items:["Comunicação interna e externa","Acolhimento da equipe","Acompanhamento de denúncias, reclamações e solicitações","Gestão de pessoas e desenvolvimento","Formações e aprimoramento da gestão administrativo-financeira"]},
  ];
  return <div className="mdi-product-page">
    <nav className="mdi-breadcrumb" aria-label="Navegação estrutural"><button onClick={()=>go("/dashboard")}>Início</button><span aria-hidden="true">›</span><button onClick={()=>go("/radar360/evidencias")}>Evidências</button><span aria-hidden="true">›</span><span>Painéis Estratégicos</span><span aria-hidden="true">›</span><strong>Painel MDI</strong></nav>
    <ModuleHeader eyebrow="PAINEL ESTRATÉGICO · PRODUTO INTEGRADO" title={painelMdi.fullName} text="Dashboard estratégico da Unidade Regional de Ensino Guarulhos Sul, organizado pelas dimensões do Método de Melhoria de Resultados – MMR/MDI."/>
    <section className="mdi-introduction" aria-labelledby="mdi-introduction-title"><div><span className="section-label">VISÃO INSTITUCIONAL</span><h2 id="mdi-introduction-title">Três dimensões para uma leitura estratégica integrada</h2></div><div className="mdi-introduction-copy"><p>O Painel MDI integra informações estratégicas da Unidade Regional de Ensino Guarulhos Sul, organizadas em três dimensões complementares: Apoio e Orientação Pedagógica, Gestão Administrativa e Financeira e Clima Organizacional e Comunicação.</p><p>O ambiente reúne visão geral, indicadores, acompanhamento da evolução, evidências, devolutivas, comunicação institucional, infraestrutura e demais produtos de apoio à tomada de decisão.</p></div></section>
    <section className="mdi-dimensions" aria-label="Dimensões do Painel MDI">{dimensions.map((dimension,index)=><article className={`mdi-dimension dimension-${index+1}`} key={dimension.number}><header><span>{dimension.number}</span><i aria-hidden="true">{["◇","▦","◎"][index]}</i></header><h2>{dimension.title}</h2><ul>{dimension.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</section>
    <aside className="mdi-access-panel" aria-label="Acesso ao Painel MDI"><div><span className="section-label">AMBIENTE OFICIAL</span><h2>Acesse todos os recursos do Painel MDI</h2><p>O Painel MDI será aberto em uma nova aba para preservar todos os recursos de navegação.</p></div><a href={painelMdi.url} target="_blank" rel="noopener noreferrer" aria-label="Acessar Painel MDI em uma nova aba" title="Abre o Painel MDI em uma nova aba">Acessar Painel MDI <span aria-hidden="true">↗</span></a></aside>
  </div>;
}

export function CommunicaModule({user}:{user:User}) {
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{queueMicrotask(async()=>{const {data}=await queryContents(getSupabaseBrowserClient());setItems(data)})},[user.id]);
  return <><ModuleHeader eyebrow="COMUNICA! INSTITUCIONAL" title="Conteúdos institucionais" text="Comunicados, orientações, documentos, links e avisos autorizados."/><div className="content-grid">{items.length?items.map(x=><article className="content-card" key={x.id}><StatusBadge value={x.content_type}/><h3>{x.title}</h3><p>{x.content||"Conteúdo disponível no link institucional."}</p><small>{x.sectors?.code||"Regional"} · {new Date(x.published_at||x.created_at).toLocaleDateString("pt-BR")}</small>{x.external_url&&<a href={x.external_url} target="_blank" rel="noopener noreferrer">Abrir conteúdo ↗</a>}</article>):<EmptyState title="Nenhum conteúdo institucional publicado" text="Comunicados e orientações aparecerão aqui após publicação autorizada."/>}</div><DataProvenanceReal/></>;
}

export function EvidenceModule({user}:{user:User}) {
  const [evidences,setEvidences]=useState<any[]>([]);const [items,setItems]=useState<RadarItem[]>([]);const [comments,setComments]=useState<any[]>([]);const [open,setOpen]=useState(false);const [message,setMessage]=useState("");const [draft,setDraft]=useState({itemId:"",title:"",description:"",type:"REGISTRO",url:"",visibility:"GESTAO"});
  const load=async()=>{const supabase=getSupabaseBrowserClient();const [{data},{data:itemData},{data:commentData}]=await Promise.all([queryEvidences(supabase),queryItems(supabase,{limit:200}),supabase.from("institutional_item_comments").select("id,item_id,content,visibility,created_at,institutional_items(title)").order("created_at",{ascending:false}).limit(100)]);setEvidences(data);setItems(itemData);setComments(commentData??[])};
  useEffect(()=>{queueMicrotask(()=>void load())},[user.id]);
  const submit=async(e:React.FormEvent)=>{e.preventDefault();const item=items.find(i=>i.id===draft.itemId);const supabase=getSupabaseBrowserClient();const {data:{user:authUser}}=await supabase.auth.getUser();if(!item||!authUser)return;const {error}=await supabase.from("evidences").insert({organization_id:item.organization_id,item_id:item.id,sector_id:item.sector_id,school_id:item.school_id,title:draft.title,description:draft.description||null,evidence_type:draft.type,external_url:draft.url||null,visibility:draft.visibility,created_by:authUser.id});setMessage(error?"A evidência não pôde ser registrada para este perfil.":"Evidência registrada com sucesso.");if(!error){setOpen(false);await load()}};
  return <><ModuleHeader eyebrow="ACOMPANHAMENTO" title="Evidências e devolutivas" text="Registros reais associados aos itens institucionais e filtrados pela RLS."/><div className="toolbar">{user.role!=="ESCOLA"&&<button className="add-user evidence-add" onClick={()=>setOpen(v=>!v)}>{open?"Cancelar":"+ Nova evidência"}</button>}</div>{open&&<form className="user-form evidence-form" onSubmit={submit}><label>Item institucional<select value={draft.itemId} onChange={e=>setDraft({...draft,itemId:e.target.value})} required><option value="">Selecione</option>{items.map(i=><option key={i.id} value={i.id}>{i.title}</option>)}</select></label><label>Título<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} required/></label><label>Tipo<input value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})} required/></label><label>URL externa<input type="url" value={draft.url} onChange={e=>setDraft({...draft,url:e.target.value})}/></label><label>Visibilidade<select value={draft.visibility} onChange={e=>setDraft({...draft,visibility:e.target.value})}>{["PUBLICO","ESCOLAS","GESTAO","RESTRITO_SETOR","RESTRITO_REGIONAL"].map(x=><option key={x}>{x}</option>)}</select></label><label className="wide">Descrição<input value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/></label><button>Registrar evidência</button></form>}{message&&<div className="inline-message login-success">{message}</div>}<div className="evidence-grid">{evidences.length?evidences.map(e=><article className="evidence-card" key={e.id}><span>{e.evidence_type}</span><h3>{e.title}</h3><p>{e.description||"Evidência vinculada sem descrição textual."}</p><small>{e.sectors?.code||"—"} · {e.schools?.name||"Regional"} · {new Date(e.created_at).toLocaleDateString("pt-BR")}</small>{e.external_url&&<a href={e.external_url} target="_blank" rel="noopener noreferrer">Abrir evidência ↗</a>}</article>):<EmptyState title={`Nenhuma evidência registrada${user.role==="GESTAO"?` para ${user.institutionalProfileName||"este setor"}`:""}.`} text="Use “Nova evidência” quando houver um registro autorizado para documentar."/>}</div><section className="panel feedback-panel"><header><div><span className="section-label">DEVOLUTIVAS</span><h2>Comentários institucionais</h2></div></header>{comments.length?<div className="simple-list">{comments.map(c=><div key={c.id}><b>{c.institutional_items?.title||"Item institucional"}</b><span>{c.content}</span><small>{new Date(c.created_at).toLocaleString("pt-BR")} · {c.visibility}</small></div>)}</div>:<EmptyState title="Nenhuma devolutiva registrada" text="Comentários associados aos itens aparecerão nesta seção."/>}</section><DataProvenanceReal/></>;
}

export function ExecutiveModule({user,mode}:{user:User;mode:"ADMIN"|"GESTAO"}) {
  const [items,setItems]=useState<RadarItem[]>([]);const [base,setBase]=useState<any>({schools:0,sectors:0,evidences:0,hubs:[]});
  useEffect(()=>{if(user.role==="VISITANTE")return;queueMicrotask(async()=>{const data=await queryDashboard(getSupabaseBrowserClient());setItems(data.items);setBase(data)})},[user.id,user.role]);
  if(user.role==="VISITANTE")return <><ModuleHeader eyebrow="INDICADORES DEMONSTRATIVOS" title="Painel de indicadores Demo" text="Simulação local e isolada, sem consulta ao banco institucional."/><div className="auth-notice"><i>◎</i><div><b>Dados totalmente fictícios</b><p>Os indicadores abaixo existem apenas para demonstrar a experiência do SuperBI 360 | GSU.</p></div><span>DEMO ISOLADO</span></div><div className="kpi-grid">{demoData.kpis.map(card=><KpiCard key={card.label} label={card.label} value={card.value} tone={card.tone}/>)}</div><DataProvenanceReal source="Base demonstrativa local"/></>;
  const today=new Date().toISOString().slice(0,10);const relevant=mode==="GESTAO"&&user.sectorId?items.filter(i=>i.sector_id===user.sectorId):items;const cards=[["Itens ativos",relevant.filter(i=>!["CONCLUIDA","CANCELADA"].includes(i.status)).length],["Demandas",relevant.filter(i=>i.record_type==="DEMANDA").length],["Pendências",relevant.filter(i=>i.record_type==="PENDENCIA").length],["Críticos",relevant.filter(i=>i.priority==="CRITICA").length],["Vencidos",relevant.filter(i=>i.due_date&&i.due_date<today&&!["CONCLUIDA","CANCELADA"].includes(i.status)).length],["Concluídos",relevant.filter(i=>i.status==="CONCLUIDA").length]];
  return <><ModuleHeader eyebrow={mode==="ADMIN"?"VISÃO EXECUTIVA REGIONAL":"MEU SETOR"} title={mode==="ADMIN"?"Painel da Dirigente":"Painel da Gestão"} text={mode==="ADMIN"?"Panorama real da URE Guarulhos Sul.":"Ambiente operacional do setor autenticado."}/><div className="sector-stat-grid">{cards.map(([l,v])=><KpiCard key={String(l)} label={String(l)} value={v}/>)}</div>{mode==="ADMIN"&&<div className="kpi-grid compact-kpis"><KpiCard label="Escolas" value={base.schools}/><KpiCard label="Setores" value={base.sectors}/><KpiCard label="Evidências" value={base.evidences}/><KpiCard label="Hubs" value={base.hubs.length}/></div>}<section className="panel"><header><div><span className="section-label">ITENS RECENTES</span><h2>Prioridades em acompanhamento</h2></div></header><ItemTable items={relevant.slice(0,15)}/></section><DataProvenanceReal/></>;
}

export function IntegrationMatrixModule() {
  const [data,setData]=useState<any>({sectors:[],hubs:[],agreements:[],sources:[]});
  useEffect(()=>{queueMicrotask(async()=>setData(await queryIntegrationMatrix(getSupabaseBrowserClient())))},[]);
  return <><ModuleHeader eyebrow="GOVERNANÇA" title="Matriz de integração" text="Fontes, hubs, acordos e estágios reais de integração por setor."/><div className="matrix-table"><div className="matrix-head"><span>SETOR</span><span>HUB</span><span>TIPO</span><span>FONTE</span><span>STATUS</span><span>ACORDO</span></div>{data.sectors.map((s:any)=>{const hub=data.hubs.find((h:any)=>h.sector_id===s.id);const source=data.sources.find((x:any)=>x.sector_id===s.id);const agreement=data.agreements.find((a:any)=>a.sector_id===s.id);return <div className="matrix-row" key={s.id}><b>{s.code}</b><span>{hub?.name||"Hub ainda não integrado"}</span><span>{hub?.integration_type||source?.source_type||"—"}</span><span>{source?.name||"Fonte ainda não integrada"}</span><StatusBadge value={source?.status||hub?.status||"EM_IMPLANTACAO"}/><span>{agreement?.status||"Nenhum acordo"}</span></div>})}</div><DataProvenanceReal/></>;
}

export function AgreementsModule() {
  const [data,setData]=useState<any>({agreements:[],hubs:[],sectors:[],sources:[]});
  useEffect(()=>{queueMicrotask(async()=>setData(await queryIntegrationMatrix(getSupabaseBrowserClient())))},[]);
  return <><ModuleHeader eyebrow="GOVERNANÇA" title="Acordos de integração" text="Pactos institucionais, responsabilidades, periodicidade e revisões."/><div className="agreement-grid">{data.agreements.length?data.agreements.map((a:any)=>{const sector=data.sectors.find((s:any)=>s.id===a.sector_id);const hub=data.hubs.find((h:any)=>h.id===a.hub_id);return <article className="agreement-card" key={a.id}><StatusBadge value={a.status}/><h3>{sector?.code||"Regional"} · {hub?.name||"Integração institucional"}</h3><p>{a.notes||"Acordo cadastrado sem observações adicionais."}</p><div><span>Tipo <b>{a.integration_type}</b></span><span>Periodicidade <b>{a.update_frequency||"Não definida"}</b></span><span>Última revisão <b>{a.last_review||"—"}</b></span><span>Próxima revisão <b>{a.next_review||"—"}</b></span></div></article>}):<EmptyState title="Nenhum acordo de integração cadastrado" text="Acordos aparecerão após formalização institucional."/>}</div><DataProvenanceReal/></>;
}

export function AboutModule() {
  const perspectives = [
    ["◎", "Visão Regional", "Permite à gestão acompanhar a URE como um todo, observando setores, escolas, prioridades, pendências, indicadores e ações em andamento."],
    ["◫", "Visão Setorial", "Cada serviço, seção ou equipe acompanha e atualiza seus próprios registros, preservando a responsabilidade e a autonomia sobre as informações de sua área."],
    ["⌂", "Visão da Escola", "As informações produzidas pelos diferentes setores podem ser consolidadas por unidade escolar, formando uma leitura transversal do acompanhamento realizado pela URE."],
  ];
  const ecosystem = [
    ["◉", "SuperBI 360 | GSU", "Camada de integração, acompanhamento e visão gerencial."],
    ["BI", "BIGuarulhosSul", "Frente de inteligência de dados e indicadores."],
    ["◆", "Hubs Setoriais", "Ambientes operacionais desenvolvidos pelos próprios setores."],
    ["↗", "Integrações e Acordos", "Definem como produtos e informações se conectam, preservando origem, responsabilidade e governança."],
  ];
  const principles = [
    ["⌘", "Integração", "Conectar setores, escolas, dados e iniciativas em um mesmo ambiente."],
    ["✓", "Rastreabilidade", "Manter histórico, origem, responsáveis, prazos e atualizações das ações institucionais."],
    ["◇", "Autonomia", "Cada setor permanece responsável por seus processos, dados e produtos."],
    ["360°", "Visão 360°", "Permitir que uma mesma escola ou ação seja observada a partir de diferentes áreas da URE."],
    ["⌑", "Segurança", "Acesso às informações conforme perfil, setor, escola e nível de visibilidade."],
  ];

  return <div className="about-page">
    <ModuleHeader eyebrow="IDENTIDADE INSTITUCIONAL" title="Sobre o SuperBI 360 | GSU" text="Plataforma Integrada de Gestão, Evidências e Inteligência da URE Guarulhos Sul"/>

    <section className="about-intro" aria-labelledby="about-intro-title">
      <div className="about-intro-mark" aria-hidden="true"><span>360°</span><i/></div>
      <div className="about-intro-copy">
        <span className="section-label">VISÃO INSTITUCIONAL</span>
        <h2 id="about-intro-title">Informação conectada para enxergar a URE como um todo</h2>
        <div className="about-intro-columns">
          <p>O SuperBI 360 | GSU é o hub institucional de integração, acompanhamento e apoio à decisão da URE Guarulhos Sul.</p>
          <p>Ele reúne, em um único ambiente, informações, demandas, ações, acompanhamentos, projetos, evidências, indicadores e acessos aos produtos digitais desenvolvidos pelos diferentes setores da Unidade Regional de Ensino.</p>
          <p>Seu objetivo é transformar informações dispersas em uma visão integrada da atuação da URE, fortalecendo a colaboração entre equipes, a rastreabilidade das ações e a tomada de decisão baseada em evidências.</p>
        </div>
      </div>
    </section>

    <section className="about-section" aria-labelledby="about-how-title">
      <header className="about-section-heading"><span className="section-label">PERSPECTIVAS INTEGRADAS</span><h2 id="about-how-title">Como funciona</h2></header>
      <div className="about-perspective-grid">{perspectives.map(([icon,title,text])=><article key={title}><span className="about-card-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="about-section about-ecosystem" aria-labelledby="about-ecosystem-title">
      <header className="about-section-heading"><span className="section-label">ARQUITETURA INSTITUCIONAL</span><h2 id="about-ecosystem-title">Um ecossistema, vários produtos</h2><p>O SuperBI 360 | GSU faz parte do Portal Comunica!, o ecossistema digital da URE Guarulhos Sul.</p></header>
      <div className="ecosystem-root"><span className="about-card-icon" aria-hidden="true">●</span><div><h3>Portal Comunica!</h3><p>Ecossistema que organiza e conecta as soluções digitais institucionais.</p></div></div>
      <div className="ecosystem-connector" aria-hidden="true"><i/><span>↓</span><i/></div>
      <div className="ecosystem-products">{ecosystem.map(([icon,title,text])=><article key={title}><span className="about-card-icon" aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>

    <section className="about-section" aria-labelledby="about-principles-title">
      <header className="about-section-heading"><span className="section-label">COMPROMISSOS</span><h2 id="about-principles-title">Princípios do SuperBI 360 | GSU</h2></header>
      <div className="about-principles-grid">{principles.map(([icon,title,text])=><article key={title}><span className="about-principle-icon" aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>

    <aside className="about-statement" aria-label="Síntese institucional"><span aria-hidden="true">◉</span><p>O SuperBI 360 | GSU não substitui o trabalho dos setores. <strong>Ele conecta essas diferentes perspectivas para que a URE consiga enxergar o todo.</strong></p></aside>

    <footer className="about-footer"><div><b>SuperBI 360 | GSU</b><span>URE Guarulhos Sul <i>•</i> Versão 1.0</span></div><p>Desenvolvido como iniciativa de transformação digital e integração institucional.</p></footer>
  </div>;
}

export function ItemDetailModule({id,user,go}:{id:string;user:User;go:(path:string)=>void}) {
  const [item,setItem]=useState<RadarItem|null>(null);const [history,setHistory]=useState<any[]>([]);const [comments,setComments]=useState<any[]>([]);const [evidences,setEvidences]=useState<any[]>([]);const [note,setNote]=useState("");
  const load=async()=>{const supabase=getSupabaseBrowserClient();const {data}=await supabase.from("institutional_items").select("id,organization_id,sector_id,school_id,category_id,record_type,title,description,status,priority,responsible_user_id,created_by,updated_by,created_at,updated_at,due_date,visibility,source,active,sectors(code,name),schools(name,slug,pei),demand_categories(name)").eq("id",id).maybeSingle();setItem(data as unknown as RadarItem|null);const [{data:h},{data:c},{data:e}]=await Promise.all([supabase.from("institutional_item_history").select("id,event_type,previous_value,new_value,performed_by,created_at").eq("item_id",id).order("created_at",{ascending:false}),supabase.from("institutional_item_comments").select("id,content,visibility,created_at").eq("item_id",id).order("created_at",{ascending:false}),supabase.from("evidences").select("id,title,evidence_type,external_url,created_at").eq("item_id",id).order("created_at",{ascending:false})]);setHistory(h??[]);setComments(c??[]);setEvidences(e??[])};
  useEffect(()=>{queueMicrotask(()=>void load())},[id,user.id]);
  const update=async(field:string,value:string|null)=>{const supabase=getSupabaseBrowserClient();const {data:{user:authUser}}=await supabase.auth.getUser();if(!authUser)return;await supabase.from("institutional_items").update({[field]:value,updated_by:authUser.id}).eq("id",id);await load()};
  const addComment=async(e:React.FormEvent)=>{e.preventDefault();if(!item||!note.trim())return;const supabase=getSupabaseBrowserClient();const {data:{user:authUser}}=await supabase.auth.getUser();if(!authUser)return;await supabase.from("institutional_item_comments").insert({organization_id:item.organization_id,item_id:id,author_id:authUser.id,content:note.trim(),visibility:"GESTAO"});setNote("");await load()};
  if(!item)return <><ModuleHeader eyebrow="ITEM INSTITUCIONAL" title="Registro indisponível" text="O item não existe ou seu perfil não possui acesso."/><EmptyState title="Item não encontrado" text="A RLS não retornou este registro para a sessão atual." action={<button onClick={()=>go("/radar360/itens")}>Voltar</button>}/></>;
  const canEdit=user.role==="ADMIN"||(user.role==="GESTAO"&&user.sectorId===item.sector_id);
  return <><button className="back-link" onClick={()=>go("/radar360/itens")}>← Voltar aos itens</button><ModuleHeader eyebrow={`${item.record_type} · ${item.sectors?.code||"REGIONAL"}`} title={item.title} text={item.description||"Sem descrição adicional."}/><div className="item-detail-grid"><section className="panel item-fields"><h2>Dados do item</h2><div><span>Categoria<b>{item.demand_categories?.name||"—"}</b></span><span>Escola<b>{item.schools?.name||"Regional"}</b></span><span>Status{canEdit?<select value={item.status} onChange={e=>void update("status",e.target.value)}>{["NOVA","EM_ANALISE","EM_ANDAMENTO","AGUARDANDO_ESCOLA","AGUARDANDO_SETOR","AGUARDANDO_ORGAO_CENTRAL","CONCLUIDA","SUSPENSA","CANCELADA"].map(x=><option key={x}>{x}</option>)}</select>:<b>{item.status}</b>}</span><span>Prioridade{canEdit?<select value={item.priority} onChange={e=>void update("priority",e.target.value)}>{["BAIXA","NORMAL","ALTA","CRITICA"].map(x=><option key={x}>{x}</option>)}</select>:<b>{item.priority}</b>}</span><span>Prazo{canEdit?<input type="date" value={item.due_date||""} onChange={e=>void update("due_date",e.target.value||null)}/>:<b>{item.due_date||"—"}</b>}</span><span>Visibilidade<b>{item.visibility}</b></span><span>Fonte<b>{item.source||"SuperBI 360 | GSU"}</b></span></div></section><section className="panel"><h2>Evidências</h2>{evidences.length?<div className="simple-list">{evidences.map(x=><div key={x.id}><b>{x.title}</b><span>{x.evidence_type}</span></div>)}</div>:<EmptyState title="Nenhuma evidência" text="Ainda não há evidências vinculadas a este item."/>}</section></div><div className="item-detail-grid"><section className="panel"><h2>Histórico</h2>{history.length?<div className="timeline">{history.map(x=><div key={x.id}><i/><p><b>{x.event_type.replaceAll("_"," ")}</b><span>{new Date(x.created_at).toLocaleString("pt-BR")}</span></p></div>)}</div>:<EmptyState title="Sem histórico" text="As alterações futuras aparecerão aqui."/>}</section><section className="panel"><h2>Comentários e devolutivas</h2>{comments.length?<div className="simple-list">{comments.map(x=><div key={x.id}><span>{x.content}</span><small>{new Date(x.created_at).toLocaleString("pt-BR")}</small></div>)}</div>:<EmptyState title="Nenhuma devolutiva" text="Registre um comentário institucional quando necessário."/>}{user.role!=="VISITANTE"&&<form className="comment-form" onSubmit={addComment}><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Registrar devolutiva..." required/><button>Adicionar</button></form>}</section></div><DataProvenanceReal/></>;
}
