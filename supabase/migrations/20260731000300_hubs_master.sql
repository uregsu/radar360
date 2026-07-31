alter table public.hubs add column if not exists external_url text;
alter table public.hubs add column if not exists status text not null default 'ATIVO';
alter table public.hubs add column if not exists description text;

update public.hubs
set external_url = coalesce(external_url, url),
    integration_type = 'LINK_EXTERNO',
    integration_status = 'ATIVO',
    status = 'ATIVO'
where sector_id in (select id from public.sectors where code in ('SETEC', 'SEOM', 'ESE'));

create unique index if not exists hubs_organization_sector_unique
  on public.hubs(organization_id, sector_id)
  where sector_id is not null;

insert into public.hubs (
  organization_id, sector_id, name, url, external_url, description,
  integration_status, integration_type, status, active
)
select s.organization_id, s.id, v.name, v.external_url, v.external_url, v.description,
       'ATIVO', 'LINK_EXTERNO', 'ATIVO', true
from public.sectors s
join (values
  ('SETEC', 'SETEC Hub', 'https://setec-hub.vercel.app/login', 'Acessar plataforma operacional do SETEC'),
  ('SEOM', 'SGE / SEOM Hub', 'https://sge-gsu.vercel.app/', 'Acessar plataforma de gestão do SEOM'),
  ('ESE', 'ESE Hub GSU', 'https://ese-hub-gsu.vercel.app/login?redirectTo=%2F', 'Acessar plataforma da Equipe de Supervisão de Ensino')
) as v(code, name, external_url, description) on v.code = s.code
on conflict (organization_id, sector_id) where sector_id is not null do update set
  name = excluded.name,
  url = excluded.url,
  external_url = excluded.external_url,
  description = excluded.description,
  integration_status = 'ATIVO',
  integration_type = 'LINK_EXTERNO',
  status = 'ATIVO',
  active = true,
  updated_at = now();

drop policy if exists hubs_read on public.hubs;
create policy hubs_read on public.hubs for select to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and sector_id = public.current_sector_id())
  )
);
