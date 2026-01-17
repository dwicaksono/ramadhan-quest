<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWalletStore } from '@/stores/wallet'
const props = defineProps<{
  amount: number
}>()

const walletStore = useWalletStore()
const mode = ref<'efficient' | 'distribute'>('efficient')

const breakdown = computed(() => walletStore.getDenominations(props.amount, mode.value))

function getBgColor(value: number): string {
  switch (value) {
    case 100000: return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
    case 50000: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
    case 20000: return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
    case 10000: return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800'
    case 5000: return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
    case 2000: return 'bg-stone-200 text-stone-700 border-stone-300 dark:bg-stone-700 dark:text-stone-300 dark:border-stone-600'
    case 1000: return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
    default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="bg-stone-50 dark:bg-secondary-800 rounded-xl border border-stone-200 dark:border-secondary-700 overflow-hidden">
      <!-- Total Display -->
      <div class="p-4 flex items-center justify-between border-b border-stone-200 dark:border-secondary-700">
        <span class="text-secondary-600 dark:text-secondary-400 font-medium">Total Nominal</span>
        <span class="text-xl font-bold text-secondary-900 dark:text-white">
          {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount) }}
        </span>
      </div>
      
      <!-- Strategy Toggle -->
      <div class="grid grid-cols-2 p-1 gap-1 bg-stone-100 dark:bg-secondary-900/50">
        <button 
          @click="mode = 'efficient'"
          class="py-2 px-3 rounded-lg text-sm font-bold transition-all"
          :class="mode === 'efficient' ? 'bg-white dark:bg-secondary-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-secondary-400 hover:text-secondary-600'"
        >
          Ringkas (Besar)
        </button>
        <button 
          @click="mode = 'distribute'"
          class="py-2 px-3 rounded-lg text-sm font-bold transition-all"
          :class="mode === 'distribute' ? 'bg-white dark:bg-secondary-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-secondary-400 hover:text-secondary-600'"
        >
          Eceran (Kecil)
        </button>
      </div>
    </div>

    <!-- Breakdown Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div 
        v-for="item in breakdown" 
        :key="item.value"
        class="flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-sm"
        :class="getBgColor(item.value)"
      >
        <div class="flex flex-col">
          <span class="text-[10px] opacity-70 font-bold uppercase tracking-widest mb-0.5">Pecahan</span>
          <span class="font-bold text-lg tracking-tight">{{ item.label }}</span>
        </div>
        <div class="flex flex-col items-end">
          <div class="flex items-baseline gap-1">
             <span class="text-2xl font-bold tabular-nums leading-none">{{ item.count }}</span>
             <span class="text-xs font-medium opacity-80">lembar</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="breakdown.length === 0" class="text-center py-8 text-secondary-400">
      <p>Belum ada nominal untuk dihitung.</p>
    </div>
  </div>
</template>
