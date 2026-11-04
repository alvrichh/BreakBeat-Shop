import type { Metadata, Viewport } from "next";
import { Bungee, Permanent_Marker, Rubik_Wet_Paint, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const body = Space_Grotesk({ variable: "--ff-body", subsets: ["latin"] });
const block = Bungee({ variable: "--ff-block", subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ variable: "--ff-marker", subsets: ["latin"], weight: "400" });
const graffiti = Rubik_Wet_Paint({ variable: "--ff-graffiti", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    default: "BreakBeat — ropa de kalle, grafiteo y breaks. Popopo!",
    template: "%s · BreakBeat",
  },
  description:
    "Camisetas, sudaderas y complementos con diseños de graffiti y cultura breakbeat. Hechos bajo pedido y enviados a tu casa.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${body.variable} ${block.variable} ${marker.variable} ${graffiti.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-acid focus:px-3 focus:py-2 focus:text-asphalt"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
