<template>
  <div class="container my-5">
    <div class="row align-items-center wrapper">
      <div class="col-md-6 text-center text-md-start mb-4 mb-md-0">
        <h1>End Game</h1>
        <p class="text-light">
          Free and open-source library manager for all your games. All data is
          saved locally in your browser, without any cookies or trackers.
        </p>
        <p class="text-info mt-3">Popular games in recent years</p>
        <button class="button">Browse games</button>
      </div>

      <div class="col-md-6 d-flex justify-content-center">
        <div class="circular-container">
          <div
            v-for="(game, index) in games"
            :key="index"
            class="my-card"
            :style="getCardTransform(index)"
          >
            <img :src="game.Image" :alt="game.Title" />
          </div>
        </div>
      </div>
    </div>

    <div class="hot-games-section">
      <h2>🔥 Top Rating Games 🔥</h2>
      <p>Top-rated games in recent years</p>
      <div class="games-container">
        <div v-for="(game, index) in games" :key="index" class="game-card">
          <img :src="game.Image" :alt="game.Title" />
          <h3>{{ game.Title }}</h3>
          <span>⭐ {{ game.Rate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Home',
  setup() {
    const games = ref([]);
    const rotation = ref(0);
    const radius = 150;

    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/games');
        const TopRatingGames = response.data.filter((img) => img.Rate > 90);
        games.value = TopRatingGames.slice(0, 7);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const getCardTransform = (index) => {
      const totalItems = games.value.length;
      const angle =
        (2 * Math.PI * index) / totalItems + (rotation.value * Math.PI) / 180;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return {
        transform: `translate(${x}px, ${y}px)`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-15px',
        marginTop: '-22.5px',
      };
    };

    onMounted(() => {
      fetchGames();
      setInterval(() => {
        rotation.value += 1;
      }, 30);
    });

    return {
      games,
      rotation,
      getCardTransform,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #1c1c1e;
  color: #fff;
}

.wrapper {
  width: 100%;
  height: 50vh;
  display: flex;
  background: #181833;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 2rem;
  overflow: hidden;
}

.hero {
  flex: 1;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
}

.hero p {
  margin: 1rem 0;
  color: #ccc;
  font-size: 1.2rem;
}

button {
  background-color: #8e44ad;
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 0.5rem;
}

.default-button {
  background-color: #fff;
  color: #333;
}

.right-rotator {
  flex: 1;
  width: 100%;
  height: 50vh;
  text-align: center;
  justify-content: center;
  position: relative;
}

.circular-container {
  width: 200px;
  height: 200px;
  position: relative;
}

.my-card {
  width: 100px;
  height: 100px;
  position: absolute;
  transition: transform 0.3s;
}

.my-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
}

.my-card:hover {
  transform: scale(1.2) !important;
  z-index: 2;
}

@media (max-width: 768px) {
  .circular-container {
    display: none;
  }
  .games-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-x: auto;
  gap: 1.5rem;
}


  
}




.cards-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  flex-wrap: wrap;
  justify-content: left;
  column-gap: 60px;
  row-gap: 40px;
  padding: 20px;
}

.card {
  background: transparent !important;
  width: 200px !important;
  height: 310px !important;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  overflow: hidden;
  color: white !important;
  transition: transform 0.3s ease;
}

.card-image {
  width: 100%;
  height: calc(90% - 40px);
  object-fit: cover;
}

.card-footer {
  position: relative;
  width: 100%;
  height: 20px;
  color: rgb(255, 255, 255) !important;
  padding: 10px;
  box-sizing: border-box;
  bottom: 0;
}

.card-title {
  margin: 0;
  font-size: 16px;
  font-family: sans-serif;
}

.card-rating {
  margin: 5px 0 0 0;
  font-size: 14px;
  font-family: sans-serif;
}

.hot-games-section {
  text-align: center;
  color: #fff;
  margin: 2rem 0;
}

.hot-games-section h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.hot-games-section p {
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 1.5rem;
}

.games-container {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

.game-card {
  background: transparent !important;
  width: 200px !important;
  height: 310px !important;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  overflow: hidden;
  color: white !important;
  transition: transform 0.3s ease;
}

.game-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(3, 4, 32, 0.6);
}

.game-card img {
  width: 100%;
  height: calc(90% - 40px);
  object-fit: cover;
}

.game-card h3 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.game-card span {
  color: #ffd700;
  font-size: 0.9rem;
}
</style>
