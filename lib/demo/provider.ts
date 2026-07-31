import { demoData } from "./data";
import type { School } from "../../types";

export const demoSchools: School[] = [
  { id: "demo-school-01", name: "Escola Horizonte", slug: "escola-horizonte", pei: false, status: "ativa" },
  { id: "demo-school-02", name: "Escola Aurora", slug: "escola-aurora", pei: true, status: "ativa" },
  { id: "demo-school-03", name: "Escola Caminhos", slug: "escola-caminhos", pei: false, status: "ativa" },
  { id: "demo-school-04", name: "Escola Nova Geração", slug: "escola-nova-geracao", pei: true, status: "ativa" },
];

export class DemoDataProvider {
  readonly kind = "demo";
  readonly canQueryRealSources = false;
  getDashboard() {
    return demoData;
  }
  getSchools() {
    return demoSchools;
  }
}

export const demoProvider = new DemoDataProvider();
