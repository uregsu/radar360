create type public.school_experience_attention_level as enum (
  'FAVORAVEL', 'REGULAR', 'ATENCAO', 'ELEVADA', 'PRIORIDADE'
);

create table public.school_experience_metrics (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  school_id uuid not null references public.schools(id) on delete restrict,
  reference_period text not null check (reference_period ~ '^[0-9]{4}(-[1-4])?$'),
  class_quality numeric(7,4) not null check (class_quality between 0 and 10),
  school_climate numeric(7,4) not null check (school_climate between 0 and 10),
  spaces_and_bathrooms numeric(7,4) not null check (spaces_and_bathrooms between 0 and 10),
  learning_support numeric(7,4) not null check (learning_support between 0 and 10),
  engagement_life_project numeric(7,4) not null check (engagement_life_project between 0 and 10),
  overall_satisfaction numeric(7,4) not null check (overall_satisfaction between 0 and 10),
  average_score numeric(7,4) not null check (average_score between 0 and 10),
  attention_score numeric(7,4) not null check (attention_score between 0 and 100),
  base_attention_level public.school_experience_attention_level not null,
  attention_level public.school_experience_attention_level not null,
  critical_dimension text not null,
  critical_dimension_score numeric(7,4) not null check (critical_dimension_score between 0 and 10),
  best_dimension text not null,
  best_dimension_score numeric(7,4) not null check (best_dimension_score between 0 and 10),
  trigger_count smallint not null check (trigger_count between 0 and 6),
  below_3_count smallint not null check (below_3_count between 0 and 6),
  below_4_count smallint not null check (below_4_count between 0 and 6),
  below_5_count smallint not null check (below_5_count between 0 and 6),
  below_6_count smallint not null check (below_6_count between 0 and 6),
  attention_reasons jsonb not null default '[]'::jsonb check (jsonb_typeof(attention_reasons) = 'array'),
  source text not null check (length(trim(source)) > 0),
  imported_by uuid not null references auth.users(id) on delete restrict,
  updated_by uuid references auth.users(id) on delete set null,
  imported_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, reference_period, source),
  constraint school_experience_dimension_names check (
    critical_dimension in ('class_quality','school_climate','spaces_and_bathrooms','learning_support','engagement_life_project','overall_satisfaction')
    and best_dimension in ('class_quality','school_climate','spaces_and_bathrooms','learning_support','engagement_life_project','overall_satisfaction')
  )
);

create function public.validate_school_experience_metrics()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  dimension_keys constant text[] := array[
    'class_quality','school_climate','spaces_and_bathrooms',
    'learning_support','engagement_life_project','overall_satisfaction'
  ];
  dimension_scores numeric[];
  calculated_average numeric(7,4);
  calculated_attention numeric(7,4);
  calculated_base public.school_experience_attention_level;
  calculated_level public.school_experience_attention_level;
  calculated_critical text;
  calculated_critical_score numeric(7,4);
  calculated_best text;
  calculated_best_score numeric(7,4);
  calculated_best_positions integer[];
  calculated_below_3 smallint;
  calculated_below_4 smallint;
  calculated_below_5 smallint;
  calculated_below_6 smallint;
