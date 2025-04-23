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
        <div>
          <div v-if="userStore.isUserLogin">
          <a @click="logout" class="text-decoration-none text-light" style="cursor: pointer;">
            <i class="fas fa-user me-3"></i> Logout
          </a>
        </div>
        <div v-else>
          <router-link to="/login" class="text-decoration-none text-light">
            <i class="fas fa-user me-3"></i> Login
          </router-link>
        </div>
           


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
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const router = useRouter();
const isUserLogin = ref(false);

const logout = () => {
  userStore.logout();
  toast.warning('👋 Logged out successfully. See you next time!');
};


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