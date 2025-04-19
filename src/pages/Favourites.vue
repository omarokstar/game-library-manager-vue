<template>
  <div class="d-flex">
    <main class="flex-grow-1">
      <div class="library-container">
        <div class="header">
          <div class="title1 overflow-auto">
            <h2>Your Games</h2>
          </div>
          <div class="title overflow-auto">
            <h1>Favourites</h1>
          </div>
        </div>

        <div class="search-wrapper flex-grow-1 d-flex align-items-center w-100 mb-4">
          <input
            type="text"
            class="form-control search-input p-2"
            placeholder="search a game..."
            v-model="searchText"
          />
          <button class="btn search-btn" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </div>

        <div class="filters position-relative">
          <select class="dropdown" v-model="selectedCategory">
            <option value="all">All games</option>
            <option value="favorites">Favorites</option>
          </select>

          <div class="genre-dropdown" ref="genreDropdown">
            <button class="dropdown genre-btn" @click="toggleGenreDropdown">
              Filters
            </button>
            <div v-if="showGenreDropdown" class="genre-list">
              <label v-for="genre in allGenres" :key="genre" class="genre-option">
                <input
                  type="checkbox"
                  :value="genre"
                  v-model="selectedGenres"
                />
                {{ genre }}
              </label>
            </div>
          </div>
        </div>

        <div v-if="filteredGames.length > 0" class="games-grid">
          <div v-for="game in filteredGames" :key="game.id" class="card game-card">
            <img :src="game.Image" class="card-img-top" :alt="game.Title" />
            <div class="card-body">
              <h5 class="card-title">{{ game.Title }}</h5>
              <div class="rating-container">
                <p class="card-text">★ {{ game.Rate }}</p>
                <button class="favorite-btn" @click="store.toggleFavourite(game)">
                  <i :class="store.isFavourite(game) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-library">
          <h2>Your favorites is empty</h2>
          <p>You don't have any games in your favorites.</p>
          <p>Try adding games to your favorites from the games page.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { allgamesStore } from '../store/all_games_store.js'; // Adjust the path if necessary

const store = allgamesStore();
const { allgames, favourites } = storeToRefs(store);

const searchText = ref('');
const selectedCategory = ref('all');
const showGenreDropdown = ref(false);
const selectedGenres = ref([]);
const genreDropdown = ref(null);

const allGenres = ref([
  "Adventure", "Arcade", "Audio Production", "Action", "Animation & Modeling", "Accounting",
  "Card & Board Game", "Casual", "Design & Illustration", "Early Access", "Education", "Fighting",
  "Free to Play", "Gore", "Game Development", "Hack and Slash/Beat 'em up", "Indie", "Music", "Moba",
  "Massively Multiplayer", "Nudity", "Point-and-click", "Platformer", "Puzzle", "Photo Editing",
  "Quiz/Trivia", "Racing", "Real Time Strategy (RTS)", "Role playing (RPG)", "RPG", "Shooter",
  "Simulator", "Sport", "Strategy", "Simulation", "Sports", "Software Training", "Sexual Content",
  "Turn-based strategy (TBS)", "Tactical", "Utilities", "Visual Novel", "Video Production", "Violent",
  "Web Publishing"
]);

onMounted(() => {
  store.fetchAllGames(); // Ensure games are loaded
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const toggleGenreDropdown = () => {
  showGenreDropdown.value = !showGenreDropdown.value;
};

const handleClickOutside = (event) => {
  if (genreDropdown.value && !genreDropdown.value.contains(event.target)) {
    showGenreDropdown.value = false;
  }
};

const filteredGames = computed(() => {
  let filtered = allgames.value;

  // Filter by selected category (all or favorites)
  if (selectedCategory.value === 'favorites') {
    filtered = filtered.filter(game => store.isFavourite(game));
  }

  // Filter by selected genres
  if (selectedGenres.value.length > 0) {
    filtered = filtered.filter(game =>
      selectedGenres.value.some(genre => {
        const gameGenres = Array.isArray(game.Genres) ? game.Genres : game.Genres?.split(',').map(g => g.trim());
        return gameGenres?.includes(genre);
      })
    );
  }

  // Filter by search text
  if (searchText.value) {
    filtered = filtered.filter(game =>
      game.Title.toLowerCase().includes(searchText.value.toLowerCase())
    );
  }

  return filtered;
});
</script>

<style scoped>
/* ... (rest of the CSS styles remain the same) ... */
.library-container {
  width: 100%;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  padding: 1rem;
}

.header h2 {
  font-size: 1rem;
  margin: 0;
}

.header h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.search-input {
  background-color: #fff;
  flex: 1;
  padding: 0.75rem;
  color: #000;
  border-radius: 6px;
  outline: none;
}

.search-btn {
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  background: #333;
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.dropdown {
  background-color: #1e1e2e;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #ffffff;
}

.genre-dropdown {
  position: relative;
}

.genre-btn {
  background-color: #1e1e2e;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.genre-list {
  position: absolute;
  top: 120%;
  left: 0;
  background-color: #1e1e2e;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  width: 250px;
  display: flex;
  flex-direction: column;
}

.genre-option {
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-size: 0.9rem;
}

.empty-library {
  padding: 3rem;
  text-align: center;
  border-radius: 10px;
}

.empty-library h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.games-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.game-card {
  position: relative;
  width: 200px;
  border: none;
  background-color: #1e1e2e;
  border-radius: 8px;
  overflow: hidden;
  color: #fff;
  transition: transform 0.2s ease-in-out;
}

.game-card:hover {
  transform: scale(1.05);
}

.card-img-top {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.rating-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.favorite-btn {
  background: transparent;
  border: none;
  color: #ff6b81;
  font-size: 1.3rem;
  cursor: pointer;
}

.card-body {
  padding: 0.75rem;
}

.card-title {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 0.85rem;
  margin-bottom: 0;
}
</style>