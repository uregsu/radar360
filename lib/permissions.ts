import type { Role, User } from "../types";

export type ResourceAction = "read" | "create" | "update" | "delete" | "manage";

export const routeAccess: Record<string, Role[]> = {
  "/radar360/dirigente": ["ADMIN"],
  "/radar360/gestao": ["ADMIN", "GESTAO", "VISITANTE"],
  "/radar360/escolas": ["ADMIN", "GESTAO", "ESCOLA", "VISITANTE"],
  "/radar360/demandas": ["ADMIN", "GESTAO", "ESCOLA", "VISITANTE"],
  "/radar360/matriz": ["ADMIN", "GESTAO"],
  "/radar360/acordos": ["ADMIN", "GESTAO"],
  "/radar360/usuarios": ["ADMIN"],
};

export function canAccess(role: Role, path: string) {
  const match = Object.entries(routeAccess).find(([route]) => path.startsWith(route));
  return !match || match[1].includes(role);
}

export function canManageUsers(user: User) {
  return user.role === "ADMIN";
}

export function canReadSector(user: User, sectorId: string) {
  return user.role === "ADMIN" || user.role === "VISITANTE" || user.role === "ESCOLA" || user.sectorId === sectorId;
}

export function canWriteSector(user: User, sectorId: string) {
  return user.role === "ADMIN" || (user.role === "GESTAO" && user.sectorId === sectorId);
}

export function canReadSchool(user: User, schoolId: string) {
  return user.role === "ADMIN" || user.role === "GESTAO" || user.role === "VISITANTE" || user.schoolId === schoolId;
}

export function canWriteSchool(user: User, schoolId: string) {
  return user.role === "ADMIN" || (user.role === "ESCOLA" && user.schoolId === schoolId);
}

export function canUseResource(user: User, scope: { sectorId?: string; schoolId?: string }, action: ResourceAction) {
  if (action === "read") {
    if (scope.schoolId && !canReadSchool(user, scope.schoolId)) return false;
    return !scope.sectorId || canReadSector(user, scope.sectorId);
  }
  if (user.role === "VISITANTE") return false;
  if (scope.schoolId && user.role === "ESCOLA") return canWriteSchool(user, scope.schoolId);
  return Boolean(scope.sectorId && canWriteSector(user, scope.sectorId));
}
