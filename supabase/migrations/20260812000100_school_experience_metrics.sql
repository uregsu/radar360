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
  trigger_count smallint not null default 0 check (trigger_count between 0 and 6),
  below_3_count smallint not null default 0 check (below_3_count between 0 and 6),
  below_4_count smallint not null default 0 check (below_4_count between 0 and 6),
  below_5_count smallint not null default 0 check (below_5_count between 0 and 6),
  below_6_count smallint not null default 0 check (below_6_count between 0 and 6),
  attention_reasons jsonb not null default '[]'::jsonb check (jsonb_typeof(attention_reasons) = 'array'),
  source text not null check (length(trim(source)) > 0),
  imported_by uuid not null references auth.users(id) on delete restrict,
  imported_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, reference_period, source),
  constraint school_experience_dimension_names check (
    critical_dimension in ('class_quality','school_climate','spaces_and_bathrooms','learning_support','engagement_life_project','overall_satisfaction')
    and best_dimension in ('class_quality','school_climate','spaces_and_bathrooms','learning_support','engagement_life_project','overall_satisfaction')
  )
);

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
  and imported_by = auth.uid()
  and exists (
    select 1 from public.schools school
    where school.id = school_id and school.organization_id = public.current_organization_id() and school.active
  )
);

comment on table public.school_experience_metrics is
  'Métricas preservadas por escola e período para o Índice de Atenção à Experiência Escolar; instrumento de priorização, não avaliação definitiva da qualidade escolar.';
