<template>
    <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card class="pa-4">
              <v-toolbar flat>
                <v-toolbar-title>Main Page</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showCreateTaskDialog = true">Create Task</v-btn>
              </v-toolbar>
              <v-text-field
                v-model="searchQuery"
                label="Search tasks"
                class="mt-4"
              ></v-text-field>
              <v-radio-group v-model="selectedCategory" class="mt-4">
                <v-radio label="All" value="all"></v-radio>
                <v-radio
                  v-for="category in categories"
                  :key="category.id"
                  :label="category.name"
                  :value="category.name"
                ></v-radio>
              </v-radio-group>
              <KanbanBoard :tasks="tasks" class="mt-4" />
              <TaskDialog v-if="showCreateTaskDialog" @close="showCreateTaskDialog = false" @save="fetchTasks" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  </template>
  
  <script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue';
  import KanbanBoard from '../components/KanbanBoard.vue';
  import TaskDialog from '../components/TaskDialog.vue';
  import api from '../services/api';
  import { Task, Category } from '../types';
  import { mapResponseToTask, mapResponseToCategory } from '../services/mapping';

  const searchQuery = ref('');
  const selectedCategory = ref('all');
  const tasks = ref<Task[]>([]);
  const categories = ref<Category[]>([]);
  const showCreateTaskDialog = ref(false);

  
  onBeforeMount(() => {
    fetchTasks();
    fetchCategories();
  });
  
  const fetchTasks = async () => {
    const response = await api.get('/todos/');
    tasks.value = response.data.map(mapResponseToTask);
  };
  
  const fetchCategories = async () => {
    const response = await api.get('/categories/');
    categories.value = response.data.map(mapResponseToCategory);
  };
  
  </script>

<style scoped>
  .v-card {
    max-width: 800px;
    margin: auto;
  }
</style>
  