<template>
  <div class="body-wrapper" v-if="userStore.isUserLogin">
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

    <button class="create-list-button" @click="showModal.value = true">Create a new list</button>

    <div class="pagination-controls">
      <label for="itemsPerPage">Items per page:</label>
      <select id="itemsPerPage" v-model="itemsPerPage">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="15">15</option>
      </select>
    </div>

    <div class="list-card" v-for="(list, index) in paginatedLists" :key="index">
      <div class="list-details" @click="$router.push(`/mylist/${list.id}`)">
        <h3>{{ list.name }}</h3>
        <p v-if="list.description">{{ list.description }}</p>
      </div>
      <div class="action-menu">
        <i class="fa-solid fa-pen text-info" @click="openEditModal(list)"></i>
        <i class="fa-solid fa-trash text-danger p-3" @click="confirmDelete(list)"></i>
      </div>
      
    </div>



    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>

    <div v-if="showModal.value" class="modal-overlay" @click="closeModal">
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
                class="form-control"
                v-model="newList.description"
                id="listDescription"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save List</button>
          </form>
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

<div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
  <div class="modal-content" @click.stop>
    <div class="modal-header">
      <h5>Edit List</h5>
      <button type="button" class="close-btn" @click="closeEditModal">&times;</button>
    </div>
    <div class="modal-body">
      <form @submit.prevent="updateList">
        <div class="form-group">
          <label for="editListName">Name</label>
          <input
            type="text"
            class="form-control"
            v-model="editList.name"
            id="editListName"
            required
          />
        </div>
        <div class="form-group">
          <label for="editListDescription">Description</label>
          <textarea
            class="form-control"
            v-model="editList.description"
            id="editListDescription"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Update List</button>
      </form>
    </div>
  </div>
</div>

  </div>
  <div class="body-wrapper" v-else>
    <div class="header-card">
      <h2>Access Denied</h2>
      <p>You must be logged in to view or manage your game lists.</p>
      <p>Please log in to continue.</p>
    </div>
  </div>

  
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useListStore } from '@/store/listStore'
import { useUserStore } from '@/store/userStore'
import { storeToRefs } from 'pinia'
import axios from 'axios'

const store = useListStore()
const userStore = useUserStore()
const { lists } = storeToRefs(store)

const currentPage = ref(1)
const itemsPerPage = ref(5)
const totalPages = computed(() =>
  Math.ceil(lists.value.length / itemsPerPage.value)
)
const paginatedLists = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return lists.value.slice(start, start + itemsPerPage.value)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

onMounted(() => {
  if (userStore.isUserLogin) {
    store.fetchLists()
  }
})

const showModal = reactive({ value: false })
const newList = reactive({ name: "", description: "" })

async function addList() {
  if (!userStore.isUserLogin) return
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

const selectedItem = ref(null)
const showDeleteConfirm = ref(false)

function confirmDelete(item) {
  if (!userStore.isUserLogin) return
  selectedItem.value = item
  showDeleteConfirm.value = true
}

async function deleteConfirmed() {
  if (!userStore.isUserLogin) return
  await axios.delete(`http://localhost:3000/lists/${selectedItem.value.id}`)
  showDeleteConfirm.value = false
  selectedItem.value = null
  await store.fetchLists()
}

function cancelDelete() {
  showDeleteConfirm.value = false
  selectedItem.value = null
}

// Edit List
const showEditModal = ref(false)
const editList = reactive({ id: null, name: "", description: "" })

function openEditModal(list) {
  if (!userStore.isUserLogin) return
  editList.id = list.id
  editList.name = list.name
  editList.description = list.description
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  editList.id = null
  editList.name = ""
  editList.description = ""
}

async function updateList() {
  if (!userStore.isUserLogin) return
  await axios.put(`http://localhost:3000/lists/${editList.id}`, {
    name: editList.name,
    description: editList.description,
  })
  showEditModal.value = false
  await store.fetchLists()
}
</script>

<style scoped>
.body-wrapper {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
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
  background-color: #3b82f6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
  color: white;
}
.list-details h3 {
  font-size: 1rem;
  margin-bottom: 5px;
  cursor: pointer;
}
.list-details p {
  font-size: 0.8rem;
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
}
.modal-content {
  background-color: #2a2a40;
  color: #fff;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  padding: 30px;
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
.modal-body {
  padding: 20px 0;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-control {
  width: 100%;
  padding: 10px;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
}
.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: #2563eb;
}
.btn-danger {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}
.btn-secondary {
  background-color: #9e9e9e;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.pagination-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}
.pagination-controls select {
  background-color: #1e1e2a;
  color: white;
  border: 1px solid #555;
  border-radius: 5px;
  padding: 5px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
  flex-wrap: wrap;
}
.pagination button {
  padding: 8px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.pagination button.active {
  background-color: #2563eb;
  font-weight: bold;
}
.pagination button:disabled {
  background-color: #6b7280;
  cursor: not-allowed;
}
</style>
