import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "./_components/SiteHeader";
import { SiteFooter } from "./_components/SiteFooter";
import { StickyRecruiterBar } from "./_components/StickyRecruiterBar";
import { assetPath, siteUrl } from "./_lib/site";
import { profileLocation } from "./_data/recruiterBar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Daniel Cruz — Infrastructures, planification et technologies", template: "%s — Daniel Cruz" },
  description: "Portfolio de Daniel Cruz: infrastructures industrielles, électricité, planification, diagnostic et technologies informatiques en Suisse romande.",
  icons: { icon: assetPath("/favicon.svg"), shortcut: assetPath("/favicon.svg") },
  openGraph: { type: "website", locale: "fr_CH", title: "Daniel Cruz — Infrastructures, planification et technologies", description: "Un parcours technique transversal entre terrain, planification et systèmes informatiques.", images: [{ url: assetPath("/og-daniel-cruz.png"), width: 1200, height: 630, alt: "Portfolio professionnel de Daniel Cruz" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "Person", "@id": `${siteUrl}/#person`, name: "Daniel Cruz", url: siteUrl, image: `${siteUrl}/images/daniel-cruz.jpg`, jobTitle: "Planificateur-électricien CFC", address: { "@type": "PostalAddress", addressLocality: profileLocation.locality, addressRegion: profileLocation.region, addressCountry: "CH" }, knowsAbout: ["Infrastructures industrielles", "Planification électrique", "Installations électriques", "Diagnostic informatique", "Systèmes et réseaux"] };
  return <html lang="fr-CH"><body><a className="skip-link" href="#contenu">Aller au contenu</a><SiteHeader /><main id="contenu">{children}</main><SiteFooter /><StickyRecruiterBar /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
