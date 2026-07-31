import type { SupabaseClient } from "@supabase/supabase-js";

export type RadarItem = {
  id:string; organization_id:string; sector_id:string; school_id:string|null; category_id:string;
  record_type:string; title:string; description:string|null; status:string; priority:string;
  responsible_user_id:string|null; created_by:string; updated_by:string|null; created_at:string;
  updated_at:string; due_date:string|null; visibility:string; source:string|null; active:boolean;
  sectors?:{code?:string;name?:string}|null; schools?:{name?:string;slug?:string;pei?:boolean}|null;
  demand_categories?:{name?:string}|null;
};

const itemSelect = "id,organization_id,sector_id,school_id,category_id,record_type,title,description,status,priority,responsible_user_id,created_by,updated_by,created_at,updated_at,due_date,visibility,source,active,sectors(code,name),schools(name,slug,pei),demand_categories(name)";

export async function queryItems(supabase:SupabaseClient, filters:{recordType?:string;sectorId?:string;schoolId?:string;limit?:number}={}) {
  let query=supabase.from("institutional_items").select(itemSelect).eq("active",true).order("updated_at",{ascending:false}).limit(filters.limit??200);
  if(filters.recordType)query=query.eq("record_type",filters.recordType);
  if(filters.sectorId)query=query.eq("sector_id",filters.sectorId);
  if(filters.schoolId)query=query.eq("school_id",filters.schoolId);
  const {data,error}=await query;
  return {data:(data??[]) as unknown as RadarItem[],error};
}

export async function queryDashboard(supabase:SupabaseClient) {
  const [{data:items,error},{count:schools},{count:sectors},{count:evidences},{data:history},{data:hubs}]=await Promise.all([
    queryItems(supabase,{limit:500}),
    supabase.from("schools").select("id",{count:"exact",head:true}),
    supabase.from("sectors").select("id",{count:"exact",head:true}),
    supabase.from("evidences").select("id",{count:"exact",head:true}),
    supabase.from("institutional_item_history").select("id,item_id,event_type,created_at").order("created_at",{ascending:false}).limit(8),
    supabase.from("hubs").select("id,sector_id,status").eq("active",true),
  ]);
  return {items,schools:schools??0,sectors:sectors??0,evidences:evidences??0,history:history??[],hubs:hubs??[],error};
}

export async function queryEvidences(supabase:SupabaseClient) {
  const {data,error}=await supabase.from("evidences").select("id,item_id,sector_id,school_id,title,description,evidence_type,external_url,visibility,created_by,created_at,sectors(code,name),schools(name),institutional_items(title)").order("created_at",{ascending:false}).limit(200);
  return {data:data??[],error};
}

export async function queryIntegrationMatrix(supabase:SupabaseClient) {
  const [{data:sectors},{data:hubs},{data:agreements},{data:sources}]=await Promise.all([
    supabase.from("sectors").select("id,code,name,description,updated_at").eq("active",true).order("code"),
    supabase.from("hubs").select("id,sector_id,name,description,status,integration_type,updated_at").eq("active",true),
    supabase.from("integration_agreements").select("id,sector_id,hub_id,responsible_area,status,integration_type,update_frequency,last_review,next_review,notes").order("updated_at",{ascending:false}),
    supabase.from("data_sources").select("id,sector_id,name,source_type,status,last_updated_at,updated_at").eq("active",true),
  ]);
  return {sectors:sectors??[],hubs:hubs??[],agreements:agreements??[],sources:sources??[]};
}

export async function queryContents(supabase:SupabaseClient) {
  const {data,error}=await supabase.from("institutional_contents").select("id,sector_id,title,content,content_type,external_url,visibility,published_at,created_at,sectors(code,name)").eq("active",true).order("published_at",{ascending:false,nullsFirst:false}).order("created_at",{ascending:false});
  return {data:data??[],error};
}
