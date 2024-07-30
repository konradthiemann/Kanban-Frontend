<template>
    <VDialog
        max-width="600px"
        v-bind="task"
    >
        <VCard>
            <VCardTitle>
                <span class="headline">
                    {{ task?.title }}
                    typeof: {{ typeof task }}
                </span>
            </VCardTitle>
            <VCardText>
                <p>author: {{ task?.author.username }}</p>
                <p>{{ task?.description }}</p>
                <p>Assigned to: {{ task?.assigned_to }}</p>
                <p>Due Date: {{ task?.due_date }}</p>
                <p>Urgency: {{ task?.urgency }}</p>
                <p>Status: {{ task?.status }}</p>
            </VCardText>
            <VCardActions>
                <VBtn color="primary" @click="close">Close</VBtn>
            </VCardActions>
        </VCard> 
    </VDialog>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Task } from '../types';

// const props = defineProps({
//     task: {
//         type: Object as () => Task | undefined,
//         required: true
//     }
// })
defineProps({
    task: {
        type: Object as () => Task | undefined,
        required: true
    }
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
    emit('close');
}
</script>