import { test } from "vitest";
import { episodes } from "./__mocks__/episodes.js";
import { processEpisodes } from "../services/episodes.js";

test("processEpisodes", async (t) => {
  const processEpisodeObject = processEpisodes(episodes);
  const example = {
    nextEpisodeNumber: 267,
    totalDuration: 153949,
    shortestEpisode: {
      number: "240",
      title: "WRP 240. La importancia de saber decir No",
      excerpt: "Una estrategia para lograr propósitos: Saying No.",
      published_at: 1680676252,
      duration: 1779,
      id: "BNDv7ReKDZP2Gnrd9k/Aa1DQjgP452JEqm5Nd",
    },
    selectedTitles: [
      "WRP 262. SEO, bots, IA, programación nocturna y una gran respuesta de Pantic",
      "WRP 241. Cómo dejar atrás tu perfil de developer desfasado",
    ],
  };

  t.expect(processEpisodeObject).toHaveProperty("nextEpisodeNumber");
  t.expect(processEpisodeObject.nextEpisodeNumber).toBe(267);

  t.expect(processEpisodeObject).toHaveProperty("totalDuration");
  t.expect(processEpisodeObject.totalDuration).toBe(153949);

  t.expect(processEpisodeObject).toHaveProperty("shortestEpisode");
  t.expect(processEpisodeObject.shortestEpisode).toEqual(
    example.shortestEpisode
  );

  t.expect(processEpisodeObject).toHaveProperty("selectedTitles");
  t.expect(Array.isArray(processEpisodeObject.selectedTitles)).toBe(true);
});
