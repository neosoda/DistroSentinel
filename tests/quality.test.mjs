import { test } from "node:test";
import assert from "node:assert/strict";
import { fuzzyScore, escapeHtml } from "../src/utils/helpers.ts";
import { enrichData } from "../src/domain/enrichment.ts";
import { getFilteredAndSortedData } from "../src/domain/filter.ts";

const raw = [
  { distro: "Ubuntu", base: "Ubuntu", audience: "Débutant", points: "Bureau accessible", usage: "Bureau" },
  { distro: "Arch Linux", base: "Arch", audience: "Expert", points: "Personnalisation", usage: "Développement" },
  { distro: "École Linux", base: "Debian", audience: "Éducation", points: "Apprentissage", usage: "École" }
];
const state = () => ({
  search: "", family: "all", level: "all", tags: new Set(),
  mode: "all", sort: "relevance", favOnly: false,
  matchAllTags: false, favorites: new Set()
});

test("la recherche vide conserve le catalogue", () => {
  assert.equal(getFilteredAndSortedData(enrichData(raw), state()).length, raw.length);
});
test("la recherche ignore accents et casse", () => {
  assert.ok(fuzzyScore("École Linux", "ecole") > 0);
  assert.ok(fuzzyScore("Ubuntu", "UBUNTU") > 0);
  assert.equal(fuzzyScore("Ubuntu", "zxyzzz"), 0);
});
test("les filtres se combinent avec les favoris", () => {
  const s = state();
  s.family = "Arch";
  s.favOnly = true;
  s.favorites.add("Arch Linux");
  assert.deepEqual(getFilteredAndSortedData(enrichData(raw), s).map(d => d.distro), ["Arch Linux"]);
});
test("aucun lien Google ne remplace une source absente", () => {
  assert.equal(enrichData(raw).find(d => d.distro === "École Linux")?.downloadLink, "");
});
test("l'échappement neutralise le HTML", () => {
  assert.equal(escapeHtml("<img onerror='x'>"), "&lt;img onerror=&#039;x&#039;&gt;");
});
test("les doublons sont éliminés par nom", () => {
  assert.equal(enrichData([raw[0], raw[0]]).length, 1);
});
