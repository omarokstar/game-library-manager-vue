import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Favourites from "../pages/Favourites.vue";
import List from "../pages/List.vue";
import Genres from "../pages/Genres.vue";
import AllGames from "../pages/AllGames.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/favourites", name: "Favourites", component: Favourites },
  { path: "/list", name: "List", component: List },
  { path: "/genres", name: "Genres", component: Genres },
  { path: "/all-games", name: "AllGames", component: AllGames },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;