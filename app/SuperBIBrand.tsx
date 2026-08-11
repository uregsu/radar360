type SuperBIBrandProps = {
  className?: string;
  markOnly?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  subtitle?: boolean;
};

export function SuperBIBrand({
  className = "",
  markOnly = false,
  size = "md",
  tone = "dark",
  subtitle = false,
}: SuperBIBrandProps) {
  return (
    <div className={`superbi-brand is-${size} is-${tone} ${markOnly ? "is-mark-only" : ""} ${className}`.trim()}>
      <svg className="superbi-brand-symbol" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path className="superbi-brand-frame" d="M24 2.75 42 13.15v21.7L24 45.25 6 34.85v-21.7L24 2.75Z" />
        <path className="superbi-brand-link" d="M13.5 32.5h21" />
        <path className="superbi-brand-data" d="M14.5 31V25.5M24 31V16.5M33.5 31V21" />
        <circle className="superbi-brand-node" cx="14.5" cy="23" r="2.5" />
        <circle className="superbi-brand-node is-accent" cx="24" cy="14" r="2.5" />
        <circle className="superbi-brand-node" cx="33.5" cy="18.5" r="2.5" />
      </svg>
      {!markOnly && (
        <span className="superbi-brand-copy">
          <strong>SuperBI <em>360</em> <i>| GSU</i></strong>
          {subtitle && <small>Plataforma Integrada de Gestão, Evidências e Inteligência</small>}
        </span>
      )}
    </div>
  );
}
