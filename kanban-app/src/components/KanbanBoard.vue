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
        <v-card
          theme="dark"
        >
          <v-card-title>{{ status }}</v-card-title>
          <v-divider />
          <v-card-text>
            <v-list
              theme="dark"
            >
              <template 
                v-for="element in sortedTasksByStatus"
              >
                <v-list-item 
                  v-if="element.status === status"
                  class="drag-el"
                  rounded
                  theme="dark"
                  :title=element.title
                  :key="element.id"
                  draggable="true"
                  @dragstart="startDrag($event, element)"
                >
                  <div>{{ element.id }}</div>
                  <div>{{ element.urgency }}</div>
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
<script lang="ts" setup>
import { PropType, computed } from 'vue';
import type { Task } from '../types';
import { Urgency } from '../types';

  
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

const sortedTasksByStatus = computed(() =>  props.tasks.sort((a, b) => {
    return Object.values(Urgency).indexOf(a.urgency) - Object.values(Urgency).indexOf(b.urgency)
  })
);
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
  background-color: hsl(0, 0%, 26%);
}
  </style>
  