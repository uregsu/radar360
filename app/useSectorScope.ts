"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase/client";
import { resolveSectorKey } from "../lib/sector-navigation";
import type { User } from "../types";

/** Read-only mapping of the existing profile sector_id to the central registry. */
export function useSectorScope(user: User) {
  const identity = `${user.id}:${user.role}:${user.sectorId ?? ""}`;
  const required = user.role === "GESTAO" && Boolean(user.sectorId);
  const [resolved, setResolved] = useState<{ identity: string; key?: string }>({ identity: "" });
  useEffect(() => {
    if (!required) return;
    let current = true;
    async function load() {
      let key: string | undefined;
      try {
        const { data, error } = await getSupabaseBrowserClient().from("sectors")
          .select("id,code").eq("id", user.sectorId!).eq("active", true).maybeSingle();
        if (!error) key = resolveSectorKey(data, user.sectorId);
      } catch { /* Fail closed: no sector shortcuts or page access on lookup failure. */ }
      if (current) setResolved({ identity, key });
    }
    void load();
    return () => { current = false; };
  }, [identity, required, user.sectorId]);
  return {
    key: required && resolved.identity === identity ? resolved.key : undefined,
    loading: required && resolved.identity !== identity,
  };
}
