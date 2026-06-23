import type { Metadata } from "next";
import "./globals.css";
import NeuralNetwork from "@/components/neural-network";
import PremiumCursor from "@/components/premium-cursor";

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
      <body className="relative flex min-h-full flex-col bg-deep-black font-sans text-white">
        <NeuralNetwork />
        <PremiumCursor />
        <div className="relative z-10 flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
