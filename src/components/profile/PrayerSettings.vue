<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseButton } from '@/components/base'
import { usePrayerTimes } from '@/composables/usePrayerTimes'
import { useNotification } from '@/composables/useNotification'
import { useStorage } from '@vueuse/core'
import { toast } from 'vue-sonner'

// Prayer Times Settings
const { 
  locationName, 
  detectLocation, 
  isLoading: isLocLoading, 
  availableMethods, 
  selectedMethodId, 
} = usePrayerTimes()

// Notification Settings
const { 
  notificationPermission, 
  notificationEnabled, 
  requestPermission,
  isSupported: notificationSupported
} = useNotification()

// Coords for display
const coords = useStorage('rq-user-coords', { lat: 0, lng: 0 }) 
const manualLocationName = ref(locationName.value)

function updateLocationName() {
  locationName.value = manualLocationName.value
  toast.success('Nama lokasi diperbarui')
}

function handleMethodChange() {
  toast.success('Metode perhitungan diperbarui')
}

async function handleNotificationToggle() {
  if (notificationPermission.value !== 'granted') {
    const granted = await requestPermission()
    if (granted) {
      toast.success('Notifikasi Adzan diaktifkan! 🔔')
    } else {
      toast.error('Izin notifikasi ditolak')
    }
  } else {
    notificationEnabled.value = !notificationEnabled.value
    if (notificationEnabled.value) {
      toast.success('Notifikasi Adzan diaktifkan')
    } else {
      toast.info('Notifikasi Adzan dinonaktifkan')
    }
  }
}
</script>

<template>
  <BaseCard title="Waktu Sholat & Notifikasi">
    <div class="space-y-6">
      
      <!-- Location Section -->
      <div>
        <label class="flex items-center justify-between text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          <span>📍 Lokasi Kamu</span>
          <span class="text-[10px] text-secondary-400 font-mono">{{ coords.lat.toFixed(4) }}, {{ coords.lng.toFixed(4) }}</span>
        </label>
        
        <div class="flex gap-2">
          <input
            v-model="manualLocationName"
            type="text"
            class="flex-1 px-4 py-3 border border-secondary-200 dark:border-secondary-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white transition-all"
            placeholder="Nama Kota (cth: Jakarta)"
            @change="updateLocationName"
          >
          <BaseButton 
            @click="detectLocation" 
            :disabled="isLocLoading"
            variant="secondary"
            class="shrink-0"
          >
            <span v-if="isLocLoading" class="animate-spin">⌛</span>
            <span v-else>Update GPS</span>
          </BaseButton>
        </div>
        <p class="text-xs text-secondary-400 mt-2">
          Lokasi digunakan untuk menghitung jadwal sholat yang akurat.
        </p>
      </div>

      <!-- Separator -->
      <div class="h-px bg-secondary-100 dark:bg-secondary-700/50"></div>

      <!-- Calculation Method -->
      <div>
        <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          🕌 Metode Perhitungan
        </label>
        <div class="relative">
          <select
            v-model="selectedMethodId"
            @change="handleMethodChange"
            class="w-full px-4 py-3 pr-10 border border-secondary-200 dark:border-secondary-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white appearance-none truncate transition-all"
          >
            <option v-for="method in availableMethods" :key="method.id" :value="method.id">
              {{ method.name }}
            </option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
            🔽
          </div>
        </div>
      </div>

      <!-- Notification Permission -->
      <div v-if="notificationSupported">
        <div class="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 flex items-center justify-between border border-primary-100 dark:border-primary-800/50">
           <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white dark:bg-primary-800/50 flex items-center justify-center text-xl shadow-sm">
              🔔
            </div>
            <div>
              <p class="text-sm font-bold text-secondary-900 dark:text-white">Notifikasi Adzan</p>
              <p class="text-xs text-secondary-600 dark:text-secondary-400">Pengingat 5 waktu sholat</p>
            </div>
          </div>
          <button 
            @click="handleNotificationToggle"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800"
            :class="notificationEnabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-secondary-600'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
              :class="notificationEnabled ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
        </div>
      </div>

    </div>
  </BaseCard>
</template>
