const API_TOKEN = "e3afd4c89e3351edad9e875ff7a01f0c";
const IMG_BASE = "https://image.tmdb.org/t/p/original";
const FALLBACK = "assets/images/Prabhas_01.jpg";

// Fetch trending movies
async function getTrending() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  });

  return res.json();
}

// Hero section
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

  watchBtn.href = `movie.html?id=${movie.id}`;
}

// Movie cards
function createCard(movie) {
  const img = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : FALLBACK;

  return `
    <a href="movie.html?id=${movie.id}" class="min-w-[150px]">
      <img src="${img}" class="rounded-lg hover:scale-105 transition">
      <p class="mt-2 text-sm">${movie.title || movie.name}</p>
    </a>
  `;
}

// Init
async function init() {
  try {
    const data = await getTrending();

    if (!data.results) {
      console.error("No results from TMDB");
      return;
    }

    setHero(data.results[0]);

    const row = document.getElementById("movie-row");

    data.results.forEach(movie => {
      row.innerHTML += createCard(movie);
    });

  } catch (err) {
    console.error("Error loading movies:", err);
  }
}

init();
