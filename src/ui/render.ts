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
  parts.push(`Tri=${state.sort}`);
  return parts.length ? `Filtres: ${parts.join(" • ")}` : "Filtres: aucun";
}

export function renderGrid(distrosObj: EnrichedDistro[]) {
  titleDiv.textContent = labelView();
  activeFiltersDiv.textContent = activeFiltersText();

  const state = appStore.State;
  const filtered = getFilteredAndSortedData(distrosObj, state);
  countDiv.textContent = `${filtered.length} résultat${filtered.length > 1 ? "s" : ""}`;

  grid.innerHTML = "";

  if (!filtered.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding: 4rem; color:var(--text-muted);">
        <i class="fas fa-ghost fa-3x"></i><br><br>
        Aucune distribution trouvée.
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
