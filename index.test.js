import { test, vi } from "vitest";
import { fetchEpisodes } from "./services/episodes.js";

test("fetchEpisodes should handle errors gracefully", async (t) => {
  // Mock the fetch function to simulate a network error
  const spy = vi
    .spyOn(global, "fetch")
    .mockImplementationOnce(() => Promise.reject("Network error"));

  const episodes = await fetchEpisodes();

  t.expect(spy).toHaveBeenCalled();
  t.expect(episodes.length).toBe(0);
});

// sigle fetch please
const episodes = await fetchEpisodes();

test("fetchEpisodes should return an array of episodes", async (t) => {
  // const episodes = await fetchEpisodes();
  t.expect(Array.isArray(episodes)).ok;
});

test("fetchEpisodes should return an array of episodes greater than 0", async (t) => {
  // const episodes = await fetchEpisodes();
  t.expect(episodes.length).toBeGreaterThan(0);
});

// const episodeExample = {
//   number: "266",
//   title: "WRP 266. \u00bfCliente o servidor? \u00bfFront o Back?",
//   excerpt:
//     "Casos pr\u00e1cticos para entender y dar forma a la arquitectura m\u00e1s t\u00edpica en web.",
//   published_at: 1696460166,
//   duration: "2558",
//   id: "BNDv7ReKDZP2Gnrd9k/W6ADGpkPRj6Prl3nXR",
// };

const firstEpisode = episodes[0];

console.log(firstEpisode);

test("number, title, excerpt, published_at, duration, id exists", (t) => {
  t.expect(firstEpisode.number).toBeDefined();
  t.expect(firstEpisode.title).toBeDefined();
  t.expect(firstEpisode.excerpt).toBeDefined();
  t.expect(firstEpisode.published_at).toBeDefined();
  t.expect(firstEpisode.duration).toBeDefined();
  t.expect(firstEpisode.id).toBeDefined();
});

test("number is the correct type", (t) => {
  t.expect(typeof firstEpisode.number).toBe("string");
});

test("title is the correct type", (t) => {
  t.expect(typeof firstEpisode.title).toBe("string");
});

test("excerpt is the correct type", (t) => {
  t.expect(typeof firstEpisode.excerpt).toBe("string");
});

test("published_at is the correct type", (t) => {
  t.expect(typeof firstEpisode.published_at).toBe("number");
});

test("duration is the correct type", (t) => {
  t.expect(typeof firstEpisode.duration).toBe("string");
});

test("id is the correct type", (t) => {
  t.expect(typeof firstEpisode.id).toBe("string");
});
