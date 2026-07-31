create extension if not exists pgcrypto;

create type public.app_role as enum ('ADMIN', 'GESTAO', 'ESCOLA', 'VISITANTE');
create type public.institutional_profile_type as enum ('REGIONAL', 'SECTOR', 'SCHOOL', 'DEMO');
create type public.institutional_record_type as enum ('DEMANDA', 'ACAO', 'ACOMPANHAMENTO', 'PROJETO', 'PENDENCIA', 'OCORRENCIA');
create type public.institutional_item_status as enum ('NOVA', 'EM_ANALISE', 'EM_ANDAMENTO', 'AGUARDANDO_ESCOLA', 'AGUARDANDO_SETOR', 'AGUARDANDO_ORGAO_CENTRAL', 'CONCLUIDA', 'SUSPENSA', 'CANCELADA');
create type public.item_priority as enum ('BAIXA', 'NORMAL', 'ALTA', 'CRITICA');
create type public.access_visibility as enum ('PUBLICO', 'ESCOLAS', 'GESTAO', 'RESTRITO_SETOR', 'RESTRITO_REGIONAL');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sectors (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  code text not null,
  slug text not null,
  name text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, code),
  unique (organization_id, slug)
);

create table public.schools (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  internal_code text not null,
  slug text not null,
  name text not null,
  pei boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, internal_code),
  unique (organization_id, slug)
);

create table public.institutional_profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  profile_type public.institutional_profile_type not null,
  name text not null,
  short_name text not null,
  sector_id uuid references public.sectors(id) on delete restrict,
  school_id uuid references public.schools(id) on delete restrict,
  default_role public.app_role not null,
  scope text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, scope),
  constraint institutional_profile_scope_check check (
    (profile_type = 'REGIONAL' and sector_id is null and school_id is null and default_role = 'ADMIN') or
    (profile_type = 'SECTOR' and sector_id is not null and school_id is null and default_role = 'GESTAO') or
    (profile_type = 'SCHOOL' and school_id is not null and sector_id is null and default_role = 'ESCOLA') or
    (profile_type = 'DEMO' and sector_id is null and school_id is null and default_role = 'VISITANTE')
  )
);

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role public.app_role not null,
  institutional_profile_id uuid not null references public.institutional_profiles(id) on delete restrict,
  sector_id uuid references public.sectors(id) on delete restrict,
  school_id uuid references public.schools(id) on delete restrict,
  job_title text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz,
  constraint profile_context_check check (
    (role = 'ADMIN' and sector_id is null and school_id is null) or
    (role = 'GESTAO' and sector_id is not null and school_id is null) or
    (role = 'ESCOLA' and school_id is not null and sector_id is null) or
    (role = 'VISITANTE' and sector_id is null and school_id is null)
  )
);

create table public.demand_categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  sector_id uuid not null references public.sectors(id) on delete restrict,
  name text not null,
  slug text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (sector_id, slug)
);

create table public.institutional_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  sector_id uuid not null references public.sectors(id) on delete restrict,
  school_id uuid references public.schools(id) on delete restrict,
  category_id uuid not null references public.demand_categories(id) on delete restrict,
  record_type public.institutional_record_type not null,
  title text not null,
  description text,
  status public.institutional_item_status not null default 'NOVA',
  priority public.item_priority not null default 'NORMAL',
  responsible_user_id uuid references auth.users(id) on delete set null,
  created_by uuid not null references auth.users(id) on delete restrict,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  due_date date,
  closed_at timestamptz,
  visibility public.access_visibility not null default 'GESTAO',
  source text,
  external_reference text,
  active boolean not null default true
);

