<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useLeveling } from '@/composables/useLeveling'
import { BaseCard, BaseButton, BaseProgress } from '@/components/base'
import TrophyRoom from '@/components/profile/TrophyRoom.vue'
import { usePrayerTimes } from '@/composables/usePrayerTimes'
import { useStorage } from '@vueuse/core'

import { toast } from 'vue-sonner'
import { exportData, importData, clearAllData } from '@/utils/storage'

const gameStore = useGameStore()
const { level, xp, xpToNextLevel, progressPercent, levelTitle } = useLeveling()

const nameInput = ref(gameStore.state.userName)
const fileInput = ref<HTMLInputElement | null>(null)

// Prayer Times Settings
const { 
  locationName, 
  detectLocation, 
  isLoading: isLocLoading, 
  availableMethods, 
  selectedMethodId, 
  // setMethod,
  // setLocation
} = usePrayerTimes()

// We need direct access to coords for display only, but usePrayerTimes manages it
const coords = useStorage('rq-user-coords', { lat: 0, lng: 0 }) 

const manualLocationName = ref(locationName.value)
const notificationsEnabled = ref(false)

function checkNotificationStatus() {
  if (!('Notification' in window)) return
  notificationsEnabled.value = Notification.permission === 'granted'
}

async function requestNotification() {
  if (!('Notification' in window)) {
    toast.error('Browser tidak mendukung notifikasi')
    return
  }

  const permission = await Notification.requestPermission()
  notificationsEnabled.value = permission === 'granted'
  
  if (permission === 'granted') {
    toast.success('Notifikasi Adzan diaktifkan! 🔔')
    new Notification('Ramadhan Quest', { body: 'Notifikasi aktif. Selamat beribadah!' })
  } else {
    toast.error('Izin notifikasi ditolak')
  }
}

function updateLocationName() {
  // Just updates the name for now, doesn't change coords unless we implement geocoding
  // But user expects name change to persist
  locationName.value = manualLocationName.value
  toast.success('Nama lokasi diperbarui')
}

function handleMethodChange() {
  // handled by v-model but good for toast
  toast.success('Metode perhitungan diperbarui')
}

function saveName() {
  gameStore.setUserName(nameInput.value)
  toast.success('Nama berhasil disimpan!')
}

onMounted(() => {
  checkNotificationStatus()
})

function handleExport() {
  try {
    exportData()
    toast.success('Backup data berhasil didownload')
  } catch (e) {
    toast.error('Gagal membuat backup')
  }
}

async function handleImport(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return

  const file = target.files[0]
  const success = await importData(file)
  
  if (success) {
    toast.success('Data berhasil dipulihkan!')
  } else {
    toast.error('Gagal memulihkan data. File mungkin rusak.')
  }
  
  // Reset input
  if (fileInput.value) fileInput.value.value = ''
}

