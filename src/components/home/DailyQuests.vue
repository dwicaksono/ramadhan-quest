<script setup lang="ts">
import { computed } from 'vue'
import { useHabitStore } from '@/stores/habit'
import { useGame } from '@/composables/useGame'
import { BaseCard, BaseCheckbox } from '@/components/base'

const habitStore = useHabitStore()
const { completeHabit } = useGame()

const displayedHabits = computed(() => habitStore.todaysHabits.slice(0, 3))

function toggleHabit(habitId: string) {
  completeHabit(habitId)
}
</script>

<template>
  <BaseCard class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-bold text-secondary-900">Daily Quests</h3>
      <span class="text-sm text-secondary-500">
        {{ habitStore.completedCount }}/{{ habitStore.totalCount }} Done
      </span>
    </div>

    <!-- Quest list -->
    <div class="space-y-4">
      <div
        v-for="habit in displayedHabits"
        :key="habit.id"
        class="flex items-center justify-between py-2 border-b border-secondary-50 last:border-0"
      >
        <BaseCheckbox
          :model-value="habit.isCompleted"
          :label="habit.name"
          :description="habit.category === 'spiritual' ? '📿 Spiritual' : '💝 Community'"
          @update:model-value="toggleHabit(habit.id)"
        />
        <button class="text-secondary-300 hover:text-secondary-500 p-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- View all button -->
    <button class="w-full text-center text-sm text-primary-600 font-medium py-2 hover:text-primary-700">
      View All Quests →
    </button>
  </BaseCard>
</template>
