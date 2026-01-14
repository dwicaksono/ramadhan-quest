<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useNow, useDateFormat } from '@vueuse/core'
import { isDark, toggleDark } from '@/composables/useTheme'
import { usePrayerTimes } from '@/composables/usePrayerTimes'

const gameStore = useGameStore()
const now = useNow()

// Real-time formatted string
const timeStr = useDateFormat(now, 'HH:mm')

// Prayer Times Logic
const { upcomingPrayer, locationName, detectLocation } = usePrayerTimes()

onMounted(() => {
  // Try to detect location on first load if not already set custom
  // Browser might block this until user interaction, but worth a try for returning users
  detectLocation()
})

// Ramadan date calculation (Mock for now, typically needs Hijri library)
const ramadanDay = computed(() => 12)

const greeting = computed(() => {
  const hour = now.value.getHours()
  if (hour < 4) return 'Selamat Sahur'
  if (hour < 11) return 'Selamat Pagi'
  if (hour < 15) return 'Selamat Siang'
  if (hour < 18) return 'Selamat Sore'
  return 'Selamat Berbuka'
})
</script>

<template>
  <div class="space-y-6">
    <!-- User Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Avatar -->
        <div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <p class="text-xs font-bold text-secondary-400 uppercase tracking-wider">{{ greeting }}</p>
          <div class="flex items-center gap-2">
            <p class="text-xl font-bold text-secondary-900 dark:text-white leading-none">
              {{ gameStore.state.userName || 'Muslim' }}
            </p>
            <span v-if="locationName !== 'Jakarta'" class="text-[10px] bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-1.5 py-0.5 rounded">📍</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button 
          @click="toggleDark()"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 text-xl"
          :class="isDark ? 'bg-secondary-800 text-yellow-400' : 'bg-white text-orange-400 shadow-sm'"
          :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <span v-if="isDark">🌙</span>
          <span v-else>☀️</span>
        </button>

        <!-- Notification bell -->
        <button class="w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 bg-white dark:bg-secondary-800 shadow-sm text-secondary-600 dark:text-secondary-400">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Dashboard Card -->
    <div class="bg-primary-600 dark:bg-[#121212] text-white rounded-[2rem] p-6 shadow-xl relative overflow-hidden border border-primary-500 dark:border-white/5">
      <!-- Background Pattern -->
      <div class="absolute inset-0 pattern-arabesque opacity-10 pointer-events-none"></div>

      <div class="relative z-10 flex items-end justify-between">
        <!-- Left: Ramadan Day -->
        <div>
          <p class="text-[10px] text-primary-100 dark:text-orange-200/80 font-bold uppercase tracking-widest mb-1">RAMADAN DAY</p>
          <div class="flex items-baseline gap-1">
            <span class="text-5xl font-bold tracking-tight text-white">{{ ramadanDay }}</span>
            <span class="text-lg text-primary-200 dark:text-white/40 font-medium">/ 30</span>
          </div>
        </div>

        <!-- Right: Clock -->
        <div class="text-right">
          <p class="text-4xl font-bold tracking-tight text-white mb-1">{{ timeStr }}</p>
          <div class="inline-flex items-center bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full px-3 py-1">
            <span class="text-[10px] font-medium text-white truncate max-w-[100px]">
              {{ upcomingPrayer ? `${upcomingPrayer.name} ${useDateFormat(upcomingPrayer.time, 'HH:mm').value}` : 'Loading...' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
