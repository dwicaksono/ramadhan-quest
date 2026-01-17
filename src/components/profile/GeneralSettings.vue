<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { BaseCard, BaseButton } from '@/components/base'
import { toast } from 'vue-sonner'

const gameStore = useGameStore()
const nameInput = ref(gameStore.state.userName)

const avatars = [
  { id: 'female_hijab', icon: '🧕', label: 'Muslimah' },
  { id: 'male_peci', icon: '👳', label: 'Muslim' },
  { id: 'male_modern', icon: '🧔', label: 'Modern' },
  { id: 'male_young', icon: '👦', label: 'Young' },
]

function saveName() {
  gameStore.setUserName(nameInput.value)
  toast.success('Nama berhasil disimpan!')
}

function selectAvatar(id: any) {
  gameStore.setAvatar(id)
  toast.success('Avatar diperbarui!')
}
</script>

<template>
  <div class="space-y-4">
    <!-- Name Settings -->
    <BaseCard>
      <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
        Nama Kamu
      </label>
      <div class="flex gap-2">
        <input
          v-model="nameInput"
          type="text"
          class="flex-1 px-4 py-3 border border-secondary-200 dark:border-secondary-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 transition-all font-medium"
          placeholder="Masukkan nama"
        >
        <BaseButton @click="saveName">
          Simpan
        </BaseButton>
      </div>
    </BaseCard>



    <!-- Avatar Selection -->
    <BaseCard>
      <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
        Pilih Avatar
      </label>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="avatar in avatars"
          :key="avatar.id"
          @click="selectAvatar(avatar.id)"
          class="aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all"
          :class="gameStore.state.avatarId === avatar.id 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-200 dark:ring-primary-800' 
            : 'border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800/50'"
        >
          <span class="text-3xl mb-1">{{ avatar.icon }}</span>
          <span class="text-[9px] font-bold uppercase tracking-wide" 
            :class="gameStore.state.avatarId === avatar.id ? 'text-primary-700 dark:text-primary-300' : 'text-secondary-400 font-medium'">
            {{ avatar.label }}
          </span>
        </button>
      </div>
    </BaseCard>

    <!-- App Preferences -->
    <BaseCard title="Preferensi Aplikasi">
      <div class="space-y-5">
        <!-- Sound Toggle -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl shadow-sm">
              🔊
            </div>
            <div>
              <p class="text-sm font-bold text-secondary-900 dark:text-white">Efek Suara</p>
              <p class="text-xs text-secondary-500 dark:text-secondary-400">Audio game dan efek interaksi</p>
            </div>
          </div>
          <button 
            @click="gameStore.toggleSound(!gameStore.state.settings.soundEnabled)"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800"
            :class="gameStore.state.settings.soundEnabled ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-secondary-700'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
              :class="gameStore.state.settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
        </div>

        <!-- Separator -->
        <!-- <div class="h-px bg-secondary-100 dark:bg-secondary-700/50"></div> -->

        <!-- Haptics Toggle (REMOVED) -->
        <!-- 
        <div class="flex items-center justify-between">
          ...
        </div> 
        -->
      </div>
    </BaseCard>
  </div>
</template>
