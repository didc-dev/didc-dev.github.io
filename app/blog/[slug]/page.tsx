import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../../_data/content";

const bodies: Record<string, { sections: { title: string; text: string }[]; source: string }> = {
  "dns-annuaire-du-reseau": { sections: [
    { title: "À quoi sert le DNS?", text: "Les équipements communiquent avec des adresses IP, mais les personnes retiennent plus facilement des noms. Le Domain Name System traduit ces noms en informations utilisables par le réseau." },
    { title: "Pourquoi est-il essentiel dans Active Directory?", text: "Un domaine Windows publie dans DNS les services qui permettent aux postes de localiser un contrôleur de domaine. Un DNS incorrect peut empêcher une ouverture de session, une jonction au domaine ou l’application de stratégies." },
    { title: "Le réflexe de diagnostic", text: "Vérifier d’abord l’adresse IP, le serveur DNS configuré, puis la résolution du nom. Cette progression évite de corriger le mauvais composant." },
  ], source: "RFC 1034 et documentation Microsoft Learn sur DNS. Vérifiées le 28 juillet 2026." },
  "methode-diagnostic-technique": { sections: [
    { title: "Partir du symptôme", text: "Une panne décrite n’est pas encore une cause. La première étape consiste à clarifier le contexte, reproduire le comportement et relever les éléments observables." },
    { title: "Isoler avant de remplacer", text: "Tester une hypothèse à la fois réduit les erreurs. Cette méthode vaut pour un ordinateur, une liaison réseau, un équipement électronique ou une installation technique." },
    { title: "Valider après correction", text: "La remise en service n’est complète qu’après un test fonctionnel et une explication claire de ce qui a été observé et corrigé." },
  ], source: "Synthèse de méthode issue de l’expérience de dépannage de Daniel Cruz; aucune règle réglementaire n’est formulée." },
  "planification-du-plan-au-terrain": { sections: [
    { title: "Le plan est un outil de communication", text: "Un plan technique doit rendre une intention exploitable. Il relie les contraintes du projet aux personnes qui préparent, coordonnent et exécutent les travaux." },
    { title: "Anticiper les interfaces", text: "Les passages, alimentations, équipements et responsabilités doivent être compris suffisamment tôt pour limiter les reprises et les ambiguïtés." },
    { title: "Documenter les décisions", text: "Une information tracée et adaptée à son destinataire facilite le suivi, les contrôles et la transmission entre intervenants." },
  ], source: "Retour d’expérience général de planification; aucun document client ni prescription normative n’est publié." },
  "fibre-link-test-otdr": { sections: [
    { title: "Deux objectifs différents", text: "Un Link Test sert généralement à vérifier les performances d’une liaison selon une méthode définie. Un OTDR observe les événements et les pertes le long de la fibre à partir d’une mesure réflectométrique." },
    { title: "Lire avant de conclure", text: "Une mesure doit être replacée dans son contexte: longueur, connecteurs, épissures, sens de test et paramètres utilisés influencent l’interprétation." },
    { title: "Documenter le contrôle", text: "Conserver les résultats utiles permet de comparer, localiser une anomalie et communiquer une observation vérifiable." },
  ], source: "Principes généraux de mesure fibre; le contenu ne remplace pas les procédures du fabricant ou les normes applicables." },
};

export function generateStaticParams() { return articles.filter((article) => article.status === "published").map((article) => ({ slug: article.slug })); }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = articles.find((item) => item.slug === slug && item.status === "published"); const body = bodies[slug]; if (!article || !body) notFound(); return <article className="article-page section-shell"><Link className="back-link" href="/blog/">← Blog technique</Link><p className="eyebrow">{article.category} · {article.reading}</p><h1>{article.title}</h1><p className="article-lead">{article.excerpt}</p><div className="article-body">{body.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<p className="source-note">Repère de transparence: {body.source}</p></div></article>; }
