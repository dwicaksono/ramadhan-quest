<script setup lang="ts">

import { useQuranStore } from '@/stores/quran'
import { BaseProgress, BaseHeader } from '@/components/base'
import { toast } from 'vue-sonner'
import { useAudio } from '@/composables/useAudio'
import { useHaptics } from '@/composables/useHaptics'


const quranStore = useQuranStore()
const { playSfx } = useAudio()
const { trigger } = useHaptics()

// Generate 1-30 array
const juzList = Array.from({ length: 30 }, (_, i) => i + 1)

function handleJuzClick(juzId: number) {
  const result = quranStore.toggleJuz(juzId)
  
  if (result.completed) {
    playSfx('success')
    trigger('medium')
    toast.success(`Alhamdulillah! Juz ${juzId} selesai. +${result.xpEarned} XP`)
  } else {
    trigger('light')
  }
}
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-6">
    <!-- Header -->
    <BaseHeader 
      title="Quran Tracker" 
      subtitle="Catat progress tilawahmu"
    />

    <!-- Progress Card -->
    <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden">
      <!-- Decorative circles -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10"></div>

      <div class="relative z-10">
        <div class="flex justify-between items-end mb-4">
          <div>
            <p class="text-emerald-100 font-medium mb-1">Total Khatam</p>
            <p class="text-3xl font-bold">{{ quranStore.totalCompleted }} <span class="text-lg font-normal opacity-80">/ 30 Juz</span></p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
            📖
          </div>
        </div>
        
        <BaseProgress 
          :value="quranStore.progressPercent" 
          class="bg-black/20"
          indicator-class="bg-white"
        />
        <p class="text-right text-xs mt-2 text-emerald-100">{{ quranStore.progressPercent }}% Menuju Khatam</p>
      </div>
    </div>

    <!-- Juz Grid -->
    <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
      <button
        v-for="id in juzList"
        :key="id"
        @click="handleJuzClick(id)"
        class="aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 relative overflow-hidden group"
        :class="[
          quranStore.isJuzCompleted(id)
            ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/30 shadow-lg'
            : 'bg-white dark:bg-[#121212] border-stone-100 dark:border-white/10 text-stone-400 dark:text-stone-500 hover:border-emerald-200 dark:hover:border-emerald-900'
        ]"
      >
        <span class="text-xs font-medium uppercase tracking-wider opacity-60">Juz</span>
        <span class="text-2xl font-bold">{{ id }}</span>
        
        <!-- Checkmark Overlay -->
        <div 
          v-if="quranStore.isJuzCompleted(id)"
          class="absolute inset-0 bg-emerald-600/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>
