import Link from "next/link";
import type { ReactNode } from "react";

export default function PublicEvaluationLayout({ children }: { children: ReactNode }) {
  return <div className="evaluation-public-shell">
    <header className="evaluation-public-header">
      <Link href="/avaliacao" aria-label="Página inicial da Avaliação 360">
        <span className="evaluation-brand-mark" aria-hidden="true">360</span>
        <span><strong>SUPERBI 360 | GSU</strong><small>URE Guarulhos Sul</small></span>
      </Link>
      <span className="evaluation-header-label">Avaliação interna</span>
    </header>
    {children}
    <footer className="evaluation-public-footer">
      <strong>SuperBI 360 | GSU</strong>
      <span>Unidade Regional de Ensino Guarulhos Sul</span>
    </footer>
  </div>;
}
