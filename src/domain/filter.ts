import { EnrichedDistro, AppState } from "../types";
import { fuzzyScore } from "../utils/helpers";

function computeHaystack(d: EnrichedDistro): string {
  return [
    d.distro, d.base, d.audience, d.points, d.usage,
    d.family, d.level, ...(d.tags || []), ...(d.strengths || []), d.weakness, d.mode
  ].join(" ");
}

function matchesTags(d: EnrichedDistro, state: AppState): boolean {
  if (!state.tags.size) return true;
  const tags = new Set((d.tags || []).map(x => String(x).toLowerCase()));
  const usage = String(d.usage || "").toLowerCase();
  const selected = Array.from(state.tags).map(x => x.toLowerCase());
  
  if (state.matchAllTags) {
    return selected.every(t => tags.has(t) || usage.includes(t));
  }
  return selected.some(t => tags.has(t) || usage.includes(t));
}

export function getFilteredAndSortedData(distros: EnrichedDistro[], state: AppState): EnrichedDistro[] {
  const q = state.search.trim().toLowerCase();

  let list = distros
    .map(d => {
      const hay = computeHaystack(d);
      const score = fuzzyScore(hay, q);
      return { d, score };
    })
    .filter(({ d, score }) => {
      if (!score) return false;
      if (state.family !== "all" && d.family !== state.family) return false;
      if (state.level !== "all" && d.level !== state.level) return false;
      if (state.mode !== "all" && !(d.mode === state.mode || d.mode === "all")) return false;
      if (!matchesTags(d, state)) return false;
      if (state.favOnly && !state.favorites.has(d.distro)) return false;
      return true;
    });

  // Sorting
  if (state.sort === "name") {
    list.sort((a, b) => a.d.distro.localeCompare(b.d.distro));
  } else if (state.sort === "level") {
    const ord: Record<string, number> = { "Débutant": 1, "Intermédiaire": 2, "Expert": 3 };
    list.sort((a, b) => (ord[a.d.level] || 99) - (ord[b.d.level] || 99) || b.score - a.score);
  } else if (state.sort === "family") {
    const ord: Record<string, number> = { "Debian": 1, "RPM": 2, "Arch": 3, "BSD": 4, "Indep": 5 };
    list.sort((a, b) => (ord[a.d.family] || 99) - (ord[b.d.family] || 99) || b.score - a.score);
  } else {
    // relevance default
    list.sort((a, b) => b.score - a.score || a.d.distro.localeCompare(b.d.distro));
  }

  return list.map(x => x.d);
}
