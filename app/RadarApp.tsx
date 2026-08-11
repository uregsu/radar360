"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Fragment, useEffect, useMemo, useState } from "react";
import { schools } from "../config/schools";
import { sectors } from "../config/sectors";
import { PAINEL_MDI_ROUTE } from "../config/products";
import { demoData } from "../lib/demo/data";
import { demoProvider } from "../lib/demo/provider";
import { canAccess } from "../lib/permissions";
import { getPasswordRequirements, isStrongPassword, maskEmail, PASSWORD_MIN_LENGTH } from "../lib/password-policy";
import { getAuthErrorMessage } from "../lib/supabase/auth-errors";
import { getSupabaseBrowserClient } from "../lib/supabase/client";
import type { Role, School, Sector, User } from "../types";
import { AboutModule, AgreementsModule, BigModule, CommunicaModule, EvidenceModule, ExecutiveModule, IntegrationMatrixModule, ItemDetailModule, MdiModule, PainelMdiModule, Radar360Module } from "./RadarModules";
import { SuperBIBrand } from "./SuperBIBrand";
import { AlertBanner, DataTable, EmptyState as SuperBIEmptyState, FilterBar, LoadingState, MetricCard, PageHeader, SearchInput, SectionHeader, StatusBadge as SuperBIStatusBadge } from "./SuperBIUI";
import VisaoRegional360 from "./VisaoRegional360";

const nav = [
  ["⌂","Visão geral","/dashboard",["ADMIN","GESTAO","ESCOLA","VISITANTE"]],
  ["◉","SuperBI 360 | GSU","/radar360",["ADMIN","GESTAO","VISITANTE"]],
  ["▦","Setores e hubs","/radar360/setores",["ADMIN","GESTAO","VISITANTE"]],
  ["◆","BIGuarulhosSul","/radar360/biguarulho",["ADMIN","GESTAO","VISITANTE"]],
  ["↗","Integração! MDI","/radar360/integracao",["ADMIN","GESTAO","VISITANTE"]],
  ["◫","Comunica!","/radar360/comunica",["ADMIN","GESTAO","VISITANTE"]],
  ["✓","Evidências","/radar360/evidencias",["ADMIN","GESTAO","ESCOLA"]],
  ["◇","Painel MDI",PAINEL_MDI_ROUTE,["ADMIN","GESTAO"]],
  ["♙","Painel da Dirigente","/radar360/dirigente",["ADMIN"]],
  ["◈","Painel da Gestão","/radar360/gestao",["ADMIN","GESTAO"]],
  ["⌂","Painel das Escolas","/radar360/escolas",["ADMIN","GESTAO","ESCOLA","VISITANTE"]],
  ["☷","Demandas","/radar360/demandas",["ADMIN","GESTAO","ESCOLA","VISITANTE"]],
  ["⊞","Matriz de integração","/radar360/matriz",["ADMIN","GESTAO"]],
  ["≋","Acordos","/radar360/acordos",["ADMIN","GESTAO"]],
  ["♙","Usuários e acessos","/radar360/usuarios",["ADMIN"]],
  ["ⓘ","Sobre","/radar360/sobre",["ADMIN","GESTAO","ESCOLA","VISITANTE"]],
] as const;

function pathNow() {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}

function navigationGroup(route: string) {
  if (["/dashboard", "/radar360", "/radar360/minha-escola", "/radar360/meu-setor"].includes(route)) return "Visão institucional";
  if ([PAINEL_MDI_ROUTE, "/radar360/dirigente", "/radar360/gestao", "/radar360/escolas", "/radar360/matriz"].includes(route)) return "Painéis estratégicos";
  if (route.startsWith("/radar360/demandas") || route.startsWith("/radar360/itens") || ["/radar360/evidencias", "/radar360/acordos", "/radar360/usuarios"].includes(route)) return "Operação e governança";
  return "Ecossistema";
}

const navigationGroupOrder: Record<string, number> = {
  "Visão institucional": 0,
  "Painéis estratégicos": 1,
  "Operação e governança": 2,
  "Ecossistema": 3,
};

function Login({ onDemo, onAuthenticated }: { onDemo: () => void; onAuthenticated: () => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    const supabase=getSupabaseBrowserClient();
    const {error:authError}=await supabase.auth.signInWithPassword({email,password});
    if(authError)setError(getAuthErrorMessage(authError));else await onAuthenticated();
    setLoading(false);
  };

  return <main className="login-shell">
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
    <section className="login-story">
      <SuperBIBrand size="lg" tone="light" subtitle/>
      <div className="story-copy">
        <span className="eyebrow"><i/> ECOSSISTEMA PORTAL COMUNICA!</span>
        <h1>Visão integrada.<br/>Decisões mais <span>inteligentes.</span></h1>
        <p>Plataforma Integrada de Gestão, Evidências e Inteligência da URE Guarulhos Sul</p>
        <div className="story-stats"><div><b>360°</b><span>visão institucional</span></div><div><b>17</b><span>setores conectáveis</span></div><div><b>82</b><span>escolas estaduais</span></div></div>
      </div>
      <footer>URE GUARULHOS SUL <span/> SECRETARIA DA EDUCAÇÃO</footer>
    </section>
    <section className="login-side">
      <form className="login-card" onSubmit={submit}>
        <div className="secure"><span>◆</span> AMBIENTE SEGURO</div>
        <h2>Bem-vindo ao SuperBI 360 | GSU</h2>
        <p>Acesse com as credenciais individuais fornecidas pela administradora.</p>
        <label>E-mail institucional<div className="input-wrap"><span>＠</span><input aria-label="E-mail institucional" value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="email" required/></div></label>
        <label>Senha<div className="input-wrap"><span>⌁</span><input aria-label="Senha" value={password} onChange={e=>setPassword(e.target.value)} type="password" autoComplete="current-password" required/></div></label>
        {error && <div className="login-error">{error}</div>}
        <button className="primary-btn" disabled={loading}>{loading ? "Entrando..." : <>Entrar no sistema <span>→</span></>}</button>
        <div className="admin-password-note">Problemas de acesso ou troca de senha? Procure a administradora do SuperBI 360 | GSU.</div>
        <button type="button" className="demo-btn" onClick={onDemo}><span>◎</span><b>Explorar versão demonstrativa</b><small>Ambiente isolado · dados fictícios</small></button>
        <small className="privacy">Protegido por autenticação e controle de acesso por perfil.</small>
      </form>
    </section>
  </main>
}

