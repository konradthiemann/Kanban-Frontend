<template>
    <VDialog
        max-width="600px"
        v-bind="task"
    >
        <VCard>
            <VCardTitle
                style="text-align: center;"
            >
                <span class="headline">
                    {{ task?.title }}
                </span>
            </VCardTitle>
            <VCardText>
                <p>author: {{ task?.author.username }}</p>
                <p>description: {{ task?.description }}</p>
                <p>Due Date: {{ new Date(Number(task?.due_date)).toLocaleDateString() }}</p>
                    Assigned to:  <p v-for="element in assignedTo">{{ '&emsp;' + element.username }}</p>
                <p>Urgency: {{ task?.urgency }}</p>
                <p>Status: {{ task?.status }}</p>
            </VCardText>
            <VCardActions>
                <VBtn 
                    color="secondary"
                    @click="edit(task ? task : {} as Task)"
                >
                Edit
                </VBtn>
                <VBtn
                    color="primary"
                    @click="close"
                >
                Close
                </VBtn>
            </VCardActions>
        </VCard> 
    </VDialog>
</template>

<script lang="ts" setup>
import { defineProps, watch, ref } from 'vue';
import { Task, User } from '../types';
import { getUser } from '../services/api';

const props = defineProps({
    task: {
        type: Object as () => Task | undefined,
        required: true
    }
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'edit', task:Task): void
}>()

const close = () => {
    emit('close');
}

const edit = (task:Task) => {
    emit('edit', task);
}

const assignedTo = ref<User[]>([]);

watch(() => props.task?.assigned_to, (newAssignedTo) => {
    if (!newAssignedTo) {
        return;
    }
    assignedTo.value = [];
    for (let i = 0; i < newAssignedTo.length; i++) {
        const element = newAssignedTo[i];
        getUser(+element).then((res) => {
            assignedTo.value.push(res);
        });
    }
});


</script>

<style scoped>
.headline {
    font-size: 24px;
    font-weight: bold;
}
</style>