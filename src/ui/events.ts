import { appStore } from "../store/state";
import { debounce } from "../utils/helpers";
import { Family, Level, ViewMode, SortOption } from "../types";

export function bindAllEvents() {
  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  if(searchInput) {
    searchInput.addEventListener("input", debounce((e: Event) => {
      const target = e.target as HTMLInputElement;
      appStore.update({ search: target.value });
    }, 220));
  }

  function setActive(groupId: string, button: HTMLElement) {
    document.querySelectorAll(`#${groupId} .filter-btn`).forEach(b => b.classList.remove("active"));
    button.classList.add("active");
  }

  const familyFilters = document.getElementById("familyFilters");
  if(familyFilters) {
    familyFilters.addEventListener("click", (e) => {
      const b = (e.target as HTMLElement).closest("button[data-filter]") as HTMLElement;
      if (!b) return;
      setActive("familyFilters", b);
      appStore.update({ family: b.dataset.filter as Family });
    });
  }

  const levelFilters = document.getElementById("levelFilters");
  if(levelFilters) {
    levelFilters.addEventListener("click", (e) => {
      const b = (e.target as HTMLElement).closest("button[data-filter]") as HTMLElement;
      if (!b) return;
      setActive("levelFilters", b);
      appStore.update({ level: b.dataset.filter as Level });
    });
  }

  const usageFilters = document.getElementById("usageFilters");
  if(usageFilters) {
    usageFilters.addEventListener("click", (e) => {
      const b = (e.target as HTMLElement).closest("button[data-tag]") as HTMLElement;
      if (!b) return;
      const tag = b.dataset.tag!;
      appStore.toggleTag(tag);
      if (appStore.State.tags.has(tag)) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
  }

  const modeFilters = document.getElementById("modeFilters");
  if(modeFilters) {
    modeFilters.addEventListener("click", (e) => {
      const b = (e.target as HTMLElement).closest("button[data-mode]") as HTMLElement;
      if (!b) return;
      setActive("modeFilters", b);
      appStore.update({ mode: b.dataset.mode as ViewMode });
    });
  }

  const sortSelect = document.getElementById("sortSelect") as HTMLSelectElement;
  if(sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      appStore.update({ sort: target.value as SortOption });
    });
  }

  const favOnlyCb = document.getElementById("favOnly") as HTMLInputElement;
  if(favOnlyCb) {
    favOnlyCb.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      appStore.update({ favOnly: target.checked });
    });
  }

  const matchAllTagsCb = document.getElementById("matchAllTags") as HTMLInputElement;
  if(matchAllTagsCb) {
    matchAllTagsCb.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      appStore.update({ matchAllTags: target.checked });
    });
  }

  const themeToggle = document.getElementById("themeToggle");
  if(themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light");
      const nextTheme = isLight ? "dark" : "light";
      if(nextTheme === "light") document.body.classList.add("light");
      else document.body.classList.remove("light");
      appStore.setTheme(nextTheme);
    });
    
    // Init theme
    if(appStore.getTheme() === "light") {
        document.body.classList.add("light");
    } else {
        document.body.classList.remove("light");
    }
  }
}
