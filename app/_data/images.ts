export type PortfolioImage = {
  base: string;
  width: number;
  height: number;
  widths: readonly number[];
  alt: string;
  position?: string;
};

const horizontal = (base: string, alt: string, width = 1536, height = 1024, position?: string): PortfolioImage => ({
  base,
  width,
  height,
  widths: [480, 800, 1200, width],
  alt,
  position,
});

const square = (base: string, alt: string, position?: string): PortfolioImage => ({
  base,
  width: 1254,
  height: 1254,
  widths: [400, 700, 1000],
  alt,
  position,
});

const panorama = (base: string, alt: string, position?: string): PortfolioImage => ({
  base,
  width: 2172,
  height: 724,
  widths: [960, 1600, 2172],
  alt,
  position,
});

export const portfolioImages = {
  header: panorama("header/header_panorama_paysage_technique", "Paysage alpin avec lac, pêcheur, maisons, drone, barrage et lignes électriques", "60% center"),
  pillarTerrain: horizontal("pillars/pillar_infrastructures_electricite", "Armoires et équipements d’une infrastructure électrique industrielle"),
  pillarPlanification: horizontal("pillars/pillar_planification_coordination", "Plans techniques et outils de coordination électrique"),
  pillarInformatique: horizontal("pillars/pillar_informatique_systemes", "Poste de travail entouré de serveurs et d’équipements réseau"),
  projectInfrastructure: horizontal("projects/project_infrastructures_industrielles", "Infrastructure industrielle et distribution électrique", 1586, 992),
  projectPlanification: horizontal("projects/project_planification_electrique", "Plans électriques coordonnés sur un poste de travail", 1586, 992),
  projectFibre: horizontal("projects/project_fibre_linktest_otdr", "Appareil de mesure OTDR contrôlant une liaison fibre optique", 1586, 992),
  projectProxmox: horizontal("projects/project_proxmox_ve", "Architecture de virtualisation organisée autour d’un hyperviseur Proxmox", 1586, 992),
  projectActiveDirectory: horizontal("projects/project_active_directory", "Serveur Active Directory reliant utilisateurs, groupes et dossiers", 1586, 992),
  projectDiagnostic: horizontal("projects/project_diagnostic_informatique", "Ordinateur ouvert sur un établi de diagnostic informatique", 1586, 992),
  projectRaspberry: horizontal("projects/project_raspberry_pi", "Raspberry Pi relié à des services et équipements réseau", 1586, 992),
  projectDomotique: horizontal("projects/project_domotique", "Maison connectée avec capteurs, éclairages et automatisations", 1586, 992),
  tradeInfrastructure: horizontal("metiers/metier_technicien_infrastructures", "Technicien contrôlant une infrastructure électrique industrielle"),
  tradePlanification: horizontal("metiers/metier_planificateur_electricien", "Planificateur-électricien devant des plans techniques"),
  tradeProject: horizontal("metiers/metier_chef_projet_technique", "Coordination d’un projet technique entre planning et terrain"),
  tradeSupport: horizontal("metiers/metier_support_informatique", "Diagnostic et support sur un ordinateur de bureau"),
  tradeSystems: horizontal("metiers/metier_administration_systemes", "Administration de serveurs et d’équipements réseau"),
  articleDns: horizontal("articles/article_dns_resolution", "Schéma de résolution DNS entre un poste client et des serveurs", 1672, 941),
  articleDiagnostic: horizontal("articles/article_methode_diagnostic", "Méthode de diagnostic progressive appliquée à un ordinateur", 1672, 941),
  articlePlanification: horizontal("articles/article_planification_terrain", "Lien entre planification électrique et réalisation sur le terrain", 1672, 941),
  articleFibre: horizontal("articles/article_linktest_otdr", "Comparaison visuelle entre un Link Test et une mesure OTDR", 1672, 941),
  articleDhcp: horizontal("articles/article_dhcp_configuration_reseau", "Serveur DHCP distribuant une configuration réseau à plusieurs postes clients", 1672, 941),
  articleActiveDirectory: horizontal("articles/article_active_directory_role_general", "Annuaire central reliant utilisateurs, ordinateurs, groupes et ressources protégées", 1672, 941),
  articleAgdlp: horizontal("articles/article_agdlp_explique_simplement", "Chaîne de groupes reliant des comptes utilisateurs aux permissions d’un dossier partagé", 1672, 941),
  articleHyperviseur: horizontal("articles/article_hyperviseur_role", "Serveur physique partageant ses ressources entre trois machines virtuelles isolées", 1672, 941),
  articleVirtualisationComparee: horizontal("articles/article_proxmox_hyperv_virtualbox", "Trois contextes de virtualisation sur serveur, poste de travail et ordinateur portable", 1672, 941),
  articleSnapshot: horizontal("articles/article_snapshot_sauvegarde_retour", "Chaîne de snapshots dépendants comparée à une sauvegarde indépendante", 1672, 941),
  articleAdressage: horizontal("articles/article_ip_masque_passerelle_dns", "Réseau local reliant adresse IP, masque, passerelle et résolution DNS", 1672, 941),
  articleDiagnosticReseau: horizontal("articles/article_diagnostic_reseau_premiere_methode", "Technicien testant méthodiquement chaque étape d’une connexion réseau", 1672, 941),
  articleDocumentation: horizontal("articles/article_documenter_une_modification", "Technicien documentant une modification avec notes, schéma, photo et archive", 1672, 941),
  articleTgbt: horizontal("articles/article_tgbt_role_general", "Tableau général basse tension distribuant et protégeant plusieurs départs", 1672, 941),
  articleRaspberry: horizontal("articles/article_raspberry_pi_petit_serveur", "Petit ordinateur monocarte utilisé comme serveur compact et économe", 1672, 941),
  articleWifiZigbee: horizontal("articles/article_wifi_ou_zigbee", "Comparaison d’un réseau Wi-Fi centralisé et d’un réseau maillé de capteurs", 1672, 941),
  timeline2010: horizontal("timeline/timeline_2010_2013_banc_informatique", "Banc d’apprentissage informatique avec composants et outils", 1536, 1024, "center 55%"),
  timeline2013: horizontal("timeline/timeline_2013_2015_diagnostic_portable", "Ordinateur portable en cours de diagnostic technique", 1536, 1024, "center 55%"),
  timeline2017: horizontal("timeline/timeline_2017_2021_installation_electrique", "Tableau électrique et outillage d’installateur-électricien", 1800, 800, "center"),
  timeline2021: horizontal("timeline/timeline_2021_2023_planification_revit", "Poste de planification électrique avec une maquette Revit", 1536, 1024, "center 56%"),
  timeline2023: horizontal("timeline/timeline_2023_coordination_projet", "Coordination d’un projet entre plans, calendrier et chantier", 1536, 1024, "center 54%"),
  timeline2024: horizontal("timeline/timeline_2024_infrastructures_industrielles", "Intervention et mesure sur une installation électrique industrielle", 1536, 1024, "center 56%"),
  formationElectricien: horizontal("formations/formation_installateur_electricien_cfc", "Formation pratique d’installateur-électricien CFC"),
  formationInformatique: horizontal("formations/formation_gestion_equipements_informatiques", "Formation en gestion et diagnostic d’équipements informatiques"),
  formationPlanification: horizontal("formations/formation_planificateur_electricien_cfc", "Formation de planificateur-électricien entre plans et chantier"),
  formationSystems: horizontal("formations/formation_systemes_reseaux_administration", "Apprentissage actuel des systèmes, réseaux et serveurs"),
  personalMoto: square("personal/personal_moto", "Moto sur une route alpine suisse"),
  personalVelo: square("personal/personal_velo", "Vélo au bord d’un lac alpin"),
  personalNatation: square("personal/personal_natation", "Couloir de natation avec lunettes au bord du bassin"),
  personalDrone: square("personal/personal_drone", "Drone photographiant un paysage alpin"),
  contact: horizontal("contact/contact_workspace_daniel_cruz", "Espace de travail de Daniel Cruz avec ordinateur et matériel technique", 1586, 992),
  footer: panorama("footer/footer_paysage_suisse_dark", "Paysage alpin suisse au crépuscule"),
} as const;

