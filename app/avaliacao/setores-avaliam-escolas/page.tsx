import type { Metadata } from "next";
import Link from "next/link";
import EvaluationFormEmbed from "../EvaluationFormEmbed";
import PublicEvaluationLayout from "../PublicEvaluationLayout";
import { evaluationFlow } from "../evaluation-data";

const flow = evaluationFlow("setores-avaliam-escolas")!;
export const metadata: Metadata = { title: `${flow.title} | Avaliação 360 GSU` };

export default function SectorsEvaluateSchoolsPage() {
  return <PublicEvaluationLayout><main className="evaluation-form-page">
    <Link className="evaluation-back" href="/avaliacao">← Voltar para Avaliação 360</Link>
    <header><span className="evaluation-eyebrow">SUPERBI 360 | GSU · AVALIAÇÃO 360</span><h1>{flow.title}</h1><p>Avaliação das unidades escolares da URE Guarulhos Sul realizada pelos setores da Unidade Regional de Ensino.</p></header>
    <EvaluationFormEmbed title={flow.title} embedUrl={flow.embedUrl} formUrl={flow.formUrl}/>
  </main></PublicEvaluationLayout>;
}
