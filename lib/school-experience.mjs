export const EXPERIENCE_DIMENSIONS = [
  { key: "class_quality", label: "Qualidade da Aula" },
  { key: "school_climate", label: "Clima Escolar" },
  { key: "spaces_and_bathrooms", label: "Banheiro e Uso dos Espaços" },
  { key: "learning_support", label: "Apoio à Aprendizagem" },
  { key: "engagement_life_project", label: "Engajamento e Projeto de Vida" },
  { key: "overall_satisfaction", label: "Satisfação Geral" },
];

export const ATTENTION_LEVELS = [
  { min: 0, max: 19.9, value: "FAVORAVEL", label: "Situação favorável", rank: 0 },
  { min: 20, max: 34.9, value: "REGULAR", label: "Acompanhamento regular", rank: 1 },
  { min: 35, max: 49.9, value: "ATENCAO", label: "Atenção", rank: 2 },
  { min: 50, max: 64.9, value: "ELEVADA", label: "Atenção elevada", rank: 3 },
  { min: 65, max: 100, value: "PRIORIDADE", label: "Prioridade de acompanhamento", rank: 4 },
];

export function normalizeSchoolName(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toUpperCase().replace(/\b(PROFESSORA|PROFESSOR|PREFEITO)\b/g, (term) => ({ PROFESSORA: "PROFA", PROFESSOR: "PROF", PREFEITO: "PREF" })[term])
    .replace(/\s*-\s*PEI\s*$/i, "").replace(/[^A-Z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

export function validateDimensionValues(values) {
  const errors = [];
  for (const dimension of EXPERIENCE_DIMENSIONS) {
    const value = values[dimension.key];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 10) {
      errors.push(`${dimension.label}: informe um número entre 0 e 10.`);
    }
  }
  return errors;
}

export function baseAttentionLevel(score) {
  const bounded = Math.min(100, Math.max(0, score));
  if (bounded < 20) return ATTENTION_LEVELS[0];
  if (bounded < 35) return ATTENTION_LEVELS[1];
  if (bounded < 50) return ATTENTION_LEVELS[2];
  if (bounded < 65) return ATTENTION_LEVELS[3];
  return ATTENTION_LEVELS[4];
}

export function calculateSchoolExperience(values) {
  const errors = validateDimensionValues(values);
  if (errors.length) throw new TypeError(errors.join(" "));
  const entries = EXPERIENCE_DIMENSIONS.map((dimension) => ({ ...dimension, score: values[dimension.key] }));
  const averageScore = entries.reduce((total, item) => total + item.score, 0) / entries.length;
  const attentionScore = Math.min(100, Math.max(0, (10 - averageScore) * 10));
  const base = baseAttentionLevel(attentionScore);
  const below3 = entries.filter((item) => item.score < 3);
  const below4 = entries.filter((item) => item.score < 4);
  const below5 = entries.filter((item) => item.score < 5);
  const below6 = entries.filter((item) => item.score < 6);
  const reasons = entries.filter((item) => item.score < 6).sort((a, b) => a.score - b.score).map((item) => ({
    ...item,
    severity: item.score < 3 ? "CRITICO" : item.score < 4 ? "ELEVADA" : item.score < 5 ? "ATENCAO" : "ACOMPANHAMENTO",
  }));
  let resultingRank = base.rank;
  if (below3.length) resultingRank = 4;
  else if (below4.length || below5.length >= 2) resultingRank = Math.max(resultingRank, 3);
  else if (below6.length >= 3) resultingRank = Math.max(resultingRank, 4);
  const resulting = ATTENTION_LEVELS[resultingRank];
  const sorted = [...entries].sort((a, b) => a.score - b.score);
  return {
    averageScore,
    attentionScore,
    baseLevel: base.value,
    attentionLevel: resulting.value,
    attentionLabel: resulting.label,
    criticalDimension: sorted[0].key,
    criticalDimensionLabel: sorted[0].label,
    criticalDimensionScore: sorted[0].score,
    bestDimension: sorted.at(-1).key,
    bestDimensionLabel: sorted.at(-1).label,
    bestDimensionScore: sorted.at(-1).score,
    triggerCount: reasons.length,
    below3Count: below3.length,
    below4Count: below4.length,
    below5Count: below5.length,
    below6Count: below6.length,
    hasCriticalTrigger: below3.length > 0,
    reasons,
  };
}

function parseCsvLine(line, delimiter) {
  const cells = []; let current = ""; let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') { current += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === delimiter && !quoted) { cells.push(current.trim()); current = ""; }
    else current += char;
  }
  cells.push(current.trim()); return cells;
}

export function parseExperienceCsv(text) {
  const lines = String(text).replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) throw new TypeError("O CSV precisa conter cabeçalho e ao menos um registro.");
  const delimiter = (lines[0].match(/;/g) ?? []).length >= (lines[0].match(/,/g) ?? []).length ? ";" : ",";
  const headers = parseCsvLine(lines[0], delimiter).map((header) => normalizeSchoolName(header));
  const schoolIndex = headers.findIndex((header) => header === "ESCOLA");
  const dimensionIndexes = EXPERIENCE_DIMENSIONS.map((dimension) => {
    const expected = normalizeSchoolName(dimension.label);
    return headers.findIndex((header) => header.replace(/^\d+\s+/, "") === expected);
  });
  if (schoolIndex < 0 || dimensionIndexes.some((index) => index < 0)) {
    throw new TypeError("Cabeçalho inválido: informe Escola e as seis dimensões.");
  }
  return lines.slice(1).map((line, rowIndex) => {
    const cells = parseCsvLine(line, delimiter);
    const values = {};
    EXPERIENCE_DIMENSIONS.forEach((dimension, index) => {
      const raw = cells[dimensionIndexes[index]]?.replace(",", "."); values[dimension.key] = raw === "" || raw == null ? Number.NaN : Number(raw);
    });
    return { row: rowIndex + 2, schoolName: cells[schoolIndex]?.trim() ?? "", values };
  });
}

