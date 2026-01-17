<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHabitStore } from '@/stores/habit'
import { useHabitActions } from '@/composables/useHabitActions'
import HabitList from '@/components/habits/HabitList.vue'
import { BaseHeader } from '@/components/base'
import { useTransition, TransitionPresets } from '@vueuse/core'
import { useAudio } from '@/composables/useAudio'


import { toast } from 'vue-sonner'

const habitStore = useHabitStore()
const { toggleHabit } = useHabitActions()
const { playSfx } = useAudio()


// Tab Management
type Tab = 'spiritual' | 'community' | 'personal' | 'all'
const activeTab = ref<Tab>('all')

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'all', label: 'Semua', icon: '📋' },
  { id: 'spiritual', label: 'Ibadah', icon: '🕌' },
  { id: 'community', label: 'Sosial', icon: '🤲' },
  { id: 'personal', label: 'Pribadi', icon: '👤' },
]

// Filtered Habits
const filteredHabits = computed(() => {
  if (activeTab.value === 'all') return habitStore.todaysHabits
  return habitStore.todaysHabits.filter(h => h.category === activeTab.value)
})

// XP Animation Logic
const showXpAnim = ref(false)
const xpAnimValue = ref(0)
const xpAnimX = ref(0)
const xpAnimY = ref(0)
const xpAnimKey = ref(0) // Force re-render for same-location clicks

function handleToggle(id: string, event: MouseEvent) {
  const result = toggleHabit(id)
  
  if (!result.success) {
    if (result.message) {
      toast.error(result.message)
    }
    return
  }

  if (result.isCompleted) {
    triggerXpAnimation(result.xpEarned, event.clientX, event.clientY)
    // Play full success feedback
    playSfx('success')

  } else {
    // Light feedback for unchecking

  }
}

function triggerXpAnimation(amount: number, x: number, y: number) {
  xpAnimValue.value = amount
  xpAnimX.value = x
  xpAnimY.value = y
  xpAnimKey.value++
  showXpAnim.value = true
  
  // Hide after animation duration
  setTimeout(() => {
    showXpAnim.value = false
  }, 1000)
}

// Progress Display with useTransition
const progressSource = computed(() => habitStore.progressPercentage)
const animatedProgress = useTransition(progressSource, {
  duration: 800,
  easing: TransitionPresets.easeOutCubic
})
</script>

<template>
  <div class="px-4 pt-6 pb-24 max-w-md mx-auto min-h-screen bg-stone-50 dark:bg-secondary-950 transition-colors duration-200">
    <!-- Header -->
    <BaseHeader 
      title="Target Harian" 
      subtitle="Jaga semangat ibadahmu!"
    />
      
      <!-- Daily Progress Card -->
      <div class="mt-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
        <div class="absolute right-0 top-0 opacity-10 text-8xl transform translate-x-4 -translate-y-4">
          🌙
        </div>
        
        <div class="relative z-10 flex justify-between items-end mb-2">
          <div>
            <div class="text-primary-100 text-sm font-medium">Progress Hari Ini</div>
            <div class="text-3xl font-bold font-mono">{{ Math.round(animatedProgress) }}%</div>
          </div>
          <div class="text-primary-100 text-sm">
            {{ habitStore.completedCount }} / {{ habitStore.totalCount }} Selesai
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="h-2 bg-primary-900/30 rounded-full overflow-hidden">
          <div 
            class="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(250,204,21,0.5)]"
            :style="{ width: `${animatedProgress}%` }"
          ></div>
        </div>
      </div>

    <!-- Tabs -->
    <div class="sticky top-0 z-20 bg-stone-50/95 dark:bg-secondary-950/95 backdrop-blur-sm py-2 -mx-4 px-4 border-b border-stone-200/50 dark:border-secondary-800 mb-4 overflow-x-auto no-scrollbar scroll-smooth">
      <div class="flex gap-2">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
          :class="activeTab === tab.id 
            ? 'bg-primary-600 text-white shadow-md shadow-primary-200 dark:shadow-none' 
            : 'bg-white dark:bg-secondary-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-secondary-800 hover:bg-stone-50 dark:hover:bg-secondary-800'"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- Content -->
    <!-- Content -->
    <HabitList 
      v-if="filteredHabits.length > 0"
      :habits="filteredHabits"
      @toggle="handleToggle"
    />

    <!-- Empty State -->
    <div 
      v-else 
      class="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4"
    >
      <div class="w-24 h-24 bg-stone-100 dark:bg-secondary-800 rounded-full flex items-center justify-center text-4xl mb-2">
        🍃
      </div>
      <div>
        <h3 class="text-lg font-bold text-stone-700 dark:text-stone-200">Tidak ada target</h3>
        <p class="text-sm text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
          Belum ada target untuk kategori ini. Coba pilih kategori lain atau istirahat sejenak.
        </p>
      </div>
    </div>

    <!-- Floating XP Animation -->
    <Transition
      enter-active-class="transition-all duration-700 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-50"
      enter-to-class="opacity-100 -translate-y-12 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 -translate-y-20"
    >
      <div 
        v-if="showXpAnim"
        :key="xpAnimKey"
        class="fixed z-50 pointer-events-none font-bold text-amber-500 text-xl drop-shadow-md flex items-center gap-1"
        :style="{ 
          left: `${xpAnimX}px`, 
          top: `${xpAnimY - 20}px` 
        }"
      >
        <span>+{{ xpAnimValue }} XP</span>
        <span class="animate-bounce">✨</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
