import { test, vi } from "vitest";
import { fetchEpisodes } from "../services/episodes.js";

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

// const wrongEpisodeExample = {
//   number: "266",
//   title: "WRP 266. \u00bfCliente o servidor? \u00bfFront o Back?",
//   excerpt:
//     "Casos pr\u00e1cticos para entender y dar forma a la arquitectura m\u00e1s t\u00edpica en web.",
//   published_at: 1696460166,
//   id: "BNDv7ReKDZP2Gnrd9k/W6ADGpkPRj6Prl3nXR",
//   supercoco: 2558086972,
// };

const firstEpisode = episodes[0];

test("The episode only has the properties we expect", (t) => {
  const correctKeys = [
    "number",
    "title",
    "excerpt",
    "published_at",
    "duration",
    "id",
  ];

  // const keys = Object.keys(firstEpisode);
  // const wrongKey = keys.find((key) => !correctKeys.includes(key));
  // console.log("Wrong key:", wrongKey);

  t.expect(Object.keys(firstEpisode)).toEqual(correctKeys);
});

const hasTitle = Object.keys(firstEpisode).includes("title");
const hasDuration = Object.keys(firstEpisode).includes("duration");
const hasNumber = Object.keys(firstEpisode).includes("number");
const hasId = Object.keys(firstEpisode).includes("id");
const hasExcerpt = Object.keys(firstEpisode).includes("excerpt");
const hasPublishedAt = Object.keys(firstEpisode).includes("published_at");

test.runIf(hasNumber)("number is the correct type", (t) => {
  t.expect(typeof firstEpisode.number).toBe("string");
});

test.runIf(hasTitle)("title is the correct type", (t) => {
  t.expect(typeof firstEpisode.title).toBe("string");
});

test.runIf(hasExcerpt)("excerpt is the correct type", (t) => {
  t.expect(typeof firstEpisode.excerpt).toBe("string");
});

test.runIf(hasPublishedAt)("published_at is the correct type", (t) => {
  t.expect(typeof firstEpisode.published_at).toBe("number");
});

test.runIf(hasDuration)("duration is the correct type", (t) => {
  t.expect(typeof firstEpisode.duration).toBe("string");
});

test.runIf(hasId)("id is the correct type", (t) => {
  t.expect(typeof firstEpisode.id).toBe("string");
});
