<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { BaseCard } from '@/components/base'

const gameStore = useGameStore()


</script>

<template>
  <div class="space-y-4">
    <!-- Quran Tracker (Highlighted) -->
    <router-link to="/quran" class="block">
      <div class="w-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-5 shadow-lg relative overflow-hidden group transition-all active:scale-95">
         <!-- Abstract patterns -->
         <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
         <div class="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10"></div>

         <div class="relative z-10 flex items-center justify-between">
           <div>
             <span class="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
               NEW CHALLENGE
             </span>
             <h3 class="text-xl font-bold text-white mt-2">Khatam Quran</h3>
             <p class="text-emerald-100 text-sm">Track your progress 30 Juz</p>
           </div>
           <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300 backdrop-blur-sm">
             📖
           </div>
         </div>
      </div>
    </router-link>

    <div class="grid grid-cols-2 gap-4">
      <!-- Kitchen Card -->
      <router-link to="/dapur" class="block h-full">
        <BaseCard class="h-full relative group transition-all active:scale-95 overflow-hidden" :rounded="'2xl'" :padding="'lg'">
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
        </BaseCard>
      </router-link>

      <!-- Streak Card -->
      <BaseCard class="h-full bg-[#FFF5EB] dark:bg-[#2A1C15] border-orange-100 dark:border-white/5 relative group" :rounded="'2xl'" :padding="'lg'">
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
      </BaseCard>
    </div>
  </div>
</template>