create table public.institutional_item_history (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  item_id uuid not null references public.institutional_items(id) on delete cascade,
  event_type text not null,
  previous_value jsonb,
  new_value jsonb,
  performed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.institutional_item_comments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  item_id uuid not null references public.institutional_items(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete restrict,
  content text not null check (length(trim(content)) > 0),
  visibility public.access_visibility not null default 'GESTAO',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.evidences (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  item_id uuid references public.institutional_items(id) on delete cascade,
  sector_id uuid not null references public.sectors(id) on delete restrict,
  school_id uuid references public.schools(id) on delete restrict,
  title text not null,
  description text,
  evidence_type text not null,
  storage_path text,
  external_url text,
  visibility public.access_visibility not null default 'GESTAO',
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  constraint evidence_content_check check (
    description is not null or storage_path is not null or external_url is not null
  )
);

create table public.hubs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  sector_id uuid references public.sectors(id) on delete restrict,
  name text not null,
  url text,
  integration_status text not null default 'SEM_FONTE_INTEGRADA',
  integration_type text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.integration_agreements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  sector_id uuid not null references public.sectors(id) on delete restrict,
  hub_id uuid references public.hubs(id) on delete set null,
  responsible_area text not null,
  status text not null,
  integration_type text not null,
  data_sources jsonb not null default '[]'::jsonb,
  update_frequency text,
  indicators jsonb not null default '[]'::jsonb,
  shared_information jsonb not null default '[]'::jsonb,
  restricted_information jsonb not null default '[]'::jsonb,
  responsibilities jsonb not null default '[]'::jsonb,
  last_review date,
  next_review date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.data_sources (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  sector_id uuid references public.sectors(id) on delete restrict,
  name text not null,
  source_type text not null,
  status text not null default 'SEM_FONTE_INTEGRADA',
  responsible_area text,
  update_frequency text,
  last_updated_at timestamptz,
  access_level public.access_visibility not null default 'RESTRITO_SETOR',
  metadata jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete restrict,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index sectors_organization_idx on public.sectors(organization_id);
create index schools_organization_idx on public.schools(organization_id);
create index profiles_user_idx on public.profiles(user_id);
create index profiles_context_idx on public.profiles(organization_id, role, sector_id, school_id);
create index categories_sector_idx on public.demand_categories(sector_id);
create index items_org_sector_idx on public.institutional_items(organization_id, sector_id);
create index items_school_idx on public.institutional_items(school_id) where school_id is not null;
create index items_status_priority_idx on public.institutional_items(status, priority);
create index items_due_date_idx on public.institutional_items(due_date) where due_date is not null;
create index history_item_idx on public.institutional_item_history(item_id, created_at desc);
create index comments_item_idx on public.institutional_item_comments(item_id, created_at);
create index evidences_item_idx on public.evidences(item_id);
create index audit_org_created_idx on public.audit_logs(organization_id, created_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_updated_at before update on public.organizations for each row execute function public.set_updated_at();
create trigger sectors_updated_at before update on public.sectors for each row execute function public.set_updated_at();
create trigger schools_updated_at before update on public.schools for each row execute function public.set_updated_at();
create trigger institutional_profiles_updated_at before update on public.institutional_profiles for each row execute function public.set_updated_at();
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger demand_categories_updated_at before update on public.demand_categories for each row execute function public.set_updated_at();
create trigger institutional_items_updated_at before update on public.institutional_items for each row execute function public.set_updated_at();
create trigger institutional_item_comments_updated_at before update on public.institutional_item_comments for each row execute function public.set_updated_at();
create trigger hubs_updated_at before update on public.hubs for each row execute function public.set_updated_at();
create trigger integration_agreements_updated_at before update on public.integration_agreements for each row execute function public.set_updated_at();
create trigger data_sources_updated_at before update on public.data_sources for each row execute function public.set_updated_at();

create function public.record_institutional_item_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  event_name text;
begin
  if tg_op = 'INSERT' then
    insert into public.institutional_item_history
      (organization_id, item_id, event_type, new_value, performed_by)
    values
      (new.organization_id, new.id, 'CRIACAO', to_jsonb(new), new.created_by);
    return new;
  end if;

  if old.status is distinct from new.status then
    event_name := case
      when new.status = 'CONCLUIDA' then 'CONCLUSAO'
      when old.status = 'CONCLUIDA' then 'REABERTURA'
      else 'MUDANCA_STATUS'
    end;
    insert into public.institutional_item_history
      (organization_id, item_id, event_type, previous_value, new_value, performed_by)
    values
      (new.organization_id, new.id, event_name, to_jsonb(old.status), to_jsonb(new.status), new.updated_by);
  end if;

  if old.responsible_user_id is distinct from new.responsible_user_id then
    insert into public.institutional_item_history
      (organization_id, item_id, event_type, previous_value, new_value, performed_by)
    values
      (new.organization_id, new.id, 'MUDANCA_RESPONSAVEL', to_jsonb(old.responsible_user_id), to_jsonb(new.responsible_user_id), new.updated_by);
  end if;

  if old.due_date is distinct from new.due_date then
    insert into public.institutional_item_history
      (organization_id, item_id, event_type, previous_value, new_value, performed_by)
    values
      (new.organization_id, new.id, 'MUDANCA_PRAZO', to_jsonb(old.due_date), to_jsonb(new.due_date), new.updated_by);
  end if;

  if old.priority is distinct from new.priority then
    insert into public.institutional_item_history
      (organization_id, item_id, event_type, previous_value, new_value, performed_by)
    values
      (new.organization_id, new.id, 'MUDANCA_PRIORIDADE', to_jsonb(old.priority), to_jsonb(new.priority), new.updated_by);
  end if;
  return new;
end;
$$;

create trigger institutional_items_history
after insert or update on public.institutional_items
for each row execute function public.record_institutional_item_history();
