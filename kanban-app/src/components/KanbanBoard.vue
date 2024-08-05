<template>
    <VRow class="kanban-board">
        <VCol
          v-for="status in statuses"
          :key="status"
          cols="12"
          md="3"
          class="kanban-column"
          @drop="onDrop($event, status)"
          @dragover.prevent
          @dragenter.prevent
      >
        <VCard>
          <v-card-title>{{ status }}</v-card-title>
          <v-divider />
          <v-card-text>
            <v-list>
              <template 
                v-for="element in sortedTasksByStatus"
              >
                <v-list-item 
                  v-if="element.status === status"
                  class="drag-el"
                  rounded
                  :title=element.title
                  :key="element.id"
                  draggable="true"
                  @dragstart="startDrag($event, element)"
                  @click="showDetailDialog(element)"
                >
                  {{ element.category }}
                  <!-- <div>{{ element.urgency }}</div> -->
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>
        </VCard>
      </VCol>
    </VRow>
    <teleport to="body">
      <DetailDialog
        v-model="openDetailDialog"
        @close="openDetailDialog = false"
        @edit="edit"
        :task="DetailDialogTaskData"
      />
    </teleport>
    <teleport to="body">
      <TaskDialog
        v-if="openEditTaskDialog"
        v-model="openEditTaskDialog"
        @update:task="updateEditedTask"
        @close="openEditTaskDialog = false"
        :task="editTaskData"
        :edit="true"
      />
    </teleport>
  </template>
  
<script lang="ts" setup>
import { PropType, computed, ref } from 'vue'
import type { Task } from '../types'
import { Urgency } from '../types'
import { updateField, updateTask } from '../services/api'
import DetailDialog from './DetailDialog.vue'
import TaskDialog from './TaskDialog.vue'
  
const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
  modelValue: {
    type: Array as PropType<{id:number, name:string}[]>,
    required: true,
  }, 
})

const statuses = ['todo', 'in_progress', 'review', 'done']
const openDetailDialog = ref(false)
const DetailDialogTaskData = ref<Task>({} as Task)
const openEditTaskDialog = ref(false)
const editTaskData = ref<Task>({} as Task)

const emit = defineEmits<{
  (e: 'update:Task'): void
}>()

const startDrag = (event: DragEvent, task:Task) => {
  if (!event || event.dataTransfer === null){
    return;
  }
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('taskID', task.id.toString())
}

const onDrop = (event: DragEvent, status: string) => {
  if (!event || event.dataTransfer === null){
    return
  }
  const taskID = event.dataTransfer.getData('taskID')
  const task = props.tasks.find((task) => task.id == +taskID)
  task ? task.status = status : 'todo'
  if (task) {
    updateField(+taskID, 'status', task?.status)
  }
}

const sortedTasksByStatus = computed(() => props.tasks?.sort((a, b) => {
    return Object.values(Urgency).indexOf(a.urgency) - Object.values(Urgency).indexOf(b.urgency)
  })
)

const showDetailDialog = (task: Task) => {
  DetailDialogTaskData.value = task
  openDetailDialog.value = true
}

const edit = (task: Task) => {
  openDetailDialog.value = false
  editTaskData.value = task
  openEditTaskDialog.value = true
  emit('update:Task')
}

const updateEditedTask = async (task:Task) => {
  await updateTask(task)
  emit('update:Task')
  openEditTaskDialog.value = false
}
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
  transition: 0.2s;
  border: solid 1px #e0e0e0;
}

.drag-el:hover {
  background-color: hsl(0, 0%, 46%);
}
  </style>
  