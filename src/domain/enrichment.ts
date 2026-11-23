import type { RawDistro, EnrichedDistro, Family, Level, ViewMode } from "../types/index.ts";
import { logoSlugs, downloadMap, colorMap } from "../data/constants.ts";

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

// Only show statements curated in the catalogue; never infer strengths from family alone.
export function genStrengths(d: RawDistro, _family: string, _level: string, _tags: string[]): string[] {
  const values = [...(d.whyChoose ?? []), d.points].map(x => x.trim()).filter(Boolean);
  return Array.from(new Set(values)).slice(0, 3);
}
export function genWeakness(d: RawDistro, _family: string, _level: string, _tags: string[]): string {
  return d.limitations?.find(x => x.trim()) || "Non renseigné";
}

export function classifyMode(d: RawDistro): ViewMode {
  const a = String(d.audience || "").toLowerCase();
  const u = String(d.usage || "").toLowerCase();
  const name = String(d.distro || "").toLowerCase();
  if (a.includes("pro") || u.includes("serveur") || u.includes("vdi") || u.includes("infra") || u.includes("stockage") || name.includes("oracle linux") || name.includes("rocky") || name.includes("alma")) return "pro";
  if (a.includes("éducation") || a.includes("grand public") || u.includes("école") || u.includes("apprentissage") || name.includes("raspberry") || name.includes("edubuntu") || name.includes("endless")) return "pedago";
  return "all";
}

export function generateFiche(d: RawDistro, _family: string, level: string, strengths: string[], weakness: string): string {
  const whyChoose = d.whyChoose?.length ? d.whyChoose : strengths;
  const limitations = d.limitations?.length ? d.limitations : [weakness];
  const useCases = d.useCases?.length ? d.useCases : d.usage.split(",").map(x => x.trim());
  return `### Présentation
${d.description || "Non renseigné"}

### Pour qui ?
${d.forWho || d.audience}

### Pourquoi le choisir ?
${whyChoose.map(x => `- ${x}`).join("\n")}

### Limites
${limitations.map(x => `- ${x}`).join("\n")}

### Usages
${useCases.map(x => `- ${x}`).join("\n")}

### Informations techniques
- **Base** : ${d.technical?.base || d.base || "Non renseigné"}
- **Gestionnaire de paquets** : ${d.technical?.packageManager || "Non renseigné"}
- **Publication** : ${d.technical?.releaseModel || "Non renseigné"}
- **Difficulté déclarée** : ${d.technical?.difficulty || "Non renseigné"}
- **Difficulté estimée** : ${level} (heuristique, à vérifier)`;
}

export function enrichData(rawData: RawDistro[]): EnrichedDistro[] {
  const byName = new Map<string, RawDistro>();
  rawData.forEach(d => byName.set(d.distro, d));
  const unique = Array.from(byName.values());

  return unique.map(d => {
    const family = classifyFamily(d.base);
    const level = classifyLevel(d.audience);
    const tags = inferTags(d);
    const distroStrengths = genStrengths(d, family, level, tags);
    const distroWeakness = genWeakness(d, family, level, tags);
    
    return {
      ...d,
      description: d.description ?? "",
      forWho: d.forWho ?? "",
      whyChoose: d.whyChoose ?? [],
      limitations: d.limitations ?? [],
      useCases: d.useCases ?? [],
      technical: d.technical ?? { base: d.base, packageManager: "Non renseigné", releaseModel: "Non renseigné", difficulty: "Non renseigné" },
      family,
      level,
      tags,
      strengths: distroStrengths,
      weakness: distroWeakness,
      mode: classifyMode(d),
      fallbackColor: getFallbackColor(d.distro),
      initials: String(d.distro || "??").substring(0, 2).toUpperCase(),
      logoUrl: getLogoUrl(d.distro),
      distroSeaUrl: distroSeaUrl(d.distro),
      downloadLink: downloadMap[d.distro] || "",
      fiche: generateFiche(d, family, level, distroStrengths, distroWeakness)
    };
  });
}
