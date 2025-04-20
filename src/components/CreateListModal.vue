<template>
  <div class="modal-content">
    <h3>Create a new list</h3>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="listName">Name</label>
        <input
          id="listName"
          v-model="form.name"
          placeholder="My new list"
          maxlength="50"
          required
        />
        <p class="char-count">{{ form.name.length }} / 50</p>
      </div>

      <div class="form-group">
        <label for="desc">Description</label>
        <textarea
          id="desc"
          v-model="form.description"
          placeholder="Add a short description..."
          rows="3"
        />
      </div>

      <div class="form-group">
        <label>Visibility</label>
        <select v-model="form.visibility">
          <option value="Private">Private</option>
          <option value="Public" disabled>Public (Coming Soon)</option>
        </select>
        <p class="note">Lists can only be private and local while in beta</p>
      </div>

      <button type="submit" class="save-button">Save List</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const form = ref({
  name: '',
  description: '',
  visibility: 'Private',
})

function submit() {
  emit('submit', { ...form.value })
}
</script>

<style scoped>
.modal-content {
  background-color: #1e1e2a;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}
.save-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
}
.char-count {
  font-size: 0.8rem;
  color: #757575;
  text-align: right;
}
.note {
  font-size: 0.8rem;
  color: #757575;
}
</style>
