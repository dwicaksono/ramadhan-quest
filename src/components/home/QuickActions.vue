<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton } from '@/components/base'
import { useGameStore } from '@/stores/game'
import { useAudio } from '@/composables/useAudio'
import { usePrayerTimes } from '@/composables/usePrayerTimes'
import { toast } from 'vue-sonner'
import { useNow } from '@vueuse/core'

const gameStore = useGameStore()
const { playSfx } = useAudio()
const { times } = usePrayerTimes()
const now = useNow()

const isFasting = computed(() => {
  if (!times.value) return false // Safety fallback
  
  // Use today's Subuh and Maghrib
  const subuh = times.value.fajr
  const maghrib = times.value.maghrib
  
  // Check if NOW is between Subuh and Maghrib
  return now.value >= subuh && now.value < maghrib
})

function handleLogWater() {
  if (isFasting.value) {
    toast.warning('Sabar... Belum waktunya berbuka! 🚫', {
      description: 'Air minum dikunci selama jam puasa (Subuh - Maghrib).'
    })
    return
  }

  const count = gameStore.logWater()
  playSfx('click')
  
  if (count <= 8) {
    toast.success(`Alhamdulillah! Gelas ke-${count} (${gameStore.state.energy}% Energy)`)
  } else {
    toast.info(`MashaAllah, sudah ${count} gelas! Tetap terhidrasi.`)
  }
}
</script>

<template>
  <div class="flex gap-3">
    <BaseButton
      variant="secondary"
      size="sm"
      class="flex-1 group relative overflow-hidden"
      :class="{ 'opacity-75': isFasting }"
      @click="handleLogWater"
    >
      <!-- Icon changes based on state -->
      <svg v-if="isFasting" class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <svg v-else class="w-4 h-4 mr-1 text-sky-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12l-8-8-8 8m16 0A8 8 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" opacity="0.5"/>
      </svg>
      
      <span v-if="isFasting">Sedang Puasa</span>
      <span v-else>Log Water ({{ gameStore.state.waterLog || 0 }}/8)</span>
    </BaseButton>

    <BaseButton
      variant="secondary"
      size="sm"
      class="flex-1 group"
    >
      <svg class="w-4 h-4 mr-1 text-primary-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Prayer Guide
    </BaseButton>

    <!-- FAB Button -->
    <button class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>
