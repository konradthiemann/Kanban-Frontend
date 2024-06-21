<template>
    <div class="kanban-board">
      <div class="kanban-column" v-for="status in statuses" :key="status">
        <h2>{{ status }}</h2>
        <div>
          <draggable v-model="props.tasks" item-key="id">
            <template #item="{ element }">
              <div class="kanban-item" @click="openTask(element)">
                {{ element.title }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
//   import { ref } from 'vue';
//   import { useDraggable, useDroppable } from '@dnd-kit/vue-dnd';
//   import { Draggable } from "vue3-draggable-next";
  // import draggable from 'vuedraggable';
  import { VueDraggableNext } from 'vue-draggable-next'

  
  const props = defineProps({
    tasks: Array
  });
  
  const statuses = ['todo', 'in_progress', 'review', 'done'];

const draggable = VueDraggableNext;
  
//   const tasksByStatus = (status: string) => {
//     // return props.tasks.filter(task => task.status === status);
    // console.log(status);
//   };
  
//   const onDragEnd = (event: any) => {
    // console.log(event);
//   };
  
  const openTask = (task: any) => {
    // Implement task detail view opening
    console.log(task);
  };
  </script>
  
  <style scoped>
  .kanban-board {
    display: flex;
    gap: 1rem;
  }
  .kanban-column {
    flex: 1;
    background-color: #90f000;
    padding: 1rem;
    border-radius: 4px;
  }
  .kanban-item {
    background-color: #fff;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  