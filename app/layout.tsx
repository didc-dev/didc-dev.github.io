import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "./_components/SiteHeader";
import { SiteFooter } from "./_components/SiteFooter";
import { assetPath, siteUrl } from "./_lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Daniel Cruz — Infrastructures et support IT", template: "%s — Daniel Cruz" },
  description: "Portfolio de Daniel Cruz: support informatique, systèmes, réseaux, virtualisation et infrastructures techniques en Suisse romande.",
  icons: { icon: assetPath("/favicon.svg"), shortcut: assetPath("/favicon.svg") },
  openGraph: { type: "website", locale: "fr_CH", title: "Daniel Cruz — Infrastructures et support IT", description: "Un parcours technique entre terrain, systèmes et infrastructures IT.", images: [{ url: assetPath("/og-daniel-cruz.png"), width: 1200, height: 630, alt: "Portfolio de Daniel Cruz" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr-CH"><body><a className="skip-link" href="#contenu">Aller au contenu</a><SiteHeader /><main id="contenu">{children}</main><SiteFooter /></body></html>;
}
