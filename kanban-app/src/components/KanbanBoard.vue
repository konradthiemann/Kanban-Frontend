<template>
    <v-row class="kanban-board">
        <v-col
          v-for="status in statuses"
        :key="status"
        cols="12"
        md="3"
        class="kanban-column"
        @drop="onDrop($event, status)"
        @dragover.prevent
        @dragenter.prevent
      >
        <v-card>
          <v-card-title>{{ status }}</v-card-title>
          <v-divider />
          <v-card-text>
            <v-list>
              <div 
                v-for="element in tasks"
                class="drag-el"
                :key="element.id"
                draggable="true"
                @dragstart="startDrag($event, element)"
              >
                <div 
                  v-if="element.status === status"
                >
                  <div>{{ element.title }} {{ element.id }}</div>
                </div>
              </div>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
<script lang="ts" setup>
import { PropType } from 'vue';
import type { Task } from '../types';

  
const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});
  
const statuses = ['todo', 'in_progress', 'review', 'done'];

const startDrag = (event: DragEvent, task:Task) => {
  if (!event || event.dataTransfer === null){
    return;
  }
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('taskID', task.id.toString());
  console.log(task);
};

const onDrop = (event: DragEvent, status: string) => {
  if (!event || event.dataTransfer === null){
    return;
  }
  const taskID = event.dataTransfer.getData('taskID');
  const task = props.tasks.find((task) => task.id == +taskID);
  task ? task.status = status : 'todo';
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

.drag-el {
  cursor: pointer;
  transition: background-color 0.2s;
  border: solid 1px #e0e0e0;
}

.drag-el:hover {
  background-color: #f0f0f0;
}
  </style>
  