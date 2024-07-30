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
          style="
            display: flex;
            flex-direction: column;"
          @submit.prevent="handleSave"
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
            class="mt-4"
          ></VSelect>
          <VBtn 
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
import { ref, onMounted, watch } from 'vue';
import api, { fetchCategories, getAllUsers } from '../services/api';
import { Category, User } from '../types';
import { dateToUnixTimestamp } from '../services/mapping';

const props = defineProps({
  // task: Object,
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
const category = ref<Category>();
const categories = ref<Category[]>([]);
const urgencyOptions = ['low', 'medium', 'high'];
const statusOptions = ['todo', 'in_progress', 'review', 'done'];
const users = ref<User[]>(await getAllUsers());
const assignedTo = ref<User[]>();
const errorResponse = ref<any>();

const handleSave = async () => {
  try {
    await api.post('/todos/', {
      title: title.value,
      description: description.value,
      assigned_to: assignedTo.value?.map((user) => user.id), 
      due_date: dateToUnixTimestamp(dueDate.value),
      urgency: urgency.value,
      status: status.value,
      category: category.value?.id,
    });
    emit('save');
    emit('close');
    clearForm()
  } catch (error:any) {
    errorResponse.value = error.response.data;
  }
};

const updateDialog = (value: boolean) => {
  emit('update:dialog', value);
}

const closeDialog = () => {
  updateDialog(false)
  emit('close')
  clearForm()
};

const clearForm = () => {
  title.value = '';
  description.value = '';
  dueDate.value = '';
  urgency.value = 'medium';
  status.value = 'todo';
  category.value = undefined;
  assignedTo.value = [];
  errorResponse.value = {};
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
    category.value = undefined;
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
