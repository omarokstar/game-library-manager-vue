<template>
  <div>
    <div class="title1 overflow-auto ">
      <h2 style="font-size: 20px;">Browsing</h2>
    </div>
    <div class="title overflow-auto">
      <h2 class="mb-1" style="font-size: 30px;">All Games</h2>
    </div>
   
    <div class="d-flex align-items-start mb-4 flex-wrap " style="margin-left:10px ;margin-top:10px">
  
      <div class="search-wrapper flex-grow-1 d-flex align-items-center w-100 mb-4">
        <input type="text" class="form-control search-input p-2" placeholder="search a game..."  v-model="searchText" />
        <button class="btn search-btn" type="submit">
          <i class="bi bi-search"></i>
        </button>
      </div>

      <div class="search-tags d-flex flex-wrap mb-4">
        <span class="tag"  @click="changeGenre('Adventure')"> Adventure</span>
        <span class="tag"  @click="changeGenre('Action')" >Action</span>
        <span class="tag"   @click="changeGenre('Platformer')">Platformer</span>
        <span class="tag"  @click="changeGenre('RPG')">RPG</span>
        <span class="tag"  @click="changeGenre('Shooter')">Shooter</span>
        <span class="tag"  @click="changeGenre('Gore')">Gore</span>
      </div>
    </div>

    <div class="cards-container">
    <div 
      class="card" 
      v-for="game in lazyLoadedGames" 
      :key="game.id"
      
    >
    <img 
  :src="game.Image" 
  alt="product image" 
  class="card-image" 
  @click="goToDetails(game.id)"
>
      <div class="card-footer  "  >
       
  <h3 class="card-title">{{ game.Title }}</h3>

      <div class="card-footer d-flex justify-content-between align-items-center">
        <p class="card-rating">★ {{ game.Rate }}</p>
        <button 
            class="fav-btn" 
            @click="store.toggleFavourite(game)"
            :class="{'fav-added': store.isFavourite(game)}"
          >
            <i class="bi" :class="store.isFavourite(game) ? 'bi-heart-fill' : 'bi-heart'"></i>
          </button>
      </div>
       
       
      </div>
    </div>
  </div>

    
  </div>
</template>
<script   setup>
import Game_Detailes from './Game_Detailes.vue';
import { storeToRefs } from 'pinia';
import{allgamesStore} from '../store/all_games_store.js'
import { onMounted,watch,ref, onUnmounted, computed } from 'vue';
import {useRoute} from "vue-router";
import { useRouter } from 'vue-router';
const store = allgamesStore();
const { allgames, allgamesLoading } = storeToRefs(store);
const route = useRoute();
const router = useRouter();

const genre = ref(route.query.genre || null);


console.log('list from fav:', store.favourites); 
const itemsToShow = ref(8); 
const increment = 4; 


const goToDetails = (id) => {
  router.push({ name: "Details", params: { id } });
};





const handleScroll = () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (bottomOfWindow && itemsToShow.value < store.allgames.length) {
    itemsToShow.value += increment;
    console.log('Loading more games: ', itemsToShow.value);
  }
};
onMounted(() => {
  store.fetchAllGames().then(() => {
    if (genre.value) {
      store.filterByGenre(genre.value);
    }
  });

  window.addEventListener('scroll', handleScroll);
});
const searchText = ref('');

watch([searchText  ],([newsearchText ]) => {
 
 

  store.filterGames(newsearchText);
 
});




watch(() => route.query.genre, (newGenre) => {
  genre.value = newGenre;
  store.filterByGenre(newGenre);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const changeGenre = (selectedGenre) => {
  if (genre.value === selectedGenre) {
    router.push({ query: {} }); 
  } else {
    router.push({ query: { genre: selectedGenre } });
  }
};

const lazyLoadedGames = computed(() => {
  return store.allgames.slice(0, itemsToShow.value);
});

</script>
<style >

.hover-scale:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
.title{
  margin-top: 5px;
  margin-left: 20px;
  color: white;
  font-size: 30px;
  font-weight: 900;
}
.title1{
  opacity: 0.2;
  font-weight: 900;
  margin-top: 20px;
  margin-left: 20px;
  color: white;
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 10px; 
}

.search-input {
  width: 95%;
  margin-left: 10px;
  border: 5px solid #0857b1;
  border-radius: 12px;
  color: #e7eaee;
  background: #e2e4e9f8;
  padding: .4rem .1rem;
  font-size: 1.1rem;
  transition: all 0.5s ease;
}

.search-input:focus {
  background: #1768fd;
  color: #e7eaee;
  border-color: #1919aa;
  box-shadow: 0 0 0 5px rgba(22, 25, 189, 0.2);
}

.search-input::placeholder {
  color: #e7eaee;
  opacity: .5;
}

.search-tags {
  gap: 0.5rem;
}

.tag {
  background: #010918da;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #e7eaee;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #020336;
  color: rgb(207, 19, 19);
  cursor: pointer;
}

.recent-searches {
  border-top: 2px solid #f3f4f6;
}

.recent-item {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.recent-item:hover {
  background: #f3f4f6;
  cursor: pointer;
}

.search-btn {
  border : 3px solid #040411 !important;
  color: #e7eaee!important;
  background: #010714da !important;
  padding: 0.6rem 1rem;
  display: flex !important;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}

.search-btn:hover {
 scale: 1.05;
  background: #010714da !important;
  color: rgb(207, 19, 19) !important;
  cursor: pointer;
}
.cards-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto; 
}
.cards-container {

  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  column-gap: 60px;
  row-gap : 40px;
  padding: 20px;

}

.card {
  background: transparent !important;
  width: 200px !important;
  height: 330px !important;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  border-radius: 12px;
  overflow: hidden;
  color: white !important;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(3, 4, 32, 0.6);

}

.card-image {
  width: 100%;
  height:250px;
  object-fit: cover;
}

.card-footer {
  position:  relative;
  width: 100%;
  height: 0px;

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



.fav-btn {
  background: transparent;
  border: none;
  color: #e7eaee;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.fav-btn:hover {
  color: #ff6b6b;
}

.fav-added {
  color: #ff6b6b;
}


</style>
