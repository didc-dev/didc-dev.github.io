import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { TradeExplorer } from "../_components/TradeExplorer";
export const metadata: Metadata = { title: "Métiers", description: "Explorer les métiers et compétences qui structurent le parcours de Daniel Cruz." };
export default function MetiersPage() { return <><PageIntro eyebrow="Domaines professionnels" title="Plusieurs métiers, un même fil conducteur" lead="Sélectionnez un métier pour découvrir les compétences et les réalisations qui lui sont associées." /><section className="section section-shell"><TradeExplorer /></section></>; }
