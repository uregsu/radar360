"use client";

import { useState } from "react";

export default function EvaluationFormEmbed({ title, embedUrl, formUrl }: { title: string; embedUrl: string; formUrl: string }) {
  const [loaded, setLoaded] = useState(false);
  return <section className="evaluation-form-panel" aria-label={`Formulário: ${title}`}>
    {!loaded && <div className="evaluation-form-loading" role="status"><span/>Carregando formulário…</div>}
    <iframe
      className={loaded ? "is-loaded" : ""}
      src={embedUrl}
      title={title}
      loading="eager"
      onLoad={() => setLoaded(true)}
      allow="clipboard-write"
    />
    <div className="evaluation-form-fallback">
      <p>Se o formulário não aparecer corretamente neste dispositivo, use o acesso direto.</p>
      <a href={formUrl} target="_blank" rel="noopener noreferrer">Abrir formulário em nova aba <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
