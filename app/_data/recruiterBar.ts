export type ProfessionalStatus = "employed" | "available";

export const professionalStatus: ProfessionalStatus = "available";

export const availabilityByStatus = {
  employed: {
    label: "En poste actuellement",
    detail: "Disponible après un délai de congé de 3 mois",
    tone: "orange",
  },
  available: {
    label: "Disponible pour de nouvelles opportunités",
    detail: "Disponible dès maintenant",
    tone: "green",
  },
} as const;

export const currentAvailability = availabilityByStatus[professionalStatus];

export const contactEmail = {
  user: "danielinaciocruz1",
  host: "gmail.com",
} as const;

export const contactEmailHref = `mailto:${contactEmail.user}@${contactEmail.host}`;

export const profileLocation = {
  locality: "Renens",
  region: "VD",
  short: "Renens (VD)",
  publicLabel: "Renens (VD), Suisse romande",
} as const;

export const profileLanguages = [
  { code: "FR", label: "Français" },
  { code: "PT", label: "Portugais" },
  { code: "EN", label: "Anglais" },
  { code: "ES", label: "Espagnol" },
] as const;

export const recruiterBar = {
  // TODO: placer le CV réel à ce chemin, puis passer cvAvailable à true.
  cvPath: "/documents/daniel-cruz-cv.pdf",
  cvAvailable: false,
  residencePermit: {
    title: "Permis C",
    detail: "Autorisation d’établissement",
  },
  drivingLicence: {
    title: "Permis de conduire B",
    detail: "Avec voiture",
  },
} as const;
