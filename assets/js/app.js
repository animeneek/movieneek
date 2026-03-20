// TMDB API Config
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2FmZDRjODllMzM1MWVkYWQ5ZTg3NWZmN2EwMWYwYyIsIm5iZiI6MTYwMDU0MjUxMy43MSwic3ViIjoiNWY2NjU3MzE5NDVjMjAwMDM2ZTUzMTYxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qLW32OxtnY1tuk7fT68UKQhYjoNRTmhGaMvjsD0-Qfs";
const IMG_BASE = "https://image.tmdb.org/t/p/original";
const FALLBACK = "assets/images/Prabhas_01.jpg";

// Fetch trending movies + TV
async function getTrending() {
  const res = await fetch("https://api.themoviedb.org/3/trending/all/week", {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  return res.json();
}

// Set hero section with first movie
function setHero(movie) {
  const hero = document.getElementById("hero");
  const title = document.getElementById("hero-title");
  const overview = document.getElementById("hero-overview");
  const watchBtn = document.getElementById("watch-btn");

  const bg = movie.backdrop_path ? `${IMG_BASE}${movie.backdrop_path}` : FALLBACK;
  hero.style.backgroundImage = `url('${bg}')`;

  title.textContent = movie.title || movie.name;
  overview.textContent = movie.overview || "No description available.";

  watchBtn.href = movie.media_type === "tv"
    ? `series.html?id=${movie.id}`
    : `movie.html?id=${movie.id}`;
}

// Create a single movie card
function createCard(movie) {
  const img = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : FALLBACK;
  const link = movie.media_type === "tv"
    ? `series.html?id=${movie.id}`
    : `movie.html?id=${movie.id}`;

  return `
    <a href="${link}" class="min-w-[150px] flex-shrink-0">
      <img src="${img}" class="rounded-lg hover:scale-105 transition">
      <p class="mt-2 text-sm">${movie.title || movie.name}</p>
    </a>
  `;
}

// Initialize page
async function init() {
  try {
    const data = await getTrending();
    if (!data.results || data.results.length === 0) return;

    // Optionally filter only movies for hero & cards
    const movieList = data.results.filter(item => item.media_type === "movie");

    // Hero
    setHero(movieList[0]);

    // Movie cards
    const row = document.getElementById("movie-row");
    row.innerHTML = movieList.map(createCard).join('');
  } catch (err) {
    console.error("Error loading movies:", err);
  }
}

// Run
init();
