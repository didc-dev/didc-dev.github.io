import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "../_components/PageIntro";
import { EmailLink } from "../_components/EmailLink";
import { ResponsiveImage } from "../_components/ResponsiveImage";
import { pageMetadata } from "../_lib/site";
import { profileLanguages, profileLocation } from "../_data/recruiterBar";

export const metadata: Metadata = pageMetadata("Contact", "Coordonnées de Daniel Cruz, basé en Suisse romande.", "/contact/");

export default function ContactPage() {
  const languageNames = profileLanguages.map((language) => language.label.toLocaleLowerCase("fr-CH")).join(" · ");
  return <><PageIntro eyebrow="Contact" title="Gardons le contact" lead="Une question, une idée ou simplement envie d’échanger autour d’un sujet technique ? Vous pouvez m’écrire directement." /><section className="section section-shell contact-grid"><ResponsiveImage imageKey="contact" className="contact-image" sizes="(max-width: 680px) 100vw, 50vw" eager /><div className="contact-card"><p className="eyebrow">Courriel</p><h2>Un contact direct et simple</h2><p>Je lis personnellement les messages envoyés à cette adresse.</p><EmailLink /></div><div className="contact-details"><div><span>Localisation</span><strong>{profileLocation.publicLabel}</strong></div><div><span>Mobilité</span><strong>Permis de conduire B · voiture</strong></div><div><span>Sujets</span><strong>Infrastructures · planification · systèmes et réseaux</strong></div><div><span>Langues</span><strong>{languageNames}</strong></div></div><div className="qr-card"><div><p className="eyebrow">Partager le portfolio</p><h2>Accès direct par QR code</h2><p>Scannez ce code avec un téléphone pour ouvrir <strong>didc-dev.github.io</strong>.</p><a className="button ghost" href="/qr-didc-dev.png" download>Télécharger le QR code</a></div><a className="qr-link" href="https://didc-dev.github.io/" aria-label="Ouvrir le portfolio didc-dev.github.io"><Image src="/qr-didc-dev.png" width={1024} height={1024} alt="QR code menant au portfolio de Daniel Cruz" loading="eager" unoptimized /></a></div></section></>;
}
