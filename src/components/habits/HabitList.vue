<script setup lang="ts">
import type { HabitItem as IHabitItem } from '@/types/habit'
import HabitItem from './HabitItem.vue'

defineProps<{
  habits: (IHabitItem & { isCompleted: boolean })[]
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string, event: MouseEvent): void
}>()
</script>

<template>
  <div class="space-y-3 pb-20">
    <TransitionGroup 
      name="list" 
      tag="div"
      class="space-y-3"
    >
      <HabitItem
        v-for="habit in habits"
        :key="habit.id"
        :habit="habit"
        :is-completed="habit.isCompleted"
        @toggle="(id, evt) => emit('toggle', id, evt)"
      />
    </TransitionGroup>

    <!-- Empty State -->
    <div v-if="habits.length === 0" class="text-center py-10 text-stone-400">
      <p class="text-lg">Tidak ada target untuk kategori ini.</p>
    </div>
  </div>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
