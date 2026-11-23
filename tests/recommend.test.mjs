import { test } from "node:test";
import assert from "node:assert/strict";
import { enrichData } from "../src/domain/enrichment.ts";
import { rankDistros } from "../src/domain/recommend.ts";

const data = enrichData([
  { distro: "Débutant OS", base: "Ubuntu", audience: "Débutant", usage: "Bureau", points: "Bureau", technical: {base:"Ubuntu",packageManager:"APT",releaseModel:"stable / LTS",difficulty:"Débutant"} },
  { distro: "Serveur OS", base: "Arch", audience: "Expert", usage: "Serveur", points: "Serveur", technical: {base:"Arch",packageManager:"Pacman",releaseModel:"rolling",difficulty:"Expert"} }
]);
test("un profil débutant bureau privilégie un système accessible", () => {
  const sorted = rankDistros(data, {experience:"Débutant",usage:"Bureau",priority:"stable"});
  assert.equal(sorted[0].distro.distro, "Débutant OS");
  assert.ok(sorted[0].reasons.length > 0);
});
test("un profil expert serveur privilégie un système adapté", () => {
  const sorted = rankDistros(data, {experience:"Expert",usage:"Serveur",priority:"current"});
  assert.equal(sorted[0].distro.distro, "Serveur OS");
});
test("le résultat est déterministe", () => {
  const p = {experience:"Expert",usage:"Serveur",priority:"current"};
  assert.deepEqual(rankDistros(data,p),rankDistros(data,p));
});
