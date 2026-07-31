create type public.institutional_content_type as enum ('COMUNICADO', 'ORIENTACAO', 'DOCUMENTO', 'LINK', 'AVISO');

create table public.institutional_contents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  sector_id uuid references public.sectors(id) on delete restrict,
  title text not null,
  content text,
  content_type public.institutional_content_type not null,
  external_url text,
  visibility public.access_visibility not null default 'GESTAO',
  published_at timestamptz,
  created_by uuid not null references auth.users(id) on delete restrict,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint institutional_content_body_check check (
    content is not null or external_url is not null
  )
);

create index institutional_contents_scope_idx
  on public.institutional_contents(organization_id, sector_id, content_type, published_at desc);

create trigger institutional_contents_updated_at
before update on public.institutional_contents
for each row execute function public.set_updated_at();

alter table public.institutional_contents enable row level security;
revoke all on public.institutional_contents from anon, authenticated;
grant select, insert, update on public.institutional_contents to authenticated;

create policy institutional_contents_read on public.institutional_contents for select to authenticated
using (
  organization_id = public.current_organization_id()
  and active
  and (
    public.current_app_role() = 'ADMIN'
    or (
      public.current_app_role() = 'GESTAO'
      and (sector_id = public.current_sector_id() or visibility in ('PUBLICO', 'GESTAO'))
    )
    or (
      public.current_app_role() = 'ESCOLA'
      and visibility in ('PUBLICO', 'ESCOLAS')
    )
  )
);

create policy institutional_contents_insert on public.institutional_contents for insert to authenticated
with check (
  organization_id = public.current_organization_id()
  and created_by = auth.uid()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and sector_id = public.current_sector_id())
  )
);

create policy institutional_contents_update on public.institutional_contents for update to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and sector_id = public.current_sector_id())
  )
)
with check (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and sector_id = public.current_sector_id())
  )
);
