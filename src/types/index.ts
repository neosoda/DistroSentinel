export interface RawDistro {
  distro: string;
  base: string;
  audience: string;
  points: string;
  usage: string;
}

export interface EnrichedDistro extends RawDistro {
  family: string;
  level: string;
  tags: string[];
  strengths: string[];
  weakness: string;
  mode: string;
  fallbackColor: string;
  initials: string;
  logoUrl: string;
  distroSeaUrl: string;
  downloadLink: string;
}

export type Family = "Debian" | "RPM" | "Arch" | "BSD" | "Indep" | "all";
export type Level = "Débutant" | "Intermédiaire" | "Expert" | "all";
export type ViewMode = "pro" | "pedago" | "all";
export type SortOption = "relevance" | "name" | "level" | "family";

export interface AppState {
  search: string;
  family: Family;
  level: Level;
  tags: Set<string>;
  mode: ViewMode;
  sort: SortOption;
  favOnly: boolean;
  matchAllTags: boolean;
  favorites: Set<string>;
}
