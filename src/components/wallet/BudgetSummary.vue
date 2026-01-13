<script setup lang="ts">
import { ref } from 'vue'
import { useWallet } from '@/composables/useWallet'
import { BaseCard, BaseProgress, BaseButton } from '@/components/base'

const { walletStore, formatCurrency, budgetHealth, commitSavings } = useWallet()
const showReward = ref(false)
const earnedCoins = ref(0)

function handleTabung() {
  if (confirm('Simpan semua sisa budget ke Tabungan? Kamu akan dapat Koin! 💰')) {
    const coins = commitSavings()
    if (coins > 0) {
      earnedCoins.value = coins
      showReward.value = true
      setTimeout(() => showReward.value = false, 3000)
    }
  }
}
</script>

<template>
  <BaseCard v-if="walletStore.totalBudget > 0" class="relative overflow-hidden">
    <!-- Reward Overlay -->
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 scale-150"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-50"
    >
      <div 
        v-if="showReward"
        class="absolute inset-0 z-20 bg-primary-600/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4 text-center"
      >
        <span class="text-4xl mb-2">🪙 +{{ earnedCoins }}</span>
        <h3 class="font-bold text-lg">Tabungan Bertambah!</h3>
        <p class="text-sm opacity-90">Sisa budget diamankan.</p>
      </div>
    </Transition>

    <div class="flex items-center justify-between mb-3">
      <span class="font-semibold text-secondary-900">Progress Alokasi</span>
      <span :class="budgetHealth.color">{{ budgetHealth.label }}</span>
    </div>

    <BaseProgress
      :value="walletStore.allocationProgress"
      variant="primary"
      size="lg"
      show-label
    />

    <div class="flex justify-between mt-3 text-sm">
      <span class="text-secondary-500">Dialokasikan</span>
      <span class="font-semibold">{{ formatCurrency(walletStore.totalAllocated) }}</span>
    </div>

    <div class="flex justify-between mt-1 text-sm">
      <span class="text-secondary-500">Sisa</span>
      <span class="font-semibold text-primary-600">{{ formatCurrency(walletStore.remainingBudget) }}</span>
    </div>

    <!-- Tabung Action -->
    <div v-if="walletStore.remainingBudget > 0" class="mt-4 pt-4 border-t border-secondary-100">
      <BaseButton 
        block 
        variant="outline" 
        class="!border-emerald-200 !text-emerald-700 !bg-emerald-50 hover:!bg-emerald-100"
        @click="handleTabung"
      >
        <div class="flex items-center justify-center gap-2">
          <span>💰</span>
          <span>Tabung Sisa (+{{ Math.floor(walletStore.remainingBudget / 10000) }} Koin)</span>
        </div>
      </BaseButton>
    </div>
  </BaseCard>
</template>
