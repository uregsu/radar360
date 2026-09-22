export default function EvaluationIcon({ type }: { type: "school" | "sectors" }) {
  if (type === "school") {
    return <svg aria-hidden="true" viewBox="0 0 48 48"><path d="M5 20 24 7l19 13-19 13L5 20Z"/><path d="M11 25v10c7 6 19 6 26 0V25M42 21v12"/></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 48 48"><path d="M7 41h34M11 41V18h26v23M8 18 24 7l16 11M17 24h3m8 0h3m-14 8h3m8 0h3"/></svg>;
}
