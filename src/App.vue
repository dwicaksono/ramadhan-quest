<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useNow, useDateFormat } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
import { usePrayerTimes } from '@/composables/usePrayerTimes'
import { useAudio } from '@/composables/useAudio'
import { useNotification } from '@/composables/useNotification'
import { Toaster } from 'vue-sonner'
import BottomNav from '@/components/navigation/BottomNav.vue'
import LevelUpModal from '@/components/game/LevelUpModal.vue'
import AdzanModal from '@/components/home/AdzanModal.vue'

const gameStore = useGameStore()
const { formattedTimes } = usePrayerTimes()
const { playSfx } = useAudio()
const { showNotification, isEnabled: notificationEnabled } = useNotification()
const now = useNow()

// Initialize Dark Mode globally
import { useDark } from '@vueuse/core'
useDark()

const showAdzan = ref(false)
const adzanPrayerName = ref('')
const lastTriggeredTime = ref('')

onMounted(() => {
  gameStore.checkDailyLogin()
})

// Global Adzan Trigger
watch(now, () => {
  if (!formattedTimes.value) return

  const currentTime = useDateFormat(now, 'HH:mm').value
  // Prevent double trigger in the same minute
  if (currentTime === lastTriggeredTime.value) return

  // Check if current time matches any prayer time
  const times = formattedTimes.value
  const prayers = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'] as const
  
  for (const p of prayers) {
    // Note: times[p] is like "18:05" (HH:mm)
    if (currentTime === times[p]) {
      triggerAdzan(p)
      lastTriggeredTime.value = currentTime
      break
    }
  }
})

function triggerAdzan(prayerKey: string) {
  // Map key to Display Name
  const map: Record<string, string> = {
    subuh: 'Subuh',
    dzuhur: 'Dzuhur',
    ashar: 'Ashar',
    maghrib: 'Maghrib',
    isya: 'Isya'
  }
  
  const prayerName = map[prayerKey]
  adzanPrayerName.value = prayerName
  showAdzan.value = true
  playSfx('levelup') // Placeholder for "Chime"
  
  // Send native browser notification (works when app is in background tab)
  if (notificationEnabled.value) {
    const body = prayerKey === 'maghrib' 
      ? 'Waktunya berbuka puasa! Selamat menunaikan ibadah sholat Maghrib 🌙' 
      : `Selamat menunaikan ibadah sholat ${prayerName}`
    
    showNotification(`🕌 Adzan ${prayerName}`, {
      body,
      icon: '/pwa-192x192.png',
      tag: `adzan-${prayerKey}`
    })
  }
  
  // Specific logic for Maghrib (Unlock Water)
  if (prayerKey === 'maghrib') {
    console.log('Maghrib time! Water unlocked.')
  }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Main content -->
    <RouterView />

    <!-- Overlays -->
    <LevelUpModal />
    <AdzanModal 
      v-model="showAdzan"
      :prayer-name="adzanPrayerName"
    />
    <Toaster position="top-center" richColors />

    <!-- Bottom navigation -->
    <BottomNav />
  </div>
</template>
