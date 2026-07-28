import type { TechnicalNote } from "../_data/notes";

const labels: Record<TechnicalNote["illustration"], string> = {
  electricite: "Distribution électrique",
  planification: "Plan et coordination",
  fibre: "Liaison fibre optique",
  diagnostic: "Diagnostic méthodique",
  systemes: "Systèmes et annuaire",
  virtualisation: "Virtualisation et stockage",
  reseaux: "Réseau et adressage",
  domotique: "Services et objets connectés",
};

export function TechnicalIllustration({ kind, compact = false }: { kind: TechnicalNote["illustration"]; compact?: boolean }) {
  return <div className={`technical-art art-${kind} ${compact ? "compact" : ""}`} role="img" aria-label={`Illustration technique : ${labels[kind]}`}>
    <span className="tech-grid" aria-hidden="true" />
    <span className="tech-core" aria-hidden="true" />
    <span className="tech-node n1" aria-hidden="true" />
    <span className="tech-node n2" aria-hidden="true" />
    <span className="tech-node n3" aria-hidden="true" />
    <span className="tech-path p1" aria-hidden="true" />
    <span className="tech-path p2" aria-hidden="true" />
    <span className="illustration-label">Illustration technique</span>
  </div>;
}
