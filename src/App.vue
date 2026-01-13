<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useGameStore } from '@/stores/game'
import BottomNav from '@/components/navigation/BottomNav.vue'
import LevelUpModal from '@/components/game/LevelUpModal.vue'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.checkDailyLogin()
})
</script>

<template>
  <div class="min-h-screen bg-secondary-50">
    <!-- Main content -->
    <RouterView />

    <!-- Overlays -->
    <LevelUpModal />

    <!-- Bottom navigation -->
    <BottomNav />
  </div>
</template>
