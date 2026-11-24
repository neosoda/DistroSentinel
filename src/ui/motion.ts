import { appStore } from "../store/state";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const compact = window.matchMedia("(max-width: 1199px)");
const mobile = window.matchMedia("(max-width: 600px)");
const motionAllowed = () => !reduced.matches && typeof Element.prototype.animate === "function";

export function animateFeedback(element: Element | null, kind: "pop" | "reveal" = "pop") {
  if (!element || !motionAllowed()) return;
  element.getAnimations().filter(a => a.id === "sentinel-feedback").forEach(a => a.cancel());
  const frames = kind === "pop"
    ? [{ transform: "scale(.86)" }, { transform: "scale(1.10)", offset: .58 }, { transform: "scale(1)" }]
    : [{ opacity: .68, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }];
  const animation = element.animate(frames, { duration: kind === "pop" ? 320 : 250, easing: "cubic-bezier(.22,1,.36,1)" });
  animation.id = "sentinel-feedback";
}

export function animateCatalogue(grid: HTMLElement, key: string) {
  if (grid.dataset.motionKey === key) return;
  grid.dataset.motionKey = key;
  if (!motionAllowed()) return;
  const items = grid.querySelectorAll<HTMLElement>(".catalogue-table tbody tr, :scope > .card, .empty-catalogue");
  items.forEach((item, index) => {
    item.animate([{ opacity: .55, transform: "translateY(7px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 240, delay: Math.min(index, 7) * 18, easing: "cubic-bezier(.22,1,.36,1)" });
  });
}

export function bindMotion() {
  const shell = document.querySelector<HTMLElement>(".dashboard-shell");
  const nav = document.querySelector<HTMLElement>(".nav-rail");
  const toggle = document.getElementById("navCollapse");
  const indicator = document.querySelector<HTMLElement>(".nav-indicator");
  if (!shell || !nav || !toggle || !indicator) return;
  let collapsed = false;
  try { collapsed = localStorage.getItem("dg_nav_compact") === "true"; } catch { /* optional */ }
  const catalogue = document.getElementById("railCatalogue");
  const favorites = document.getElementById("railFavorites");
  const advisor = document.getElementById("railAdvisor");
  const compare = document.getElementById("railCompare");
  const advisorDialog = document.getElementById("advisorDialog") as HTMLDialogElement;
  const compareDialog = document.getElementById("compareDialog") as HTMLDialogElement;
  let raf = 0;
  function updateIndicator() {
    const active = advisorDialog.open ? advisor : compareDialog.open ? compare : appStore.State.favOnly ? favorites : catalogue;
    nav!.querySelectorAll(".rail-link").forEach(link => link.classList.toggle("rail-current", link === active));
    catalogue?.setAttribute("aria-current", appStore.State.favOnly ? "false" : "location");
    if (!active) return;
    const box = active.getBoundingClientRect();
    const parent = nav!.getBoundingClientRect();
    indicator!.style.setProperty("--indicator-x", (box.left - parent.left - nav!.clientLeft) + "px");
    indicator!.style.setProperty("--indicator-y", (box.top - parent.top - nav!.clientTop) + "px");
    indicator!.style.width = box.width + "px";
    indicator!.style.height = box.height + "px";
    indicator!.classList.add("is-ready");
  }
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; updateIndicator(); });
  }
  function applyNav() {
    const narrow = !mobile.matches && (compact.matches || collapsed);
    shell!.classList.toggle("nav-compact", narrow);
    toggle!.setAttribute("aria-expanded", String(!narrow));
    toggle!.setAttribute("aria-label", narrow ? "Développer le menu" : "Réduire le menu");
    const label = toggle!.querySelector(".nav-text");
    if (label) label.textContent = narrow ? "Développer" : "Réduire";
    schedule();
  }
  toggle.addEventListener("click", () => {
    collapsed = !collapsed;
    try { localStorage.setItem("dg_nav_compact", String(collapsed)); } catch { /* optional */ }
    applyNav();
  });
  catalogue?.addEventListener("click", () => {
    if (appStore.State.favOnly) {
      const input = document.getElementById("favOnly") as HTMLInputElement;
      input.checked = false;
      input.dispatchEvent(new Event("change"));
    }
  });
  appStore.subscribe(schedule);
  const observer = new MutationObserver(schedule);
  [advisorDialog, compareDialog].forEach(dialog => observer.observe(dialog, { attributes: true, attributeFilter: ["open"] }));
  compact.addEventListener("change", applyNav);
  mobile.addEventListener("change", applyNav);
  new ResizeObserver(schedule).observe(nav);
  applyNav();
  updateIndicator();
  requestAnimationFrame(() => { nav.classList.add("motion-ready"); });

  const theme = document.getElementById("themeToggle");
  const syncTheme = () => {
    const light = document.body.classList.contains("light");
    theme?.setAttribute("aria-pressed", String(!light));
    theme?.setAttribute("aria-label", light ? "Activer le mode sombre" : "Activer le mode clair");
    theme?.setAttribute("title", light ? "Activer le mode sombre" : "Activer le mode clair");
  };
  syncTheme();
  theme?.addEventListener("click", () => {
    syncTheme();
    animateFeedback(theme.querySelector(".ui-icon"));
  });

  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const favorite = event.target.closest<HTMLButtonElement>("[data-fav]");
    if (favorite) {
      const name = favorite.dataset.fav;
      // The store replaces catalogue rows synchronously. Animate the new element, not the detached button.
      queueMicrotask(() => {
        const dialog = document.querySelector("dialog[open]");
        const scope = dialog || document.getElementById("gridContainer");
        const live = Array.from(scope?.querySelectorAll<HTMLButtonElement>("[data-fav]") || []).find(b => b.dataset.fav === name);
        animateFeedback(live?.querySelector(".ui-icon") || null);
      });
    }
  });

  // CSS handles the one-time entrance and hover states; no continuous requestAnimationFrame loop.
  document.body.classList.add("motion-ready");
}
