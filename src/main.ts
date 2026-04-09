import { bindAllEvents } from "./ui/events";
import { bindExportEvents } from "./utils/export";
import { enrichData } from "./domain/enrichment";
import { rawData } from "./data/rawDistros";
import { renderGrid, showSkeleton } from "./ui/render";
import { appStore } from "./store/state";
import "../style.css"; // Imported for Vite

// Boot Process
const distrosObj = enrichData(rawData);

// Initialize UI binding
bindAllEvents();
bindExportEvents(distrosObj);

// Connect UI to Global state Reactivity
appStore.subscribe(() => {
    renderGrid(distrosObj);
});

// Modal System Handling
const modal = document.getElementById("sessionModal") as HTMLElement;
const modalClose = document.getElementById("modalClose") as HTMLElement;
const modalName = document.getElementById("modalName") as HTMLElement;
const modalHint = document.getElementById("modalHint") as HTMLElement;
const modalOpenNew = document.getElementById("modalOpenNew") as HTMLAnchorElement;
const sessionFrame = document.getElementById("sessionFrame") as HTMLIFrameElement;

function openSession(name: string, url: string) {
    modalName.textContent = name;
    modalHint.textContent = "DistroSea (iframe si autorisé)";
    modalOpenNew.href = url;
    sessionFrame.src = url;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeSession() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    sessionFrame.src = "about:blank";
}

if(modalClose) modalClose.addEventListener("click", closeSession);
if(modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeSession(); });

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("open")) closeSession();
    if (e.key === "/" && !modal?.classList.contains("open")) {
    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;
    e.preventDefault();
    document.getElementById("searchInput")?.focus();
    }
});

// Setup event delegation for dynamically created elements
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const tryBtn = target.closest("button[data-try]") as HTMLButtonElement | null;
    if (tryBtn) {
        openSession(tryBtn.dataset.name!, tryBtn.dataset.try!);
        return;
    }
    const favBtn = target.closest("button[data-fav]") as HTMLButtonElement | null;
    if (favBtn) {
        appStore.toggleFavorite(favBtn.dataset.fav!);
        return;
    }
});

// Initial Render
showSkeleton(10);
requestAnimationFrame(() => setTimeout(() => renderGrid(distrosObj), 80));
