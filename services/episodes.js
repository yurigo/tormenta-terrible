const API_URL =
  "https://tormenta-codigo-app-terrible.vercel.app/api/podcast/terrible";

export async function fetchEpisodes() {
  try {
    const response = await fetch(API_URL);
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error fetching the episodes:", error);
    return [];
  }
}

/*
 *   number no se encuentra en el objeto
 *   title no se encuentra en el objeto
 *   duration no se encuentra en el objeto
 *   el tipo de number no es correcto
 *   el tipo de duration no es correcto
 *   supercoco existe en el objeto (y no debería?)
 */
export function areEpisodesOk(episodes) {
  console.log();

  let failGracefully = 0;

  if (episodes.some((ep) => !ep.number || !ep.title)) {
    console.warn("Some episodes are missing (non critical) data");
    // failGracefully++;
  }

  if (episodes.some((ep) => !ep.duration)) {
    console.error("Some episodes don't have duration (critical)");
    failGracefully++;
  }

  if (episodes.some((ep) => typeof ep.number !== "string")) {
    console.warn("Some episodes have the wrong type for number (non critical)");
    // failGracefully++;
  }

  if (episodes.some((ep) => typeof ep.duration !== "string")) {
    console.error("Some episodes have the wrong type for duration");
    // failGracefully++;
  }

  const expectedKeys = [
    "number",
    "title",
    "excerpt",
    "published_at",
    "duration",
    "id",
  ];

  const extraKeys = episodes.some((ep) => {
    const keys = Object.keys(ep);
    return keys.some((key) => !expectedKeys.includes(key));
  });

  if (extraKeys) {
    console.warn("Some episodes have extra properties");
    //failGracefully++; <-- it doesn't matter if there are extra properties
  }

  console.log();

  if (failGracefully > 0) {
    console.error("Señor Iguiñez, dejese de tonterías");
    console.log();
    return false;
  }

  return true;
}

/**
 * Esta función recibe un episodio e intenta arreglar los campos que no están bien.
 * Si no puede arreglarlo, lanza un error.
 * Si el episodio no tiene duration pero sí supercoco se tratará de usar supercoco como duration.
 * El elemento más complicado para arreglar es el duration.
 * duration puede ser un string o un número. Si es un string es correcto. Si es un número, hay que convertirlo a string
 * y solamente quedarse con los 4 primeros caracteres.
 * @param {*} episode
 * @returns
 */
export function fixEpisode(episode, index, episodes) {
  console.log(`Arreglando episodio (${index + 1}/${episodes.length})`);
  episode.number = episode.number?.toString();
  episode.title = episode.title?.toString();

  if (episode.number === undefined) {
    console.error("ERROR: No hay numero");

    console.log("Prediciendo número...");
    episode.number = predecirNumero(episode, index, episodes);

    if (episode.number === undefined) {
      console.error("❌ FATAL: No se ha podido predecir el número");
      console.error();
      return { broken: true };
    }

    console.log(`  ✅: Predecido: ${episode.number}`);
  }

  if (episode.title === undefined) {
    const number = episode.number;
    episode.title = `WRP ${number}. TITULO_${number}_NO_DISPONIBLE`;

    console.log("⚠: Titulo no disponible.  Generando título: ", episode.title);
  }

  // if (!(episode.duration || episode.supercoco)) {
  //   console.error("❌ FATAL: No hay duración (ni supercoco)");
  //   console.error();

  //   return { broken: true };
  // }

  // console.log("supercoco: ", episode.supercoco);
  // console.log("duration: ", episode.duration);

  if (!episode.duration) {
    console.error("⚠: No hay duración");

    console.log("Prediciendo duración...");
    episode.duration = predecirDuracion(episode);

    if (episode.duration === undefined) {
      console.error("❌ FATAL: No se ha podido predecir la duración");
      console.error();

      return { broken: true };
    }

    delete episode?.supercoco;

    console.log(`  ✅: Predecido: ${episode.duration}`);
  }

  episode.duration = episode.duration?.toString().substring(0, 4);

  console.log("🦄 Arreglado! 🦄");
  console.log();

  return episode;
}

function extraerNumeroDeTitulo(episode) {
  const number = episode.title?.match(/\d+/)?.[0];
  return number;
}

