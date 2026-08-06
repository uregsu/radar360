export const PAINEL_MDI_ROUTE = "/evidencias/paineis-estrategicos/painel-mdi";

const PAINEL_MDI_OFFICIAL_URL = "https://biguarulhossul.my.canva.site/integracaomdi/";

export const painelMdi = {
  name: "Painel MDI",
  fullName: "INTEGRAÇÃO! PAINEL INTEGRADO MDI",
  url: process.env.NEXT_PUBLIC_PAINEL_MDI_URL?.trim() || PAINEL_MDI_OFFICIAL_URL,
  canEmbed: false,
} as const;
