<template>
    <v-row class="kanban-board">
    <v-col
      v-for="status in statuses"
      :key="status"
      cols="12"
      md="3"
      class="kanban-column"
    >
      <v-card>
        <v-card-title>{{ status }}</v-card-title>
        <v-divider />
        <v-card-text>
          <v-list>
            <draggable v-model="tasksByStatus[status]" item-key="id"> 
              <template #item="{ element }">
                <v-list-item @click="openTask(element)">
                  <v-list-item-content>{{ element.title }} {{ element.id }}</v-list-item-content>
                </v-list-item>
              </template>
            </draggable>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </template>
  
  <script lang="ts" setup>
import { PropType, computed } from 'vue';
import draggable from 'vuedraggable';
import type { Task } from '../types';

  
const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});
  
  const statuses = ['todo', 'in_progress', 'review', 'done'];

  const tasksByStatus = computed(() =>
  statuses.reduce((acc, status) => {
    acc[status] = props.tasks.filter(task => task.status === status);
    return acc;
  }, {} as Record<string, Task[]>)
);
  const openTask = (task: Task) => {
    // Implement task detail view opening
    console.log(task);
  };
  </script>
  
  <style scoped>
  .kanban-board {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.kanban-column {
  flex: 1;
}

.v-list-item {
  cursor: pointer;
  transition: background-color 0.2s;
  border: solid 1px #e0e0e0;
}

.v-list-item:hover {
  background-color: #f0f0f0;
}
  </style>
  