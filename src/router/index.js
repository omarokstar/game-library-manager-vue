import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Favourites from "../pages/Favourites.vue";
import List from "../pages/List.vue";
import Genres from "../pages/Genres.vue";
import AllGames from "../pages/AllGames.vue";
import MyList from "@/pages/MyList.vue";
import SignUp from "../pages/SignUp.vue";
import Login from "../pages/Login.vue";
import Game_Detailes from "../pages/Game_Detailes.vue";
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/favourites", name: "Favourites", component: Favourites },
  { path: "/list", name: "List", component: List },
  { path: "/genres", name: "Genres", component: Genres },
  { path: "/all-games", name: "AllGames", component: AllGames },
  {
    path: "/games-details/:id",
    name: "Details", 
    component: Game_Detailes
  },
  { path: "/sign-up", name: "SignUp", component: SignUp },
  { path: "/login", name: "Login", component: Login },
  {
    path: '/mylist/:id',
    name: 'MyList',
    component:MyList
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;