const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2FmZDRjODllMzM1MWVkYWQ5ZTg3NWZmN2EwMWYwYyIsIm5iZiI6MTYwMDU0MjUxMy43MSwic3ViIjoiNWY2NjU3MzE5NDVjMjAwMDM2ZTUzMTYxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qLW32OxtnY1tuk7fT68UKQhYjoNRTmhGaMvjsD0-Qfs";

const IMG_BASE = "https://image.tmdb.org/t/p/original";
const FALLBACK = "assets/images/Prabhas_01.jpg";

// Fetch trending (movies + TV)
async function getTrending() {
  const res = await fetch("https://api.themoviedb.org/3/trending/all/week", {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  });

  return res.json();
}

// Hero
function setHero(movie) {
  const hero = document.getElementById("hero");
  const title = document.getElementById("hero-title");
  const overview = document.getElementById("hero-overview");
  const watchBtn = document.getElementById("watch-btn");

  const bg = movie.backdrop_path
    ? `${IMG_BASE}${movie.backdrop_path}`
    : FALLBACK;

  hero.style.backgroundImage = `url('${bg}')`;

  title.textContent = movie.title || movie.name;
  overview.textContent = movie.overview || "No description available.";

  // 👇 IMPORTANT: route based on type
  if (movie.media_type === "tv") {
    watchBtn.href = `series.html?id=${movie.id}`;
  } else {
    watchBtn.href = `movie.html?id=${movie.id}`;
  }
}

// Cards
function createCard(movie) {
  const img = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : FALLBACK;

  const link =
    movie.media_type === "tv"
      ? `series.html?id=${movie.id}`
      : `movie.html?id=${movie.id}`;

  return `
    <a href="${link}" class="min-w-[150px]">
      <img src="${img}" class="rounded-lg hover:scale-105 transition">
      <p class="mt-2 text-sm">${movie.title || movie.name}</p>
    </a>
  `;
}

// Init
async function init() {
  try {
    const data = await getTrending();

    console.log("TMDB DATA:", data); // debug

    if (!data.results || data.results.length === 0) {
      console.error("No results from TMDB");
      return;
    }

    setHero(data.results[0]);

    const row = document.getElementById("movie-row");
    row.innerHTML = "";

    data.results.forEach(movie => {
      row.innerHTML += createCard(movie);
    });

  } catch (err) {
    console.error("Error loading movies:", err);
  }
}

init();
