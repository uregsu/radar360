import type { Metadata } from "next";
import "./globals.css";
import "./superbi-design-system.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "SuperBI 360 | GSU — URE Guarulhos Sul",
  description: "Plataforma Integrada de Gestão, Evidências e Inteligência da URE Guarulhos Sul",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "SuperBI 360 | GSU — URE Guarulhos Sul",
    description: "Plataforma Integrada de Gestão, Evidências e Inteligência da URE Guarulhos Sul",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "SuperBI 360 | GSU — URE Guarulhos Sul" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperBI 360 | GSU — URE Guarulhos Sul",
    description: "Plataforma Integrada de Gestão, Evidências e Inteligência da URE Guarulhos Sul",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
