<template>
    <div>
      <h1>Main Page</h1>
      <button @click="showCreateTaskDialog = true">Create Task</button>
      <input v-model="searchQuery" placeholder="Search tasks" />
      <div>
        <label>
          <input type="radio" value="all" v-model="selectedCategory" /> All
        </label>
        <label v-for="category in categories" :key="category.id">
          <input type="radio" :value="category.name" v-model="selectedCategory" /> {{ category.name }}
        </label>
      </div>
      <KanbanBoard :tasks="filteredTasks" />
      <TaskDialog v-if="showCreateTaskDialog" @close="showCreateTaskDialog = false" @save="fetchTasks" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import KanbanBoard from '../components/KanbanBoard.vue';
  import TaskDialog from '../components/TaskDialog.vue';
  import api from '../services/api';

  const searchQuery = ref('');
  const selectedCategory = ref('all');
  const tasks = ref<Task[]>([]);
  const categories = ref<Category[]>([]);
  const showCreateTaskDialog = ref(false);

  interface Task {
    id: number;
    assigned_to: string[];
    author: {
      id: number,
      first_name: string,
      last_name: string,
      username: string,
      email: string
    }
    status: string;
    due_date: number;
    urgency: string;
    title: string;
    description: string;
    category: {
      id: number;
      name: string;
    };
  }

  interface Category {
    id: string;
    name: string;
  }
  
  
  const fetchTasks = async () => {
    const response = await api.get('/todos/');
    tasks.value = response.data.map(mapResponseToTask);
    console.log('fetchTasks: ', tasks.value);
  };
  
  const fetchCategories = async () => {
    const response = await api.get('/categories/');
    categories.value = response.data.map(mapResponseToCategory);
  };

  const mapResponseToTask = (response: Task): Task => {
    return {
      id: response.id,
      assigned_to: response.assigned_to,
      author: response.author,
      status: response.status,
      due_date: response.due_date,
      urgency: response.urgency,
      title: response.title,
      description: response.description,
      category: response.category,
    };
  };

  const mapResponseToCategory = (response: Category): Category => {
    return {
      id: response.id,
      name: response.name,
    };
  };
  
  
  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const matchesCategory = selectedCategory.value === 'all' || task.category.name === selectedCategory.value;
      const matchesSearch = task.title.includes(searchQuery.value) || task.description.includes(searchQuery.value);
      return matchesCategory && matchesSearch;
    });
  });
  
  onMounted(() => {
    fetchTasks();
    fetchCategories();
  });
  </script>
  