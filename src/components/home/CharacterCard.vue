<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGameStore } from '@/stores/game'


const gameStore = useGameStore()
const isBouncing = ref(false)

const moodEmoji = computed(() => {
  switch (gameStore.state.mood) {
    case 'happy': return '😊'
    case 'excited': return '🤩'
    case 'neutral': return '😐'
    case 'sad': return '😢'
    case 'tired': return '😴'
    default: return '😊'
  }
})

const statusMessage = computed(() => {
  const { energy } = gameStore.state
  if (energy < 20) return 'Butuh istirahat...'
  if (energy < 40) return 'Agak lelah'
  if (energy < 60) return 'Cukup berenergi'
  if (energy < 80) return 'Semangat!'
  return 'Penuh energi! 💪'
})

const moodAnimationClass = computed(() => {
  if (isBouncing.value) return 'animate-bounce-custom'
  switch (gameStore.state.mood) {
    case 'excited': return 'animate-excited shadow-lg shadow-white/20'
    case 'tired': return 'animate-tired grayscale-[0.2]'
    case 'happy': return 'hover:scale-105'
    default: return ''
  }
})

function triggerBounce() {
  isBouncing.value = true
  setTimeout(() => isBouncing.value = false, 1000)
}
</script>

<template>
  <div class="bg-white dark:bg-[#151921] text-secondary-900 dark:text-white rounded-[2rem] p-6 relative overflow-hidden shadow-xl border border-stone-100 dark:border-white/5 group">
    <!-- Texture Overlay (Dark Mode Only) -->
    <div class="absolute inset-0 pattern-arabesque opacity-5 pointer-events-none hidden dark:block"></div>

    <!-- Status Badge -->
    <div class="relative z-10 flex items-center justify-between mb-6">
      <span class="bg-stone-100 dark:bg-white/10 backdrop-blur-md border border-stone-200 dark:border-white/10 text-stone-600 dark:text-white/90 text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
        CURRENT STATE: FASTING
      </span>
      <button class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-stone-100 dark:hover:bg-white/10 transition-colors text-stone-400 dark:text-white/40 hover:text-stone-600 dark:hover:text-white">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-6 relative z-10">
      <!-- Stats -->
      <div class="flex-1 space-y-4">
        <!-- Energy -->
        <div>
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="text-stone-500 dark:text-white/60 font-medium">Energy Level</span>
            <span class="font-bold text-secondary-900 dark:text-white">{{ gameStore.energyPercentage }}%</span>
          </div>
          <div class="h-1.5 bg-stone-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-primary-500 dark:bg-secondary-400 rounded-full transition-all duration-500" 
              :style="{ width: `${gameStore.energyPercentage}%` }"
            ></div>
          </div>
        </div>

        <!-- Faith -->
        <div>
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="text-stone-500 dark:text-white/60 font-medium">Faith Meter</span>
            <span class="font-bold text-secondary-900 dark:text-white">{{ Math.round(gameStore.currentLevelProgress) }}%</span>
          </div>
          <div class="h-1.5 bg-stone-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-orange-400 dark:bg-orange-200 rounded-full transition-all duration-500" 
              :style="{ width: `${gameStore.currentLevelProgress}%` }"
            ></div>
          </div>
        </div>

        <p class="text-sm font-medium text-orange-600 dark:text-yellow-500 mt-2 italic flex items-center gap-1">
          "{{ statusMessage }}"
        </p>
      </div>

      <!-- Character Emoji -->
      <div 
        class="shrink-0 w-24 h-24 bg-stone-50 dark:bg-white/5 backdrop-blur-sm border border-stone-100 dark:border-white/10 rounded-3xl flex items-center justify-center text-6xl shadow-inner dark:shadow-lg transition-transform active:scale-95 cursor-pointer relative overflow-hidden"
        :class="moodAnimationClass"
        @click="triggerBounce"
      >
        <!-- Inner glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none hidden dark:block"></div>
        {{ moodEmoji }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-excited {
  animation: bounce 2s infinite;
}

.animate-tired {
  animation: pulse-slow 3s infinite;
  opacity: 0.8;
}

.animate-bounce-custom {
  animation: bounce-custom 0.5s ease-in-out 2;
}

@keyframes bounce-custom {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.9); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(-5%); }
  50% { transform: translateY(5%); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.8; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
}
</style>
