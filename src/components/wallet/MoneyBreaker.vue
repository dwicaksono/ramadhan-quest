<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore } from '@/stores/wallet'
const props = defineProps<{
  amount: number
}>()

const walletStore = useWalletStore()

const breakdown = computed(() => walletStore.getDenominations(props.amount))

function getBgColor(value: number): string {
  switch (value) {
    case 100000: return 'bg-red-100 text-red-700 border-red-200'
    case 50000: return 'bg-blue-100 text-blue-700 border-blue-200'
    case 20000: return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    case 10000: return 'bg-purple-100 text-purple-700 border-purple-200'
    case 5000: return 'bg-amber-100 text-amber-700 border-amber-200'
    case 2000: return 'bg-stone-200 text-stone-700 border-stone-300'
    case 1000: return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200">
      <span class="text-secondary-600 font-medium">Total Nominal</span>
      <span class="text-xl font-bold text-secondary-900">
        {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount) }}
      </span>
    </div>

    <!-- Breakdown Grid -->
    <div class="grid grid-cols-2 gap-3">
      <div 
        v-for="item in breakdown" 
        :key="item.value"
        class="flex items-center justify-between p-3 rounded-lg border"
        :class="getBgColor(item.value)"
      >
        <div class="flex flex-col">
          <span class="text-xs opacity-70 font-semibold uppercase tracking-wider">Pecahan</span>
          <span class="font-bold">{{ item.label }}</span>
        </div>
        <div class="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md">
          <span class="text-lg font-bold">{{ item.count }}</span>
          <span class="text-xs">lembar</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="breakdown.length === 0" class="text-center py-8 text-secondary-400">
      <p>Belum ada nominal untuk dihitung.</p>
    </div>
  </div>
</template>
