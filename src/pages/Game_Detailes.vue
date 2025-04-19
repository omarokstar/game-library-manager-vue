<template>
    <div v-if="selectedGame" class="details-wrapper">
      <div class="modal-content">
        <div class="modal-left">
          <img :src="selectedGame.Image" class="modal-img-main" />
          <div class="your-game-section">
            <h4>Your game</h4>
            <ul>
              <li><i class="bi bi-pin-angle"></i> Pinned</li>
              <li><i class="bi bi-circle"></i> Without a state</li>
              <li><i class="bi bi-play-circle"></i> Not played</li>
              <li><i class="bi bi-journal-x"></i> Not in your library</li>
            </ul>
            <div class="game-timestamps">
              <p>In Backlog since July 6, 2024</p> 
              <p>Updated November 12, 2024</p> 
              <p><a href="#">Edit missing or wrong data on IGDB</a></p> 
            </div>
          </div>
        </div>
  
        <div class="modal-right">
          <div class="modal-header">
            <h1>{{ selectedGame.Title }}</h1>
            <div class="game-meta">
              <span>2019</span> 
              <span>★ {{ selectedGame.Rate }}</span>
              <span>{{ selectedGame.Genres || 'Indie' }}</span> 
            </div>
          </div>
  
          <div class="action-buttons">
            <button class="btn-assign-state">Assign a state</button>
            <button class="btn-fav-modal">
              <i class="bi bi-heart"></i>
            </button>
          </div>
  
          <div class="info-section">
            <h4>General Information</h4>
            <p>{{ selectedGame.Description || 'Shoot, stab, burn, poison, tear, vaporise, or crush ragdolls in a large open space.' }}</p>
            <button class="btn-steam"><i class="bi bi-steam"></i> Steam store</button>
          </div>
  
          <div class="scores-section">
            <h4>Scores</h4>
            <div class="scores-container">
              <div class="score-box">
                <div class="score-value">★ {{ selectedGame.Rate }}</div>
                <div class="score-label">Median score</div>
              </div>
              <div class="score-box score-box-positive">
                <div class="score-rating">Overwhelmingly Positive</div> 
                <div class="score-progress">
                  <div class="progress-bar" :style="{ width: '98%' }"></div>
                </div>
                <div class="score-details">98% of 240.7K</div>
              </div>
            </div>
          </div>
  
          <div class="genres-release-section">
            <div>
              <h4>GENRES</h4>
              <p>{{ selectedGame.Genres || 'Indie, Action, Casual, Simulation' }}</p>
            </div>
            <div>
              <h4>RELEASE DATE</h4>
              <p>July 23, 2019</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div v-else class="loading">Loading game details...</div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { onMounted, computed } from 'vue';
  import { allgamesStore } from '../store/all_games_store';
  
  const route = useRoute();
  const gamesStore = allgamesStore();
  
  onMounted(() => {
    if (gamesStore.allgames.length === 0) {
      gamesStore.fetchAllGames();
    }
  });
  
  const selectedGame = computed(() => {
    return gamesStore.allgames.find(game => game.id === route.params.id);
  });
  </script>
  
  <style scoped>
  .details-wrapper {
    padding: 20px;
    background-color: #121212;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .modal-content {
    display: flex;
    gap: 30px;
    background-color: #1e1e1e;
    border-radius: 10px;
    padding: 20px;
  }
  
  .modal-left, .modal-right {
    flex: 1;
  }
  
  .modal-img-main {
    width: 100%;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .your-game-section h4,
  .modal-header h1,
  .info-section h4,
  .scores-section h4,
  .genres-release-section h4 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #ffcc00;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .game-timestamps p {
    margin: 5px 0;
    font-size: 13px;
    color: #bbb;
  }
  
  .game-timestamps a {
    color: #61dafb;
    text-decoration: underline;
  }
  
  .modal-header h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .game-meta span {
    margin-right: 15px;
    font-size: 14px;
    color: #ccc;
  }
  
  .action-buttons {
    margin: 20px 0;
    display: flex;
    gap: 10px;
  }
  
  .btn-assign-state,
  .btn-fav-modal,
  .btn-steam {
    background-color: #282c34;
    border: none;
    padding: 10px 16px;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn-assign-state:hover,
  .btn-fav-modal:hover,
  .btn-steam:hover {
    background-color: #3c4048;
  }
  
  .scores-container {
    display: flex;
    gap: 20px;
    margin-top: 15px;
  }
  
  .score-box {
    background-color: #2a2a2a;
    padding: 12px;
    border-radius: 8px;
    flex: 1;
    text-align: center;
  }
  
  .score-box-positive {
    border: 1px solid #00c853;
  }
  
  .score-value {
    font-size: 22px;
    color: #ffeb3b;
  }
  
  .score-rating {
    color: #00e676;
    font-weight: bold;
  }
  
  .score-progress {
    background: #333;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin: 8px 0;
  }
  
  .progress-bar {
    height: 100%;
    background: #00e676;
    border-radius: 4px;
  }
  
  .score-details {
    font-size: 12px;
    color: #ccc;
  }
  
  .genres-release-section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .loading {
    text-align: center;
    padding: 50px;
    font-size: 20px;
    color: #888;
  }
  </style>
  