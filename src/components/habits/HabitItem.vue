<script setup lang="ts">
import { computed } from 'vue'
import type { HabitItem } from '@/types/habit'

interface Props {
  habit: HabitItem
  isCompleted: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle', id: string, event: MouseEvent): void
}>()

const categoryColor = computed(() => {
  switch (props.habit.category) {
    case 'spiritual': return 'bg-primary-100 text-primary-700 border-primary-200'
    case 'community': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'personal': return 'bg-amber-100 text-amber-700 border-amber-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
})

const iconBg = computed(() => {
  if (props.isCompleted) return 'bg-primary-500 text-white'
  
  switch (props.habit.category) {
    case 'spiritual': return 'bg-primary-200'
    case 'community': return 'bg-blue-200'
    case 'personal': return 'bg-amber-200'
    default: return 'bg-gray-200'
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
        ? 'bg-primary-50 border-primary-200 shadow-inner opacity-70' 
        : 'bg-white border-b-4 border-stone-200 hover:border-primary-300 hover:-translate-y-0.5 shadow-sm'
    ]"
    @click="handleClick"
  >
    <div class="flex items-center gap-4 relative z-10">
      <!-- Icon/Checkbox -->
      <div 
        class="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500"
        :class="iconBg"
      >
        <span v-if="!isCompleted">{{ habit.icon }}</span>
        <span v-else class="text-white text-2xl">✓</span>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <h3 class="font-bold text-stone-800" :class="{ 'line-through text-stone-500': isCompleted }">
          {{ habit.name }}
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
        :class="isCompleted ? 'bg-primary-500 border-primary-500' : 'border-stone-300'"
      >
        <div class="w-2.5 h-2.5 bg-white rounded-full transition-transform duration-300" 
          :class="isCompleted ? 'scale-100' : 'scale-0'"
        />
      </div>
    </div>
  </div>
</template>
