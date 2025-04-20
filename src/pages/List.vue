
<template>
  <div class="body-wrapper">
    <div class="header-card">
      <h2>Your lists</h2>
      <p>
        Lists are the perfect way to organize your games exactly how you want. Create as many lists as you need - like
        "Favorite RPGs" or "Local Co-op Games". You can add games to multiple lists, giving you complete flexibility in
        how you organize your collection of games.
      </p>
      <p>
        While states (like "Playing" or "Completed") are used to track your progress and help generate personalized
        recommendations, lists are your personal way to group games however you prefer. Think of them like playlists - 
        a game can only have one state, but it can be part of as many lists as you want.
      </p>
      <p>
        You can create both private lists that stay on your device and public lists to share with the community (coming 
        soon!). Whether you're organizing games by genre, mood, or your own unique categories, lists give you the freedom 
        to arrange your games your way.
      </p>
    </div>

    <button class="create-list-button"  @click="showModal.value = true ">Create a new list</button>

    <div class="list-card"  v-for="(list, index) in lists" :key="index">

      <div class="list-details"  @click="$router.push(`/mylist/${list.id}`)">
        <h3>{{ list.name }}</h3>
        <p v-if="list.description">{{ list.description }}</p>
        <p>
        </p>
      </div>
      <div class="action-menu">
  <i class="fa-solid fa-trash text-danger" @click="confirmDelete(list)"></i>
</div>

    </div>
<div class="mycontent">
 
  
</div>


<<div v-if="showModal.value" class="modal-overlay" @click="closeModal">
  <div class="modal-content" @click.stop>
    <div class="modal-header">
      <h5>Create a new list</h5>
      <button type="button" class="close-btn" @click="closeModal">&times;</button>
    </div>
    <div class="modal-body">
      <form @submit.prevent="addList">
        <div class="form-group">
          <label for="listName">Name your list</label>
          <input
            type="text"
            class="form-control"
            v-model="newList.name"
            id="listName"
            required
          />
        </div>
        <div class="form-group">
          <label for="listDescription">Description</label>
          <textarea
            type="text"
            class="form-control"
            v-model="newList.description"
            id="listDescription"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Save List</button>
      </form>
    </div>
  </div>
</div>

</div>
<div v-if="showDeleteConfirm" class="modal-overlay" @click="cancelDelete">
  <div class="modal-content" @click.stop>
    <div class="modal-header">
      <h5>Confirm Delete</h5>
      <button class="close-btn" @click="cancelDelete">&times;</button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete <strong>{{ selectedItem?.name }}</strong>?</p>
      <button class="btn btn-danger" @click="deleteConfirmed">Yes, Delete</button>
      <button class="btn btn-secondary" @click="cancelDelete">Cancel</button>
    </div>
  </div>
</div>


</template>

<script setup>
import { reactive } from 'vue'
import { useListStore } from '@/store/listStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const store = useListStore()
const { lists } = storeToRefs(store)

onMounted(() => {
  store.fetchLists()
})


const newList = reactive({
name: "",
description: "",

})

const showModal = reactive({
value: false
})


async function addList() {
  await axios.post('http://localhost:3000/lists', {
    name: newList.name,
    description: newList.description,
    games: []
  })
  newList.name = ""
  newList.description = ""
  showModal.value = false
  await store.fetchLists()
}


function closeModal() {
showModal.value = false
}

const selectedItem = ref(null);
const showDeleteConfirm = ref(false);

function confirmDelete(item) {
  selectedItem.value = item;
  showDeleteConfirm.value = true;
}

async function deleteConfirmed() {
  await axios.delete(`http://localhost:3000/lists/${selectedItem.value.id}`)
  showDeleteConfirm.value = false
  selectedItem.value = null
  await store.fetchLists()
}


function cancelDelete() {
  showDeleteConfirm.value = false;
  selectedItem.value = null;
}

</script>

<style scoped>
.btn-danger {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #c62828;
}

.btn-secondary {
  background-color: #9e9e9e;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #757575;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background-color: #2a2a40;
  color: #fff;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  padding: 30px; 
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}


.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.close-btn:hover {
  color: #ff4081; 
}

.modal-body {
  padding: 20px 0; 
}


.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 1rem;
  margin-bottom: 5px;
}


.form-control {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}


.btn-primary {
  background-color: #3b82f6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}

.btn-primary:hover {
  background-color: #2563eb;
}
.mycontent {
display: flex;
justify-content: center;
align-self: start;
margin-top: 20px;
}

.book-container {
max-width: 800px;
margin: 0 auto;
text-align: center;
}

.title {
color: crimson;
margin-bottom: 1rem;
}

table {
margin: 0 auto;
width: 100%;
max-width: 700px;
}

.add-book {
margin-top: 20px;
background-color: blueviolet;
border: none;
}

.body-wrapper {
max-width: 800px;
margin: 0 auto;
text-align: center;
padding: 20px;
}
.your-lists-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.header-card {
  background-color: #18181d;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.header-card h2 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 15px;
}

.header-card p {
  font-size: 0.9rem;
  color: #c1c1c7;
  line-height: 1.6;
  margin-bottom: 10px;
}

.create-list-button {
  display: block;
  width: fit-content;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

.create-list-button:hover {
  background-color: #2563eb;
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
  cursor: pointer;

}

.list-details p {
  font-size: 0.8rem;
  color: #c1c1c7;
}

.dot {
  margin: 0 5px;
  color: #c1c1c7;
}

.action-menu {
  font-size: 1.2rem;
  color: #c1c1c7;
  cursor: pointer;
}

.action-menu:hover {
  color: #fff;
}
</style>
