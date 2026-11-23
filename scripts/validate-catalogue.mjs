import { enrichedDistros } from "../src/data/rawDistros.ts";
import { downloadMap } from "../src/data/constants.ts";

const errors = [];
const warnings = [];
const known = new Set();
const normalize = name => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase("fr");

for (const [index, distro] of enrichedDistros.entries()) {
  const label = `Entrée ${index + 1} (${distro.distro || "sans nom"})`;
  for (const key of ["distro", "base", "audience", "points", "usage"]) {
    if (typeof distro[key] !== "string" || !distro[key].trim()) errors.push(`${label}: champ ${key} absent`);
  }
  if (typeof distro.distro !== "string") continue;
  const normalized = normalize(distro.distro);
  if (known.has(normalized)) errors.push(`${label}: nom dupliqué`);
  known.add(normalized);
  const link = downloadMap[distro.distro];
  if (!link) warnings.push(`${label}: aucune ressource de téléchargement connue`);
  else {
    try {
      const parsed = new URL(link);
      if (!["https:", "http:"].includes(parsed.protocol)) errors.push(`${label}: protocole de lien non autorisé`);
      if (parsed.protocol === "http:") warnings.push(`${label}: lien HTTP non chiffré`);
    } catch { errors.push(`${label}: URL mal formée`); }
  }
  if (!distro.technical?.packageManager || !distro.technical?.releaseModel) {
    warnings.push(`${label}: caractéristiques techniques incomplètes`);
  }
}
for (const key of Object.keys(downloadMap)) {
  if (!enrichedDistros.some(d => d.distro === key)) warnings.push(`Lien inutilisé : ${key}`);
}
console.log(`Catalogue : ${enrichedDistros.length} entrées, ${errors.length} erreur(s), ${warnings.length} avertissement(s).`);
for (const warning of warnings) console.warn("WARN", warning);
for (const error of errors) console.error("ERROR", error);
if (errors.length) process.exitCode = 1;
