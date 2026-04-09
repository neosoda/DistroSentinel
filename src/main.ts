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

// Setup event delegation for dynamically created elements
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const tryBtn = target.closest("button[data-try]") as HTMLButtonElement | null;
    if (tryBtn) {
        // DistroSea blocks iframes via X-Frame-Options: Deny. 
        // Staff+ Decision: Direct external link for better reliability and security.
        window.open(tryBtn.dataset.try!, '_blank', 'noopener,noreferrer');
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
