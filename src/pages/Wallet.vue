<script setup lang="ts">
import { ref } from 'vue'
import { useWallet } from '@/composables/useWallet'
import { BaseCard, BaseButton, BaseProgress } from '@/components/base'

const { walletStore, formatCurrency, applySuggested, budgetHealth } = useWallet()
const budgetInput = ref(walletStore.totalBudget || 500000)

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
    <BaseCard v-if="walletStore.totalBudget > 0">
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
    </BaseCard>

    <!-- Allocation list -->
    <div v-if="walletStore.totalBudget > 0" class="space-y-3">
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
  </div>
</template>
