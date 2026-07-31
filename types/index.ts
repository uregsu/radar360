export type Role = "ADMIN" | "GESTAO" | "ESCOLA" | "VISITANTE";
export type IntegrationStatus = "Integrado" | "Parcialmente integrado" | "Link externo" | "Em implantação" | "Sem fonte integrada";

export interface User {
  id: string; name: string; email: string; role: Role; sectorId?: string; schoolId?: string;
  institutionalProfileId?: string; institutionalProfileName?: string; status: "ativo" | "inativo";
}
export interface School {
  id: string; name: string; slug: string; pei: boolean; status: "ativa";
}
export interface Sector {
  id: string; slug: string; name: string; shortName: string; group: string; description: string;
  icon: string; status: IntegrationStatus; integrationType: string; hubUrl?: string; visibility: Role[]; menu: string[];
}
export interface InstitutionalDemand {
  id: string; title: string; description: string; sectorId: string; subsectorId: string; schoolId?: string;
  category: string; status: "Nova" | "Em análise" | "Em andamento" | "Aguardando escola" | "Aguardando setor" | "Aguardando órgão central" | "Concluída" | "Suspensa" | "Cancelada";
  priority: "Baixa" | "Normal" | "Alta" | "Crítica"; createdAt: string; updatedAt: string; dueDate?: string;
  responsible: string; origin: string; attachments: string[]; evidence: string[]; notes?: string; visibility: Role[];
}
export interface IntegrationAgreement {
  id: string; sectorId: string; sectorName: string; hubName: string; responsibleArea: string; status: IntegrationStatus;
  integrationType: string; dataSources: string[]; updateFrequency: string; indicators: string[]; sharedInformation: string[];
  restrictedInformation: string[]; responsibilities: string[]; lastReview: string; nextReview: string; notes?: string;
}
export interface Evidence {
  id: string; sector: string; school?: string; action: string; description: string; type: string; date: string;
  createdBy: string; attachments: string[]; status: string; feedback?: string; visibility: Role[];
}
