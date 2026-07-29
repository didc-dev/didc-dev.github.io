import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { ResponsiveImage } from "../_components/ResponsiveImage";
import { formations } from "../_data/content";
import type { PortfolioImageKey } from "../_data/images";
import { pageMetadata } from "../_lib/site";

export const metadata: Metadata = pageMetadata("Formations", "Diplômes terminés et apprentissages actuels de Daniel Cruz.", "/formations/");
const formationImages: PortfolioImageKey[] = ["formationPlanification", "formationElectricien", "formationInformatique", "formationSystems"];

export default function FormationsPage() {
  return <><PageIntro eyebrow="Qualifications & progression" title="Des bases techniques solides, une progression continue" lead="Mes diplômes posent les bases du terrain et de la planification. Mon laboratoire personnel me permet aujourd’hui d’approfondir les systèmes et les réseaux." /><section className="section section-shell"><div className="formation-list">{formations.map((item, index) => <details key={item.title} open><summary><ResponsiveImage imageKey={formationImages[index]} className="formation-image" sizes="(max-width: 680px) 100vw, 260px" /><div><span className="status">{item.status}</span><span>{item.period}</span></div><div><p className="eyebrow">{item.category}</p><h2>{item.title}</h2><strong>{item.institution}</strong></div></summary><div className="formation-detail"><p>{item.description}</p><div className="tags">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></details>)}</div><div className="learning-now"><span className="pulse" aria-hidden="true" /><div><p className="eyebrow">Formation en cours</p><h2>Administration IT, systèmes et réseaux</h2><p>En ce moment, j’approfondis Windows Server, Active Directory, DNS, PowerShell, les réseaux et la virtualisation dans mon laboratoire personnel.</p></div></div></section></>;
}
