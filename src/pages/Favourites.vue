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

        <!-- Search Bar -->
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

        <!-- Filters -->
        <div class="filters position-relative">
          <select class="dropdown" v-model="selectedCategory">
            <option value="all">All games</option>
            <option value="favorites">Favorites</option>
          </select>

          <!-- Genre Filter Dropdown -->
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

        <!-- Games Section -->
        <div v-if="filteredGames.length > 0" class="games-grid">
          <div v-for="game in filteredGames" :key="game.id" class="game-card">
            <img :src="game.Image" :alt="game.Title" />
            <div class="game-info">
              <h3>{{ game.Title }}</h3>
              <p>★ {{ game.Rate }}</p>
            </div>
          </div>
        </div>

        <!-- Empty Library Message -->
        <div v-else class="empty-library">
          <h2>Your favorites is empty</h2>
          <p>You don't have any games in your favorites.</p>
          <p>Try importing your Steam games or add any game you want from games page.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      selectedCategory: 'all',
      showGenreDropdown: false,
      selectedGenres: [],
      games: [],
      allGenres: [
        "Adventure", "Arcade", "Audio Production", "Action", "Animation & Modeling", "Accounting",
        "Card & Board Game", "Casual", "Design & Illustration", "Early Access", "Education", "Fighting",
        "Free to Play", "Gore", "Game Development", "Hack and Slash/Beat 'em up", "Indie", "Music", "Moba",
        "Massively Multiplayer", "Nudity", "Point-and-click", "Platformer", "Puzzle", "Photo Editing", 
        "Quiz/Trivia", "Racing", "Real Time Strategy (RTS)", "Role playing (RPG)", "RPG", "Shooter",
        "Simulator", "Sport", "Strategy", "Simulation", "Sports", "Software Training", "Sexual Content",
        "Turn-based strategy (TBS)", "Tactical", "Utilities", "Visual Novel", "Video Production", "Violent",
        "Web Publishing"
      ]
    };
  },
  mounted() {
    this.fetchGames();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    fetchGames() {
      fetch('../../db.json')
        .then(response => response.json())
        .then(data => {
          this.games = data.games;
        })
        .catch(error => console.error('Error loading games:', error));
    },
    toggleGenreDropdown() {
      this.showGenreDropdown = !this.showGenreDropdown;
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.genreDropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.showGenreDropdown = false;
      }
    }
  },
  computed: {
    filteredGames() {
      let filtered = this.games;

      // Filter by category
      if (this.selectedCategory === 'favorites') {
        filtered = filtered.filter(game => game.favorite);
      }

      // Filter by selected genres
      if (this.selectedGenres.length > 0) {
        filtered = filtered.filter(game =>
          this.selectedGenres.some(genre =>
            Array.isArray(game.Genres)
              ? game.Genres.includes(genre) // If Genre is an array
              : game.Genres?.split(',').map(g => g.trim()).includes(genre) // If Genre is a string
          )
        );
      }

      // Filter by search text
      if (this.searchText) {
        filtered = filtered.filter(game =>
          game.Title.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }

      return filtered;
    }
  }
};
</script>

<style scoped>
.library-container {
  width: 100%;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
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
  background-color:#fff;
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
  padding: 1rem;
  width: 200px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.game-card:hover {
  transform: scale(1.05);
}

.game-card img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.game-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.game-info p {
  font-size: 1.2rem;
  color: #fff;
  margin: 0;
}
</style>
