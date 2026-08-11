"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "../types";
import { getSupabaseBrowserClient } from "../lib/supabase/client";
import {
  ActivityFeed,
  AlertBanner,
  EmptyState,
  MetricCard,
  PageHeader,
  SectionHeader,
  Skeleton,
  StatusBadge,
  StrategicCard,
} from "./SuperBIUI";

type RegionalItem = {
  id: string;
  title: string;
  record_type: string;
  status: string;
  priority: string;
  due_date: string | null;
  updated_at: string;
  sector_id: string;
  school_id: string | null;
  sectors?: { code?: string } | null;
  schools?: { name?: string } | null;
};

type HistoryEntry = {
  id: string;
  event_type: string;
  created_at: string;
  institutional_items?: { title?: string; sector_id?: string } | null;
};

type RegionalData = {
  schools: number;
  sectors: number;
  evidences: number;
  items: RegionalItem[];
  history: HistoryEntry[];
};

const EMPTY_DATA: RegionalData = { schools: 0, sectors: 0, evidences: 0, items: [], history: [] };
const CLOSED_STATUSES = new Set(["CONCLUIDA", "CANCELADA"]);

function readableStatus(value: string) {
  return value.replaceAll("_", " ").toLocaleLowerCase("pt-BR");
}

function attentionLevel(item: RegionalItem, today: string) {
  if (item.priority === "CRITICA") return { label: "Crítico", tone: "danger" as const };
  if (item.due_date && item.due_date < today && !CLOSED_STATUSES.has(item.status)) {
    return { label: "Alto", tone: "warning" as const };
  }
  return { label: "Monitoramento", tone: "info" as const };
}

