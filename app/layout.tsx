import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "RADAR 360 | Portal Comunica!",
  description: "Visão Integrada da URE Guarulhos Sul",
  openGraph: {
    title: "RADAR 360 | Portal Comunica!",
    description: "Visão Integrada da URE Guarulhos Sul",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "RADAR 360 — Visão Integrada da URE Guarulhos Sul" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RADAR 360 | Portal Comunica!",
    description: "Visão Integrada da URE Guarulhos Sul",
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
