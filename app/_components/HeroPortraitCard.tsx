import Image from "next/image";
import { assetPath } from "../_lib/site";
import { currentAvailability, professionalStatus, profileLocation } from "../_data/recruiterBar";

export function HeroPortraitCard() {
  return <aside className="portrait-card" aria-label="Disponibilité professionnelle">
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
      <div className="availability"><span />Basé à {profileLocation.short}</div>
      <div className="current-role">
        <span className="current-role-label">Disponibilité</span>
        <strong>{currentAvailability.label}</strong>
        <small>{currentAvailability.detail}</small>
        <i className={`hero-status-signal ${professionalStatus}`} aria-hidden="true" />
      </div>
    </div>
  </aside>;
}
