// src/stores/listStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useListStore = defineStore('listStore', {
  state: () => ({
    lists: [],
    selectedList: null
  }),

  actions: {
    async fetchLists() {
      const res = await axios.get('http://localhost:3000/lists')
      this.lists = res.data
    },

    async getList(id) {
      const res = await axios.get(`http://localhost:3000/lists/${id}`)
      this.selectedList = res.data
    },

    async addGameToList(listId, gameId) {
      const list = this.lists.find(l => l.id === listId)
      if (list && !list.games.includes(gameId)) {
        list.games.push(gameId)
        await axios.patch(`http://localhost:3000/lists/${listId}`, {
          games: list.games
        })
        this.getList(listId) // refresh
      }
    }
  }
})
