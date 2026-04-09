import { AppState } from "../types";

const LS = {
  theme: "dg_theme",
  favs: "dg_favs"
};

type Listener = () => void;
class Store {
  private state: AppState;
  private listeners: Set<Listener> = new Set();
  
  constructor() {
    this.state = {
      search: "",
      family: "all",
      level: "all",
      tags: new Set<string>(),
      mode: "all",
      sort: "relevance",
      favOnly: false,
      matchAllTags: false,
      favorites: new Set<string>(JSON.parse(localStorage.getItem(LS.favs) || "[]"))
    };
  }

  get State() {
    return this.state;
  }

  update(partial: Partial<AppState>) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  toggleFavorite(distroName: string) {
    const newFavs = new Set(this.state.favorites);
    if (newFavs.has(distroName)) {
      newFavs.delete(distroName);
    } else {
      newFavs.add(distroName);
    }
    this.state.favorites = newFavs;
    localStorage.setItem(LS.favs, JSON.stringify(Array.from(newFavs)));
    this.notify();
  }

  toggleTag(tag: string) {
    const newTags = new Set(this.state.tags);
    if (newTags.has(tag)) {
        newTags.delete(tag);
    } else {
        newTags.add(tag);
    }
    this.state.tags = newTags;
    this.notify();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  getTheme(): string {
    return localStorage.getItem(LS.theme) || "dark";
  }

  setTheme(mode: string) {
    localStorage.setItem(LS.theme, mode);
  }
}

export const appStore = new Store();
