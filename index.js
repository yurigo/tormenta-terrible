import {
  fetchEpisodes,
  processEpisodes,
  printResults,
} from "./services/episodes.js";

const episodes = await fetchEpisodes();

printResults(processEpisodes(episodes));
