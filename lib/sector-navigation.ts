import { sectors } from "../config/sectors";
import { ASURE_OUVIDORIAS_ROUTE } from "../config/ouvidorias";
import type { Sector, User } from "../types";

export const SECTOR_INDEX_ROUTE = "/radar360/setores";

/** Exact matching: SETEC must never match SETEC-extra or an invented child route. */
export function getSectorByRoute(path: string): Sector | undefined {
  const normalized = path.replace(/\/+$/, "");
  return sectors.find(sector => sector.route === normalized);
}

/** Preserve the parent label for the existing module without creating new routes. */
export function getActiveSector(path: string): Sector | undefined {
  if (path === ASURE_OUVIDORIAS_ROUTE) return sectors.find(sector => path.startsWith(`${sector.route}/`));
  return getSectorByRoute(path);
}

export function isSectorPath(path: string) {
  return path === SECTOR_INDEX_ROUTE || path.startsWith(`${SECTOR_INDEX_ROUTE}/`);
}

/** Resolve a database UUID through its trusted code, never through a profile label. */
export function resolveSectorKey(row: { id: string; code: string } | null, sectorId?: string) {
  if (!row || !sectorId || row.id !== sectorId) return undefined;
  return sectors.find(sector => sector.label === row.code)?.key;
}

export function canAccessSector(user: User, sector: Sector, linkedSectorKey?: string) {
  if (user.status !== "ativo" || !sector.enabled) return false;
  if (user.role === "VISITANTE") return sector.permissions.public;
  if (!sector.permissions.roles.includes(user.role)) return false;
  if (user.role === "GESTAO") return Boolean(user.sectorId && linkedSectorKey === sector.key);
  return user.role === "ADMIN" || user.role === "ESCOLA";
}

export function getVisibleSectors(user: User, linkedSectorKey?: string) {
  return sectors.filter(sector => canAccessSector(user, sector, linkedSectorKey));
}
