import type { Metadata } from "next";
import "./globals.css";
import SmoothScroller from "@/components/smooth-scroller";

export const metadata: Metadata = {
  title: "Kairos Dev — Agencia de Desarrollo Web, IA y Automatización",
  description:
    "Creamos páginas web profesionales, agentes de IA, chatbots y automatizaciones para empresas en USA y Latinoamérica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-dark-950 font-sans text-white">
        <SmoothScroller />
        {children}
      </body>
    </html>
  );
}
