import type { EnrichedDistro } from "../types/index.ts";
import { rankDistros } from "../domain/recommend.ts";
import type { AdvisorPreferences } from "../domain/recommend.ts";
import { escapeHtml } from "../utils/helpers.ts";

const selected = new Set<string>();
let catalogue: EnrichedDistro[] = [];
const $ = <T extends HTMLElement>(id: string): T | null => document.getElementById(id) as T | null;
const text = (value: string | undefined | null): string => escapeHtml(value && value.trim() ? value : "Non renseigné");

function announce(message: string): void {
  const status = $("statusMessage");
  if (status) status.textContent = message;
}
export function syncCompareUI(): void {
  document.querySelectorAll<HTMLButtonElement>("button[data-compare]").forEach(button => {
    const active = selected.has(button.dataset.compare || "");
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("selected", active);
    button.innerHTML = active ? '<svg class="ui-icon icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-check"></use></svg> Sélectionnée' : '<svg class="ui-icon icon-code-compare" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-code-compare"></use></svg> Comparer';
  });
  const count = $("compareCount");
  if (count) count.textContent = selected.size + "/4";
  const open = $<HTMLButtonElement>("openCompare");
  if (open) open.disabled = selected.size < 2;
  const advisor = $<HTMLButtonElement>("advisorCompare");
  if (advisor) advisor.disabled = selected.size < 2;
  const tray = $("compareTray");
  if (tray) {
    tray.hidden = selected.size === 0;
    tray.innerHTML = selected.size ? '<strong>Comparaison · ' + selected.size + '/4</strong><div class="tray-items">' + [...selected].map(name => '<button type="button" class="tray-item" data-remove-compare="' + escapeHtml(name) + '" aria-label="Retirer ' + escapeHtml(name) + ' de la comparaison">' + escapeHtml(name) + ' ×</button>').join("") + '</div><button type="button" class="action-primary" data-open-comparison ' + (selected.size < 2 ? "disabled" : "") + '>Comparer</button>' : "";
  }
}
function row(label: string, distros: EnrichedDistro[], getter: (d: EnrichedDistro) => string | undefined): string {
  return `<tr><th scope="row">${escapeHtml(label)}</th>${distros.map(d => `<td>${text(getter(d))}</td>`).join("")}</tr>`;
}
function showCompare(): void {
  const distros = [...selected].map(name => catalogue.find(d => d.distro === name)).filter((d): d is EnrichedDistro => Boolean(d));
  if (distros.length < 2) return;
  const content = $("compareContent");
  if (!content) return;
  content.innerHTML = `<div class="compare-scroll"><table class="compare-table">
    <caption>Comparaison de ${distros.length} systèmes selon les informations disponibles</caption>
    <thead><tr><th scope="col">Critère</th>${distros.map(d => `<th scope="col">${escapeHtml(d.distro)}</th>`).join("")}</tr></thead>
    <tbody>
      ${row("Famille", distros, d => d.family)}
      ${row("Base", distros, d => d.technical.base || d.base)}
      ${row("Public", distros, d => d.audience)}
      ${row("Difficulté estimée", distros, d => d.level)}
      ${row("Gestionnaire de paquets", distros, d => d.technical.packageManager)}
      ${row("Publication", distros, d => d.technical.releaseModel)}
      ${row("Usages", distros, d => d.usage)}
      ${row("Points à considérer", distros, d => d.limitations.join(" ; ") || d.weakness)}
    </tbody></table></div><p class="tool-disclaimer">Les niveaux et familles sont calculés ; les informations techniques proviennent du catalogue et peuvent nécessiter une vérification sur le site officiel.</p>`;
  $<HTMLDialogElement>("compareDialog")?.showModal();
}
function showRecommendations(form: HTMLFormElement): void {
  const data = new FormData(form);
  const prefs: AdvisorPreferences = {
    experience: String(data.get("experience")) as AdvisorPreferences["experience"],
    usage: String(data.get("usage")) as AdvisorPreferences["usage"],
    priority: String(data.get("priority")) as AdvisorPreferences["priority"]
  };
  const ranked = rankDistros(catalogue, prefs).filter(r => r.score > 0 && r.reasons.length > 0).slice(0, 4);
  const results = $("advisorResults");
  if (!results) return;
  if (!ranked.length) {
    results.innerHTML = '<p class="tool-disclaimer">Aucun profil suffisamment pertinent. Essayez un autre usage ou consultez le catalogue complet.</p>';
    return;
  }
  results.innerHTML = `<h3 class="recommend-title">Vos pistes à explorer</h3><div class="recommend-grid">${ranked.map(r => `
    <article class="recommend-card">
      <div class="recommend-card-title"><h4>${escapeHtml(r.distro.distro)}</h4><span>${text(r.distro.level)}</span></div>
      <p>${text(r.distro.points)}</p>
      <p class="recommend-why">${r.reasons.map(escapeHtml).join(" · ")}</p>
      <p class="recommend-caveat"><strong>À considérer :</strong> ${text(r.distro.limitations.join("; ") || r.distro.weakness)}</p>
      <button type="button" class="btn btn-compare" data-compare="${escapeHtml(r.distro.distro)}" aria-pressed="false">Comparer</button>
    </article>`).join("")}</div><p class="tool-disclaimer">Suggestions indicatives basées sur les informations existantes, sans IA. Les tags sont inférés automatiquement et doivent être confirmés auprès des distributions.</p>`;
  syncCompareUI();
}
export function bindDecisionTools(distros: EnrichedDistro[]): void {
  catalogue = distros;
  $("openCompare")?.addEventListener("click", showCompare);
  $("advisorCompare")?.addEventListener("click", () => { $<HTMLDialogElement>("advisorDialog")?.close(); showCompare(); });
  $("openAdvisor")?.addEventListener("click", () => $<HTMLDialogElement>("advisorDialog")?.showModal());
  $<HTMLFormElement>("advisorForm")?.addEventListener("submit", event => {
    event.preventDefault();
    showRecommendations(event.currentTarget as HTMLFormElement);
  });
  document.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const remove = target.closest<HTMLButtonElement>("[data-remove-compare]");
    if (remove) { selected.delete(remove.dataset.removeCompare || ""); syncCompareUI(); return; }
    if (target.closest("[data-open-comparison]")) { showCompare(); return; }
    const compare = target.closest<HTMLButtonElement>("button[data-compare]");
    if (compare) {
      const name = compare.dataset.compare || "";
      if (!catalogue.some(d => d.distro === name)) return;
      if (selected.has(name)) selected.delete(name);
      else if (selected.size < 4) selected.add(name);
      else { announce("Maximum de quatre distributions pour comparer."); return; }
      syncCompareUI();
      announce(selected.size + " distribution(s) sélectionnée(s).");
    }
    const close = target.closest<HTMLButtonElement>("[data-close-dialog]");
    if (close) close.closest("dialog")?.close();
  });
}
