import { EnrichedDistro } from "../../types";
import { escapeHtml } from "../../utils/helpers";

export function createCardHTML(d: EnrichedDistro, isFav: boolean): string {
    const strong = (d.strengths || []).slice(0, 3).map(s => `<li>${escapeHtml(s)}</li>`).join("");
    const tagBadges = (d.tags || []).slice(0, 7).map(t => `<span class="badge">${escapeHtml(t)}</span>`).join("");

    return `
      <div class="card-header">
        <div class="logo-wrapper" aria-hidden="true">
          <img loading="lazy" src="${escapeHtml(d.logoUrl)}" class="logo-img" alt="${escapeHtml(d.distro)}"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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
          aria-label="${isFav ? "Retirer des favoris" : "Ajouter aux favoris"}" title="Favori">
          <i class="fa-solid fa-star"></i>
        </button>
      </div>

      <div class="card-body">
        <div class="subline">
          <span class="kv"><i class="fa-solid fa-user"></i> ${escapeHtml(d.audience)}</span>
          <span class="kv"><i class="fa-solid fa-bullseye"></i> ${escapeHtml(d.usage)}</span>
        </div>

        <p class="desc">${escapeHtml(d.points)}</p>

        <div class="meta-badges">
          ${tagBadges || `<span class="badge">—</span>`}
          <span class="badge" title="Vue (pédago/pro)">${escapeHtml(d.mode.toUpperCase())}</span>
        </div>

        <div class="analysis-grid">
          <div class="point pros">
            <h4><i class="fas fa-plus-circle"></i> Fort</h4>
            <ul class="bullets">
              ${strong || `<li>${escapeHtml(d.points)}</li>`}
            </ul>
          </div>
          <div class="point cons">
            <h4><i class="fas fa-minus-circle"></i> Faible</h4>
            <strong>${escapeHtml(d.weakness)}</strong>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <a href="${escapeHtml(d.downloadLink)}" target="_blank" rel="noopener" class="btn btn-download"
          title="Téléchargement (x64) – page officielle / releases">
          <i class="fas fa-download"></i> Télécharger ISO
        </a>

        <button class="btn btn-try" type="button" data-try="${escapeHtml(d.distroSeaUrl)}" data-name="${escapeHtml(d.distro)}"
          title="Tester en ligne (mode session)">
          <i class="fas fa-flask"></i> Essayer (Web)
        </button>
      </div>
    `;
}

export function createCardDOM(d: EnrichedDistro, isFav: boolean): HTMLElement {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("role", "article");
  card.innerHTML = createCardHTML(d, isFav);
  return card;
}
