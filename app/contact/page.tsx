import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { EmailLink } from "../_components/EmailLink";
import { ResponsiveImage } from "../_components/ResponsiveImage";

export const metadata: Metadata = { title: "Contact", description: "Coordonnées de Daniel Cruz, basé en Suisse romande." };

export default function ContactPage() {
  return <><PageIntro eyebrow="Contact" title="Gardons le contact" lead="Une question, une idée ou simplement envie d’échanger autour d’un sujet technique ? Vous pouvez m’écrire directement." /><section className="section section-shell contact-grid"><ResponsiveImage imageKey="contact" className="contact-image" sizes="(max-width: 680px) 100vw, 50vw" eager /><div className="contact-card"><p className="eyebrow">Courriel</p><h2>Un contact direct et simple</h2><p>Je lis personnellement les messages envoyés à cette adresse.</p><EmailLink /></div><div className="contact-details"><div><span>Localisation</span><strong>Renens (VD), Suisse romande</strong></div><div><span>Mobilité</span><strong>Permis de conduire B · voiture</strong></div><div><span>Sujets</span><strong>Infrastructures · planification · systèmes et réseaux</strong></div><div><span>Langues</span><strong>Français · portugais · anglais · espagnol</strong></div></div></section></>;
}
