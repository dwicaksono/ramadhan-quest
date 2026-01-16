<script setup lang="ts">
import { computed } from 'vue'
import type { HabitItem } from '@/types/habit'

import { useHabitActions } from '@/composables/useHabitActions'

interface Props {
  habit: HabitItem
  isCompleted: boolean
}

const props = defineProps<Props>()

const { checkHabitEligibility } = useHabitActions()

const emit = defineEmits<{
  (e: 'toggle', id: string, event: MouseEvent): void
}>()

const eligibility = computed(() => checkHabitEligibility(props.habit))

const categoryColor = computed(() => {
  switch (props.habit.category) {
    case 'spiritual': return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800'
    case 'community': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    case 'personal': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    default: return 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
  }
})

const iconBg = computed(() => {
  if (props.isCompleted) return 'bg-primary-500 text-white'
  
  // Locked state background
  if (!eligibility.value.eligible) return 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500'

  switch (props.habit.category) {
    case 'spiritual': return 'bg-primary-200 dark:bg-primary-800 dark:text-primary-100'
    case 'community': return 'bg-blue-200 dark:bg-blue-800 dark:text-blue-100'
    case 'personal': return 'bg-amber-200 dark:bg-amber-800 dark:text-amber-100'
    default: return 'bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
  }
})

function handleClick(event: MouseEvent) {
  emit('toggle', props.habit.id, event)
}
</script>

<template>
  <div 
    class="relative group rounded-xl p-3 border-2 transition-all duration-300 cursor-pointer overflow-hidden"
    :class="[
      isCompleted 
        ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800 shadow-inner opacity-70' 
        : !eligibility.eligible 
          ? 'bg-stone-100 dark:bg-stone-900/50 border-stone-200 dark:border-stone-800 opacity-60 grayscale cursor-not-allowed'
          : 'bg-white dark:bg-stone-900 border-b-4 border-stone-200 dark:border-stone-800 hover:border-primary-300 dark:hover:border-primary-700 hover:-translate-y-0.5 shadow-sm'
    ]"
    @click="handleClick"
  >
    <div class="flex items-center gap-4 relative z-10">
      <!-- Icon/Checkbox -->
      <div 
        class="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500"
        :class="iconBg"
      >
        <span v-if="!eligibility.eligible && !isCompleted">🔒</span>
        <span v-else-if="!isCompleted">{{ habit.icon }}</span>
        <span v-else class="text-white text-2xl">✓</span>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <h3 class="font-bold text-stone-800 dark:text-stone-100" :class="{ 'line-through text-stone-500 dark:text-stone-500': isCompleted }">
          {{ habit.name }} 
          <span v-if="!eligibility.eligible && !isCompleted" class="text-xs font-normal text-stone-400 ml-1">(Belum Waktunya)</span>
        </h3>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs px-2 py-0.5 rounded-full font-medium" :class="categoryColor">
            {{ habit.category }}
          </span>
          <span class="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
            +{{ habit.xpReward }} XP
          </span>
        </div>
      </div>

      <!-- Checkbox Circle Indicator -->
      <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300"
        :class="isCompleted ? 'bg-primary-500 border-primary-500' : 'border-stone-300 dark:border-stone-600'"
      >
        <div class="w-2.5 h-2.5 bg-white rounded-full transition-transform duration-300" 
          :class="isCompleted ? 'scale-100' : 'scale-0'"
        />
      </div>
    </div>
  </div>
</template>
