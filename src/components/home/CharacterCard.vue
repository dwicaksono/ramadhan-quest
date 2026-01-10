<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { BaseCard, BaseProgress } from '@/components/base'

const gameStore = useGameStore()

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
</script>

<template>
  <BaseCard
    variant="secondary"
    class="bg-gradient-to-br from-secondary-600 to-secondary-700 text-white relative overflow-hidden"
    rounded="2xl"
  >
    <!-- Status Badge -->
    <div class="flex items-center justify-between mb-4">
      <span class="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
        Current State: Fasting
      </span>
      <button class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>

    <div class="flex items-start gap-4">
      <!-- Stats -->
      <div class="flex-1 space-y-3">
        <div>
          <div class="flex items-center justify-between text-sm mb-1">
            <span class="text-white/80">Energy Level</span>
            <span class="font-semibold">{{ gameStore.energyPercentage }}%</span>
          </div>
          <BaseProgress
            :value="gameStore.energyPercentage"
            variant="success"
            size="sm"
          />
        </div>

        <div>
          <div class="flex items-center justify-between text-sm mb-1">
            <span class="text-white/80">Faith Meter</span>
            <span class="font-semibold">{{ Math.round(gameStore.currentLevelProgress) }}%</span>
          </div>
          <BaseProgress
            :value="gameStore.currentLevelProgress"
            variant="accent"
            size="sm"
          />
        </div>

        <p class="text-sm text-white/90 mt-4">
          "{{ statusMessage }}"
        </p>
      </div>

      <!-- Character placeholder -->
      <div class="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
        {{ moodEmoji }}
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
/* Override progress bar background for dark cards */
:deep(.bg-secondary-100) {
  @apply bg-white/20;
}
</style>
