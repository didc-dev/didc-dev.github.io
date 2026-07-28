import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const downloads = "C:/Users/Cruz/Downloads";
const outputRoot = "C:/Users/Cruz/Documents/daniel-cruz-portfolio/public/images/portfolio";

const assets = [
  ["ChatGPT Image 28 juil. 2026, 21_38_04 (1).png", "header/header_panorama_paysage_technique"],
  ["ChatGPT Image 28 juil. 2026, 21_38_04 (2).png", "pillars/pillar_infrastructures_electricite"],
  ["ChatGPT Image 28 juil. 2026, 21_38_04 (3).png", "pillars/pillar_planification_coordination"],
  ["ChatGPT Image 28 juil. 2026, 21_38_05 (4).png", "pillars/pillar_informatique_systemes"],
  ["ChatGPT Image 28 juil. 2026, 21_38_05 (5).png", "projects/project_infrastructures_industrielles"],
  ["ChatGPT Image 28 juil. 2026, 21_38_05 (6).png", "projects/project_planification_electrique"],
  ["ChatGPT Image 28 juil. 2026, 21_38_05 (7).png", "projects/project_fibre_linktest_otdr"],
  ["ChatGPT Image 28 juil. 2026, 21_38_06 (8).png", "projects/project_proxmox_ve"],
  ["ChatGPT Image 28 juil. 2026, 21_38_06 (9).png", "projects/project_active_directory"],
  ["ChatGPT Image 28 juil. 2026, 21_38_06 (10).png", "projects/project_diagnostic_informatique"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (1).png", "projects/project_raspberry_pi"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (2).png", "projects/project_domotique"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (3).png", "metiers/metier_technicien_infrastructures"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (4).png", "metiers/metier_planificateur_electricien"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (5).png", "metiers/metier_chef_projet_technique"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (6).png", "metiers/metier_support_informatique"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (7).png", "metiers/metier_administration_systemes"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (8).png", "articles/article_dns_resolution"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (9).png", "articles/article_methode_diagnostic"],
  ["ChatGPT Image 28 juil. 2026, 22_13_07 (10).png", "articles/article_planification_terrain"],
  ["ChatGPT Image 28 juil. 2026, 22_20_21 (1).png", "timeline/timeline_2010_2013_banc_informatique"],
  ["ChatGPT Image 28 juil. 2026, 22_20_21 (2).png", "timeline/timeline_2013_2015_diagnostic_portable"],
  ["ChatGPT Image 28 juil. 2026, 22_20_23 (3).png", "timeline/timeline_2017_2021_installation_electrique"],
  ["ChatGPT Image 28 juil. 2026, 22_20_23 (4).png", "timeline/timeline_2021_2023_planification_revit"],
  ["ChatGPT Image 28 juil. 2026, 22_20_23 (5).png", "timeline/timeline_2024_infrastructures_industrielles"],
  ["ChatGPT Image 28 juil. 2026, 22_20_24 (6).png", "timeline/timeline_2023_coordination_projet"],
  ["ChatGPT Image 28 juil. 2026, 22_20_24 (7).png", "formations/formation_installateur_electricien_cfc"],
  ["ChatGPT Image 28 juil. 2026, 22_20_24 (8).png", "formations/formation_gestion_equipements_informatiques"],
  ["ChatGPT Image 28 juil. 2026, 22_23_43 (1).png", "articles/article_linktest_otdr"],
  ["ChatGPT Image 28 juil. 2026, 22_23_44 (2).png", "formations/formation_planificateur_electricien_cfc"],
  ["ChatGPT Image 28 juil. 2026, 22_31_09 (1).png", "formations/formation_systemes_reseaux_administration"],
  ["ChatGPT Image 28 juil. 2026, 22_31_10 (2).png", "personal/personal_moto"],
  ["ChatGPT Image 28 juil. 2026, 22_31_10 (3).png", "personal/personal_velo"],
  ["ChatGPT Image 28 juil. 2026, 22_31_10 (4).png", "personal/personal_natation"],
  ["ChatGPT Image 28 juil. 2026, 22_31_11 (5).png", "personal/personal_drone"],
  ["ChatGPT Image 28 juil. 2026, 22_31_11 (6).png", "contact/contact_workspace_daniel_cruz"],
  ["ChatGPT Image 28 juil. 2026, 22_31_11 (7).png", "footer/footer_paysage_suisse_dark"],
];

await fs.rm(outputRoot, { recursive: true, force: true });

for (const [original, canonical] of assets) {
  const source = path.join(downloads, original);
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Dimensions absentes: ${original}`);
  const isPanorama = metadata.width / metadata.height > 2;
  const isSquare = Math.abs(metadata.width / metadata.height - 1) < 0.08;
  const candidates = isPanorama ? [960, 1600, metadata.width] : isSquare ? [400, 700, 1000] : [480, 800, 1200, metadata.width];
  const widths = [...new Set(candidates.filter((width) => width <= metadata.width))];
  const directory = path.join(outputRoot, path.dirname(canonical));
  const basename = path.basename(canonical);
  await fs.mkdir(directory, { recursive: true });
  for (const width of widths) {
    const pipeline = sharp(source).rotate().resize({ width, withoutEnlargement: true }).withMetadata({ icc: "srgb" });
    await pipeline.clone().webp({ quality: 82, effort: 5 }).toFile(path.join(directory, `${basename}-${width}.webp`));
    await pipeline.clone().avif({ quality: 58, effort: 6, chromaSubsampling: "4:4:4" }).toFile(path.join(directory, `${basename}-${width}.avif`));
  }
}

console.log(`Optimisation terminée: ${assets.length} images, originaux conservés dans Téléchargements.`);
