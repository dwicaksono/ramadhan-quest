<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { Toaster } from 'vue-sonner'
import BottomNav from '@/components/navigation/BottomNav.vue'
import LevelUpModal from '@/components/game/LevelUpModal.vue'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.checkDailyLogin()
  
  // Note: Modern browsers require user interaction before playing audio.
  // We can't auto-play BGM here without a play button.
  // toggleBgm(true) 
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Main content -->
    <RouterView />

    <!-- Overlays -->
    <LevelUpModal />
    <Toaster position="top-center" richColors />

    <!-- Bottom navigation -->
    <BottomNav />
  </div>
</template>
