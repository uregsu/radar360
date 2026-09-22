import Link from "next/link";
import EvaluationIcon from "./EvaluationIcon";
import type { EvaluationFlow } from "./evaluation-data";

export default function EvaluationCard({ flow }: { flow: EvaluationFlow }) {
  return <article className={`evaluation-card evaluation-card-${flow.icon}`}>
    <div className="evaluation-card-icon"><EvaluationIcon type={flow.icon}/></div>
    <span className="evaluation-card-direction">{flow.direction}</span>
    <h2>{flow.subtitle}</h2>
    <p>{flow.description}</p>
    <Link href={`/avaliacao/${flow.slug}`} aria-label={`Iniciar: ${flow.direction}`}>
      Iniciar avaliação <span aria-hidden="true">→</span>
    </Link>
  </article>;
}
