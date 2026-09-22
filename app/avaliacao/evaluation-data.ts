export type EvaluationFlow = {
  slug: string;
  direction: string;
  title: string;
  subtitle: string;
  description: string;
  formUrl: string;
  embedUrl: string;
  icon: "school" | "sectors";
};

export const evaluationFlows: EvaluationFlow[] = [
  {
    slug: "escolas-avaliam-setores",
    direction: "Escolas → Setores",
    title: "Escolas avaliam os setores",
    subtitle: "Avaliação dos Setores da URE Guarulhos Sul pelas unidades escolares.",
    description:
      "Utilize esta opção se você representa uma escola da URE Guarulhos Sul e deseja avaliar os serviços e atendimentos realizados pelos setores da Unidade Regional de Ensino.",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSeCv_MP9l2eM5aE0lN2qOwrn5szus2ySn6H8oli3NmkCo5TiQ/viewform",
    embedUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSeCv_MP9l2eM5aE0lN2qOwrn5szus2ySn6H8oli3NmkCo5TiQ/viewform?embedded=true",
    icon: "school",
  },
  {
    slug: "setores-avaliam-escolas",
    direction: "Setores → Escolas",
    title: "Setores avaliam as escolas",
    subtitle: "Avaliação das unidades escolares pelos setores da URE Guarulhos Sul.",
    description:
      "Utilize esta opção se você pertence a um setor da URE Guarulhos Sul e deseja registrar a avaliação de uma unidade escolar.",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScv4pA4-0lJm5a-UJ2BLZLy4JTVc-gT83zrUBwqmqpWZOUIoQ/viewform",
    embedUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScv4pA4-0lJm5a-UJ2BLZLy4JTVc-gT83zrUBwqmqpWZOUIoQ/viewform?embedded=true",
    icon: "sectors",
  },
];

export function evaluationFlow(slug: string) {
  return evaluationFlows.find((flow) => flow.slug === slug);
}
