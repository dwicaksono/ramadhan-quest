<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHabitStore } from '@/stores/habit'
import { useHabitActions } from '@/composables/useHabitActions'
import HabitItem from '@/components/habits/HabitItem.vue'
import { BaseCard, BaseButton } from '@/components/base'
import { toast } from 'vue-sonner'
import { useAudio } from '@/composables/useAudio'

const router = useRouter()
const habitStore = useHabitStore()
const { toggleHabit: toggleHabitAction } = useHabitActions()
const { playSfx } = useAudio()


const isLoading = ref(true)
const displayedHabits = computed(() => habitStore.todaysHabits.slice(0, 3))

onMounted(() => {
  // Simulate loading mock
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})

function handleToggle(habitId: string) {
  const result = toggleHabitAction(habitId)
  
  if (!result.success) {
    if (result.message) {
      toast.error(result.message)
    }
    return
  }

  if (result.isCompleted) {
    playSfx('success')

    if (result.xpEarned > 0) {
      toast.success(`+${result.xpEarned} XP!`)
    }
  } else {

  }
}

function navigateToHabits() {
  router.push('/habits')
}
</script>

<template>
  <BaseCard variant="default" :rounded="'2xl'" class="shadow-xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-secondary-900 dark:text-white">Daily Quests</h3>
      <span v-if="!isLoading" class="text-sm text-stone-500 dark:text-stone-400 font-medium">
        {{ habitStore.completedCount }}/{{ habitStore.totalCount }} Done
      </span>
      <div v-else class="h-4 w-16 bg-stone-200 dark:bg-white/10 rounded animate-pulse"></div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="flex items-center justify-between py-2 border-b border-stone-100 dark:border-white/5 last:border-0">
        <div class="flex items-center gap-4 w-full">
          <div class="w-6 h-6 bg-stone-200 dark:bg-white/10 rounded-full animate-pulse"></div>
          <div class="space-y-2 flex-1">
            <div class="h-4 w-3/4 bg-stone-200 dark:bg-white/10 rounded animate-pulse"></div>
            <div class="h-3 w-1/4 bg-stone-100 dark:bg-white/5 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quest list -->
    <div v-else class="space-y-3">
      <HabitItem
        v-for="habit in displayedHabits"
        :key="habit.id"
        :habit="habit"
        :is-completed="habit.isCompleted"
        @toggle="handleToggle"
      />
    </div>

    <!-- View all button -->
    <BaseButton 
      variant="secondary"
      class="w-full mt-6 group text-sm"
      @click="navigateToHabits"
      :loading="isLoading"
      :disabled="isLoading"
    >
      View All Quests
      <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </BaseButton>
  </BaseCard>
</template>
