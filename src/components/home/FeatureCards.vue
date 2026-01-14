<script setup lang="ts">
import { useGameStore } from '@/stores/game'


const gameStore = useGameStore()


</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <!-- Kitchen Card -->
    <router-link to="/dapur" class="block">
      <div class="h-full bg-white dark:bg-[#121212] rounded-[2rem] p-5 shadow-sm border border-stone-100 dark:border-white/5 relative group transition-all active:scale-95">
        <!-- New Badge -->
        <span class="absolute top-4 right-4 bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-[10px] font-bold px-2.5 py-1 rounded-lg">
          NEW
        </span>

        <!-- Icon -->
        <div class="w-12 h-12 bg-primary-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-12 group-hover:scale-110 transition-transform duration-300">
          <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>

        <!-- Content -->
        <div>
          <p class="text-[10px] text-stone-400 dark:text-stone-500 font-bold tracking-widest uppercase mb-1">ISLAMI</p>
          <h3 class="text-lg font-bold text-stone-800 dark:text-white leading-tight mb-1">Dapur & Resep</h3>
          <p class="text-xs text-stone-400 dark:text-stone-500 font-medium flex items-center gap-1">
            Explore <span class="group-hover:translate-x-1 transition-transform">→</span>
          </p>
        </div>
      </div>
    </router-link>

    <!-- Streak Card -->
    <div class="h-full bg-[#FFF5EB] dark:bg-[#2A1C15] rounded-[2rem] p-5 shadow-sm border border-orange-100 dark:border-white/5 relative group">
      <!-- Icon -->
      <div class="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-12">
        <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      </div>

      <!-- Content -->
      <div>
        <p class="text-[10px] text-orange-400/80 font-bold tracking-widest uppercase mb-1">ISTIQOMAH</p>
        <div class="flex items-baseline gap-1 mb-2">
          <span class="text-3xl font-bold text-stone-800 dark:text-white">{{ gameStore.state.streak }}</span>
          <span class="text-sm font-medium text-stone-500 dark:text-stone-400">Hari</span>
        </div>
        <span class="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
          Keep it up! 🔥
        </span>
      </div>
    </div>
  </div>
</template>
