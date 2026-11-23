import type { EnrichedDistro } from "../types/index.ts";

export interface AdvisorPreferences {
  experience: "Débutant" | "Intermédiaire" | "Expert";
  usage: "Bureau" | "Gaming" | "Serveur" | "Sécurité" | "Léger" | "Création" | "Éducation";
  priority: "any" | "stable" | "current";
}
export interface Recommendation {
  distro: EnrichedDistro;
  score: number;
  reasons: string[];
}
const experienceOrder: Record<AdvisorPreferences["experience"], number> = {
  "Débutant": 1, "Intermédiaire": 2, "Expert": 3
};
function normalized(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
}
export function rankDistros(distros: EnrichedDistro[], prefs: AdvisorPreferences): Recommendation[] {
  return distros.map(distro => {
    const reasons: string[] = [];
    let score = 0;
    const level = distro.level === "Expert" ? 3 : distro.level === "Intermédiaire" ? 2 : 1;
    const expertise = experienceOrder[prefs.experience];
    if (level <= expertise) {
      score += level === expertise ? 4 : 2;
      reasons.push("Niveau compatible avec votre expérience");
    } else {
      score -= (level - expertise) * 4;
    }
    const usage = normalized(prefs.usage);
    if (distro.tags.some(tag => normalized(tag) === usage) || normalized(distro.usage).includes(usage)) {
      score += 9;
      reasons.push("Usage indiqué dans le catalogue");
    } else if (prefs.usage === "Bureau" && /bureau|desktop|quotidien|grand public/i.test(normalized(distro.usage + " " + distro.audience))) {
      score += 7;
      reasons.push("Usage bureau ou grand public indiqué");
    }
    const release = normalized(distro.technical.releaseModel || "");
    if (prefs.priority === "stable" && /lts|stable|fixed|point release/.test(release)) {
      score += 3;
      reasons.push("Cycle de publication orienté stabilité");
    }
    if (prefs.priority === "current" && /rolling|continue/.test(release)) {
      score += 3;
      reasons.push("Cycle de publication continu");
    }
    return { distro, score, reasons };
  }).sort((a, b) => b.score - a.score || a.distro.distro.localeCompare(b.distro.distro));
}
