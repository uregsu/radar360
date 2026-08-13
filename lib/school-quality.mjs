export const SCHOOL_QUALITY_SOURCE = "Escola Total – Qualidade Educacional";

export function latestReferencePeriod(rows) {
  return [...new Set(rows.map((row) => row.reference_period).filter(Boolean))].sort().at(-1) ?? null;
}

export function projectSchoolQuality(rows, requestedPeriod) {
  const periods = [...new Set(rows.map((row) => row.reference_period).filter(Boolean))].sort();
  const period = requestedPeriod || periods.at(-1) || null;
  const current = period ? rows.filter((row) => row.reference_period === period) : [];
  const primary = current.find((row) => row.is_primary) ?? null;
  const dimensions = current.filter((row) => !row.is_primary);
  const comparable = current.filter((row) => Number.isFinite(Number(row.regional_value)));
  const best = dimensions.length ? [...dimensions].sort((a, b) => Number(b.value) - Number(a.value))[0] : null;
  const lowest = dimensions.length ? [...dimensions].sort((a, b) => Number(a.value) - Number(b.value))[0] : null;
  const aboveRegional = comparable.filter((row) => Number(row.value) > Number(row.regional_value));
  const largestPositiveGap = comparable.length ? [...comparable].sort((a, b) =>
    (Number(b.value) - Number(b.regional_value)) - (Number(a.value) - Number(a.regional_value))
  )[0] : null;
  const officialAttention = current.filter((row) => /aten[cç][aã]o/i.test(row.classification ?? ""));
  return { periods, period, current, primary, dimensions, comparable, best, lowest, aboveRegional, largestPositiveGap, officialAttention };
}

export function formatQualityValue(row) {
  if (!row || !Number.isFinite(Number(row.value))) return "—";
  const value = Number(row.value).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  return row.value_unit === "PERCENT" ? `${value}%` : value;
}
