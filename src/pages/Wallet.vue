<script setup lang="ts">
import { ref } from 'vue'
import { useWallet } from '@/composables/useWallet'
import { BaseCard, BaseButton } from '@/components/base'
import MoneyBreaker from '@/components/wallet/MoneyBreaker.vue'
import BudgetSummary from '@/components/wallet/BudgetSummary.vue'

const { walletStore, formatCurrency, applySuggested } = useWallet()
const budgetInput = ref(walletStore.totalBudget || 500000)
const showMoneyBreaker = ref(false)

function handleSetBudget() {
  applySuggested(budgetInput.value)
}
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-secondary-900">Dompet 💰</h1>
      <p class="text-sm text-secondary-500">Kelola budget THR kamu</p>
    </div>

    <!-- Budget input -->
    <BaseCard>
      <label class="block text-sm font-medium text-secondary-700 mb-2">
        Total Budget THR
      </label>
      <div class="flex gap-2">
        <input
          v-model.number="budgetInput"
          type="number"
          class="flex-1 px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="500000"
        >
        <BaseButton @click="handleSetBudget">
          Set
        </BaseButton>
      </div>
    </BaseCard>

    <!-- Budget progress -->
    <BudgetSummary />

    <!-- Allocation list -->
    <div v-if="walletStore.totalBudget > 0" class="space-y-3 pb-32">
      <h3 class="font-semibold text-secondary-900">Alokasi Budget</h3>
      <BaseCard
        v-for="allocation in walletStore.allocations"
        :key="allocation.id"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <span class="text-2xl">{{ allocation.icon }}</span>
          <div>
            <p class="font-medium text-secondary-900">{{ allocation.category }}</p>
            <p class="text-sm text-secondary-500">{{ formatCurrency(allocation.amount) }}</p>
          </div>
        </div>
        <button
          class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          :class="allocation.isCompleted 
            ? 'bg-primary-100 text-primary-600' 
            : 'bg-secondary-100 text-secondary-400'"
          @click="walletStore.toggleCompleted(allocation.id)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </BaseCard>
    </div>

    <!-- Money Breaker FAB -->
    <div class="fixed bottom-20 left-0 w-full px-4 flex justify-center pointer-events-none" v-if="walletStore.totalAllocated > 0">
      <BaseButton 
        class="shadow-xl pointer-events-auto flex items-center gap-2 !px-6 !py-3 !rounded-full bg-secondary-900 !text-white"
        @click="showMoneyBreaker = true"
      >
        <span>💸</span> Hitung Pecahan Uang
      </BaseButton>
    </div>

    <!-- Money Breaker Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-full"
    >
      <div 
        v-if="showMoneyBreaker"
        class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
      >
        <div class="p-4 border-b border-stone-100 flex items-center justify-between">
          <h3 class="font-bold text-lg text-secondary-900">Rincian Pecahan Uang</h3>
          <button @click="showMoneyBreaker = false" class="p-2 -mr-2 text-stone-400 hover:text-stone-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-4 overflow-y-auto pb-8">
          <MoneyBreaker :amount="walletStore.totalAllocated" />
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showMoneyBreaker" class="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" @click="showMoneyBreaker = false"></div>
    </Transition>
  </div>
</template>