export function prepareExperienceImport(rows, schools, { referencePeriod, source }) {
  if (!/^[0-9]{4}(?:-[1-4])?$/.test(referencePeriod)) throw new TypeError("Período inválido. Use AAAA ou AAAA-N.");
  if (!String(source).trim()) throw new TypeError("Informe a fonte da importação.");
  const byName = new Map();
  for (const school of schools) {
    const normalized = normalizeSchoolName(school.name);
    byName.set(normalized, [...(byName.get(normalized) ?? []), school]);
  }
  const seen = new Set(); const accepted = []; const pending = [];
  for (const row of rows) {
    const normalized = normalizeSchoolName(row.schoolName);
    const matches = byName.get(normalized) ?? [];
    const errors = validateDimensionValues(row.values);
    if (!normalized) errors.push("Nome da escola obrigatório.");
    if (seen.has(normalized)) errors.push("Escola duplicada no arquivo.");
    seen.add(normalized);
    if (!matches.length) errors.push("Escola não encontrada.");
    if (matches.length > 1) errors.push("Associação ambígua.");
    if (errors.length) { pending.push({ ...row, errors }); continue; }
    const calculated = calculateSchoolExperience(row.values);
    accepted.push({
      school_id: matches[0].id, organization_id: matches[0].organization_id,
      reference_period: referencePeriod, source: String(source).trim(), ...row.values,
      average_score: calculated.averageScore, attention_score: calculated.attentionScore,
      base_attention_level: calculated.baseLevel, attention_level: calculated.attentionLevel,
      critical_dimension: calculated.criticalDimension, critical_dimension_score: calculated.criticalDimensionScore,
      best_dimension: calculated.bestDimension, best_dimension_score: calculated.bestDimensionScore,
      trigger_count: calculated.triggerCount, below_3_count: calculated.below3Count,
      below_4_count: calculated.below4Count, below_5_count: calculated.below5Count, below_6_count: calculated.below6Count,
      attention_reasons: calculated.reasons,
    });
  }
  return {
    received: rows.length,
    matched: accepted.length,
    notFound: pending.filter((item) => item.errors.includes("Escola não encontrada.")).length,
    duplicates: pending.filter((item) => item.errors.includes("Escola duplicada no arquivo.") || item.errors.includes("Associação ambígua.")).length,
    invalid: pending.filter((item) => item.errors.some((error) => error.includes("informe um número") || error.includes("obrigatório"))).length,
    pending,
    accepted,
  };
}