begin
  dimension_scores := array[
    new.class_quality,new.school_climate,new.spaces_and_bathrooms,
    new.learning_support,new.engagement_life_project,new.overall_satisfaction
  ];
  calculated_average := round((
    new.class_quality + new.school_climate + new.spaces_and_bathrooms +
    new.learning_support + new.engagement_life_project + new.overall_satisfaction
  ) / 6, 4);
  calculated_attention := round(greatest(0, least(100, (10 - calculated_average) * 10)), 4);
  select min(score), max(score)
  into calculated_critical_score, calculated_best_score
  from unnest(dimension_scores) score;
  calculated_critical := dimension_keys[array_position(dimension_scores, calculated_critical_score)];
  calculated_best_positions := array_positions(dimension_scores, calculated_best_score);
  calculated_best := dimension_keys[calculated_best_positions[array_length(calculated_best_positions, 1)]];
  calculated_below_3 := (
    select count(*)::smallint from unnest(dimension_scores) score where score < 3
  );
  calculated_below_4 := (
    select count(*)::smallint from unnest(dimension_scores) score where score < 4
  );
  calculated_below_5 := (
    select count(*)::smallint from unnest(dimension_scores) score where score < 5
  );
  calculated_below_6 := (
    select count(*)::smallint from unnest(dimension_scores) score where score < 6
  );
  calculated_base := case
    when calculated_attention < 20 then 'FAVORAVEL'
    when calculated_attention < 35 then 'REGULAR'
    when calculated_attention < 50 then 'ATENCAO'
    when calculated_attention < 65 then 'ELEVADA'
    else 'PRIORIDADE'
  end;
  calculated_level := case
    when calculated_below_3 > 0 then 'PRIORIDADE'
    when calculated_below_4 > 0 or calculated_below_5 >= 2 then
      case when calculated_base = 'PRIORIDADE' then 'PRIORIDADE' else 'ELEVADA' end
    when calculated_below_6 >= 3 then 'PRIORIDADE'
    else calculated_base
  end;

  if new.average_score is not null and abs(new.average_score - calculated_average) > 0.001 then
    raise exception 'average_score diverge das seis dimensões';
  end if;
  if new.attention_score is not null and abs(new.attention_score - calculated_attention) > 0.001 then
    raise exception 'attention_score diverge da média calculada';
  end if;
  if new.critical_dimension is not null and new.critical_dimension <> calculated_critical then
    raise exception 'critical_dimension diverge da menor dimensão';
  end if;
  if new.critical_dimension_score is not null and abs(new.critical_dimension_score - calculated_critical_score) > 0.0001 then
    raise exception 'critical_dimension_score diverge da menor dimensão';
  end if;
  if new.best_dimension is not null and new.best_dimension <> calculated_best then
    raise exception 'best_dimension diverge da maior dimensão';
  end if;
  if new.best_dimension_score is not null and abs(new.best_dimension_score - calculated_best_score) > 0.0001 then
    raise exception 'best_dimension_score diverge da maior dimensão';
  end if;
  if new.below_3_count is not null and new.below_3_count <> calculated_below_3 then
    raise exception 'below_3_count diverge das dimensões';
  end if;
  if new.below_4_count is not null and new.below_4_count <> calculated_below_4 then
    raise exception 'below_4_count diverge das dimensões';
  end if;
  if new.below_5_count is not null and new.below_5_count <> calculated_below_5 then
    raise exception 'below_5_count diverge das dimensões';
  end if;
  if new.below_6_count is not null and new.below_6_count <> calculated_below_6 then
    raise exception 'below_6_count diverge das dimensões';
  end if;
  if new.trigger_count is not null and new.trigger_count <> calculated_below_6 then
    raise exception 'trigger_count diverge dos motivos de atenção';
  end if;
  if new.base_attention_level is not null and new.base_attention_level <> calculated_base then
    raise exception 'base_attention_level diverge do índice matemático';
  end if;
  if new.attention_level is not null and new.attention_level <> calculated_level then
    raise exception 'attention_level diverge dos gatilhos';
  end if;
  if tg_op = 'UPDATE' and new.imported_by is distinct from old.imported_by then
    raise exception 'imported_by representa a importação original e não pode ser alterado';
  end if;
  if tg_op = 'UPDATE' and new.imported_at is distinct from old.imported_at then
    raise exception 'imported_at representa a importação original e não pode ser alterado';
  end if;

  new.average_score := calculated_average;
  new.attention_score := calculated_attention;
  new.base_attention_level := calculated_base;
  new.attention_level := calculated_level;
  new.critical_dimension := calculated_critical;
  new.critical_dimension_score := calculated_critical_score;
  new.best_dimension := calculated_best;
  new.best_dimension_score := calculated_best_score;
  new.trigger_count := calculated_below_6;
  new.below_3_count := calculated_below_3;
  new.below_4_count := calculated_below_4;
  new.below_5_count := calculated_below_5;
  new.below_6_count := calculated_below_6;
  if tg_op = 'UPDATE' then new.updated_by := auth.uid(); end if;
  return new;
end;
$$;

revoke all on function public.validate_school_experience_metrics() from public;

create trigger school_experience_metrics_validate
before insert or update on public.school_experience_metrics
for each row execute function public.validate_school_experience_metrics();

create index school_experience_period_idx on public.school_experience_metrics(organization_id, reference_period);
create index school_experience_priority_idx on public.school_experience_metrics(organization_id, reference_period, attention_level, attention_score desc);
create index school_experience_school_idx on public.school_experience_metrics(school_id, reference_period desc);

create trigger school_experience_metrics_updated_at before update on public.school_experience_metrics
for each row execute function public.set_updated_at();

alter table public.school_experience_metrics enable row level security;
revoke all on public.school_experience_metrics from anon, authenticated;
grant select, insert, update on public.school_experience_metrics to authenticated;

create policy school_experience_read on public.school_experience_metrics for select to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() in ('ADMIN', 'GESTAO')
    or (public.current_app_role() = 'ESCOLA' and school_id = public.current_school_id())
  )
);

create policy school_experience_admin_insert on public.school_experience_metrics for insert to authenticated
with check (
  organization_id = public.current_organization_id()
  and public.current_app_role() = 'ADMIN'
  and imported_by = auth.uid()
  and updated_by is null
  and exists (
    select 1 from public.schools school
    where school.id = school_id and school.organization_id = public.current_organization_id() and school.active
  )
);

create policy school_experience_admin_update on public.school_experience_metrics for update to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
with check (
  organization_id = public.current_organization_id()
  and public.current_app_role() = 'ADMIN'
  and updated_by = auth.uid()
  and exists (
    select 1 from public.schools school
    where school.id = school_id and school.organization_id = public.current_organization_id() and school.active
  )
);

comment on table public.school_experience_metrics is
  'Métricas preservadas por escola e período para o Índice de Atenção à Experiência Escolar; instrumento de priorização, não avaliação definitiva da qualidade escolar.';
