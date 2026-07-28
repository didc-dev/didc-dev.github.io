import type { PillarId } from "../_data/content";

const labels: Record<PillarId, string> = {
  terrain: "Distribution, terrain et contrôle",
  planification: "Plans, coordination et modélisation",
  informatique: "Systèmes, réseau et diagnostic",
};

export function DomainArt({ pillar, compact = false }: { pillar: PillarId; compact?: boolean }) {
  return <div className={`domain-art ${pillar} ${compact ? "compact" : ""}`} role="img" aria-label={`Illustration technique: ${labels[pillar]}`}>
    <span className="art-grid" aria-hidden="true" />
    <span className="art-node node-a" aria-hidden="true" />
    <span className="art-node node-b" aria-hidden="true" />
    <span className="art-node node-c" aria-hidden="true" />
    <span className="art-line line-a" aria-hidden="true" />
    <span className="art-line line-b" aria-hidden="true" />
    <span className="art-label">{labels[pillar]}</span>
  </div>;
}