function predecirDuracion(episode) {
  if (episode?.supercoco) console.log("  ✅: Usando supercoco como duración");

  return episode?.supercoco;
}

function extraerNumeroDeAnteriores(episodes, index) {
  let numero = undefined;
  let i = 1;
  while (numero === undefined) {
    if (i > 100) {
      break;
    }
    numero = Number(episodes[index - i]?.number) - i;
    i++;
  }
  return numero;
}

function extraerNumeroDePosteriores(episodes, index) {
  let numero = undefined;
  let i = 1;
  while (numero === undefined) {
    if (i > 100) {
      break;
    }
    numero = Number(episodes[index + i]?.number) + i;
    i++;
  }
  return numero;
}

function predecirNumero(episode, index, episodes) {
  // console.log(index, episode);
  // console.log(index, episodes[index - 1]);
  // console.log(index, episodes[index + 1]);

  let numero = undefined;
  let i = 1;

  console.log("  Extrayendo numero de título... ");
  numero = extraerNumeroDeTitulo(episode);
  if (numero) return numero;

  console.log("  ❌: No se ha podido extraer el número del título");
  console.log("  Probando con episodios anteriores...");

  numero = extraerNumeroDeAnteriores(episodes, index);
  if (numero) return numero;

  console.log("  ❌: No se ha podido predecir el número");
  console.log("  Probando con episodios posteriores...");

  numero = extraerNumeroDePosteriores(episodes, index);
  if (numero) return numero;

  console.log("  ❌: No se ha podido predecir el número");

  return numero;
}

export function fixEpisodes(episodes) {
  console.log(`Arreglando episodios... (${episodes.length})`);
  return episodes.map(fixEpisode);
}

function filterNotFixed(episodes) {
  return episodes.filter((ep) => !ep.broken);
}

export function processEpisodes(episodes) {
  if (!episodes || episodes.length === 0) return;

  if (!areEpisodesOk(episodes)) {
    try {
      episodes = fixEpisodes(episodes);
      const totalCountEpisodes = episodes.length;

      episodes = filterNotFixed(episodes);
      const fixedCountEpisodes = episodes.length;

      console.log();

      console.log(
        "Se han arreglado",
        fixedCountEpisodes,
        "episodios de",
        totalCountEpisodes
      );

      console.log(
        "No se han podido arreglar: ",
        totalCountEpisodes - fixedCountEpisodes
      );

      console.log();
    } catch (error) {
      console.error(
        "Error intentado arreglar episodios:",
        error.message,
        error
      );
      console.warn("Skipping processing episodes");
      return;
    }
  }

  console.log();

  // Convertir duration a números y ordenar episodios por number
  episodes.forEach((ep) => (ep.duration = parseInt(ep.duration, 10)));
  episodes.sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10));

  // Calcular el siguiente episode number
  const nextEpisodeNumber =
    parseInt(episodes[episodes.length - 1].number, 10) + 1;

  // Calcular la suma total de duration
  const totalDuration = episodes.reduce((sum, ep) => sum + ep.duration, 0);

  // Encontrar el episode más corto
  const shortestEpisode = episodes.reduce(
    (shortest, ep) => (ep.duration < shortest.duration ? ep : shortest),
    episodes[0]
  );

  // Crear una lista aleatoria y seleccionar titles de episodios que sumen menos de 2 horas
  const shuffledEpisodes = episodes.sort(() => Math.random() - 0.5);
  const twoHourLimit = 2 * 60 * 60; // 2 horas en segundos
  let durationSum = 0;
  const selectedTitles = [];
  for (const ep of shuffledEpisodes) {
    if (durationSum + ep.duration <= twoHourLimit) {
      durationSum += ep.duration;
      selectedTitles.push(ep.title);
    }
  }

  return {
    nextEpisodeNumber,
    totalDuration,
    shortestEpisode,
    selectedTitles,
  };
}

export function printResults(results) {
  if (!results) return;

  console.log("Next episode number:", results.nextEpisodeNumber);
  console.log("Total duration:", results.totalDuration);
  console.log("Shortest episode:", results.shortestEpisode.title);
  console.log("Selected titles:", results.selectedTitles);
}