export function RecoveryPassword() {
  const [ready, setReady] = useState(false);
  const [recoverySession, setRecoverySession] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const requirements = getPasswordRequirements(newPassword);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (active && event === "PASSWORD_RECOVERY" && session) {
        setRecoverySession(true);
        setError("");
        setReady(true);
      }
    });

    const validateRecoveryLink = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
      const recoveryMarker = hash.get("type") === "recovery";

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (!active) return;
        if (exchangeError) {
          const { data: { session } } = await supabase.auth.getSession();
          if (!active) return;
          if (session) setRecoverySession(true);
          else setError("O link de redefinição é inválido ou expirou. Solicite um novo link à administradora.");
        } else setRecoverySession(true);
        setReady(true);
        return;
      }

      if (recoveryMarker) {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (!active) return;
        if (sessionError || !session) setError("O link de redefinição é inválido ou expirou. Solicite um novo link à administradora.");
        else setRecoverySession(true);
        setReady(true);
        return;
      }

      setError("Abra esta página pelo link de redefinição enviado pelo Supabase.");
      setReady(true);
    };

    void validateRecoveryLink();
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => window.location.replace("/login"), 1800);
    return () => window.clearTimeout(timer);
  }, [success]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!recoverySession) {
      setError("A sessão de redefinição é inválida ou expirou.");
      return;
    }
    if (!isStrongPassword(newPassword)) {
      setError("A nova senha ainda não atende a todos os requisitos de segurança.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("A confirmação não corresponde à nova senha.");
      return;
    }

    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) {
      const message = /session|jwt|expired/i.test(updateError.message)
        ? "A sessão de redefinição expirou. Solicite um novo link à administradora."
        : /weak|password|characters/i.test(updateError.message)
          ? "A senha foi recusada pela política de segurança. Escolha outra senha."
          : "Não foi possível atualizar a senha. Verifique a conexão e tente novamente.";
      setError(message);
      setLoading(false);
      return;
    }

    setNewPassword("");
    setConfirmPassword("");
    setSuccess(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  return <main className="login-shell recovery-shell">
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
    <section className="login-story recovery-story">
      <SuperBIBrand size="lg" tone="light" subtitle/>
      <div className="story-copy"><span className="eyebrow"><i/> ACESSO INSTITUCIONAL</span><h1>Crie uma nova<br/>senha de <span>acesso.</span></h1><p>Use o link de recuperação recebido para proteger sua conta institucional.</p></div>
      <footer>URE GUARULHOS SUL <span/> SECRETARIA DA EDUCAÇÃO</footer>
    </section>
    <section className="login-side">
      <form className="login-card recovery-card" onSubmit={submit}>
        <div className="secure"><span>◆</span> REDEFINIÇÃO SEGURA</div>
        <h2>Definir nova senha</h2>
        <p>{ready ? recoverySession ? "Informe e confirme sua nova senha." : "Não foi possível validar este acesso." : "Validando o link de recuperação..."}</p>
        {recoverySession && !success && <>
          <label>Nova senha<div className="input-wrap"><span>⌁</span><input aria-label="Nova senha" value={newPassword} onChange={event=>setNewPassword(event.target.value)} type="password" autoComplete="new-password" required minLength={PASSWORD_MIN_LENGTH}/></div></label>
          <label>Confirmar nova senha<div className="input-wrap"><span>⌁</span><input aria-label="Confirmar nova senha" value={confirmPassword} onChange={event=>setConfirmPassword(event.target.value)} type="password" autoComplete="new-password" required minLength={PASSWORD_MIN_LENGTH}/></div></label>
          <ul className="password-requirements">{requirements.map(requirement=><li className={requirement.valid?"valid":""} key={requirement.key}><span>{requirement.valid?"✓":"○"}</span>{requirement.label}</li>)}</ul>
        </>}
        {error && <div className="login-error" role="alert">{error}</div>}
        {success && <div className="login-success" role="status">Senha atualizada. Você será direcionado ao login.</div>}
        {recoverySession && !success && <button className="primary-btn" disabled={loading}>{loading ? "Atualizando..." : <>Salvar nova senha <span>→</span></>}</button>}
        {!recoverySession && ready && <button type="button" className="primary-btn" onClick={()=>window.location.replace("/login")}>Voltar ao login</button>}
        <small className="privacy">A senha é processada pelo Supabase Auth e não é armazenada no perfil.</small>
      </form>
    </section>
  </main>;
}

function DataProvenance({ demo = false }: { demo?: boolean }) {
  return <div className="provenance">
    <span><b>Fonte</b>{demo ? "Base demonstrativa · SuperBI 360 | GSU" : "Supabase · SuperBI 360 | GSU"}</span>
    <span><b>Responsável</b>{demo ? "Equipe de produto" : "URE Guarulhos Sul"}</span>
    <span><b>Acesso</b>{demo ? "Visitante · ilustrativo" : "Conforme perfil"}</span>
    <span><b>Integração</b>{demo ? "Mock isolado" : "Banco institucional · RLS"}</span>
  </div>;
}

function Overview({ user, go }: { user: User; go: (p:string)=>void }) {
  return <VisaoRegional360 user={user} go={go} />;
}

type HubRow={id:string;name:string;external_url:string|null;description:string|null;status:string;integration_type:string|null;sector_id:string;sectors?:{code?:string;name?:string;slug?:string}|null};
const demoHubCatalog=[{id:"demo-setec",name:"SETEC Hub",sector_id:"SETEC",description:"Produto setorial integrado ao ecossistema"},{id:"demo-seom",name:"SGE / SEOM Hub",sector_id:"SEOM",description:"Produto setorial integrado ao ecossistema"},{id:"demo-ese",name:"ESE Hub GSU",sector_id:"ESE",description:"Produto setorial integrado ao ecossistema"}];
function operationalTone(value:string){const normalized=value.toUpperCase();return normalized.includes("CRIT")||normalized.includes("CANCEL")||normalized.includes("INATIV")?"danger" as const:normalized.includes("ALTA")||normalized.includes("SUSP")||normalized.includes("AGUARD")?"warning" as const:normalized.includes("CONCLU")||normalized.includes("ATIV")||normalized.includes("INTEGRAD")?"success" as const:normalized.includes("ANDAMENTO")||normalized.includes("ANALISE")||normalized.includes("NOVA")?"info" as const:"neutral" as const}
function roleLabel(role:Role){return role==="ADMIN"?"Administrador Regional":role==="GESTAO"?"Gestão":role==="ESCOLA"?"Escola":"Visitante"}

