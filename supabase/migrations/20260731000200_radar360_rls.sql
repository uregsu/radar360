create function public.current_profile_id()
returns uuid language sql stable security definer set search_path = public
as $$ select id from public.profiles where user_id = auth.uid() and active limit 1 $$;

create function public.current_organization_id()
returns uuid language sql stable security definer set search_path = public
as $$ select organization_id from public.profiles where user_id = auth.uid() and active limit 1 $$;

create function public.current_app_role()
returns public.app_role language sql stable security definer set search_path = public
as $$ select role from public.profiles where user_id = auth.uid() and active limit 1 $$;

create function public.current_sector_id()
returns uuid language sql stable security definer set search_path = public
as $$ select sector_id from public.profiles where user_id = auth.uid() and active limit 1 $$;

create function public.current_school_id()
returns uuid language sql stable security definer set search_path = public
as $$ select school_id from public.profiles where user_id = auth.uid() and active limit 1 $$;

revoke all on function public.current_profile_id() from public;
revoke all on function public.current_organization_id() from public;
revoke all on function public.current_app_role() from public;
revoke all on function public.current_sector_id() from public;
revoke all on function public.current_school_id() from public;
grant execute on function public.current_profile_id() to authenticated;
grant execute on function public.current_organization_id() to authenticated;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.current_sector_id() to authenticated;
grant execute on function public.current_school_id() to authenticated;

alter table public.organizations enable row level security;
alter table public.sectors enable row level security;
alter table public.schools enable row level security;
alter table public.institutional_profiles enable row level security;
alter table public.profiles enable row level security;
alter table public.demand_categories enable row level security;
alter table public.institutional_items enable row level security;
alter table public.institutional_item_history enable row level security;
alter table public.institutional_item_comments enable row level security;
alter table public.evidences enable row level security;
alter table public.hubs enable row level security;
alter table public.integration_agreements enable row level security;
alter table public.data_sources enable row level security;
alter table public.audit_logs enable row level security;

revoke all on all tables in schema public from anon;
revoke all on all tables in schema public from authenticated;
grant usage on schema public to authenticated;
grant select on public.organizations, public.sectors, public.schools, public.institutional_profiles,
  public.demand_categories, public.hubs, public.integration_agreements, public.data_sources to authenticated;
grant select on public.profiles, public.institutional_items, public.institutional_item_history,
  public.institutional_item_comments, public.evidences, public.audit_logs to authenticated;
grant insert, update on public.institutional_items, public.institutional_item_comments, public.evidences to authenticated;
grant insert, update on public.profiles to authenticated;
grant insert, update, delete on public.institutional_profiles, public.demand_categories,
  public.hubs, public.integration_agreements, public.data_sources to authenticated;

create policy organizations_read on public.organizations for select to authenticated
using (id = public.current_organization_id());

create policy sectors_read on public.sectors for select to authenticated
using (organization_id = public.current_organization_id());

create policy schools_read on public.schools for select to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() in ('ADMIN', 'GESTAO')
    or (public.current_app_role() = 'ESCOLA' and id = public.current_school_id())
  )
);

create policy institutional_profiles_read on public.institutional_profiles for select to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() <> 'VISITANTE');
create policy institutional_profiles_admin_write on public.institutional_profiles for all to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
with check (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN');

create policy profiles_read on public.profiles for select to authenticated
using (
  user_id = auth.uid()
  or (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
);
create policy profiles_admin_write on public.profiles for all to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
with check (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN');

create policy categories_read on public.demand_categories for select to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and sector_id = public.current_sector_id())
    or public.current_app_role() = 'ESCOLA'
  )
);
create policy categories_admin_write on public.demand_categories for all to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
with check (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN');

create policy items_read on public.institutional_items for select to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() = 'ADMIN'
    or (
      public.current_app_role() = 'GESTAO'
      and (
        sector_id = public.current_sector_id()
        or visibility in ('PUBLICO', 'GESTAO', 'ESCOLAS')
      )
    )
    or (
      public.current_app_role() = 'ESCOLA'
      and school_id = public.current_school_id()
      and visibility in ('PUBLICO', 'ESCOLAS')
    )
  )
);
create policy items_insert on public.institutional_items for insert to authenticated
with check (
  organization_id = public.current_organization_id()
  and created_by = auth.uid()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and sector_id = public.current_sector_id())
  )
);
create policy items_update on public.institutional_items for update to authenticated
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

create policy history_read on public.institutional_item_history for select to authenticated
using (exists (select 1 from public.institutional_items item where item.id = item_id));

create policy comments_read on public.institutional_item_comments for select to authenticated
using (
  exists (select 1 from public.institutional_items item where item.id = item_id)
  and (
    public.current_app_role() in ('ADMIN', 'GESTAO')
    or visibility in ('PUBLICO', 'ESCOLAS')
  )
);
create policy comments_insert on public.institutional_item_comments for insert to authenticated
with check (
  organization_id = public.current_organization_id()
  and author_id = auth.uid()
  and exists (select 1 from public.institutional_items item where item.id = item_id)
);
create policy comments_update on public.institutional_item_comments for update to authenticated
using (author_id = auth.uid() or public.current_app_role() = 'ADMIN')
with check (organization_id = public.current_organization_id());

create policy evidences_read on public.evidences for select to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() = 'ADMIN'
    or (
      public.current_app_role() = 'GESTAO'
      and (sector_id = public.current_sector_id() or visibility in ('PUBLICO', 'GESTAO', 'ESCOLAS'))
    )
    or (
      public.current_app_role() = 'ESCOLA'
      and school_id = public.current_school_id()
      and visibility in ('PUBLICO', 'ESCOLAS')
    )
  )
);
create policy evidences_insert on public.evidences for insert to authenticated
with check (
  organization_id = public.current_organization_id()
  and created_by = auth.uid()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and sector_id = public.current_sector_id())
  )
);
create policy evidences_update on public.evidences for update to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and sector_id = public.current_sector_id())
  )
)
with check (organization_id = public.current_organization_id());

create policy hubs_read on public.hubs for select to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() <> 'VISITANTE');
create policy hubs_admin_write on public.hubs for all to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
with check (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN');

create policy agreements_read on public.integration_agreements for select to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() in ('ADMIN', 'GESTAO'));
create policy agreements_admin_write on public.integration_agreements for all to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
with check (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN');

create policy data_sources_read on public.data_sources for select to authenticated
using (
  organization_id = public.current_organization_id()
  and (
    public.current_app_role() = 'ADMIN'
    or (public.current_app_role() = 'GESTAO' and (sector_id = public.current_sector_id() or access_level in ('PUBLICO', 'GESTAO')))
  )
);
create policy data_sources_admin_write on public.data_sources for all to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN')
with check (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN');

create policy audit_admin_read on public.audit_logs for select to authenticated
using (organization_id = public.current_organization_id() and public.current_app_role() = 'ADMIN');
