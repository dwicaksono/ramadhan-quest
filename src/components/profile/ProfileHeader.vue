<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useLeveling } from '@/composables/useLeveling'
import { BaseCard, BaseProgress } from '@/components/base'

const gameStore = useGameStore()
const { level, xp, xpToNextLevel, progressPercent, levelTitle } = useLeveling()

const avatars: Record<string, string> = {
  female_hijab: '🧕',
  male_peci: '👳',
  male_modern: '🧔',
  male_young: '👦'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Avatar & Name -->
    <div class="text-center">
      <div class="relative w-24 h-24 mx-auto mb-4">
        <div class="w-full h-full bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-5xl border-4 border-white dark:border-secondary-800 shadow-sm overflow-hidden">
          {{ avatars[gameStore.state.avatarId] || '🧕' }}
        </div>
        <!-- Online Indicator (Simulated) -->
        <div class="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white dark:border-secondary-900"></div>
      </div>
      
      <h1 class="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
        {{ gameStore.state.userName || 'Muslim' }}
      </h1>
      
      <div class="flex items-center justify-center gap-2 text-sm">
        <span class="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-medium">
          {{ levelTitle }}
        </span>
        <span class="text-secondary-400 dark:text-secondary-500">•</span>
        <span class="text-secondary-500 dark:text-secondary-400">Level {{ level }}</span>
      </div>
    </div>

    <!-- Level Progress Card -->
    <BaseCard>
      <div class="space-y-5">
        <!-- XP Progress -->
        <div>
          <div class="flex justify-between text-xs font-semibold mb-2">
            <span class="text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">XP Progress</span>
            <span class="text-primary-600 dark:text-primary-400">{{ xp }} / {{ xp + xpToNextLevel }} XP</span>
          </div>
          <BaseProgress :value="progressPercent" variant="primary" class="h-3" />
          <p class="text-[10px] text-secondary-400 dark:text-secondary-500 mt-2 text-right font-medium">
            {{ xpToNextLevel }} XP to Level {{ level + 1 }} ⚡
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-3 gap-2 pt-2 border-t border-dashed border-secondary-200 dark:border-secondary-700">
          <div class="flex flex-col items-center p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
            <span class="text-2xl mb-1">🔥</span>
            <p class="text-lg font-bold text-secondary-900 dark:text-white leading-none">{{ gameStore.state.streak }}</p>
            <p class="text-[10px] uppercase font-bold text-secondary-400 tracking-wider mt-1">Streak</p>
          </div>
          
          <div class="flex flex-col items-center p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
            <span class="text-2xl mb-1">🪙</span>
            <p class="text-lg font-bold text-secondary-900 dark:text-white leading-none">{{ gameStore.state.coins }}</p>
            <p class="text-[10px] uppercase font-bold text-secondary-400 tracking-wider mt-1">Coins</p>
          </div>
          
          <div class="flex flex-col items-center p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
            <span class="text-2xl mb-1">⚡</span>
            <p class="text-lg font-bold text-secondary-900 dark:text-white leading-none">{{ gameStore.state.energy }}%</p>
            <p class="text-[10px] uppercase font-bold text-secondary-400 tracking-wider mt-1">Energy</p>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
