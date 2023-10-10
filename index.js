import {
  fetchEpisodes,
  areEpisodesOk,
  processEpisodes,
  printResults,
} from "./services/episodes.js";

let episodes;

while (true) {
  episodes = await fetchEpisodes();
  if (areEpisodesOk(episodes)) break;
}

printResults(processEpisodes(episodes));
