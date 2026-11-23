import { bindAllEvents } from "./ui/events";
import { bindDecisionTools, syncCompareUI } from "./ui/decision";
import { bindExportEvents } from "./utils/export";
import { enrichData } from "./domain/enrichment";
import { enrichedDistros } from "./data/rawDistros";
import { renderGrid, showSkeleton } from "./ui/render";
import { appStore } from "./store/state";
import "../style.css"; // Imported for Vite

// Boot Process
const distrosObj = enrichData(enrichedDistros);

// Initialize UI binding
bindAllEvents();
bindExportEvents(distrosObj);
bindDecisionTools(distrosObj);

// Connect UI to Global state Reactivity
appStore.subscribe(() => {
    renderGrid(distrosObj);
    syncCompareUI();
});

// Setup event delegation for dynamically created elements
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const tryBtn = target.closest("button[data-try]") as HTMLButtonElement | null;
    if (tryBtn) {
        // DistroSea blocks iframes via X-Frame-Options: Deny. 
        // Staff+ Decision: Direct external link for better reliability and security.
        const url = tryBtn.dataset.try;
        if (url?.startsWith('https://distrosea.com/')) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
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
requestAnimationFrame(() => setTimeout(() => {
    renderGrid(distrosObj);
    syncCompareUI();
}, 80));
