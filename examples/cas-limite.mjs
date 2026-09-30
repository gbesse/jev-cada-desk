// Cas limite : un précédent sans provenance suffisante n’est jamais envoyé à Jev.
import assert from "node:assert/strict";
import { triageRequest } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";

const demande = {
  id: "REQ-2",
  administration: "Ville Exemple",
  document: "Contrat public",
  receivedAt: "2026-09-01",
};
const jev = createFakeProvider(() => {
  throw new Error("Jev ne doit pas être appelé");
});
await assert.rejects(triageRequest(demande, {}, jev), /precedent/);
assert.equal(jev.calls, 0);
console.log(
  JSON.stringify(
    { gardeFou: "precedent_incomplet", appelsJev: jev.calls },
    null,
    2,
  ),
);
