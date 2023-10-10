import { fetchEpisodes, processEpisodes } from "./services/episodes.js";

const episodes = await fetchEpisodes();
processEpisodes(episodes);
