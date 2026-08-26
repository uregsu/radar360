import type {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
} from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ChildrenProps = {
  children: ReactNode;
  className?: string;
};

export function AppShell({ children, className }: ChildrenProps) {
  return <div className={cx("superbi-ui", "superbi-app-shell", className)}>{children}</div>;
}

export function Sidebar({ children, className }: ChildrenProps) {
  return <aside className={cx("superbi-sidebar", className)}>{children}</aside>;
}

export function Topbar({ children, className }: ChildrenProps) {
  return <header className={cx("superbi-topbar", className)}>{children}</header>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cx("superbi-page-header", className)}>
      <div>
        {eyebrow ? <span className="superbi-eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="superbi-page-actions">{actions}</div> : null}
    </header>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="superbi-section-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  icon,
  trend,
  tone = "blue",
}: {
  label: string;
  value: ReactNode;
  detail?: string;
  icon?: ReactNode;
  trend?: ReactNode;
  tone?: "blue" | "teal" | "cyan" | "amber";
}) {
  return (
    <article className={cx("superbi-card", "superbi-metric-card", `is-${tone}`)}>
      <div className="superbi-metric-top">
        <span>{label}</span>
        {icon ? <span className="superbi-icon-box">{icon}</span> : null}
      </div>
      <strong>{value}</strong>
      <div className="superbi-metric-detail">
        {detail ? <span>{detail}</span> : null}
        {trend}
      </div>
    </article>
  );
}

export function StrategicCard({
  title,
  description,
  eyebrow,
  icon,
  footer,
  children,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <article className="superbi-card superbi-strategic-card">
      <div className="superbi-strategic-heading">
        {icon ? <span className="superbi-icon-box">{icon}</span> : null}
        <div>
          {eyebrow ? <span className="superbi-eyebrow">{eyebrow}</span> : null}
          <h3>{title}</h3>
        </div>
      </div>
      {description ? <p>{description}</p> : null}
      {children}
      {footer ? <footer>{footer}</footer> : null}
    </article>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
}) {
  return <span className={cx("superbi-status", `is-${tone}`)}>{children}</span>;
}

export function ProgressRing({
  value,
  label,
  size = 92,
}: {
  value: number;
  label?: string;
  size?: number;
}) {
  const normalized = Math.min(100, Math.max(0, value));
  return (
    <div
      className="superbi-progress-ring"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(var(--sb-teal) ${normalized}%, var(--sb-border) 0)`,
      }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalized}
      aria-label={label ?? `Progresso: ${normalized}%`}
    >
      <span>{normalized}%</span>
    </div>
  );
}

export function ChartCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="superbi-card superbi-chart-card">
      <SectionHeader title={title} description={description} action={action} />
      <div className="superbi-chart-body">{children}</div>
    </section>
  );
}

export function DataTable({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="superbi-table-wrap">
      <table className={cx("superbi-table", className)} {...props} />
    </div>
  );
}

export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="superbi-search">
      <span aria-hidden="true">⌕</span>
      <input type="search" className={className} {...props} aria-label={props["aria-label"] ?? "Pesquisar"} />
    </label>
  );
}

export function FilterBar({ children, className }: ChildrenProps) {
  return <div className={cx("superbi-filter-bar", className)}>{children}</div>;
}

function StatePanel({
  title,
  description,
  action,
  tone,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  tone: "empty" | "loading" | "error";
}) {
  return (
    <div className={cx("superbi-state", `is-${tone}`)} role={tone === "error" ? "alert" : "status"}>
      <span className="superbi-state-symbol" aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function EmptyState(props: Omit<Parameters<typeof StatePanel>[0], "tone">) {
  return <StatePanel {...props} tone="empty" />;
}

export function LoadingState({ title = "Carregando dados…", description }: { title?: string; description?: string }) {
  return <StatePanel title={title} description={description} tone="loading" />;
}

export function ErrorState(props: Omit<Parameters<typeof StatePanel>[0], "tone">) {
  return <StatePanel {...props} tone="error" />;
}

export function AlertBanner({
  children,
  tone = "info",
  className,
}: ChildrenProps & { tone?: "info" | "success" | "warning" | "danger" }) {
  return (
    <div className={cx("superbi-alert", `is-${tone}`, className)} role={tone === "danger" ? "alert" : "status"}>
      {children}
    </div>
  );
}

export function Timeline({ children, className }: ChildrenProps) {
  return <ol className={cx("superbi-timeline", className)}>{children}</ol>;
}

export function ActivityFeed({ children, className }: ChildrenProps) {
  return <ul className={cx("superbi-activity-feed", className)}>{children}</ul>;
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const normalized = Math.min(100, Math.max(0, value));
  return (
    <div className="superbi-progress">
      {label ? <span>{label}</span> : null}
      <div role="progressbar" aria-label={label ?? "Progresso"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={normalized}>
        <i style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}

export function KpiTrend({
  value,
  direction = "up",
}: {
  value: string;
  direction?: "up" | "down" | "stable";
}) {
  const directionLabel =
    direction === "up" ? "alta" : direction === "down" ? "queda" : "estável";

  const directionSymbol =
    direction === "up" ? "↑" : direction === "down" ? "↓" : "→";

  return (
    <span
      className={cx("superbi-kpi-trend", `is-${direction}`)}
      aria-label={`${directionLabel}: ${value}`}
    >
      <span aria-hidden="true">{directionSymbol}</span>{" "}
      {value}
    </span>
  );
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("superbi-skeleton", className)} aria-hidden="true" {...props} />;
}
