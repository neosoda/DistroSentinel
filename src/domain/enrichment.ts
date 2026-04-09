import { RawDistro, EnrichedDistro, Family, Level, ViewMode } from "../types";
import { logoSlugs, downloadMap, colorMap } from "../data/constants";

export function getLogoUrl(name: string): string {
  let slug = logoSlugs[name];
  if (!slug) slug = String(name).toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/${slug}.png`;
}

export function distroSeaUrl(name: string): string {
  return `https://distrosea.com/?q=${encodeURIComponent(name)}`;
}

export function getFallbackColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colorMap[Math.abs(hash) % colorMap.length];
}

export function classifyFamily(base: string): Family {
  const b = String(base || "").toLowerCase();
  if (b.includes("debian") || b.includes("ubuntu") || b.includes("mint")) return "Debian";
  if (b.includes("arch")) return "Arch";
  if (b.includes("rhel") || b.includes("centos") || b.includes("fedora") || b.includes("mandriva") || b.includes("rpm")) return "RPM";
  if (b.includes("bsd") || b.includes("solaris")) return "BSD";
  return "Indep";
}

export function classifyLevel(audience: string): Level {
  const a = String(audience || "").toLowerCase();
  if (a.includes("expert") || a.includes("avancé") || a.includes("puriste") || a.includes("minimaliste")) return "Expert";
  if (a.includes("débutant") || a.includes("grand public") || a.includes("éducation") || a.includes("tous") || a.includes("enfant")) return "Débutant";
  return "Intermédiaire";
}

export function inferTags(d: RawDistro): string[] {
  const u = String(d.usage || "").toLowerCase();
  const p = String(d.points || "").toLowerCase();
  const name = String(d.distro || "").toLowerCase();
  const tags = new Set<string>();

  if (u.includes("jeu") || u.includes("gaming") || p.includes("gaming") || p.includes("steamos")) tags.add("Gaming");
  if (u.includes("serveur") || u.includes("vdi") || u.includes("stockage") || u.includes("infra")) tags.add("Serveur");
  if (p.includes("sécur") || u.includes("sécur") || String(d.audience || "").toLowerCase().includes("sécurité") || name.includes("kali") || name.includes("parrot") || name.includes("tails") || name.includes("qubes")) tags.add("Sécurité");
  if (u.includes("léger") || u.includes("minimal") || p.includes("ultra-lég") || name.includes("slitaz") || name.includes("tiny core") || name.includes("puppy") || name.includes("antix")) tags.add("Léger");
  if (u.includes("audio") || u.includes("vidéo") || u.includes("production") || String(d.audience || "").toLowerCase().includes("créat")) tags.add("Création");
  if (String(d.audience || "").toLowerCase().includes("éducation") || u.includes("école") || name.includes("edubuntu") || name.includes("raspberry")) tags.add("Éducation");
  if (u.includes("immutable") || p.includes("immutable") || name.includes("silverblue") || name.includes("microos") || name.includes("nixos") || name.includes("nitrux")) tags.add("Immutable");
  if (u.includes("embarqué") || p.includes("embarq") || name.includes("openwrt") || name.includes("buildroot")) tags.add("Embarqué");
  if (u.includes("performance") || p.includes("performance") || name.includes("clear linux") || name.includes("cachyos")) tags.add("Performance");
  
  return Array.from(tags);
}

export function genStrengths(d: RawDistro, family: string, level: string, tags: string[]): string[] {
  const out: string[] = [];
  if (d.points) out.push(d.points);

  const name = String(d.distro || "").toLowerCase();

  if (family === "Debian") out.push("Stabilité + dépôts énormes");
  if (family === "RPM") out.push("Bon fit entreprise / serveur");
  if (family === "Arch") out.push("Paquets récents + flexibilité");
  if (family === "BSD") out.push("Robustesse + réseau/FS");

  if (tags.includes("Immutable")) out.push("MAJ atomiques / rollback plus simple");
  if (tags.includes("Embarqué")) out.push("Footprint faible, orienté appliance");
  if (tags.includes("Sécurité")) out.push("Orientation sécurité (outillage ou durcissement)");
  if (tags.includes("Gaming")) out.push("Optimisations desktop/gaming");
  if (tags.includes("Performance")) out.push("Optimisations performance (stack ciblée)");

  if (level === "Débutant") out.push("Prise en main rapide");
  if (level === "Expert") out.push("Contrôle fin (au prix du temps)");

  if (name.includes("nixos")) out.push("Déclaratif: infra reproductible");
  if (name.includes("qubes")) out.push("Compartimentation forte (VM)");

  return Array.from(new Set(out)).slice(0, 3);
}

export function genWeakness(d: RawDistro, family: string, level: string, tags: string[]): string {
  const name = String(d.distro || "").toLowerCase();

  if (name.includes("qubes")) return "Exigeant en ressources + workflow particulier";
  if (name.includes("tails")) return "Confort limité hors anonymat (sessions éphémères)";
  if (tags.includes("Immutable")) return "Paradigme différent (containers/flatpak), friction initiale";
  if (tags.includes("Embarqué")) return "Pas orienté desktop; build/flash/target-specific";
  if (tags.includes("Sécurité") && (name.includes("kali") || name.includes("parrot"))) return "Pas un OS 'quotidien' standard (outillage + modèle d’usage)";

  if (family === "Arch") return "Rolling: MAJ fréquentes, risque de casse si négligé";
  if (family === "Debian" && !name.includes("siduction")) return "Paquets souvent plus anciens";
  if (family === "RPM" && (String(d.base || "").toLowerCase().includes("rhel") || String(d.base || "").toLowerCase().includes("centos"))) return "Nouveautés plus lentes (orienté stabilité)";
  if (level === "Expert") return "Courbe d’apprentissage élevée";
  if (level === "Débutant") return "Moins de contrôle fin / choix imposés";
  return "Compromis standard (selon besoins)";
}

export function classifyMode(d: RawDistro): ViewMode {
  const a = String(d.audience || "").toLowerCase();
  const u = String(d.usage || "").toLowerCase();
  const name = String(d.distro || "").toLowerCase();
  if (a.includes("pro") || u.includes("serveur") || u.includes("vdi") || u.includes("infra") || u.includes("stockage") || name.includes("oracle linux") || name.includes("rocky") || name.includes("alma")) return "pro";
  if (a.includes("éducation") || a.includes("grand public") || u.includes("école") || u.includes("apprentissage") || name.includes("raspberry") || name.includes("edubuntu") || name.includes("endless")) return "pedago";
  return "all";
}

export function enrichData(rawData: RawDistro[]): EnrichedDistro[] {
  const byName = new Map<string, RawDistro>();
  rawData.forEach(d => byName.set(d.distro, d));
  const unique = Array.from(byName.values());

  return unique.map(d => {
    const family = classifyFamily(d.base);
    const level = classifyLevel(d.audience);
    const tags = inferTags(d);
    
    return {
      ...d,
      family,
      level,
      tags,
      strengths: genStrengths(d, family, level, tags),
      weakness: genWeakness(d, family, level, tags),
      mode: classifyMode(d),
      fallbackColor: getFallbackColor(d.distro),
      initials: String(d.distro || "??").substring(0, 2).toUpperCase(),
      logoUrl: getLogoUrl(d.distro),
      distroSeaUrl: distroSeaUrl(d.distro),
      downloadLink: downloadMap[d.distro] || `https://www.google.com/search?q=download+iso+x86_64+${encodeURIComponent(d.distro)}`
    };
  });
}
