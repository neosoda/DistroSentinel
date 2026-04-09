export type Difficulty = "Débutant" | "Intermédiaire" | "Avancé" | "Expert";

export interface RawDistro {
  distro: string;
  base: string;
  audience: string;
  points: string;
  usage: string;
  description?: string;
  forWho?: string;
  whyChoose?: string[];
  limitations?: string[];
  useCases?: string[];
  technical?: {
    base: string;
    packageManager: string;
    releaseModel: string;
    difficulty: Difficulty | string;
  };
}

export interface EnrichedDistro {
  distro: string;
  base: string;
  audience: string;
  points: string;
  usage: string;
  description: string;
  forWho: string;
  whyChoose: string[];
  limitations: string[];
  useCases: string[];
  technical: {
    base: string;
    packageManager: string;
    releaseModel: string;
    difficulty: Difficulty | string;
  };

  // Generated UI and enrichment fields from domain logic
  family?: string;
  level?: string;
  tags?: string[];
  strengths?: string[];
  weakness?: string;
  mode?: string;
  fallbackColor?: string;
  initials?: string;
  logoUrl?: string;
  distroSeaUrl?: string;
  downloadLink?: string;
  fiche?: string;
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