export type PortfolioImageKey = keyof typeof portfolioImages;

export const pillarImageKeys = { terrain: "pillarTerrain", planification: "pillarPlanification", informatique: "pillarInformatique" } as const;
export const projectImageKeys: Record<string, PortfolioImageKey> = {
  "infrastructures-industrielles": "projectInfrastructure",
  "planification-electrique": "projectPlanification",
  "fibre-optique-tests": "projectFibre",
  "laboratoire-proxmox-ve": "projectProxmox",
  "active-directory-cruzlab": "projectActiveDirectory",
  "diagnostic-informatique": "projectDiagnostic",
  "raspberry-pi-services": "projectRaspberry",
  "domotique-maison": "projectDomotique",
};
export const tradeImageKeys: Record<string, PortfolioImageKey> = {
  infrastructure: "tradeInfrastructure",
  planification: "tradePlanification",
  "gestion-projet": "tradeProject",
  "support-it": "tradeSupport",
  systemes: "tradeSystems",
};
export const noteImageKeys: Record<string, PortfolioImageKey> = {
  "dns-a-quoi-sert-il": "articleDns",
  "dhcp-configuration-reseau": "articleDhcp",
  "active-directory-role-general": "articleActiveDirectory",
  "agdpl-explique-simplement": "articleAgdlp",
  "hyperviseur-role": "articleHyperviseur",
  "proxmox-hyperv-virtualbox": "articleVirtualisationComparee",
  "snapshot-sauvegarde-retour": "articleSnapshot",
  "ip-masque-passerelle-dns": "articleAdressage",
  "diagnostic-reseau-premiere-methode": "articleDiagnosticReseau",
  "diagnostiquer-sans-conclure": "articleDiagnostic",
  "autocad-revit-approches": "articlePlanification",
  "link-test-et-otdr": "articleFibre",
  "documenter-une-modification": "articleDocumentation",
  "tgbt-role-general": "articleTgbt",
  "raspberry-pi-petit-serveur": "articleRaspberry",
  "wifi-ou-zigbee": "articleWifiZigbee",
};
