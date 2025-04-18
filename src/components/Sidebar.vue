<template>
  <div>
    <button
      class="btn btn-outline-light m-2 d-md-none"
      @click="toggleSidebar"
    >
      <i class="fas fa-bars"></i>
    </button>

    <div
      class="sidebar bg-dark text-light p-3"
      :class="{ 'd-none': !isSidebarVisible && isSmallScreen, 'd-md-block': true }"
    >
      <div class="text-center mb-4">
        <router-link to="/">
          <img
            src="@/assets/image.png"
            alt="Logo"
            class="my-image img-fluid rounded-circle"
          />
        </router-link>
      </div>

      <div>
        <h6 class="text-uppercase">Explore</h6>
        <ul class="list-unstyled">
          <li>
            <router-link to="/all-games" class="text-decoration-none text-light">
              <i class="fas fa-gamepad me-3"></i> All Games
            </router-link>
          </li>
          <li>
            <router-link to="/genres" class="text-decoration-none text-light">
              <i class="fas fa-layer-group me-3"></i> Genres
            </router-link>
          </li>
        </ul>
      </div>

      <hr />

      <div>
        <h6 class="text-uppercase">Your Games</h6>
        <ul class="list-unstyled">
          <li>
            <router-link to="/favourites" class="text-decoration-none text-light">
              <i class="fa-solid fa-heart me-3"></i> Favourites
            </router-link>
          </li>
          <li>
            <router-link to="/list" class="text-decoration-none text-light">
              <i class="fas fa-list me-3"></i> List
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isSidebarVisible = ref(true);
const isSmallScreen = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

onMounted(() => {
  const checkScreen = () => {
    isSmallScreen.value = window.innerWidth < 768;
  };
  checkScreen();
  window.addEventListener("resize", checkScreen);
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  border: 0.5px solid gray;
  border-radius: 1%;
  margin: 5px;

  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
}

.sidebar h6 {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #c1c1c7;
  font-weight: 700;
}

.sidebar ul li {
  margin-bottom: 0.8rem;
  transition: background-color 0.3s ease;
}

.sidebar ul li:hover {
  border-radius: 5%;
  background-color: rgb(68, 68, 68);
}
</style>
