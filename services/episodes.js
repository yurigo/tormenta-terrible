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
function areEpisodesOk(episodes) {
  let failGracefully = 0;

  if (episodes.some((ep) => !ep.number || !ep.title || !ep.duration)) {
    console.warn("Some episodes are missing data");
    failGracefully++;
  }

  if (episodes.some((ep) => typeof ep.number !== "string")) {
    console.warn("Some episodes have the wrong type for number");
    failGracefully++;
  }

  if (episodes.some((ep) => typeof ep.duration !== "string")) {
    console.warn("Some episodes have the wrong type for title");
    failGracefully++;
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
    failGracefully++;
  }

  if (failGracefully > 0) {
    console.warn("Skipping processing episodes");
    return false;
  }

  return true;
}

export function processEpisodes(episodes) {
  if (!episodes || episodes.length === 0) return;

  if (!areEpisodesOk(episodes)) {
    return;
  }

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

  // Imprimir resultados
  console.log("Next episode number:", nextEpisodeNumber);
  console.log("Total duration of all episodes:", totalDuration);
  console.log("Number of the shortest episode:", shortestEpisode.number);
  console.log("Titles below 2 hours:", selectedTitles);
}