export default function VisaoRegional360({ user, go }: { user: User; go: (path: string) => void }) {
  const demo = user.role === "VISITANTE";
  const [data, setData] = useState<RegionalData>(EMPTY_DATA);
  const [loading, setLoading] = useState(!demo);
  const [error, setError] = useState("");

  useEffect(() => {
    if (demo) return;
    let active = true;

    const load = async () => {
      setLoading(true);
      setError("");
      const supabase = getSupabaseBrowserClient();
      let itemQuery = supabase
        .from("institutional_items")
        .select("id,title,record_type,status,priority,due_date,updated_at,sector_id,school_id,sectors(code),schools(name)")
        .eq("active", true)
        .order("updated_at", { ascending: false })
        .limit(500);

      if (user.role === "GESTAO" && user.sectorId) itemQuery = itemQuery.eq("sector_id", user.sectorId);

      const [schoolResult, sectorResult, itemResult, evidenceResult, historyResult] = await Promise.all([
        supabase.from("schools").select("id", { count: "exact", head: true }),
        supabase.from("sectors").select("id", { count: "exact", head: true }),
        itemQuery,
        supabase.from("evidences").select("id", { count: "exact", head: true }),
        supabase
          .from("institutional_item_history")
          .select("id,event_type,created_at,institutional_items(title,sector_id)")
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

      if (!active) return;
      const firstError = itemResult.error ?? schoolResult.error ?? sectorResult.error ?? evidenceResult.error ?? historyResult.error;
      if (firstError) {
        setError("Não foi possível consolidar todos os dados autorizados neste momento.");
        setLoading(false);
        return;
      }

      const items = (itemResult.data ?? []) as unknown as RegionalItem[];
      const history = ((historyResult.data ?? []) as unknown as HistoryEntry[])
        .filter((entry) => user.role !== "GESTAO" || !user.sectorId || entry.institutional_items?.sector_id === user.sectorId)
        .slice(0, 6);

      setData({
        schools: schoolResult.count ?? 0,
        sectors: user.role === "GESTAO" && user.sectorId ? 1 : (sectorResult.count ?? 0),
        evidences: evidenceResult.count ?? 0,
        items,
        history,
      });
      setLoading(false);
    };

    void load();
    return () => { active = false; };
  }, [demo, user.role, user.sectorId]);

  const today = new Date().toISOString().slice(0, 10);
  const summary = useMemo(() => {
    const open = data.items.filter((item) => !CLOSED_STATUSES.has(item.status));
    const completed = data.items.filter((item) => item.status === "CONCLUIDA");
    const overdue = open.filter((item) => item.due_date && item.due_date < today);
    const critical = open.filter((item) => item.priority === "CRITICA");
    const attention = open
      .filter((item) => item.priority === "CRITICA" || (item.due_date && item.due_date < today))
      .sort((a, b) => Number(b.priority === "CRITICA") - Number(a.priority === "CRITICA") || a.updated_at.localeCompare(b.updated_at));
    const relatedSchools = new Set(data.items.map((item) => item.school_id).filter(Boolean)).size;
    return { open, completed, overdue, critical, attention, relatedSchools };
  }, [data.items, today]);

  const metrics = [
    { label: user.role === "GESTAO" ? "Escolas relacionadas" : "Escolas autorizadas", value: user.role === "GESTAO" ? summary.relatedSchools : data.schools, detail: "Fonte institucional", tone: "cyan" as const },
    { label: "Setores visíveis", value: data.sectors, detail: "Conforme perfil de acesso", tone: "teal" as const },
    { label: "Demandas abertas", value: summary.open.filter((item) => item.record_type === "DEMANDA").length, detail: "Itens ativos", tone: "blue" as const },
    { label: "Acompanhamentos", value: data.items.filter((item) => item.record_type === "ACOMPANHAMENTO").length, detail: "Registros disponíveis", tone: "blue" as const },
    { label: "Concluídos", value: summary.completed.length, detail: "Itens institucionais", tone: "teal" as const },
    { label: "Evidências", value: data.evidences, detail: "Base autorizada", tone: "amber" as const },
  ];

  return (
    <div className="regional-360 superbi-ui" aria-busy={loading}>
      <PageHeader
        eyebrow="Inteligência regional · URE Guarulhos Sul"
        title={user.role === "ESCOLA" ? "Visão da Escola 360" : "Visão Regional 360"}
        description="Síntese executiva para entender o cenário regional, decidir prioridades, agir com coordenação e acompanhar resultados."
        actions={<button className="regional-primary-action" onClick={() => go("/radar360/itens")}>Acompanhar itens <span aria-hidden="true">→</span></button>}
      />

      {demo ? (
        <AlertBanner tone="info">Ambiente demonstrativo: indicadores numéricos foram omitidos para não representar dados fictícios como informação regional.</AlertBanner>
      ) : null}
      {error ? <AlertBanner tone="danger">{error}</AlertBanner> : null}

      <section className="regional-section" aria-labelledby="excelencia-title">
        <div className="excellence-card">
          <div className="excellence-copy">
            <span className="superbi-eyebrow">Indicador institucional</span>
            <h2 id="excelencia-title">Excelência em Gestão</h2>
            <p>Leitura integrada das dimensões estratégicas da regional, preparada para futura conexão com o MDI.</p>
            <StatusBadge tone="warning">Indicador em configuração</StatusBadge>
          </div>
          <div className="excellence-status" aria-label="Integração das dimensões do MDI ainda indisponível">
            <strong>—</strong>
            <span>Aguardando integração das dimensões do MDI</span>
          </div>
          <dl className="excellence-dimensions">
            <div><dt>Apoio e Orientação Pedagógica</dt><dd>Em integração</dd></div>
            <div><dt>Indicadores Educacionais</dt><dd>Em integração</dd></div>
            <div><dt>Gestão Administrativo-Financeira</dt><dd>Em integração</dd></div>
            <div><dt>Clima e Comunicação</dt><dd>Em integração</dd></div>
          </dl>
        </div>
      </section>

      <section className="regional-section" aria-label="Panorama Regional">
        <SectionHeader title="Panorama Regional" description="Dados consolidados disponíveis para o perfil atual." />
        <div className="regional-metric-grid" aria-busy={loading} aria-live="polite">
          {loading ? Array.from({ length: 6 }, (_, index) => <Skeleton className="regional-metric-skeleton" key={index} />) : metrics.map((metric) => (
            <MetricCard key={metric.label} label={metric.label} value={demo ? "—" : metric.value} detail={demo ? "Sem dados disponíveis" : metric.detail} tone={metric.tone} />
          ))}
        </div>
      </section>

      <div className="regional-decision-grid">
        <section className="regional-section attention-panel" aria-label="Radar de Atenção">
          <SectionHeader title="Radar de Atenção" description="Situações reais que exigem acompanhamento ou decisão." action={!demo && summary.attention.length ? <button className="regional-text-action" onClick={() => go("/radar360/itens")}>Ver todos</button> : undefined} />
          <div className="attention-list">
            {!loading && !demo && summary.attention.length ? summary.attention.slice(0, 5).map((item) => {
              const level = attentionLevel(item, today);
              return <button className="attention-item" key={item.id} onClick={() => go(`/radar360/itens/${item.id}`)}>
                <span><strong>{item.title}</strong><small>{item.schools?.name ?? item.sectors?.code ?? "Abrangência regional"} · {readableStatus(item.status)}</small></span>
                <StatusBadge tone={level.tone}>{level.label}</StatusBadge>
              </button>;
            }) : !loading ? <EmptyState title="Nenhuma situação classificada" description={demo ? "Os alertas dependem de dados institucionais autorizados." : "Não há itens críticos ou vencidos nos dados disponíveis."} /> : <Skeleton className="regional-list-skeleton" />}
          </div>
        </section>

        <section className="regional-section priority-panel" aria-label="Ações Prioritárias">
          <SectionHeader title="Ações Prioritárias" description="Fila objetiva para orientar a atuação imediata." />
          <div className="priority-summary">
            {!loading && !demo ? <>
              <div><strong>{summary.overdue.length}</strong><span>itens vencidos</span></div>
              <div><strong>{summary.critical.length}</strong><span>prioridade crítica</span></div>
              <div><strong>{summary.open.length}</strong><span>itens em aberto</span></div>
            </> : <EmptyState title="Prioridades sem dados disponíveis" description="A fila será exibida quando houver dados institucionais autorizados." />}
          </div>
        </section>
      </div>

      <section className="regional-section" aria-label="Caminhos Estratégicos">
        <SectionHeader title="Caminhos Estratégicos" description="Aprofunde a leitura regional sem perder o contexto executivo." />
        <div className="regional-strategic-grid">
          <StrategicCard eyebrow="Integração" title="Matriz de Integração 360" description="Acompanhamento transversal entre escolas, setores e hubs." footer={<button onClick={() => go("/radar360/matriz")}>Acessar matriz <span aria-hidden="true">→</span></button>} />
          <StrategicCard eyebrow="Estratégia" title="Planejamento Estratégico 360" description="Metas, objetivos, iniciativas, indicadores e responsabilidades em uma futura visão integrada."><StatusBadge>Estrutura em preparação</StatusBadge></StrategicCard>
          <StrategicCard eyebrow="Execução" title="Planejamento 360" description="Roadmap, marcos, ações críticas, prazos, riscos e dependências."><StatusBadge>Estrutura em preparação</StatusBadge></StrategicCard>
          <StrategicCard eyebrow="Inteligência" title="Dados Consolidados" description="Bases integradas, séries históricas, comparações e tendências."><StatusBadge tone="info">Fontes em integração</StatusBadge></StrategicCard>
          <StrategicCard eyebrow="Território" title="Mapa Regional 360" description="Visão territorial condicionada à disponibilidade de geodados validados."><StatusBadge>Geodados indisponíveis</StatusBadge></StrategicCard>
          <StrategicCard eyebrow="Unidade escolar" title="Escola 360" description="Panorama institucional e histórico integrado de cada escola." footer={<button onClick={() => go("/radar360/escolas")}>Ver escolas <span aria-hidden="true">→</span></button>} />
        </div>
      </section>

      <section className="regional-section regional-activity" aria-label="Atividade Institucional">
        <SectionHeader title="Atividade Institucional" description="Memória recente dos movimentos registrados no ambiente." />
        <div>
          {!loading && !demo && data.history.length ? <ActivityFeed>{data.history.map((entry) => <li key={entry.id}><strong>{entry.institutional_items?.title ?? "Item institucional"}</strong><span>{readableStatus(entry.event_type)} · {new Date(entry.created_at).toLocaleDateString("pt-BR")}</span></li>)}</ActivityFeed> : !loading ? <EmptyState title="Nenhuma atividade disponível" description="Visitas, evidências e atualizações aparecerão aqui quando registradas." /> : <Skeleton className="regional-list-skeleton" />}
        </div>
      </section>

      <footer className="regional-provenance">
        <span><strong>Fonte</strong>{demo ? "Ambiente demonstrativo" : "Supabase · dados autorizados"}</span>
        <span><strong>Escopo</strong>{user.institutionalProfileName ?? user.role}</span>
        <span><strong>Atualização</strong>{demo ? "Sem consulta institucional" : "Consulta realizada nesta sessão"}</span>
      </footer>
    </div>
  );
}
