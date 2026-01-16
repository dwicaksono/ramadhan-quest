<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHabitStore } from '@/stores/habit'
import { useHabitActions } from '@/composables/useHabitActions'
import { toast } from 'vue-sonner'

const router = useRouter()
const habitStore = useHabitStore()
// const { completeHabit } = useGame() -- Removed unused variable
const { toggleHabit: toggleHabitAction, checkHabitEligibility } = useHabitActions()

const isLoading = ref(true)
const displayedHabits = computed(() => habitStore.todaysHabits.slice(0, 3))

onMounted(() => {
  // Simulate loading mock
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})

function toggleHabit(habitId: string) {
  const result = toggleHabitAction(habitId)
  
  if (!result.success) {
    if (result.message) {
      toast.error(result.message)
    }
    return
  }
}

function navigateToHabits() {
  router.push('/habits')
}
</script>

<template>
  <div class="bg-white dark:bg-[#121212] text-secondary-900 dark:text-white rounded-[2rem] p-6 shadow-xl border border-stone-100 dark:border-white/5">
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
    <div v-else class="space-y-1">
      <div
        v-for="habit in displayedHabits"
        :key="habit.id"
        class="flex items-center justify-between py-3 px-2 -mx-2 rounded-xl transition-colors cursor-pointer group relative"
        :class="[
          checkHabitEligibility(habit).eligible 
            ? 'hover:bg-stone-50 dark:hover:bg-white/5' 
            : 'opacity-60 cursor-not-allowed grayscale'
        ]"
        @click="toggleHabit(habit.id)"
      >
        <div class="flex items-center gap-4">
          <!-- Custom Check Circle -->
          <div 
            class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 relative z-10"
            :class="[
              habit.isCompleted ? 'bg-primary-500 text-white' : 
              checkHabitEligibility(habit).eligible 
                ? 'bg-stone-100 dark:bg-white/10 text-transparent border-2 border-stone-300 dark:border-white/20 group-hover:border-stone-400 dark:group-hover:border-white/40'
                : 'bg-stone-200 dark:bg-white/5 text-stone-400 border-2 border-stone-200 dark:border-white/10'
            ]"
          >
            <!-- Lock Icon for invalid time -->
            <svg v-if="!checkHabitEligibility(habit).eligible && !habit.isCompleted" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <!-- Check Icon -->
            <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <p class="font-medium text-secondary-900 dark:text-white text-base leading-tight mb-0.5" 
               :class="{ 'line-through text-stone-400 dark:text-white/40': habit.isCompleted }"
            >
              {{ habit.name }}<span v-if="!checkHabitEligibility(habit).eligible && !habit.isCompleted" class="text-xs font-normal text-stone-400 ml-2">(Belum Waktunya)</span>
            </p>
            <div class="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              <span v-if="habit.category === 'spiritual'">⚙️ Spiritual</span>
              <span v-else>💝 Community</span>
            </div>
          </div>
        </div>
        
        <svg class="w-5 h-5 text-stone-400 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    <!-- View all button -->
    <button 
      class="w-full mt-6 bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-secondary-900 dark:text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 text-sm"
      @click="navigateToHabits"
      :disabled="isLoading"
    >
      View All Quests
      <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
</template>
