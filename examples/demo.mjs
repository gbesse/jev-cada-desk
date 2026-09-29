// Objectif : démontrer la frontière de décision sans appel réseau.
import assert from "node:assert/strict";
import { triageRequest } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const provider = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: {
    outcome: {
      type: "choice",
      choice: "favorable_with_redactions",
      probabilities: {
        favorable: 0.12,
        favorable_with_redactions: 0.72,
        unfavorable: 0.06,
        out_of_scope: 0.02,
        unclear: 0.08,
      },
      confidence: 0.72,
    },
    analogy: {
      type: "score",
      score: 2,
      probabilities: { 0: 0.05, 1: 0.15, 2: 0.72, 3: 0.08 },
      confidence: 0.72,
    },
  },
  usage: { input_tokens: 75, output_tokens: 0 },
}));
const request = {
  id: "REQ-1",
  administration: "Ville Exemple",
  document: "Contrat public et annexes",
  receivedAt: "2026-09-01",
};
const precedent = {
  reference: "SYNTHETIC-2026",
  sessionDate: "2026-06-01",
  administration: "Commune",
  theme: "Marchés publics",
  keywords: ["contrat"],
  conclusion: "Favorable sous réserves",
  text: "Le contrat est communicable après occultation des secrets protégés.",
  sourceUrl: "https://www.cada.fr/",
};
const resultat = await triageRequest(request, precedent, provider);
assert.equal(resultat.outcome, "favorable_with_redactions");
console.log(JSON.stringify(resultat, null, 2));
