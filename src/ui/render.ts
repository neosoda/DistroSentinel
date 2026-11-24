import { appStore } from "../store/state";
import { getFilteredAndSortedData } from "../domain/filter";
import { createCardDOM } from "./components/Card";
import { EnrichedDistro } from "../types";
import { escapeHtml } from "../utils/helpers";
import { syncCompareUI } from "./decision";

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

const PAGE_SIZE = 12;
let page = 1;
let view: "list" | "cards" = "list";
let lastFilter = "";
let cached: EnrichedDistro[] = [];
try { if (localStorage.getItem("dg_view") === "cards") view = "cards"; } catch { /* optional */ }
function setView(next: "list" | "cards") {
  view = next;
  try { localStorage.setItem("dg_view", view); } catch { /* optional */ }
  renderGrid(cached);
}
function changePage(delta: number) {
  page += delta;
  renderGrid(cached);
  document.getElementById("catalogue")?.scrollIntoView({ block: "start" });
}
function listRow(d: EnrichedDistro, favorite: boolean) {
  const name = escapeHtml(d.distro);
  return `<tr>
    <td><button class="distro-name" data-detail="${name}" type="button"><span class="list-logo"><img src="${escapeHtml(d.logoUrl)}" alt="" loading="lazy"><span aria-hidden="true">${escapeHtml(d.initials)}</span></span><span><strong>${name}</strong><small>${escapeHtml(d.base)}</small></span></button></td>
    <td><span class="badge family">${escapeHtml(d.family)}</span></td>
    <td><span class="level-chip">${escapeHtml(d.level)}</span></td>
    <td class="usage-cell">${escapeHtml(d.usage)}</td>
    <td><div class="list-actions"><button type="button" class="row-fav ${favorite ? "active" : ""}" data-fav="${name}" aria-label="${favorite ? "Retirer des favoris" : "Ajouter aux favoris"} : ${name}" aria-pressed="${favorite}"><svg class="ui-icon icon-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-star"></use></svg></button><button class="btn btn-compare" data-compare="${name}" aria-pressed="false" type="button">Comparer</button><button class="row-detail" data-detail="${name}" aria-label="Voir la fiche de ${name}" type="button"><svg class="ui-icon icon-arrow-up-right-from-square" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-arrow-up-right-from-square"></use></svg></button></div></td>
  </tr>`;
}
export function bindCatalogueView() {
  document.getElementById("viewList")?.addEventListener("click", () => setView("list"));
  document.getElementById("viewCards")?.addEventListener("click", () => setView("cards"));
  document.getElementById("prevPage")?.addEventListener("click", () => changePage(-1));
  document.getElementById("nextPage")?.addEventListener("click", () => changePage(1));
  document.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest<HTMLButtonElement>("[data-detail]");
    if (!button) return;
    const distro = cached.find(d => d.distro === button.dataset.detail);
    if (!distro) return;
    const dialog = document.getElementById("detailDialog") as HTMLDialogElement;
    document.getElementById("detailTitle")!.textContent = distro.distro;
    document.getElementById("detailContent")!.replaceChildren(createCardDOM(distro, appStore.State.favorites.has(distro.distro)));
    syncCompareUI();
    dialog.showModal();
  });
}
export function renderGrid(distrosObj: EnrichedDistro[]) {
  cached = distrosObj;
  titleDiv.textContent = labelView();
  activeFiltersDiv.textContent = activeFiltersText();

  const state = appStore.State;
  const filtered = getFilteredAndSortedData(distrosObj, state);
  document.getElementById("metricTotal")!.textContent = String(distrosObj.length);
  document.getElementById("metricFamilies")!.textContent = String(new Set(distrosObj.map(d => d.family)).size);
  document.getElementById("metricFavorites")!.textContent = String(distrosObj.filter(d => state.favorites.has(d.distro)).length);
  document.getElementById("metricResults")!.textContent = String(filtered.length);
  countDiv.textContent = `${filtered.length} résultat${filtered.length > 1 ? "s" : ""}`;

  const signature = JSON.stringify([state.search,state.family,state.level,[...state.tags],state.mode,state.sort,state.favOnly,state.matchAllTags]);
  if (signature !== lastFilter) { page = 1; lastFilter = signature; }
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  page = Math.min(pageCount, Math.max(1, page));
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  document.getElementById("viewList")!.setAttribute("aria-pressed", String(view === "list"));
  document.getElementById("viewCards")!.setAttribute("aria-pressed", String(view === "cards"));
  (document.getElementById("prevPage") as HTMLButtonElement).disabled = page <= 1;
  (document.getElementById("nextPage") as HTMLButtonElement).disabled = page >= pageCount;
  document.getElementById("pageNumber")!.textContent = page + " / " + pageCount;
  document.getElementById("pageSummary")!.textContent = filtered.length ? (start + 1) + "–" + Math.min(start + PAGE_SIZE, filtered.length) + " sur " + filtered.length : "0 résultat";
  grid.classList.toggle("list-view", view === "list");
  const focused = document.activeElement as HTMLElement | null;
  const focusKey = focused && grid.contains(focused) ? ["fav","compare","detail"].find(key => focused.dataset[key]) : undefined;
  const focusName = focusKey ? focused?.dataset[focusKey] : undefined;
  grid.innerHTML = "";

  const detail = document.getElementById("detailDialog") as HTMLDialogElement;
  if (detail.open) {
    detail.querySelectorAll<HTMLButtonElement>("[data-fav]").forEach(button => {
      const active = state.favorites.has(button.dataset.fav || "");
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
      button.setAttribute("aria-label",active ? "Retirer des favoris" : "Ajouter aux favoris");
      button.innerHTML = '<svg class="ui-icon icon-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-star"></use></svg>';
    });
  }

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-catalogue">
        <svg class="ui-icon icon-magnifying-glass" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-magnifying-glass"></use></svg>
        <h3>Aucune distribution trouvée</h3><p>Essayez une autre recherche ou réinitialisez les filtres.</p>
        <button type="button" class="reset-btn" data-reset-filters>Réinitialiser les filtres</button>
      </div>`;
    return;
  }

  const frag = document.createDocumentFragment();

  if (view === "list") {
    grid.innerHTML = `<div class="catalogue-scroll" tabindex="0" aria-label="Tableau des distributions, défilement horizontal"><table class="catalogue-table"><caption class="sr-only">Distributions disponibles</caption><thead><tr><th scope="col">Distribution</th><th scope="col">Famille</th><th scope="col">Niveau</th><th scope="col">Usage</th><th scope="col">Actions</th></tr></thead><tbody>${visible.map(d => listRow(d,state.favorites.has(d.distro))).join("")}</tbody></table></div>`;
    grid.querySelectorAll<HTMLImageElement>(".list-logo img").forEach(img => {
      const hide = () => { img.hidden = true; };
      img.addEventListener("error", hide);
      if (img.complete && img.naturalWidth === 0) hide();
    });
  } else {
  visible.forEach(d => {
    const isFav = state.favorites.has(d.distro);
    const card = createCardDOM(d, isFav);
    frag.appendChild(card);
  });

  grid.appendChild(frag);
  }
  if (focusKey && focusName) {
    Array.from(grid.querySelectorAll<HTMLButtonElement>("button")).find(b => b.dataset[focusKey] === focusName)?.focus({preventScroll:true});
  }
  syncCompareUI();
}
