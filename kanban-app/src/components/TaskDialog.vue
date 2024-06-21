<template>
    <div class="task-dialog">
      <h2>Create Task</h2>
      <form @submit.prevent="handleSave">
        <input v-model="title" placeholder="Title" />
        <textarea v-model="description" placeholder="Description"></textarea>
        <input v-model="dueDate" type="date" placeholder="Due Date" />
        <select v-model="urgency">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select v-model="status">
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
        <select v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <button type="submit">Save</button>
      </form>
      <button @click="$emit('close')">Close</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import api from '../services/api';
  
  const props = defineProps({
    task: Object
  });
  
  const emit = defineEmits(['close', 'save']);
  const title = ref('');
  const description = ref('');
  const dueDate = ref('');
  const urgency = ref('medium');
  const status = ref('todo');
  const category = ref('');
  const categories = ref([]);
  
  const fetchCategories = async () => {
    const response = await api.get('/categories/');
    categories.value = response.data;
  };
  
  const handleSave = async () => {
    await api.post('/todos/', {
      title: title.value,
      description: description.value,
      due_date: dueDate.value,
      urgency: urgency.value,
      status: status.value,
      category: category.value
    });
    emit('save');
    emit('close');
  };
  
  onMounted(() => {
    fetchCategories();
  });
  </script>
  
  <style scoped>
  .task-dialog {
    background-color: #fff;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  