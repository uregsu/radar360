import type { Metadata } from "next";
import EvaluationCard from "./EvaluationCard";
import PublicEvaluationLayout from "./PublicEvaluationLayout";
import { evaluationFlows } from "./evaluation-data";

export const metadata: Metadata = { title: "Avaliação 360 | GSU", description: "Avaliação Interna da URE Guarulhos Sul" };

export default function EvaluationHome() {
  return <PublicEvaluationLayout>
    <main className="evaluation-home">
      <section className="evaluation-hero" aria-labelledby="evaluation-title">
        <span className="evaluation-eyebrow">Avaliação institucional</span>
        <h1 id="evaluation-title">Avaliação 360 <em>| GSU</em></h1>
        <h2>Avaliação Interna da URE Guarulhos Sul</h2>
        <p>Sua participação contribui para o aprimoramento dos serviços, fluxos e relações institucionais da URE Guarulhos Sul.</p>
      </section>
      <section className="evaluation-card-grid" aria-label="Escolha o fluxo de avaliação">
        {evaluationFlows.map((flow) => <EvaluationCard flow={flow} key={flow.slug}/>)}
      </section>
      <aside className="evaluation-privacy-note"><span aria-hidden="true">✓</span><p><strong>Participação institucional</strong>As respostas são coletadas diretamente pelo Google Formulários, conforme as configurações definidas pela URE Guarulhos Sul.</p></aside>
    </main>
  </PublicEvaluationLayout>;
}
