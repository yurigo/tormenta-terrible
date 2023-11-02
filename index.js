import {
  fetchEpisodes,
  processEpisodes,
  printResults,
} from "./services/episodes.js";

let episodes = await fetchEpisodes();
printResults(processEpisodes(episodes));
