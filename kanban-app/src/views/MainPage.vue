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
                <v-btn
                  color="primary"
                  @click="showCreateTaskDialog = true"
                  >
                  Create Task
                </v-btn>
              </v-toolbar>
              <v-text-field
                v-model="searchQuery"
                label="Search tasks"
                class="mt-4"
                @input="searchInTasks"
              ></v-text-field>
              <v-select
                v-model="selectedCategories"
                :items="categories"
                item-value="id"
                item-title="name"
                chips
                return-object
                multiple
                hint="Select one or more categories"
                label="Filter categories"
                class="mt-4"
              >
                <template v-slot:prepend-item>
                  <v-list-item
                    title="Select All"
                    @click="toggleAllCategories"
                  >
                    <template v-slot:prepend>
                      <v-checkbox-btn
                        :model-value="selectedCategories.length === categories.length"
                      />
                    </template>
                  </v-list-item>
                </template>
              </v-select>
              <KanbanBoard
                :tasks="taskByCategory"
                v-model="selectedCategories"
                class="mt-4"
              />
              <TaskDialog
                v-model="showCreateTaskDialog"
                @close="showCreateTaskDialog = false"
                @save="updateTasks"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue';
import KanbanBoard from '../components/KanbanBoard.vue';
import TaskDialog from '../components/TaskDialog.vue';
import { fetchTasks, searchTasks ,fetchCategories } from '../services/api';
import { Category, Task } from '../types';
  
const searchQuery = ref('');
const selectedCategories = ref<Category[]>([]);
const tasks = ref<Task[]>([]);
const categories = ref<Category[]>([]);
const showCreateTaskDialog = ref(false);
  
  
onBeforeMount(async () => {
  tasks.value = await fetchTasks();
  categories.value = await fetchCategories();
  selectedCategories.value = categories.value;
});

const updateTasks = async () => {
  tasks.value = await fetchTasks();
};

const searchInTasks = async () => {
  if (!searchQuery.value) {
    tasks.value = await fetchTasks();
    return;
  }
  tasks.value = await searchTasks(searchQuery.value)
};

const taskByCategory = computed(() => {
  return tasks.value.filter((task) => 
    selectedCategories.value.find((category) => task.category === category.id)
  );
});

const toggleAllCategories = () => {
  if (selectedCategories.value.length === categories.value.length) {
    selectedCategories.value = [];
  } else {
    selectedCategories.value = categories.value;
  }
};

</script>

<style scoped>
  .v-card {
    max-width: 800px;
    margin: auto;
  }
</style>
  