import { appStore } from "../store/state";
import { getFilteredAndSortedData } from "../domain/filter";
import { createCardDOM } from "./components/Card";
import { EnrichedDistro } from "../types";

const grid = document.getElementById("gridContainer") as HTMLElement;
const countDiv = document.getElementById("resultCount") as HTMLElement;
const titleDiv = document.getElementById("currentView") as HTMLElement;
const activeFiltersDiv = document.getElementById("activeFilters") as HTMLElement;

export function showSkeleton(n = 10) {
  grid.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const sk = document.createElement("div");
    sk.className = "skeleton-card";
    grid.appendChild(sk);
  }
}

function labelView(): string {
  const state = appStore.State;
  if (state.mode === "pro") return "Vue PRO (infra / serveur / entreprise)";
  if (state.mode === "pedago") return "Vue PÉDAGO (éducation / découverte)";
  if (state.tags.size) return `Usage : ${Array.from(state.tags).join(", ")}`;
  if (state.family !== "all") return `Famille ${state.family}`;
  return "Toutes les distributions";
}

function activeFiltersText(): string {
  const parts: string[] = [];
  const state = appStore.State;
  if (state.search) parts.push(`Recherche="${state.search}"`);
  if (state.mode !== "all") parts.push(`Vue=${state.mode}`);
  if (state.family !== "all") parts.push(`Famille=${state.family}`);
  if (state.level !== "all") parts.push(`Niveau=${state.level}`);
  if (state.tags.size) parts.push(`Tags=${Array.from(state.tags).join("+")}${state.matchAllTags ? "(AND)" : "(OR)"}`);
  if (state.favOnly) parts.push(`Favoris`);
  if (state.sort !== "relevance") parts.push(`Tri=${state.sort}`);
  return parts.length ? `Filtres: ${parts.join(" • ")}` : "Filtres: aucun";
}

export function renderGrid(distrosObj: EnrichedDistro[]) {
  titleDiv.textContent = labelView();
  activeFiltersDiv.textContent = activeFiltersText();

  const state = appStore.State;
  const filtered = getFilteredAndSortedData(distrosObj, state);
  document.getElementById("metricTotal")!.textContent = String(distrosObj.length);
  document.getElementById("metricFamilies")!.textContent = String(new Set(distrosObj.map(d => d.family)).size);
  document.getElementById("metricFavorites")!.textContent = String(distrosObj.filter(d => state.favorites.has(d.distro)).length);
  document.getElementById("metricResults")!.textContent = String(filtered.length);
  countDiv.textContent = `${filtered.length} résultat${filtered.length > 1 ? "s" : ""}`;

  grid.innerHTML = "";

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-catalogue">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <h3>Aucune distribution trouvée</h3><p>Essayez une autre recherche ou réinitialisez les filtres.</p>
        <button type="button" class="reset-btn" data-reset-filters>Réinitialiser les filtres</button>
      </div>`;
    return;
  }

  const frag = document.createDocumentFragment();

  filtered.forEach(d => {
    const isFav = state.favorites.has(d.distro);
    const card = createCardDOM(d, isFav);
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}
