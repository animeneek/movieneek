const API_TOKEN = "YOUR_TMDB_READ_ACCESS_TOKEN"; // paste your token here
const IMG_BASE = "https://image.tmdb.org/t/p/original";
const FALLBACK = "assets/images/prabhas_01.jpg";

// Fetch trending movies
async function getTrending() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  });
  return res.json();
}

// Set hero section
function setHero(movie) {
  const hero = document.getElementById("hero");
  const title = document.getElementById("hero-title");
  const overview = document.getElementById("hero-overview");
  const watchBtn = document.getElementById("watch-btn");

  const bg = movie.backdrop_path
    ? `${IMG_BASE}${movie.backdrop_path}`
    : FALLBACK;

  hero.style.backgroundImage = `url('${bg}')`;
  title.textContent = movie.title;
  overview.textContent = movie.overview;

  watchBtn.href = `movie.html?id=${movie.id}`;
}

// Create movie cards
function createCard(movie) {
  const img = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : FALLBACK;

  return `
    <a href="movie.html?id=${movie.id}" class="min-w-[150px]">
      <img src="${img}" class="rounded-lg hover:scale-105 transition">
      <p class="mt-2 text-sm">${movie.title}</p>
    </a>
  `;
}

// Load page
async function init() {
  const data = await getTrending();

  if (!data.results) return;

  setHero(data.results[0]);

  const row = document.getElementById("movie-row");
  data.results.forEach(movie => {
    row.innerHTML += createCard(movie);
  });
}

init();