function HubAccessCard({hub,demo=false}:{hub:HubRow|typeof demoHubCatalog[number];demo?:boolean}) {
  const sector="sectors" in hub?(hub.sectors?.code||"Setor"):hub.sector_id;
  const url="external_url" in hub?hub.external_url:null;
  const status="status" in hub?hub.status:"Integrado";const integration="integration_type" in hub?(hub.integration_type||"LINK_EXTERNO"):"Produto setorial";
  return <article className="hub-access-card operational-hub-card"><header><span className="superbi-eyebrow">Hub operacional · {sector}</span><SuperBIStatusBadge tone={operationalTone(status)}>{status.replaceAll("_"," ")}</SuperBIStatusBadge></header><div><h3>{hub.name}</h3><p>{hub.description||"Sistema operacional próprio do setor, integrado ao ecossistema SuperBI 360 | GSU."}</p></div><div className="hub-meta"><span><b>Produto</b>Hub setorial</span><span><b>Integração</b>{integration.replaceAll("_"," ")}</span><span><b>Acesso</b>{url?"Externo":"Em integração"}</span></div>{!demo&&url?<a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${hub.name} em nova aba`}>Abrir produto <span aria-hidden="true">↗</span></a>:<button disabled>Produto integrado ao ecossistema</button>}</article>;
}

function Sectors({ go,user }: { go:(p:string)=>void;user:User }) {
  const [query,setQuery]=useState("");
  const [hubs,setHubs]=useState<HubRow[]>([]);
  useEffect(()=>{if(user.role==="VISITANTE")return;queueMicrotask(async()=>{const {data}=await getSupabaseBrowserClient().from("hubs").select("id,name,external_url,description,status,integration_type,sector_id,sectors(code,name,slug)").eq("active",true).order("name");setHubs((data??[]) as unknown as HubRow[])})},[user.id,user.role]);
  const filtered=sectors.filter(s=>s.shortName!=="GAB"&&(s.shortName+" "+s.name).toLowerCase().includes(query.toLowerCase()));
  return <div className="operational-page"><PageTitle eyebrow="ARQUITETURA INSTITUCIONAL" title="Setores e hubs" text="Responsabilidades, produtos digitais e acessos organizados por contexto institucional."/>
    <FilterBar className="operational-filter-bar"><SearchInput aria-label="Pesquisar setor" placeholder="Pesquisar setor ou competência..." value={query} onChange={e=>setQuery(e.target.value)}/><span className="operational-result-count">{filtered.length} setores encontrados</span></FilterBar>
    <section className="operational-section"><SectionHeader title="Setores institucionais" description="Selecione um setor para consultar áreas funcionais, responsabilidades e produtos vinculados."/>{filtered.length?<div className="sector-grid operational-sector-grid">{filtered.map(s=>{const integrated=user.role==="VISITANTE"?demoHubCatalog.some(h=>h.sector_id===s.shortName):hubs.some(h=>h.sectors?.code===s.shortName);return <button className="sector-card operational-sector-card" key={s.id} onClick={()=>go(`/radar360/setores/${s.slug}`)}><div className="sector-head"><i aria-hidden="true">{s.icon}</i><SuperBIStatusBadge tone={integrated?"success":"neutral"}>{integrated?"Hub integrado":s.status}</SuperBIStatusBadge></div><span className="superbi-eyebrow">Setor institucional</span><h3>{s.shortName}</h3><b>{s.name}</b><p>{s.description}</p><footer><span>{integrated?"Produto digital vinculado":`${s.menu.length} áreas funcionais`}</span><b aria-hidden="true">→</b></footer></button>})}</div>:<SuperBIEmptyState title="Nenhum setor encontrado" description="Ajuste o termo pesquisado para consultar a arquitetura institucional."/>}</section>
    <section className="operational-section"><SectionHeader title="Hubs e produtos vinculados" description="Ambientes operacionais preservam autoria, integração e forma de acesso."/><div className="hub-card-grid">{(user.role==="VISITANTE"?demoHubCatalog:hubs).map(h=><HubAccessCard key={h.id} hub={h} demo={user.role==="VISITANTE"}/>)}</div></section></div>;
}

function SectorView({ sector,user }: { sector: Sector;user:User }) {
  const demo=user.role==="VISITANTE";
  const [active,setActive]=useState(sector.menu[0]);
  const [hub,setHub]=useState<HubRow|null>(null);
  const [stats,setStats]=useState({active:0,completed:0,schools:0});
  const [recent,setRecent]=useState<{id:string;title:string;status:string}[]>([]);
  useEffect(()=>{if(demo)return;queueMicrotask(async()=>{const supabase=getSupabaseBrowserClient();const {data:sectorRow}=await supabase.from("sectors").select("id").eq("code",sector.shortName).maybeSingle();if(!sectorRow)return;const [{data:hubData},{data:itemData}]=await Promise.all([supabase.from("hubs").select("id,name,external_url,description,status,integration_type,sector_id,sectors(code,name,slug)").eq("active",true).eq("sector_id",sectorRow.id).maybeSingle(),supabase.from("institutional_items").select("id,title,status,school_id,updated_at").eq("active",true).eq("sector_id",sectorRow.id).order("updated_at",{ascending:false}).limit(20)]);setHub((hubData as unknown as HubRow)||null);const rows=itemData??[];setStats({active:rows.filter(x=>!["CONCLUIDA","CANCELADA"].includes(x.status)).length,completed:rows.filter(x=>x.status==="CONCLUIDA").length,schools:new Set(rows.map(x=>x.school_id).filter(Boolean)).size});setRecent(rows)})},[demo,sector.shortName,user.id]);
  const demoHub=demoHubCatalog.find(h=>h.sector_id===sector.shortName);
  return <><PageTitle eyebrow="PAINEL 360 DO SETOR" title={`${sector.shortName} · ${sector.name}`} text={sector.description}/>
    <div className="sector-layout"><aside className="subnav"><span>ÁREAS FUNCIONAIS</span>{sector.menu.map(m=><button className={m===active?"active":""} onClick={()=>setActive(m)} key={m}>{m}<b>›</b></button>)}</aside>
    <section className="sector-content"><div className="integration-strip"><span><i/> {hub?"Hub ativo":sector.status}</span><p>Integração atual: <b>{hub?.integration_type||sector.integrationType}</b></p></div>
      {(hub||demoHub)?<HubAccessCard hub={(hub||demoHub)!} demo={demo}/>:<div className="empty-source"><i>⌁</i><div><b>Hub ainda não integrado</b><p>Integração futura, sem URL cadastrada.</p></div></div>}
      <h2>{active}</h2><p className="lead">Acompanhe informações, demandas e evidências relacionadas a {active.toLowerCase()}.</p>
      <div className="residual-metric-grid"><MetricCard label="Itens ativos" value={demo?"—":stats.active} detail={demo?"Sem dados demonstrativos":"Registros em acompanhamento"}/><MetricCard label="Concluídos" value={demo?"—":stats.completed} detail={demo?"Sem dados demonstrativos":"Registros finalizados"} tone="teal"/><MetricCard label="Escolas envolvidas" value={demo?"—":stats.schools} detail={demo?"Sem dados demonstrativos":"Unidades relacionadas"}/></div>
      {demo?<SuperBIEmptyState title="Prévia sem dados institucionais" description="Nenhum valor real ou sensível é exibido nesta área demonstrativa."/>:recent.length?<div className="simple-list">{recent.map(item=><div key={item.id}><b>{item.title}</b><span>{item.status.replaceAll("_"," ")}</span></div>)}</div>:<SuperBIEmptyState title="Nenhum registro neste setor" description="O setor está cadastrado, mas ainda não possui itens institucionais autorizados."/>}
      <DataProvenance demo={demo}/></section></div></>;
}

type AccessUser = {id:string;user_id:string;name:string;email:string;role:Role;sector_id?:string|null;school_id?:string|null;active:boolean;institutional_profiles?:{name?:string;short_name?:string}|null};

function UsersAdmin() {
  const [items,setItems]=useState<AccessUser[]>([]);
  const [query,setQuery]=useState(""); const [roleFilter,setRoleFilter]=useState(""); const [statusFilter,setStatusFilter]=useState(""); const [loading,setLoading]=useState(true);
  const [passwordUser,setPasswordUser]=useState<AccessUser|null>(null);
  const [newPassword,setNewPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [passwordOperation,setPasswordOperation]=useState<""|"password"|"recovery">("");
  const [passwordError,setPasswordError]=useState("");
  const [passwordSuccess,setPasswordSuccess]=useState("");
  const load=async()=>{setLoading(true);const {data}=await getSupabaseBrowserClient().from("profiles").select("id,user_id,name,email,role,sector_id,school_id,active,institutional_profiles(name,short_name)").order("name");setItems((data??[]) as unknown as AccessUser[]);setLoading(false)};
  useEffect(()=>{queueMicrotask(()=>void load())},[]);
  const toggle=async(item:AccessUser)=>{const {error}=await getSupabaseBrowserClient().from("profiles").update({active:!item.active}).eq("id",item.id);if(!error)await load()};
  const choosePasswordUser=(item:AccessUser)=>{setPasswordUser(item);setNewPassword("");setConfirmPassword("");setPasswordError("");setPasswordSuccess("");setPasswordOperation("")};
  const closePasswordDialog=()=>{if(passwordOperation)return;setPasswordUser(null);setNewPassword("");setConfirmPassword("");setPasswordError("");setPasswordSuccess("")};
  const readFunctionError=async(error:unknown,fallback:string)=>{
    const context=(error as {context?:Response})?.context;
    if(context){try{const body=await context.clone().json() as {error?:string};if(body.error)return body.error}catch{/* resposta sem JSON */}}
    return fallback;
  };
  const savePassword=async(event:React.FormEvent)=>{
    event.preventDefault();setPasswordError("");setPasswordSuccess("");
    if(!passwordUser?.user_id){setPasswordError("Este perfil ainda não está vinculado ao Supabase Auth.");return}
    if(!isStrongPassword(newPassword)){setPasswordError("A nova senha ainda não atende a todos os requisitos de segurança.");return}
    if(newPassword!==confirmPassword){setPasswordError("A confirmação não corresponde à nova senha.");return}
    setPasswordOperation("password");
    const {error}=await getSupabaseBrowserClient().functions.invoke("admin-set-password",{body:{action:"set_password",targetUserId:passwordUser.user_id,newPassword}});
    if(error){
      setPasswordError(await readFunctionError(error,"Não foi possível alterar a senha. Verifique sua sessão administrativa."));setPasswordOperation("");return;
    }
    setNewPassword("");setConfirmPassword("");setPasswordSuccess("Senha provisória definida com segurança. O valor não foi armazenado nem exibido novamente.");setPasswordOperation("");
  };
  const sendRecovery=async()=>{
    setPasswordError("");setPasswordSuccess("");
    if(!passwordUser?.user_id){setPasswordError("Este perfil ainda não está vinculado ao Supabase Auth.");return}
    setPasswordOperation("recovery");
    const redirectTo=`${window.location.origin}/redefinir-senha`;
    const {error}=await getSupabaseBrowserClient().functions.invoke("admin-set-password",{body:{action:"send_recovery",targetUserId:passwordUser.user_id,redirectTo}});
    if(error){setPasswordError(await readFunctionError(error,"Não foi possível solicitar a redefinição. Tente novamente em alguns minutos."));setPasswordOperation("");return}
    setPasswordSuccess("Solicitação processada. Se o usuário estiver apto a receber mensagens, o Supabase enviará as instruções de redefinição.");setPasswordOperation("");
  };
  const passwordRequirements=getPasswordRequirements(newPassword);
  const filtered=items.filter(x=>(x.name+" "+x.email+" "+x.role+" "+(x.institutional_profiles?.name||"")).toLowerCase().includes(query.toLowerCase())&&(!roleFilter||x.role===roleFilter)&&(!statusFilter||(statusFilter==="ATIVO"?x.active:!x.active)));
  return <div className="operational-page access-management"><PageTitle eyebrow="ADMINISTRAÇÃO E RBAC" title="Usuários e acessos" text="Perfis, vínculos institucionais e ciclo de acesso em uma visão administrativa protegida."/>
    <AlertBanner tone="info"><strong>Identidade institucional ativa.</strong> Os acessos vêm do Supabase Auth e continuam obedecendo às regras de segurança por perfil.</AlertBanner>
    {passwordUser&&<div className="admin-password-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)closePasswordDialog()}}><form className="admin-password-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-password-title" onSubmit={savePassword}><header><div><b id="admin-password-title">Definir senha provisória</b><p>{passwordUser.name} · {maskEmail(passwordUser.email)}</p></div><button type="button" onClick={closePasswordDialog} disabled={Boolean(passwordOperation)} aria-label="Fechar">×</button></header><p className="admin-password-guidance">Use esta opção somente quando for necessário entregar uma credencial provisória. O usuário também pode receber um link oficial para criar a própria senha.</p><div className="admin-password-fields"><label>Nova senha<input aria-label="Nova senha provisória" type="password" autoComplete="new-password" value={newPassword} onChange={event=>setNewPassword(event.target.value)} required minLength={PASSWORD_MIN_LENGTH}/></label><label>Confirmar nova senha<input aria-label="Confirmar nova senha provisória" type="password" autoComplete="new-password" value={confirmPassword} onChange={event=>setConfirmPassword(event.target.value)} required minLength={PASSWORD_MIN_LENGTH}/></label></div><ul className="password-requirements admin-requirements">{passwordRequirements.map(requirement=><li className={requirement.valid?"valid":""} key={requirement.key}><span>{requirement.valid?"✓":"○"}</span>{requirement.label}</li>)}</ul><small>A senha segue diretamente para o Supabase Auth por uma função administrativa protegida. Não é salva em perfis, auditoria ou armazenamento local.</small>{passwordError&&<p className="account-error" role="alert">{passwordError}</p>}{passwordSuccess&&<p className="account-success" role="status">{passwordSuccess}</p>}<div className="admin-password-actions"><button type="button" className="secondary-action" onClick={()=>void sendRecovery()} disabled={Boolean(passwordOperation)}>{passwordOperation==="recovery"?"Enviando...":"Enviar link de redefinição"}</button><button type="button" className="cancel-action" onClick={closePasswordDialog} disabled={Boolean(passwordOperation)}>Cancelar</button><button type="submit" className="primary-action" disabled={Boolean(passwordOperation)}>{passwordOperation==="password"?"Salvando...":"Definir senha"}</button></div></form></div>}
    <section className="operational-metric-grid"><MetricCard label="Usuários cadastrados" value={items.length} detail="Perfis institucionais"/><MetricCard label="Acessos ativos" value={items.filter(x=>x.active).length} detail="Autorizados no momento" tone="teal"/><MetricCard label="Acessos suspensos" value={items.filter(x=>!x.active).length} detail="Sem acesso ativo" tone="amber"/></section>
    <section className="operational-table-panel"><SectionHeader title="Diretório de acessos" description="Pesquise por pessoa, perfil ou vínculo e utilize somente as ações administrativas existentes."/><FilterBar className="operational-filter-bar"><SearchInput aria-label="Pesquisar usuário" placeholder="Pesquisar nome, e-mail ou vínculo..." value={query} onChange={e=>setQuery(e.target.value)}/><label>Perfil<select aria-label="Filtrar perfil" value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}><option value="">Todos</option><option value="ADMIN">Administrador Regional</option><option value="GESTAO">Gestão</option><option value="ESCOLA">Escola</option><option value="VISITANTE">Visitante</option></select></label><label>Status<select aria-label="Filtrar status de acesso" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="">Todos</option><option value="ATIVO">Ativo</option><option value="INATIVO">Inativo</option></select></label><span className="operational-result-count">{filtered.length} resultados</span></FilterBar>
      {loading?<LoadingState title="Carregando usuários…" description="Consultando os perfis autorizados."/>:filtered.length?<DataTable className="operational-data-table access-data-table"><thead><tr><th>Usuário</th><th>Perfil</th><th>Vínculo institucional</th><th>Status</th><th>Ações</th></tr></thead><tbody>{filtered.map(item=><tr key={item.id}><td><div className="access-user"><i aria-hidden="true">{item.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</i><p><b>{item.name}</b><span>{item.email}</span></p></div></td><td><SuperBIStatusBadge tone={item.role==="ADMIN"?"info":item.role==="GESTAO"?"success":"neutral"}>{roleLabel(item.role)}</SuperBIStatusBadge></td><td>{item.institutional_profiles?.short_name||item.institutional_profiles?.name||"Visão global"}</td><td><SuperBIStatusBadge tone={item.active?"success":"neutral"}>{item.active?"Ativo":"Inativo"}</SuperBIStatusBadge></td><td><div className="row-actions"><button className="secondary-row-action" onClick={()=>choosePasswordUser(item)} disabled={!item.user_id}>Definir senha</button><button className={item.active?"danger-row-action":"secondary-row-action"} onClick={()=>void toggle(item)}>{item.active?"Suspender":"Ativar"}</button></div></td></tr>)}</tbody></DataTable>:<SuperBIEmptyState title="Nenhum usuário encontrado" description="Ajuste os filtros ou a pesquisa para localizar outro perfil."/>}
    </section>
    <DataProvenance/>
  </div>;
}

function Schools({ go, user }: { go:(p:string)=>void; user:User }) {
  const [query,setQuery]=useState(""); const [filter,setFilter]=useState<"todas"|"pei"|"regular">("todas");
  const [realSchools,setRealSchools]=useState<School[]>([]);
  useEffect(()=>{if(user.role==="VISITANTE")return;let active=true;void getSupabaseBrowserClient().from("schools").select("id,name,slug,pei,active").eq("active",true).order("name").then(({data})=>{if(active)setRealSchools((data??[]).map(s=>({id:s.id,name:s.name,slug:s.slug,pei:s.pei,status:"ativa"})))});return()=>{active=false}},[user.role,user.id]);
  const visible=user.role==="VISITANTE"?demoProvider.getSchools():user.role==="ESCOLA"?realSchools.filter(s=>s.id===user.schoolId):realSchools;
  const filtered=visible.filter(s=>s.name.toLowerCase().includes(query.toLowerCase())&&(filter==="todas"||(filter==="pei"?s.pei:!s.pei)));
  return <div className="operational-page schools-page"><PageTitle eyebrow="REDE ESTADUAL" title="Escola 360" text="Visão transversal e autorizada de cada unidade escolar."/>
    <FilterBar className="operational-filter-bar school-filter-bar"><SearchInput aria-label="Pesquisar escola" placeholder="Pesquisar escola..." value={query} onChange={e=>setQuery(e.target.value)}/><div className="chips" role="group" aria-label="Filtrar modalidade">{(["todas","pei","regular"] as const).map(f=><button type="button" aria-pressed={f===filter} className={f===filter?"active":""} onClick={()=>setFilter(f)} key={f}>{f==="todas"?"Todas":f==="pei"?"PEI":"Não PEI"}</button>)}</div><span className="operational-result-count">{filtered.length} resultados</span></FilterBar>
    {filtered.length?<div className="school-list">{filtered.map(s=><button key={s.id} onClick={()=>go(`/radar360/escolas/${s.slug}`)}><div className="school-avatar" aria-hidden="true">EE</div><div><b>{s.name}</b><span>ID institucional: {s.id}</span></div>{s.pei&&<em>PEI</em>}<SuperBIStatusBadge tone="success">Ativa</SuperBIStatusBadge><strong aria-hidden="true">→</strong></button>)}</div>:<SuperBIEmptyState title="Nenhuma escola encontrada" description="Ajuste a pesquisa ou o filtro de modalidade."/>}</div>;
}

function SchoolView({ school, user }: { school:School; user:User }) {
  const demo=user.role==="VISITANTE";
  const tabs=["Resumo","Supervisão","Pedagógico","Tecnologia","Rede Escolar","Vida Escolar","Matrícula","Pessoas","Administração e Finanças","Obras e Manutenção","Evidências","Demandas"];
  const [tab,setTab]=useState("Resumo");
  const [realSchool,setRealSchool]=useState<School>(school);const [schoolItems,setSchoolItems]=useState<any[]>([]);const [evidenceCount,setEvidenceCount]=useState(0);
  useEffect(()=>{if(demo)return;queueMicrotask(async()=>{const supabase=getSupabaseBrowserClient();const isUuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(school.id);const query=isUuid?supabase.from("schools").select("id,name,slug,pei").eq("id",school.id):supabase.from("schools").select("id,name,slug,pei").eq("slug",school.slug);const {data:s}=await query.maybeSingle();if(!s)return;setRealSchool({id:s.id,name:s.name,slug:s.slug,pei:s.pei,status:"ativa"});const [{data:items},{count}]=await Promise.all([supabase.from("institutional_items").select("id,title,record_type,status,priority,sector_id,sectors(code,name)").eq("school_id",s.id).eq("active",true).order("updated_at",{ascending:false}),supabase.from("evidences").select("id",{count:"exact",head:true}).eq("school_id",s.id)]);setSchoolItems(items??[]);setEvidenceCount(count??0)})},[demo,school.id,school.slug,user.id]);
  const tabSectors:Record<string,string[]>= {"Supervisão":["ESE"],"Pedagógico":["EEC"],"Tecnologia":["SEINTEC","SETEC"],"Rede Escolar":["SEGRE"],"Matrícula":["SEMAT"],"Vida Escolar":["SEVESC"],"Pessoas":["SEPES","SEFREP","SEAPE"],"Administração e Finanças":["SEAFIN","SEFIN","SECOMSE"],"Obras e Manutenção":["SEOM","SEFISC"]};
  const shownItems=demo?[]:tab==="Resumo"?schoolItems:tab==="Demandas"?schoolItems.filter(x=>x.record_type==="DEMANDA"):tab==="Evidências"?[]:schoolItems.filter(x=>tabSectors[tab]?.includes(x.sectors?.code));
  return <><PageTitle eyebrow="PAINEL 360 DA ESCOLA" title={realSchool.name} text="Visão integrada da unidade escolar, respeitando as permissões de cada domínio." badge={realSchool.pei?"PEI":undefined}/>
    <div className="tabs">{tabs.map(t=><button className={t===tab?"active":""} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div>
    <section className="school-summary"><div className="summary-main"><SectionHeader title={tab==="Resumo"?"Visão geral da unidade":tab} description="Informações autorizadas para o contexto selecionado."/><div className="residual-metric-grid"><MetricCard label="Itens ativos" value={demo?"—":schoolItems.filter(x=>!["CONCLUIDA","CANCELADA"].includes(x.status)).length} detail={demo?"Sem dados demonstrativos":"Em acompanhamento"}/><MetricCard label="Pendências" value={demo?"—":schoolItems.filter(x=>x.record_type==="PENDENCIA").length} detail={demo?"Sem dados demonstrativos":"Registros classificados"} tone="amber"/><MetricCard label="Evidências" value={demo?"—":evidenceCount} detail={demo?"Sem dados demonstrativos":"Registros vinculados"} tone="teal"/></div>{demo?<SuperBIEmptyState title="Sem dados institucionais" description="Nenhum dado real ou sensível é exibido nesta área demonstrativa."/>:shownItems.length?<div className="simple-list">{shownItems.map(x=><div key={x.id}><b>{x.title}</b><span>{x.sectors?.code} · {x.record_type} · {x.status.replaceAll("_"," ")}</span></div>)}</div>:<SuperBIEmptyState title="Nenhum registro nesta área" description="Não há itens autorizados para esta escola e domínio."/>}</div>
    <aside className="school-contexts"><h3>Contextos relacionados</h3>{["Evidências","Devolutivas","Demandas","Documentos e formulários"].map(x=><span key={x}>{x}<small>Disponível conforme perfil</small></span>)}</aside></section>
    <DataProvenance demo={demo}/></>;
}

type DemandRow = {id:string;title:string;record_type?:string;status:string;priority:string;due_date?:string|null;created_at:string;sectors?:{code?:string;name?:string}|null;schools?:{name?:string}|null};

function Demands({user,recordType,go}:{user:User;recordType?:string;go:(path:string)=>void}) {
  const demo=user.role==="VISITANTE";const [items,setItems]=useState<DemandRow[]>([]);const [loading,setLoading]=useState(!demo);
  const [categories,setCategories]=useState<{id:string;name:string;sector_id:string}[]>([]);const [availableSectors,setAvailableSectors]=useState<{id:string;code:string;organization_id:string}[]>([]);
  const [availableSchools,setAvailableSchools]=useState<{id:string;name:string}[]>([]);
  const [showForm,setShowForm]=useState(false);const [message,setMessage]=useState("");const [draft,setDraft]=useState({sectorId:user.sectorId||"",categoryId:"",schoolId:"",recordType:recordType||"DEMANDA",title:"",description:"",status:"NOVA",priority:"NORMAL",dueDate:"",visibility:"GESTAO"});
  const [search,setSearch]=useState("");const [statusFilter,setStatusFilter]=useState("");const [priorityFilter,setPriorityFilter]=useState("");const [sectorFilter,setSectorFilter]=useState("");
  const load=async()=>{if(demo)return;setLoading(true);const supabase=getSupabaseBrowserClient();const [{data:itemData},{data:sectorData},{data:categoryData}]=await Promise.all([
    supabase.from("institutional_items").select("id,title,record_type,status,priority,due_date,created_at,sectors(code,name),schools(name)").eq("active",true).order("created_at",{ascending:false}),
    supabase.from("sectors").select("id,code,organization_id").eq("active",true).order("code"),
    supabase.from("demand_categories").select("id,name,sector_id").eq("active",true).order("name"),
  ]);const {data:schoolData}=await supabase.from("schools").select("id,name").eq("active",true).order("name");setItems((itemData??[]) as unknown as DemandRow[]);setAvailableSectors(sectorData??[]);setCategories(categoryData??[]);setAvailableSchools(schoolData??[]);setDraft(d=>({...d,sectorId:user.role==="GESTAO"?user.sectorId||"":d.sectorId||sectorData?.[0]?.id||""}));setLoading(false)};
  // load intentionally captures the current user scope; changes to that scope trigger a fresh query.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{queueMicrotask(()=>void load())},[demo,user.id]);
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setMessage("");const supabase=getSupabaseBrowserClient();const {data:{user:authUser}}=await supabase.auth.getUser();const effectiveSectorId=user.role==="GESTAO"?user.sectorId||"":draft.sectorId;const sector=availableSectors.find(s=>s.id===effectiveSectorId);const categoryId=draft.categoryId||categories.find(c=>c.sector_id===effectiveSectorId)?.id;if(!authUser||!sector||!categoryId)return;const {error}=await supabase.from("institutional_items").insert({organization_id:sector.organization_id,sector_id:effectiveSectorId,school_id:draft.schoolId||null,category_id:categoryId,record_type:draft.recordType,title:draft.title.trim(),description:draft.description.trim()||null,status:draft.status,priority:draft.priority,responsible_user_id:authUser.id,created_by:authUser.id,updated_by:authUser.id,due_date:draft.dueDate||null,visibility:draft.visibility});if(error)setMessage("Não foi possível registrar. A RLS recusou o vínculo ou algum campo está inválido.");else{setMessage("Item institucional registrado com sucesso.");setDraft(d=>({...d,title:"",description:"",dueDate:""}));setShowForm(false);await load()}};
  const shown:DemandRow[]=(demo?demoData.actions.map((x,i)=>({id:`demo-${i}`,title:x.title,record_type:"DEMANDA",status:x.status.toUpperCase().replaceAll(" ","_"),priority:i===0?"ALTA":"NORMAL",created_at:"2026-07-30",sectors:{code:x.sector},schools:null})):items).filter(x=>!recordType||x.record_type===recordType);
  const visibleShown=shown.filter(x=>(x.title+" "+(x.schools?.name||"")+" "+(x.sectors?.code||"")).toLowerCase().includes(search.toLowerCase())&&(!statusFilter||x.status===statusFilter)&&(!priorityFilter||x.priority===priorityFilter)&&(!sectorFilter||x.sectors?.code===sectorFilter));
  const sectorOptions=Array.from(new Set(shown.map(x=>x.sectors?.code).filter(Boolean))) as string[];
  const title=recordType?recordType.charAt(0)+recordType.slice(1).toLowerCase().replaceAll("_"," "):"Itens institucionais";
  return <div className="operational-page demands-page"><PageHeader eyebrow="GESTÃO INSTITUCIONAL" title={title} description={demo?"Prévia demonstrativa, sem consulta ao banco institucional.":"Registros reais autorizados pelo seu perfil institucional."} actions={!demo&&user.role!=="ESCOLA"?<button className="operational-primary-action" onClick={()=>setShowForm(v=>!v)}>{showForm?"Cancelar":"+ Novo item"}</button>:undefined}/>
    {demo&&<AlertBanner tone="info"><strong>Dados totalmente fictícios.</strong> Este conteúdo existe somente no provedor demonstrativo.</AlertBanner>}
    {showForm&&<section className="operational-form-panel"><SectionHeader title="Registrar item institucional" description="Preencha os campos existentes; validações, escopo e RLS permanecem inalterados."/><form className="user-form demand-form" onSubmit={submit}><label>Tipo<select value={draft.recordType} onChange={e=>setDraft({...draft,recordType:e.target.value})}>{["DEMANDA","ACAO","ACOMPANHAMENTO","PROJETO","PENDENCIA","OCORRENCIA"].map(x=><option key={x}>{x}</option>)}</select></label>{user.role==="ADMIN"&&<label>Setor<select value={draft.sectorId} onChange={e=>{const sectorId=e.target.value;setDraft({...draft,sectorId,categoryId:categories.find(c=>c.sector_id===sectorId)?.id||""})}}>{availableSectors.map(s=><option key={s.id} value={s.id}>{s.code}</option>)}</select></label>}<label>Categoria<select value={draft.categoryId||categories.find(c=>c.sector_id===(user.role==="GESTAO"?user.sectorId:draft.sectorId))?.id||""} onChange={e=>setDraft({...draft,categoryId:e.target.value})}>{categories.filter(c=>c.sector_id===(user.role==="GESTAO"?user.sectorId:draft.sectorId)).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Escola<select value={draft.schoolId} onChange={e=>setDraft({...draft,schoolId:e.target.value})}><option value="">Regional</option>{availableSchools.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label><label>Título<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} required/></label><label>Status<select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value})}>{["NOVA","EM_ANALISE","EM_ANDAMENTO","AGUARDANDO_ESCOLA","AGUARDANDO_SETOR","AGUARDANDO_ORGAO_CENTRAL","CONCLUIDA","SUSPENSA","CANCELADA"].map(x=><option key={x}>{x}</option>)}</select></label><label>Prioridade<select value={draft.priority} onChange={e=>setDraft({...draft,priority:e.target.value})}>{["BAIXA","NORMAL","ALTA","CRITICA"].map(x=><option key={x}>{x}</option>)}</select></label><label>Responsável<input value={user.name} disabled/></label><label>Prazo<input type="date" value={draft.dueDate} onChange={e=>setDraft({...draft,dueDate:e.target.value})}/></label><label>Visibilidade<select value={draft.visibility} onChange={e=>setDraft({...draft,visibility:e.target.value})}>{["PUBLICO","ESCOLAS","GESTAO","RESTRITO_SETOR","RESTRITO_REGIONAL"].map(x=><option key={x}>{x}</option>)}</select></label><label className="wide">Descrição<input value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/></label><button type="submit">Registrar item</button></form></section>}
    {message&&<AlertBanner tone={message.includes("sucesso")?"success":"danger"}>{message}</AlertBanner>}
    <section className="operational-table-panel"><SectionHeader title="Fila operacional" description="Prioridade, situação, contexto institucional e prazo em uma leitura única."/><FilterBar className="operational-filter-bar"><SearchInput aria-label="Buscar itens" placeholder="Buscar título, escola ou setor..." value={search} onChange={e=>setSearch(e.target.value)}/><label>Status<select aria-label="Filtrar status" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="">Todos</option>{["NOVA","EM_ANALISE","EM_ANDAMENTO","AGUARDANDO_ESCOLA","AGUARDANDO_SETOR","AGUARDANDO_ORGAO_CENTRAL","CONCLUIDA","SUSPENSA","CANCELADA"].map(x=><option key={x} value={x}>{x.replaceAll("_"," ")}</option>)}</select></label><label>Prioridade<select aria-label="Filtrar prioridade" value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)}><option value="">Todas</option>{["BAIXA","NORMAL","ALTA","CRITICA"].map(x=><option key={x}>{x}</option>)}</select></label><label>Setor<select aria-label="Filtrar setor" value={sectorFilter} onChange={e=>setSectorFilter(e.target.value)}><option value="">Todos</option>{sectorOptions.map(x=><option key={x}>{x}</option>)}</select></label><span className="operational-result-count">{visibleShown.length} resultados</span></FilterBar>
      {loading?<LoadingState title="Carregando itens…" description="Consultando registros autorizados."/>:visibleShown.length?<DataTable className="operational-data-table demands-data-table"><thead><tr><th>Item</th><th>Tipo</th><th>Contexto</th><th>Prioridade</th><th>Status</th><th>Prazo</th><th><span className="sr-only">Ação</span></th></tr></thead><tbody>{visibleShown.map(item=><tr key={item.id}><td><button className="table-primary-action" onClick={()=>go(`/radar360/itens/${item.id}`)}><strong>{item.title}</strong><small>Atualizado em {new Date(item.created_at).toLocaleDateString("pt-BR")}</small></button></td><td>{(item.record_type||"DEMANDA").replaceAll("_"," ")}</td><td><strong>{item.sectors?.code||"Regional"}</strong><small className="table-cell-detail">{item.schools?.name||"Abrangência regional"}</small></td><td><SuperBIStatusBadge tone={operationalTone(item.priority)}>{item.priority==="NORMAL"?"Moderado":item.priority}</SuperBIStatusBadge></td><td><SuperBIStatusBadge tone={operationalTone(item.status)}>{item.status.replaceAll("_"," ")}</SuperBIStatusBadge></td><td>{item.due_date?new Date(`${item.due_date}T12:00:00`).toLocaleDateString("pt-BR"):"Sem prazo"}</td><td><button className="secondary-row-action" onClick={()=>go(`/radar360/itens/${item.id}`)} aria-label={`Abrir ${item.title}`}>Abrir</button></td></tr>)}</tbody></DataTable>:<SuperBIEmptyState title={recordType==="DEMANDA"?"Nenhuma demanda encontrada":"Nenhum registro disponível"} description="Ajuste os filtros ou aguarde novos registros autorizados."/>}
    </section><DataProvenance demo={demo}/></div>;
}

function ModulePage({ path, go }: { path:string; go:(p:string)=>void }) {
  const denied=path==="/denied";
  return <><PageTitle eyebrow={denied?"CONTROLE DE ACESSO":"NAVEGAÇÃO"} title={denied?"Acesso não autorizado":"Página não encontrada"} text={denied?"Seu perfil institucional não possui permissão para abrir esta área.":"A rota informada não corresponde a um módulo do SuperBI 360 | GSU."}/><section className="module-hero"><SuperBIBrand markOnly size="lg"/><h2>{denied?"Conteúdo protegido por perfil e RLS":"Vamos voltar ao ambiente institucional"}</h2><p>{denied?"Nenhum dado foi carregado. Solicite ao administrador uma revisão do vínculo caso este acesso seja necessário.":"Use a navegação principal ou retorne à Visão Regional 360."}</p><div className="module-actions"><button onClick={()=>go("/dashboard")}>Voltar à Visão Regional 360</button><button onClick={()=>go("/radar360/sobre")}>Sobre o SuperBI 360 | GSU</button></div></section></>;
}

function PageTitle({eyebrow,title,text,badge}:{eyebrow:string;title:string;text:string;badge?:string}) {
  return <PageHeader eyebrow={eyebrow} title={title} description={text} actions={badge?<SuperBIStatusBadge tone="info">{badge}</SuperBIStatusBadge>:undefined}/>;
}

function ManagementSectorDashboard({user}:{user:User}) {
  const [stats,setStats]=useState({active:0,demands:0,actions:0,followups:0,projects:0,pending:0,critical:0,overdue:0,schools:0,evidences:0});
  const [hub,setHub]=useState<HubRow|null>(null);
  useEffect(()=>{queueMicrotask(async()=>{if(!user.sectorId)return;const supabase=getSupabaseBrowserClient();const [{data:items},{count:evidences},{data:hubData}]=await Promise.all([supabase.from("institutional_items").select("record_type,status,priority,due_date,school_id").eq("sector_id",user.sectorId).eq("active",true),supabase.from("evidences").select("id",{count:"exact",head:true}).eq("sector_id",user.sectorId),supabase.from("hubs").select("id,name,external_url,description,status,integration_type,sector_id,sectors(code,name,slug)").eq("sector_id",user.sectorId).eq("active",true).maybeSingle()]);setHub((hubData as unknown as HubRow)||null);const rows=items??[];const today=new Date().toISOString().slice(0,10);setStats({active:rows.filter(x=>!["CONCLUIDA","CANCELADA"].includes(x.status)).length,demands:rows.filter(x=>x.record_type==="DEMANDA").length,actions:rows.filter(x=>x.record_type==="ACAO").length,followups:rows.filter(x=>x.record_type==="ACOMPANHAMENTO").length,projects:rows.filter(x=>x.record_type==="PROJETO").length,pending:rows.filter(x=>x.record_type==="PENDENCIA").length,critical:rows.filter(x=>x.priority==="CRITICA").length,overdue:rows.filter(x=>x.due_date&&x.due_date<today&&!["CONCLUIDA","CANCELADA"].includes(x.status)).length,schools:new Set(rows.map(x=>x.school_id).filter(Boolean)).size,evidences:evidences??0})})},[user.id,user.sectorId]);
  const cards=[["Itens ativos",stats.active],["Demandas",stats.demands],["Ações",stats.actions],["Acompanhamentos",stats.followups],["Projetos",stats.projects],["Pendências",stats.pending],["Itens críticos",stats.critical],["Itens vencidos",stats.overdue],["Escolas relacionadas",stats.schools],["Evidências",stats.evidences]];
  return <div className="operational-page management-sector-page"><PageTitle eyebrow="MEU SETOR" title={user.institutionalProfileName||"Gestão setorial"} text="Painel operacional com dados reais autorizados do Supabase."/>{hub&&<div className="featured-hub"><HubAccessCard hub={hub}/></div>}<section className="management-metric-grid" aria-label="Indicadores do setor">{cards.map(([label,value],index)=><MetricCard key={String(label)} label={String(label)} value={value} detail="Dados autorizados" tone={index===6||index===7?"amber":index===9?"teal":"blue"}/>)}</section><section className="panel"><SectionHeader title="Movimentações do setor" description="Atualizações recentes dos registros autorizados."/><SuperBIEmptyState title="Nenhuma movimentação disponível" description="As alterações aparecerão aqui conforme os itens forem movimentados."/></section><DataProvenance/></div>;
}

function AppShell({ user, onLogout }: { user:User; onLogout:()=>void }) {
  const [path,setPath]=useState(pathNow); const [mobile,setMobile]=useState(false);
  const go=(next:string)=>{if(!canAccess(user.role,next)){setPath("/acesso-negado");window.history.pushState({},"",next);return;}window.history.pushState({},"",next);setPath(next);setMobile(false);window.scrollTo(0,0)};
  useEffect(()=>{const fn=()=>setPath(pathNow());window.addEventListener("popstate",fn);return()=>window.removeEventListener("popstate",fn)},[]);
  const sector=useMemo(()=>sectors.find(s=>path.startsWith(`/radar360/setores/${s.slug}`)),[path]);
  const schoolPool=user.role==="VISITANTE"?demoProvider.getSchools():schools;
  const school=useMemo(()=>schoolPool.find(s=>path.startsWith(`/radar360/escolas/${s.slug}`)),[path,schoolPool]);
  const itemSegment=path.startsWith("/radar360/itens/")?path.split("/").pop()||"":"";const itemTypes=["demanda","acao","acompanhamento","projeto","pendencia","ocorrencia"];const itemType=itemTypes.includes(itemSegment)?itemSegment.toUpperCase():undefined;const itemId=itemSegment&&!itemType?itemSegment:undefined;
  const schoolSelf:School={id:user.schoolId||"",name:"Minha Escola",slug:"",pei:false,status:"ativa"};
  const content=!canAccess(user.role,path)?<ModulePage path="/denied" go={go}/>:path==="/dashboard"||path==="/"?<Overview user={user} go={go}/>:path===PAINEL_MDI_ROUTE?<PainelMdiModule/>:path==="/radar360"?<Radar360Module user={user} go={go}/>:path==="/radar360/meu-setor"?<ManagementSectorDashboard user={user}/>:path==="/radar360/minha-escola"?<SchoolView school={schoolSelf} user={user}/>:path==="/radar360/usuarios"?<UsersAdmin/>:path==="/radar360/demandas"?<Demands user={user} recordType="DEMANDA" go={go}/>:itemId?<ItemDetailModule id={itemId} user={user} go={go}/>:path==="/radar360/itens"||itemType?<Demands user={user} recordType={itemType} go={go}/>:path==="/radar360/setores"?<Sectors go={go} user={user}/>:sector?<SectorView sector={sector} user={user}/>:path==="/radar360/escolas"?<Schools go={go} user={user}/>:school?<SchoolView school={school} user={user}/>:path==="/radar360/biguarulho"?<BigModule/>:path==="/radar360/integracao"?<MdiModule/>:path==="/radar360/comunica"?<CommunicaModule user={user}/>:path==="/radar360/evidencias"?<EvidenceModule user={user}/>:path==="/radar360/dirigente"?<ExecutiveModule user={user} mode="ADMIN"/>:path==="/radar360/gestao"?<ExecutiveModule user={user} mode="GESTAO"/>:path==="/radar360/matriz"?<IntegrationMatrixModule/>:path==="/radar360/acordos"?<AgreementsModule/>:path==="/radar360/sobre"?<AboutModule/>:path==="/acesso-negado"?<ModulePage path="/denied" go={go}/>:<ModulePage path={path} go={go}/>;
  const managementNav=[["⌂","Visão Regional 360","/dashboard"],["◉","SuperBI 360 | GSU","/radar360"],["◆","Meu Setor","/radar360/meu-setor"],["▦","Setores e Hubs","/radar360/setores"],["◆","BIGuarulhosSul","/radar360/biguarulho"],["↗","Integração! MDI","/radar360/integracao"],["◫","Comunica!","/radar360/comunica"],["✓","Evidências","/radar360/evidencias"],["◇","Painel MDI",PAINEL_MDI_ROUTE],["◈","Painel da Gestão","/radar360/gestao"],["⌂","Painel das Escolas","/radar360/escolas"],["≋","Demandas","/radar360/demandas"],["⊞","Matriz de Integração","/radar360/matriz"],["≋","Acordos","/radar360/acordos"],["ⓘ","Sobre","/radar360/sobre"]] as const;
  const schoolNav=[["⌂","Minha Escola","/radar360/minha-escola"],["◈","Visão geral","/dashboard"],["≋","Demandas","/radar360/demandas"],["◆","Acompanhamentos","/radar360/itens/acompanhamento"],["✓","Evidências","/radar360/evidencias"],["◫","Devolutivas","/radar360/evidencias"],["◉","Orientações","/radar360/comunica"],["▦","Documentos","/radar360/comunica"],["ⓘ","Sobre","/radar360/sobre"]] as const;
  const visitorNav=[["⌂","Visão demonstrativa","/dashboard"],["◉","SuperBI 360 | GSU — Demo","/radar360"],["▦","Setores Demo","/radar360/setores"],["⌂","Escolas Demo","/radar360/escolas"],["☷","Itens Demo","/radar360/itens"],["◈","Indicadores Demo","/radar360/gestao"],["ⓘ","Sobre","/radar360/sobre"]] as const;
  const visibleNav=user.role==="GESTAO"?managementNav:user.role==="ESCOLA"?schoolNav:user.role==="VISITANTE"?visitorNav:nav.filter(n=>n[3].includes(user.role as never));
  const orderedNav=[...visibleNav].sort((a,b)=>navigationGroupOrder[navigationGroup(a[2])]-navigationGroupOrder[navigationGroup(b[2])]);
  const currentNav=orderedNav.find(n=>path===n[2]||(n[2]!=="/radar360"&&path.startsWith(n[2])));
  const currentLabel=itemId?"Detalhe institucional":sector?sector.shortName:school?school.name:currentNav?.[1]||"SuperBI 360 | GSU";
  return <div className="app-shell">
    <aside className={`sidebar ${mobile?"open":""}`} aria-label="Navegação principal"><SuperBIBrand size="sm" tone="light"/><button className="close-menu" onClick={()=>setMobile(false)} aria-label="Fechar navegação">×</button><nav>{orderedNav.map((n,index)=>{const group=navigationGroup(n[2]);const previous=index?navigationGroup(orderedNav[index-1][2]):"";return <Fragment key={`${n[2]}-${n[1]}`}>{group!==previous&&<span className="nav-heading">{group}</span>}<button className={path===n[2]||n[2]!=="/radar360"&&path.startsWith(n[2])?"active":""} onClick={()=>go(n[2])} aria-current={path===n[2]?"page":undefined}><i aria-hidden="true">{n[0]}</i><span>{n[1]}</span></button></Fragment>})}</nav><div className="sidebar-foot"><span>URE GUARULHOS SUL</span><b>SuperBI 360 | GSU</b><small>Inteligência regional</small></div></aside>
    <div className="app-main"><header className="topbar"><button className="hamburger" onClick={()=>setMobile(true)} aria-label="Abrir navegação">☰</button><div className="topbar-context"><span>SuperBI 360 | GSU</span><strong>{currentLabel}</strong></div><div className="topbar-date"><span>Hoje</span><strong>{new Intl.DateTimeFormat("pt-BR",{weekday:"long",day:"2-digit",month:"long"}).format(new Date())}</strong></div>
      <div className="top-actions">{user.role==="VISITANTE"&&<span className="demo-badge">MODO VISITANTE · DADOS ILUSTRATIVOS</span>}{user.role!=="VISITANTE"?<div className="user-chip"><span>{user.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</span><p><b>{user.name}</b><small>{user.institutionalProfileName||user.role}</small></p></div>:<div className="user-chip"><span>VI</span><p><b>Visitante</b><small>Ambiente demonstrativo</small></p></div>}<button className="logout" onClick={onLogout}>Sair <span aria-hidden="true">↗</span></button></div></header>
      {user.role==="VISITANTE"&&<div className="mobile-demo">Ambiente demonstrativo · nenhum dado real</div>}
      <main className="content"><nav className="global-breadcrumb" aria-label="Navegação estrutural"><button onClick={()=>go("/dashboard")}>SuperBI 360 | GSU</button><span aria-hidden="true">/</span><strong>{currentLabel}</strong></nav>{content}</main></div>{mobile&&<button className="overlay" onClick={()=>setMobile(false)} aria-label="Fechar menu"/>}
  </div>;
}

export default function RadarApp() {
  const [ready,setReady]=useState(false); const [user,setUser]=useState<User|null>(null); const [accessError,setAccessError]=useState("");
  const loadAuthenticatedUser=async()=>{
    const supabase=getSupabaseBrowserClient();const {data:{user:authUser}}=await supabase.auth.getUser();
    if(!authUser){setUser(null);setReady(true);return}
    const {data:profile,error}=await supabase.from("profiles").select("id,name,email,role,sector_id,school_id,institutional_profile_id,active,institutional_profiles(name,short_name)").eq("user_id",authUser.id).maybeSingle();
    if(error||!profile||!profile.active){setUser(null);setAccessError("Usuário autenticado, mas sem perfil institucional ativo. Solicite a vinculação ao administrador.");setReady(true);return}
    const linked=profile.institutional_profiles as unknown as {name?:string;short_name?:string}|null;
    setAccessError("");setUser({id:profile.id,name:profile.name,email:profile.email,role:profile.role as Role,sectorId:profile.sector_id??undefined,schoolId:profile.school_id??undefined,institutionalProfileId:profile.institutional_profile_id,institutionalProfileName:linked?.short_name||linked?.name,status:"ativo"});
    if(["/","/login"].includes(pathNow()))window.history.replaceState({},"","/dashboard");setReady(true);
  };
  useEffect(()=>{const supabase=getSupabaseBrowserClient();queueMicrotask(()=>void loadAuthenticatedUser());const {data:{subscription}}=supabase.auth.onAuthStateChange(event=>{if(event==="SIGNED_OUT"){setUser(null);setReady(true)}});return()=>subscription.unsubscribe()},[]);
  const demo=()=>{setAccessError("");setUser({id:"demo",name:"Visitante",email:"",role:"VISITANTE",institutionalProfileName:"Ambiente demonstrativo",status:"ativo"});window.history.pushState({},"","/dashboard")};
  const logout=async()=>{if(user?.role!=="VISITANTE")await getSupabaseBrowserClient().auth.signOut();setUser(null);setAccessError("");window.history.pushState({},"","/login")};
  if(!ready)return <div className="boot"><SuperBIBrand size="lg" tone="light" subtitle/><span/></div>;
  return user?<AppShell user={user} onLogout={()=>void logout()}/>:<><Login onDemo={demo} onAuthenticated={loadAuthenticatedUser}/>{accessError&&<div className="access-error-banner">{accessError}</div>}</>;
}
