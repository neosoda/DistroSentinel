import { test } from "node:test";
import assert from "node:assert/strict";
import { enrichedDistros } from "../src/data/rawDistros.ts";
import { enrichData } from "../src/domain/enrichment.ts";

test("le catalogue ne contient pas de noms en doublon", () => {
  const names = enrichedDistros.map(x => x.distro.trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase());
  assert.equal(new Set(names).size, names.length);
});
test("les forces et limites proposées restent issues des données cataloguées", () => {
  const raw = { distro:"Test", base:"Arch", audience:"Débutant", usage:"Bureau", points:"Constat documenté", whyChoose:["Atout déclaré"], limitations:["Limite déclarée"] };
  const enriched = enrichData([raw])[0];
  assert.ok(enriched.strengths.includes("Atout déclaré"));
  assert.equal(enriched.weakness, "Limite déclarée");
  assert.ok(!enriched.strengths.includes("Stabilité + dépôts énormes"));
});
test("aucune limite n'est inventée quand elle manque", () => {
  const [item] = enrichData([{distro:"Inconnue",base:"Linux",audience:"Tous",usage:"Bureau",points:"À étudier"}]);
  assert.equal(item.weakness,"Non renseigné");
});
