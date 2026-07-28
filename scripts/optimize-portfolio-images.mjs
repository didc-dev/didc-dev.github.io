import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = "C:/Users/Cruz/Documents/daniel-cruz-portfolio";
const generatedRoot = path.join(projectRoot, "assets/portfolio-sources/generated");
const outputRoot = path.join(projectRoot, "public/images/portfolio");

const generatedAssets = [
  ["article_dhcp_configuration_reseau.png", "articles/article_dhcp_configuration_reseau", 1672, 941],
  ["article_active_directory_role_general.png", "articles/article_active_directory_role_general", 1672, 941],
  ["article_agdlp_explique_simplement.png", "articles/article_agdlp_explique_simplement", 1672, 941],
  ["article_hyperviseur_role.png", "articles/article_hyperviseur_role", 1672, 941],
  ["article_proxmox_hyperv_virtualbox.png", "articles/article_proxmox_hyperv_virtualbox", 1672, 941],
  ["article_snapshot_sauvegarde_retour.png", "articles/article_snapshot_sauvegarde_retour", 1672, 941],
  ["article_ip_masque_passerelle_dns.png", "articles/article_ip_masque_passerelle_dns", 1672, 941],
  ["article_diagnostic_reseau_premiere_methode.png", "articles/article_diagnostic_reseau_premiere_methode", 1672, 941],
  ["article_documenter_une_modification.png", "articles/article_documenter_une_modification", 1672, 941],
  ["article_tgbt_role_general.png", "articles/article_tgbt_role_general", 1672, 941],
  ["article_raspberry_pi_petit_serveur.png", "articles/article_raspberry_pi_petit_serveur", 1672, 941],
  ["article_wifi_ou_zigbee.png", "articles/article_wifi_ou_zigbee", 1672, 941],
  ["timeline_2017_2021_installation_electrique.png", "timeline/timeline_2017_2021_installation_electrique", 1800, 800],
];

for (const [filename, canonical, targetWidth, targetHeight] of generatedAssets) {
  const source = path.join(generatedRoot, filename);
  await fs.access(source);
  const directory = path.join(outputRoot, path.dirname(canonical));
  const basename = path.basename(canonical);
  await fs.mkdir(directory, { recursive: true });

  for (const width of [480, 800, 1200, targetWidth]) {
    const height = Math.round((width / targetWidth) * targetHeight);
    const pipeline = sharp(source)
      .rotate()
      .resize({ width, height, fit: "cover", position: "centre" })
      .withMetadata({ icc: "srgb" });
    await pipeline.clone().webp({ quality: 84, effort: 5 }).toFile(path.join(directory, `${basename}-${width}.webp`));
    await pipeline.clone().avif({ quality: 60, effort: 6, chromaSubsampling: "4:4:4" }).toFile(path.join(directory, `${basename}-${width}.avif`));
  }
}

console.log(`Optimisation terminée: ${generatedAssets.length} images locales; les autres fichiers publics sont conservés.`);
