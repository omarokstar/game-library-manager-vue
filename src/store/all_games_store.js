import { defineStore } from 'pinia'
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
export const allgamesStore = defineStore('games', {
    state: () => ({ 
        
      allgames: [],
      allgamesLoading: false,
      originalgames: [],
      favourites: [],
      wishlist: [],
    
    
    }),
    getters: {
      
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


,
filterByGenre(selectedGenre) {
  if (!selectedGenre) {
      this.allgames = this.originalgames;
      return;
  }

  this.allgames = this.originalgames.filter((game) => {
      return game.Genres === selectedGenre;
  });
},

// toggleFavourite(game) {

//   const loggeduser = JSON.parse(localStorage.getItem('loggedInUser'));
//   if(!loggeduser){
//     alert("Please login to add to favourites")
//     return;
//   }
//   this.wishlist= loggeduser.wishlist;
//   console.log("logged user", loggeduser);
//   if (this.isFavourite(game)) {
  
//    this.wishlist = this.wishlist.filter(fav => fav.id !== game.id);
    

//     // this.favourites = this.favourites.filter(fav => fav.id !== game.id);
//   } else {
//     this.wishlist.push(game);
//     // this.favourites.push(game);
//   }
// },

// isFavourite(game) {
//   console.log(this.favourites);
//   return this.wishlist.some(fav => fav.id === game.id);
// },

toggleFavourite(game) {
  const loggeduser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggeduser) {
    toast.error('❌ Please login First to can add to favourites!');
    return;
  }

  const userKey = `wishlist_${loggeduser.username}`; 

  if (this.isFavourite(game)) {
    
    this.wishlist = this.wishlist.filter(fav => fav.id !== game.id);
    toast.success('🗑️ Game removed  from favourites!');
  } else {
    this.wishlist.push(game);
    toast.success('✔️ Game added to favourites!');
  }

  
  localStorage.setItem(userKey, JSON.stringify(this.wishlist));
},

isFavourite(game) {
  return this.wishlist.some(fav => fav.id === game.id);
},

loadWishlistFromStorage() {
  const loggeduser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggeduser) return;

  const userKey = `wishlist_${loggeduser.username}`;
  const savedWishlist = localStorage.getItem(userKey);
  this.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
},

    },

  })
