<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { BaseCard, BaseButton, BaseProgress } from '@/components/base'

const gameStore = useGameStore()
const nameInput = ref(gameStore.state.userName)

function saveName() {
  gameStore.setUserName(nameInput.value)
}

function resetProgress() {
  if (confirm('Apakah kamu yakin ingin reset semua progress?')) {
    gameStore.reset()
  }
}
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-6">
    <!-- Header -->
    <div class="text-center">
      <div class="w-24 h-24 bg-primary-100 rounded-full mx-auto flex items-center justify-center text-5xl mb-4">
        🧕
      </div>
      <h1 class="text-2xl font-bold text-secondary-900">
        {{ gameStore.state.userName || 'Muslim' }}
      </h1>
      <p class="text-sm text-secondary-500">Level {{ gameStore.state.level }}</p>
    </div>

    <!-- Stats -->
    <BaseCard>
      <div class="space-y-4">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-secondary-600">XP</span>
            <span class="font-medium">{{ gameStore.state.xp }} XP</span>
          </div>
          <BaseProgress :value="gameStore.currentLevelProgress" variant="primary" />
        </div>

        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-2xl font-bold text-primary-600">{{ gameStore.state.streak }}</p>
            <p class="text-xs text-secondary-500">Streak</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-accent-600">{{ gameStore.state.coins }}</p>
            <p class="text-xs text-secondary-500">Coins</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-secondary-600">{{ gameStore.state.energy }}%</p>
            <p class="text-xs text-secondary-500">Energy</p>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Name settings -->
    <BaseCard>
      <label class="block text-sm font-medium text-secondary-700 mb-2">
        Nama Kamu
      </label>
      <div class="flex gap-2">
        <input
          v-model="nameInput"
          type="text"
          class="flex-1 px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Masukkan nama"
        >
        <BaseButton @click="saveName">
          Simpan
        </BaseButton>
      </div>
    </BaseCard>

    <!-- Actions -->
    <div class="space-y-3">
      <BaseButton variant="outline" block>
        💝 Traktir Developer
      </BaseButton>
      <BaseButton variant="ghost" block class="text-red-500" @click="resetProgress">
        Reset Progress
      </BaseButton>
    </div>
  </div>
</template>
