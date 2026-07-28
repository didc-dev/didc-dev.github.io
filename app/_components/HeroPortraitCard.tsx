import Image from "next/image";
import { assetPath } from "../_lib/site";

export function HeroPortraitCard() {
  return <aside className="portrait-card" aria-label="Profil professionnel actuel">
    <div className="portrait-visual">
      <div className="portrait-orbit" aria-hidden="true">
        <i className="orbit-mark orbit-mark-a" />
        <i className="orbit-mark orbit-mark-b" />
        <i className="orbit-dot" />
      </div>
      <div className="portrait-photo-shell">
        <Image
          className="portrait"
          src={assetPath("/images/daniel-cruz.jpg")}
          width={560}
          height={560}
          priority
          unoptimized
          alt="Portrait professionnel de Daniel Cruz"
        />
      </div>
    </div>

    <div className="portrait-card-body">
      <div className="availability"><span />Basé en Suisse romande</div>
      <div className="current-role">
        <span className="current-role-label">Poste actuel</span>
        <strong>Technicien en infrastructures industrielles / planificateur-électricien</strong>
        <small>Connect Groupe E · depuis 2024</small>
      </div>
    </div>
  </aside>;
}
