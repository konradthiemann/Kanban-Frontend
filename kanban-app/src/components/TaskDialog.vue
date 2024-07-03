<template>
  <v-dialog :v-bind="dialog" @update:dialog="updateDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create Task</span>
      </v-card-title>
      <v-card-text>
        <v-form style="display: flex; flex-direction: column;" @submit.prevent="handleSave">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="description"
            label="Description"
            outlined
          ></v-textarea>
          <v-text-field
            v-model="dueDate"
            label="Due Date"
            type="date"
            outlined
          ></v-text-field>
          <v-select
            v-model="urgency"
            :items="urgencyOptions"
            label="Urgency"
            outlined
          ></v-select>
          <v-select
            v-model="status"
            :items="statusOptions"
            label="Status"
            outlined
          ></v-select>
          <v-select
            v-model="category"
            :items="categories.map((category) => category.name)"
            item-text="name"
            item-value="id"
            label="Category"
            outlined
          ></v-select>
          <v-btn type="submit" color="primary" class="mt-3">
            Save
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions
        style="display: flex; padding-bottom: 16px;"
      >
        <v-spacer></v-spacer>
        <v-btn color="red" @click="closeDialog">Close</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import api, { fetchCategories } from '../services/api';
import { Category } from '../types';

const props = defineProps({
  task: Object,
  dialog: Boolean
});

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
  (e: 'update:dialog', value: boolean) : void
}>()

const title = ref('');
const description = ref('');
const dueDate = ref();
const urgency = ref('medium');
const status = ref('todo');
const category = ref<string>();
const categories = ref<Category[]>([]);
const urgencyOptions = ['low', 'medium', 'high'];
const statusOptions = ['todo', 'in_progress', 'review', 'done'];

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

const updateDialog = (value: boolean) => {
  emit('update:dialog', value);
}

const closeDialog = () => {
  updateDialog(false)
  emit('close')
};

onMounted(async () => {
  categories.value = await fetchCategories();
});

watch(() => props.dialog, (newVal) => {
  if (!newVal) {
    title.value = '';
    description.value = '';
    dueDate.value = '';
    urgency.value = 'medium';
    status.value = 'todo';
    category.value = '';
  }
});
</script>

<style scoped>
.headline {
  font-size: 1.5em;
  font-weight: bold;
}
.mt-3 {
  margin-top: 1rem;
}
</style>
