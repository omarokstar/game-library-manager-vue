<template>
    
    <div class="text-white p-4">
      <h2>My List: {{ selectedList?.name }}</h2>
      <p>{{ selectedList?.description }}</p>
  
      <div class="container">
        <div class="left-side">
        <h3>Games in this list:</h3>
        <div class="cards-container">
          <div class="card" v-for="game in gamesInList" :key="game.id">
            <img :src="game.Image" class="card-image" />
            <div class="card-footer">
              <h3 class="card-title">{{ game.Title }}</h3>
            </div>
            <button class="remove-btn" @click="removeFromList(game)">
              <i class="bi bi-x-circle"></i>
            </button>
          </div>
        </div>
    </div>

    <div class="right-side">
          <h3>All Games:</h3>
          <input 
            type="text" 
            v-model="searchTerm" 
            class="search-bar" 
            placeholder="Search for games..."
          />
          <div class="allGames-container">
              <div class="list-card"  v-for="game in filteredGames" :key="game.id">
            <div class="list-details">
            <h3>{{ game.Title }}</h3>
            <img :src="game.Image" class="list-image" />
                
            </div>
            <button class="fav-btn" @click="addToList(game)">
             <i class="bi bi-plus-circle"></i>
              </button>

            </div>
           </div>
                    
            </div>

      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  
  const selectedList = ref(null)
  const allgames = ref([])
  const searchTerm = ref('')
  
  onMounted(async () => {
    await fetchSelectedList(route.params.id)
    await fetchAllGames()
  })
  
  const fetchSelectedList = async (listId) => {
    try {
      const response = await axios.get(`http://localhost:3000/lists/${listId}`)
      selectedList.value = response.data
    } catch (error) {
      console.error("Error fetching list:", error)
    }
  }
  
  const fetchAllGames = async () => {
    try {
      const response = await axios.get('http://localhost:3000/games')
      allgames.value = response.data
    } catch (error) {
      console.error("Error fetching games:", error)
    }
  }
  
  const gamesInList = computed(() => {
    if (!selectedList.value) return []
    return allgames.value.filter(game =>
      selectedList.value.games.includes(game.id)
    )
  })
  
  const filteredGames = computed(() => {
    if (!searchTerm.value) return allgames.value
    return allgames.value.filter(game =>
      game.Title.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })
  
  const addToList = async (game) => {
    const listId = selectedList.value?.id
    if (listId && game.id) {
      try {
        await axios.patch(`http://localhost:3000/lists/${listId}`, {
          games: [...selectedList.value.games, game.id]
        })
        selectedList.value.games.push(game.id) 
      } catch (error) {
        console.error("Error adding game to list:", error)
      }
    }
  }
  const removeFromList = async (game) => {
  const listId = selectedList.value?.id
  if (listId && game.id) {
    try {
      const updatedGames = selectedList.value.games.filter(
        (gameId) => gameId !== game.id
      )

      await axios.patch(`http://localhost:3000/lists/${listId}`, {
        games: updatedGames
      })

      selectedList.value.games = updatedGames
    } catch (error) {
      console.error("Error removing game from list:", error)
    }
  }
}
  </script>
  
  <style scoped>
  .container {
    display: flex;
    gap: 30px; 
    margin-top: 20px;
  }
  
  .left-side {
    flex: 1; 
  }
  
  .right-side {
    flex: 1; 
      max-width: 500px;

  }
  
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
  }
  .remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #f44336;
  font-size: 1.5rem;
  cursor: pointer;
}

.remove-btn:hover {
  color: #d32f2f;
}

  
  .card {
    width: 180px;
    background: #2a2a40;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    
  }
  .allGames-container {
  max-height: 500px; 
  overflow-y: auto; 
  margin-top: 20px;
}
  
  .card-image {
    width: 100%;
    border-radius: 5px;
  }
  
  .card-footer {
    margin-top: 10px;
  }
  
  .card-title {
    font-size: 0.9rem;
    color: #fff;
  }
  
  .fav-btn {
    background: none;
    border: none;
    color: #3b82f6;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .fav-btn:hover {
    color: #2563eb;
  }
  
  .card .fav-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .search-bar {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #2a2a40;
    color: white;
  }
  .list-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e2a;
  padding: 15px;
  border-radius: 10px;
  color: #fff;
  margin-bottom: 10px;
}

.list-details h3 {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #fff;
}
.list-image  {
    width: 25%;
}


.list-details p {
  font-size: 0.8rem;
  color: #c1c1c7;
}

  </style>
  