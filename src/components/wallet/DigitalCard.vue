<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  balance: number
  totalBudget: number
  cardNumber?: string
  holderName?: string
}>()

const formattedBalance = computed(() => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(props.balance)
})

const formattedTotal = computed(() => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(props.totalBudget)
})
</script>

<template>
  <div class="relative w-full aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500 group select-none">
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-black"></div>
    
    <!-- Decorative Shapes -->
    <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
    
    <!-- Glassmorphism Overlay -->
    <div class="absolute inset-0 bg-white/5 backdrop-blur-[1px] border border-white/10 rounded-2xl"></div>

    <!-- Content -->
    <div class="relative h-full p-6 flex flex-col justify-between text-white">
      <!-- Top Row -->
      <div class="flex justify-between items-start">
        <!-- Chip Icon -->
        <div class="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-400/50 shadow-inner flex items-center justify-center relative overflow-hidden opacity-90">
             <div class="absolute inset-0 bg-black/10"></div>
             <!-- Chip Lines -->
             <div class="absolute w-full h-[1px] bg-amber-700/40 top-1/2"></div>
             <div class="absolute h-full w-[1px] bg-amber-700/40 left-1/3"></div>
             <div class="absolute h-full w-[1px] bg-amber-700/40 right-1/3"></div>
             <div class="w-6 h-4 border border-amber-700/30 rounded-sm"></div>
        </div>
        
        <!-- Contactless Icon -->
        <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      </div>

      <!-- Balance Section -->
      <div class="space-y-1">
        <p class="text-emerald-200/80 text-[10px] font-medium uppercase tracking-wider">Dana Belum Dialokasikan</p>
        <h2 class="text-2xl font-bold tracking-tight text-white drop-shadow-md font-mono">
          {{ formattedBalance }}
        </h2>
      </div>

      <!-- Bottom Row -->
      <div class="flex justify-between items-end">
        <div class="space-y-0.5">
           <p class="text-[9px] text-white/50 uppercase tracking-widest font-medium">{{ holderName || 'MEMBER' }}</p>
           <p class="text-xs font-mono text-white/80 tracking-widest tabular-nums">
             {{ cardNumber || '•••• ' + new Date().getFullYear() }}
           </p>
        </div>
        
        <div class="text-right">
           <p class="text-[9px] text-emerald-200/60 uppercase">Limit</p>
           <p class="text-xs font-mono font-medium text-emerald-100">{{ formattedTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
