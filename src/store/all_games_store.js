import { defineStore } from 'pinia'
import { ref } from 'vue';

export const allgamesStore = defineStore('games', {
    state: () => ({ 
        
      allgames: [],
      allgamesLoading: false,
      originalgames: [],
    
    
    }),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
     async fetchAllGames() {
        this.allgamesLoading = true;
        try {
          const response = await fetch('http://localhost:3000/games', {
            method: 'GET',
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
            const data = await response.json();
            console.log(data);
            this.allgames = data;
            this.originalgames = data;
            console.log(this.allgames);
            this.allgamesLoading = false;
            console.log(this.allgames);
            return this.allgames;
        } catch (error) {
            console.error('Error fetching all games:', error);
            this.allgamesLoading = false;
           
        }
        }
,
         filterGames(textsearch){

            if(!textsearch){
                this.allgames =  this.originalgames;
                return;
                }
            this.allgames =   this.originalgames.filter((game) => {
                return game.Title.toLowerCase().includes(textsearch.toLowerCase());
        }
    )
}







    },

  })