function handleReset() {
  if (confirm('⚠️ PERINGATAN: Semua progress kamu (XP, Coins, Habit) akan hilang permanen.\n\nYakin ingin reset?')) {
    clearAllData()
  }
}
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-6">
    <!-- Header -->
    <div class="text-center">
      <div class="w-24 h-24 bg-primary-100 dark:bg-primary-900/50 rounded-full mx-auto flex items-center justify-center text-5xl mb-4 border-4 border-white dark:border-secondary-800 shadow-sm">
        🧕
      </div>
      <h1 class="text-2xl font-bold text-secondary-900 dark:text-white">
        {{ gameStore.state.userName || 'Muslim' }}
      </h1>
      <p class="text-sm text-primary-600 dark:text-primary-400 font-medium">{{ levelTitle }}</p>
      <p class="text-xs text-secondary-500 dark:text-secondary-400">Level {{ level }}</p>
    </div>

    <!-- Level Progress Card -->
    <BaseCard>
      <div class="space-y-4">
        <!-- XP Progress -->
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-secondary-600 dark:text-secondary-400">XP Progress</span>
            <span class="font-medium dark:text-white">{{ xp }} / {{ xp + xpToNextLevel }} XP</span>
          </div>
          <BaseProgress :value="progressPercent" variant="primary" />
          <p class="text-xs text-secondary-400 dark:text-secondary-500 mt-1 text-right">
            {{ xpToNextLevel }} XP to Level {{ level + 1 }}
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-3 gap-4 text-center pt-2 border-t border-secondary-100 dark:border-secondary-700">
          <div>
            <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ gameStore.state.streak }}</p>
            <p class="text-xs text-secondary-500 dark:text-secondary-400">Streak</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-accent-600 dark:text-accent-400">{{ gameStore.state.coins }}</p>
            <p class="text-xs text-secondary-500 dark:text-secondary-400">Coins</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-secondary-600 dark:text-secondary-300">{{ gameStore.state.energy }}%</p>
            <p class="text-xs text-secondary-500 dark:text-secondary-400">Energy</p>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Trophy Room -->
    <TrophyRoom />

    <!-- Name settings -->
    <BaseCard>
      <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
        Nama Kamu
      </label>
      <div class="flex gap-2">
        <input
          v-model="nameInput"
          type="text"
          class="flex-1 px-4 py-3 border border-secondary-200 dark:border-secondary-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500"
          placeholder="Masukkan nama"
        >
        <BaseButton @click="saveName">
          Simpan
        </BaseButton>
      </div>
    </BaseCard>

    <!-- App Settings -->
    <BaseCard title="Pengaturan Aplikasi">
      <div class="space-y-4">
        <!-- Sound Toggle -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              🔊
            </div>
            <div>
              <p class="text-sm font-medium text-secondary-900 dark:text-white">Efek Suara</p>
              <p class="text-xs text-secondary-500 dark:text-secondary-400">Audio game dan efek</p>
            </div>
          </div>
          <button 
            @click="gameStore.toggleSound(!gameStore.state.settings.soundEnabled)"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800"
            :class="gameStore.state.settings.soundEnabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-secondary-700'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="gameStore.state.settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
        </div>

        <!-- Haptics Toggle -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              📳
            </div>
            <div>
              <p class="text-sm font-medium text-secondary-900 dark:text-white">Getaran</p>
              <p class="text-xs text-secondary-500 dark:text-secondary-400">Haptic feedback</p>
            </div>
          </div>
          <button 
            @click="gameStore.toggleHaptics(!gameStore.state.settings.hapticsEnabled)"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800"
            :class="gameStore.state.settings.hapticsEnabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-secondary-700'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="gameStore.state.settings.hapticsEnabled ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
        </div>
      </div>
    </BaseCard>

    <!-- Prayer Times Settings -->
    <BaseCard title="Waktu Sholat & Notifikasi">
      <div class="space-y-4">
        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Lokasi
          </label>
          <div class="flex gap-2 mb-2">
            <input
              v-model="manualLocationName"
              type="text"
              class="flex-1 px-4 py-3 border border-secondary-200 dark:border-secondary-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white"
              placeholder="Nama Kota (cth: Jakarta)"
              @change="updateLocationName"
            >
            <BaseButton @click="detectLocation" :disabled="isLocLoading">
              <span v-if="isLocLoading">...</span>
              <span v-else>📍 GPS</span>
            </BaseButton>
          </div>
          <p class="text-xs text-secondary-500 dark:text-secondary-400">
            Koordinat: {{ coords.lat.toFixed(4) }}, {{ coords.lng.toFixed(4) }}
          </p>
        </div>

        <!-- Calculation Method -->
        <div>
          <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Metode Perhitungan
          </label>
          <select
            v-model="selectedMethodId"
            @change="handleMethodChange"
            class="w-full px-4 py-3 border border-secondary-200 dark:border-secondary-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white appearance-none"
          >
            <option v-for="method in availableMethods" :key="method.id" :value="method.id">
              {{ method.name }}
            </option>
          </select>
        </div>

        <!-- Notification Permission -->
        <div class="flex items-center justify-between pt-2">
           <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
              🔔
            </div>
            <div>
              <p class="text-sm font-medium text-secondary-900 dark:text-white">Notifikasi Adzan</p>
              <p class="text-xs text-secondary-500 dark:text-secondary-400">Pengingat waktu sholat</p>
            </div>
          </div>
          <button 
            @click="requestNotification"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800"
            :class="notificationsEnabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-secondary-700'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="notificationsEnabled ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
        </div>
      </div>
    </BaseCard>

    <!-- Actions -->
    <div class="space-y-6">
      <!-- Data Management -->
      <BaseCard title="Pengaturan Data">
        <div class="space-y-3">
          <p class="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
            Simpan progress kamu agar aman, atau pindahkan ke perangkat lain.
          </p>
          
          <div class="grid grid-cols-2 gap-3">
            <BaseButton variant="outline" @click="handleExport" class="dark:border-secondary-600 dark:text-secondary-200 dark:hover:bg-secondary-700">
              📤 Backup Data
            </BaseButton>
            
            <div class="relative">
              <input
                type="file"
                ref="fileInput"
                accept=".json"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @change="handleImport"
              />
              <BaseButton variant="outline" class="w-full dark:border-secondary-600 dark:text-secondary-200 dark:hover:bg-secondary-700">
                📥 Restore Data
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Danger Zone -->
      <div class="pt-4 border-t border-secondary-200 dark:border-secondary-700">
        <BaseButton variant="outline" block class="mb-3 dark:border-secondary-600 dark:text-secondary-200 dark:hover:bg-secondary-700">
          💝 Traktir Developer
        </BaseButton>
        
        <BaseButton 
          variant="ghost" 
          block 
          class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" 
          @click="handleReset"
        >
          🗑️ Reset Semua Data
        </BaseButton>
        <p class="text-center text-xs text-secondary-400 mt-2">
          Hati-hati, aksi ini tidak bisa dibatalkan.
        </p>
      </div>
    </div>
  </div>
</template>
