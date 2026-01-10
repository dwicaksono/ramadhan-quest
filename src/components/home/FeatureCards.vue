<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { BaseCard } from '@/components/base'

const gameStore = useGameStore()


</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <!-- Kitchen Card -->
    <BaseCard class="relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <router-link to="/dapur" class="block">
        <span class="absolute top-2 right-2 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          NEW
        </span>
        <div class="text-3xl mb-2">🍳</div>
        <p class="text-xs text-secondary-500">Kitchen</p>
        <p class="text-lg font-bold text-secondary-900">Sahur Ideas</p>
        <p class="text-xs text-primary-600 mt-2 font-medium">→ Check recipes</p>
      </router-link>
    </BaseCard>

    <!-- Streak Card -->
    <BaseCard class="relative overflow-hidden" variant="accent">
      <div class="absolute top-2 right-2 text-4xl opacity-30">🔥</div>
      <div class="text-3xl mb-2">📿</div>
      <p class="text-xs text-secondary-600">Daily Habits</p>
      <p class="text-lg font-bold text-secondary-900">
        <span class="text-accent-600">{{ gameStore.state.streak }}</span> Day Streak
      </p>
      <p class="text-xs text-secondary-500 mt-2">Keep the momentum!</p>
    </BaseCard>
  </div>
</template>
