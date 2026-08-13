create type public.school_quality_value_unit as enum ('NUMBER', 'PERCENT');

create table public.school_quality_indicators (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  school_id uuid not null references public.schools(id) on delete restrict,
  external_school_code text,
  indicator_key text not null check (length(trim(indicator_key)) > 0),
  indicator_name text not null check (length(trim(indicator_name)) > 0),
  dimension text,
  value numeric(12,4) not null,
  value_unit public.school_quality_value_unit not null default 'NUMBER',
  scale_min numeric(12,4),
  scale_max numeric(12,4),
  classification text,
  regional_value numeric(12,4),
  reference_period text not null check (length(trim(reference_period)) > 0),
  source text not null default 'Escola Total – Qualidade Educacional' check (length(trim(source)) > 0),
  source_updated_at timestamptz,
  is_primary boolean not null default false,
  imported_by uuid references auth.users(id) on delete restrict,
  imported_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, indicator_key, reference_period, source),
  constraint school_quality_scale_valid check (
    (scale_min is null and scale_max is null)
    or (scale_min is not null and scale_max is not null and scale_min < scale_max and value between scale_min and scale_max)
  )
);

create index school_quality_school_period_idx on public.school_quality_indicators(school_id, reference_period desc);
create index school_quality_org_period_idx on public.school_quality_indicators(organization_id, reference_period, indicator_key);

create trigger school_quality_indicators_updated_at before update on public.school_quality_indicators
for each row execute function public.set_updated_at();

alter table public.school_quality_indicators enable row level security;
revoke all on public.school_quality_indicators from anon, authenticated;
grant select, insert, update on public.school_quality_indicators to authenticated;

create policy school_quality_read on public.school_quality_indicators for select to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() in ('ADMIN', 'GESTAO')
    or (public.current_app_role() = 'ESCOLA' and school_id = public.current_school_id())
  )
);

create policy school_quality_admin_insert on public.school_quality_indicators for insert to authenticated
with check (
  organization_id = public.current_organization_id()
  and public.current_app_role() = 'ADMIN'
  and imported_by = auth.uid()
  and exists (
    select 1 from public.schools school
    where school.id = school_id and school.organization_id = public.current_organization_id() and school.active
  )
);

create policy school_quality_admin_update on public.school_quality_indicators for update to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
with check (
  organization_id = public.current_organization_id()
  and public.current_app_role() = 'ADMIN'
  and imported_by = auth.uid()
);

comment on table public.school_quality_indicators is
  'Indicadores oficiais de Qualidade da Aula provenientes do Escola Total – Qualidade Educacional; fonte independente da pesquisa Experiência Escolar.';
