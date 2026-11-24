import { EnrichedDistro } from "../../types";
import { escapeHtml } from "../../utils/helpers";

export function createCardHTML(d: EnrichedDistro, isFav: boolean): string {
    const strong = (d.strengths || []).slice(0, 3).map(s => `<li>${escapeHtml(s)}</li>`).join("");
    const tagBadges = (d.tags || []).slice(0, 7).map(t => `<span class="badge">${escapeHtml(t)}</span>`).join("");

    return `
      <div class="card-header">
        <div class="logo-wrapper" aria-hidden="true">
          <img loading="lazy" src="${escapeHtml(d.logoUrl)}" class="logo-img" alt="${escapeHtml(d.distro)}"
               >
          <div class="avatar-fallback" style="background:${escapeHtml(d.fallbackColor)}">${escapeHtml(d.initials)}</div>
        </div>

        <div class="card-info">
          <h2 title="${escapeHtml(d.distro)}">${escapeHtml(d.distro)}</h2>
          <div class="meta-badges">
            <span class="badge family">${escapeHtml(d.family)}</span>
            <span class="badge">${escapeHtml(d.level)}</span>
            <span class="badge">${escapeHtml(d.base)}</span>
          </div>
        </div>

        <button class="fav-btn ${isFav ? "active" : ""}" type="button" data-fav="${escapeHtml(d.distro)}"
          aria-label="${isFav ? "Retirer des favoris" : "Ajouter aux favoris"}" aria-pressed="${isFav}" title="Favori">
          <svg class="ui-icon icon-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-star"></use></svg>
        </button>
      </div>

      <div class="card-body">
        <div class="subline">
          <span class="kv"><svg class="ui-icon icon-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-user"></use></svg> ${escapeHtml(d.audience)}</span>
          <span class="kv"><svg class="ui-icon icon-bullseye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-bullseye"></use></svg> ${escapeHtml(d.usage)}</span>
        </div>

        <p class="desc">${escapeHtml(d.points)}</p>

        <div class="meta-badges">
          ${tagBadges || `<span class="badge">—</span>`}
          <span class="badge" title="Vue (pédago/pro)">${escapeHtml(d.mode.toUpperCase())}</span>
        </div>

        <div class="analysis-grid">
          <div class="point pros">
            <h4><svg class="ui-icon icon-plus-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-plus-circle"></use></svg> Points forts</h4>
            <ul class="bullets">
              ${strong || `<li>${escapeHtml(d.points)}</li>`}
            </ul>
          </div>
          <div class="point cons">
            <h4><svg class="ui-icon icon-minus-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-minus-circle"></use></svg> Point faible</h4>
            <strong>${escapeHtml(d.weakness)}</strong>
          </div>
        </div>
      </div>

      <div class="card-footer">
        ${d.downloadLink ? `<a href="${escapeHtml(d.downloadLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-download"
          title="Consulter la page de téléchargement ou les ressources du projet">
          <svg class="ui-icon icon-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-download"></use></svg> Télécharger / site
        </a>` : `<span class="btn btn-download" aria-label="Lien de téléchargement non disponible">Lien indisponible</span>`}

        <button class="btn btn-try" type="button" data-try="${escapeHtml(d.distroSeaUrl)}" data-name="${escapeHtml(d.distro)}"
          title="Rechercher cette distribution sur DistroSea (nouvel onglet)">
          <svg class="ui-icon icon-desktop" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-desktop"></use></svg> Essayer
        </button>
        <button class="btn btn-compare" type="button" data-compare="${escapeHtml(d.distro)}" aria-pressed="false">
          <svg class="ui-icon icon-code-compare" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-code-compare"></use></svg> Comparer
        </button>
      </div>
    `;
}

export function createCardDOM(d: EnrichedDistro, isFav: boolean): HTMLElement {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = createCardHTML(d, isFav);
  const logo = card.querySelector<HTMLImageElement>(".logo-img");
  logo?.addEventListener("error", () => {
    logo.style.display = "none";
    const fallback = logo.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = "flex";
  });
  return card;
}
