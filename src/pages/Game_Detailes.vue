<template>
  <div class="details-wrapper">
    <transition name="fade" v-if="selectedGame">
      <div class="modal-content">
        <div class="modal-left">
          <img :src="selectedGame.Image" class="modal-img-main" />
        </div>

        <div class="modal-right">
          <transition name="slide-top">
            <div class="modal-header">
              <h1>{{ selectedGame.Title }}</h1>
              <div class="game-meta">
                <span>2019</span>
                <span>★ {{ selectedGame.Rate }}</span>
                <span>{{ selectedGame.Genres || 'Indie' }}</span>
              </div>
            </div>
          </transition>

          <transition name="slide-bottom">
            <div class="action-buttons">
              <button class="btn-assign-state">Assign a state</button>
              <button class="btn-fav-modal">
                <i class="bi bi-heart"></i>
              </button>
            </div>
          </transition>

          <transition name="slide-right">
            <div class="info-section">
              <h4>General Information</h4>
              <p>{{ selectedGame.Description || 'Shoot, stab, burn, poison, tear, vaporise, or crush ragdolls in a large open space.' }}</p>
              <button class="btn-steam"><i class="bi bi-steam"></i> Steam store</button>
            </div>
          </transition>

          <transition name="slide-right">
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
          </transition>

          <transition name="slide-right">
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
          </transition>
        </div>
      </div>
    </transition>
    <div v-else class="loading">Loading game details...</div>
  </div>
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
  padding: 50px;
  background-color: rgb(36, 36, 36);
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.modal-content {
  display: flex;
  gap: 30px;
  background-color: rgb(10, 10, 10 ,0.8);
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.9);
  border-radius: 20px;
  padding: 20px;
}

.modal-left,
.modal-right {
  flex: 1;
}

.modal-left {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-img-main {
  width: 100%;
  max-width: 400px;
  max-height: 500px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.9);
  animation: imagePop 0.8s ease-out;
}

.modal-img-main:hover {
  transform: scale( 1.06) rotate(15deg) translateY(10px) !important; 
  filter: brightness(1.5);
  transition: transform 0.3s ease;
}
@keyframes imagePop {
  0% {
    transform: scale(0.8) rotate(-5deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.modal-header h1,
.info-section h4,
.scores-section h4,
.genres-release-section h4 {
  margin-bottom: 10px;
  font-size: 20px;
  color: #ffcc00;
}

.modal-header h1 {
  font-size: 28px;
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
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-assign-state:hover,
.btn-fav-modal:hover,
.btn-steam:hover {
  background-color: #3c4048;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.btn-assign-state::after,
.btn-fav-modal::after,
.btn-steam::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.btn-assign-state:hover::after,
.btn-fav-modal:hover::after,
.btn-steam:hover::after {
  width: 200px;
  height: 200px;
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
  transition: transform 0.3s ease;
}

.score-box:hover {
  transform: scale(1.05);
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
  animation: progressFill 1.5s ease-in-out;
}

@keyframes progressFill {
  0% {
    width: 0;
  }
  100% {
    width: 98%;
  }
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
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

/* Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-top-enter-active,
.slide-bottom-enter-active {
  transition: all 0.6s ease;
}

.slide-right-leave-active,
.slide-top-leave-active,
.slide-bottom-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.slide-top-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.slide-top-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.slide-bottom-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.slide-bottom-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>