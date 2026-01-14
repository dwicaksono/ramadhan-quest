<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton } from '@/components/base'
import { useGameStore } from '@/stores/game'
import { useAudio } from '@/composables/useAudio'
import { usePrayerTimes } from '@/composables/usePrayerTimes'
import { toast } from 'vue-sonner'
import { useNow } from '@vueuse/core'
import { ref } from 'vue'
import PrayerGuideModal from '@/components/home/PrayerGuideModal.vue'
import SedekahModal from '@/components/home/SedekahModal.vue'

const gameStore = useGameStore()
const { playSfx } = useAudio()
const showPrayerGuide = ref(false)
const showSedekah = ref(false)
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
      @click="showPrayerGuide = true"
    >
      <svg class="w-4 h-4 mr-1 text-primary-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      Prayer Guide
    </BaseButton>

    <!-- FAB Button (Sedekah) -->
    <button 
      class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors group relative"
      @click="showSedekah = true"
      aria-label="Catat Sedekah"
    >
      <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <!-- Optional: Badge/Indicator if user hasn't done sedekah today (future) -->
    </button>

    <PrayerGuideModal v-model="showPrayerGuide" />
    <SedekahModal v-model="showSedekah" />
  </div>
</template>
