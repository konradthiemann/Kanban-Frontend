<template>
  <VDialog 
    :v-bind="dialog"
    @update:dialog="updateDialog"
    max-width="600px"
  >
    <VCard>
      <VCardTitle>
        <span 
          class="headline"
        >
          Create Task
        </span>
      </VCardTitle>
      <VCardText>
        <VForm 
          class="form"
          @submit.prevent="props.edit ? editTask() : handleSave()"
          validate-on="submit"
          >
          <VTextField
            v-model="title"
            label="Title"
            outlined
            :error="!!errorResponse?.title"
            :error-messages="errorResponse?.title?.[0]" 
            class="mt-4"
          ></VTextField>
          <VTextarea
            v-model="description"
            label="Description"
            :error="!!errorResponse?.description"
            :error-messages="errorResponse?.description?.[0]"
            outlined
            class="mt-4"
          ></VTextarea>
          <v-select
            v-model="assignedTo"
            :items="users"
            item-value="id"
            item-title="username"
            chips
            return-object
            multiple
            :error="!!errorResponse?.assigned_to"
            :error-messages="errorResponse?.assigned_to?.[0]"
            hint="Select one or more users"
            label="select users"
            class="mt-4"
          />
        
          <VTextField
            v-model="dueDate"
            label="Due Date"
            type="date"
            outlined
            class="mt-4"
          ></VTextField>
          <VSelect
            v-model="urgency"
            :items="urgencyOptions"
            label="Urgency"
            outlined
            class="mt-4"
          ></VSelect>
          <VSelect
            v-model="status"
            :items="statusOptions"
            label="Status"
            outlined
            class="mt-4"
          ></VSelect>
          
          <VSelect
            v-model="category"
            :items="categories"
            item-title="name"
            item-value="id"
            return-object
            label="Category"
            required
            :error="!!errorResponse?.category"
            :error-messages="errorResponse?.category?.[0]"
            outlined
            @click="fetchCategories"
            class="mt-4"
          >
          <template v-slot:prepend-item>
            <VTextField
                  v-model="newCategoryName"
                  label="add new category"
                  outlined
                  class="mt-4"
                >
                <template v-slot:append-inner>
                  <VBtn
                    color="primary"
                    @click="createCategory()"
                  >
                  add
                  </VBtn>
                </template>  
              </VTextField>   
          </template>
          
          </VSelect>
          <VBtn
            v-if="props.edit" 
            type="submit"
            color="primary"
            class="mt-3"
          >
            Update
          </VBtn>
          <VBtn
            v-else 
            type="submit"
            color="primary"
            class="mt-3"
          >
            Save
          </VBtn>
        </VForm>
      </VCardText>
      <VCardActions
        style="display: flex; padding-bottom: 16px;"
      >
        <VSpacer></VSpacer>
        <VBtn
          color="red"
          @click="closeDialog"
        >
          Close
        </VBtn>
        <VSpacer></VSpacer>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import api, { fetchCategories, getAllUsers, addCategory } from '../services/api'
import { Category, TaskDialogProps, User, Task, Urgency } from '../types'
import { dateToUnixTimestamp } from '../services/mapping'

const props = withDefaults(defineProps<TaskDialogProps>(), {
  task: undefined,
  dialog: false,
  edit: false
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
  (e: 'update:task', task: Task): void
  (e: 'update:dialog') : void
}>()

const title = ref('')
const description = ref('')
const dueDate = ref()
const urgency = ref<Urgency>('medium' as Urgency)
const status = ref('todo')
const category = ref<Category | undefined>()
const categories = ref<Category[]>([])
const urgencyOptions = ['low', 'medium', 'high']
const statusOptions = ['todo', 'in_progress', 'review', 'done']
const users = ref<User[]>(await getAllUsers())
const assignedTo = ref<User[]>([])
const errorResponse = ref<any>()
const newCategoryName = ref('')

const handleSave = async () => {
  try {
    await api.post('/todos/', getNewTask())
    emit('save')
    emit('close')
    clearForm()
  } catch (error:any) {
    errorResponse.value = error.response.data
  }
}

const getNewTask = () => {
  return {
    title: title.value,
    description: description.value,
    assigned_to: assignedTo.value?.map((user) => user.id), 
    due_date: dateToUnixTimestamp(dueDate.value),
    urgency: urgency.value,
    status: status.value,
    category: category.value?.id,
  }
}

const editTask = async () => {
  try {
    const task = getEditedTask()
    if (!task) return
    emit ('update:task', task)
    emit('save')
    emit('close')
    clearForm()
  } catch (error:any) {
    errorResponse.value = error.response.data
  }
}

const getEditedTask = () => {
  if (!props.task || !category.value?.id) return
    const task: Task =  {
      id: props.task?.id, 
      author: props.task?.author,
      title: title.value,
      description: description.value,
      assigned_to: assignedTo.value?.map((user) => user.id), 
      due_date: dateToUnixTimestamp(dueDate.value),
      urgency: urgency.value,
      status: status.value,
      category: category.value?.id,
    }
    return task
}

const updateDialog = () => {
  emit('update:dialog')
}

const closeDialog = () => {
  updateDialog()
  emit('close')
  clearForm()
}

const clearForm = () => {
  title.value = ''
  description.value = ''
  dueDate.value = ''
  urgency.value = 'medium' as Urgency
  status.value = 'todo'
  category.value = undefined
  assignedTo.value = []
  errorResponse.value = {}
}

onMounted(async () => {
  categories.value = await fetchCategories()
  populateForm()
})

const populateForm = () => {
  if (props.task) {
    title.value = props.task.title
    description.value = props.task.description
    dueDate.value = new Date(props.task.due_date).toISOString().split('T')[0]
    urgency.value = props.task.urgency
    status.value = props.task.status
    category.value = categories.value.find((category) => category.id === props.task?.category)
    assignedTo.value = users.value.filter((user) => props.task?.assigned_to.includes(user.id))
  }
}

const createCategory = async () => {
  if (!newCategoryName.value) return
  await addCategory(newCategoryName.value)
  setTimeout(async () => {
    categories.value = await fetchCategories()
  }, 100);
}

watch(() => props.dialog, (newVal) => {
  if (!newVal) {
    title.value = ''
    description.value = ''
    dueDate.value = ''
    urgency.value = 'medium' as Urgency
    status.value = 'todo'
    category.value = undefined
  }
})
</script>

<style scoped>
.headline {
  font-size: 1.5em;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
