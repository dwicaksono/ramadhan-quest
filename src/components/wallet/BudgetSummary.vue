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
  <BaseCard v-if="walletStore.totalBudget > 0" class="relative overflow-hidden dark:bg-secondary-900 border-none dark:border dark:border-secondary-800">
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
      <span class="font-semibold text-secondary-900 dark:text-white">Progress Alokasi</span>
      <span :class="budgetHealth.color">{{ budgetHealth.label }}</span>
    </div>

    <BaseProgress
      :value="walletStore.allocationProgress"
      variant="primary"
      size="lg"
      show-label
    />

    <div class="flex justify-between mt-3 text-sm">
      <span class="text-secondary-500 dark:text-secondary-400">Dialokasikan</span>
      <span class="font-semibold dark:text-secondary-200">{{ formatCurrency(walletStore.totalAllocated) }}</span>
    </div>

    <div class="flex justify-between mt-1 text-sm bg-stone-50 dark:bg-secondary-800/50 p-2 rounded-lg border border-stone-100 dark:border-white/5">
      <span class="text-secondary-500 dark:text-secondary-400">Sisa</span>
      <span class="font-semibold text-primary-600 dark:text-primary-400">{{ formatCurrency(walletStore.remainingBudget) }}</span>
    </div>

    <!-- Tabung Action -->
    <div v-if="walletStore.remainingBudget > 0" class="mt-4 pt-4 border-t border-secondary-100 dark:border-secondary-800">
      <BaseButton 
        block 
        variant="outline" 
        class="!border-emerald-200 dark:!border-emerald-800 !text-emerald-700 dark:!text-emerald-300 !bg-emerald-50 dark:!bg-emerald-900/30 hover:!bg-emerald-100 dark:hover:!bg-emerald-900/50"
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
