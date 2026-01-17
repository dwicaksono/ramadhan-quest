<script setup lang="ts">
import { ref } from 'vue'
import { useWallet } from '@/composables/useWallet'
import { useGameStore } from '@/stores/game'
import { BaseButton } from '@/components/base'
import MoneyBreaker from '@/components/wallet/MoneyBreaker.vue'
import BudgetSummary from '@/components/wallet/BudgetSummary.vue'
import DigitalCard from '@/components/wallet/DigitalCard.vue'

const { walletStore, formatCurrency, applySuggested } = useWallet()
const gameStore = useGameStore()
const budgetInput = ref(walletStore.totalBudget || 500000)
const showMoneyBreaker = ref(false)
const isEditingBudget = ref(false)

function handleSetBudget() {
  applySuggested(budgetInput.value)
  isEditingBudget.value = false
}
const ALLOCATION_PERCENTAGES: Record<string, string> = {
  food: '30%',
  transport: '10%',
  gift: '20%',
  clothes: '15%',
  donation: '10%',
  savings: '15%',
}
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-secondary-900 dark:text-white">Dompet THR 💰</h1>
        <p class="text-sm text-secondary-500 dark:text-secondary-400">Kelola keuangan Ramadanmu</p>
      </div>
      <BaseButton 
        v-if="walletStore.totalBudget > 0"
        class="!p-2 !rounded-full bg-secondary-50 text-secondary-600 hover:bg-secondary-100 dark:bg-secondary-800 dark:text-white dark:hover:bg-secondary-700 transition-colors"
        @click="showMoneyBreaker = true"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </BaseButton>
    </div>

    <!-- Digital Card Section -->
    <section class="relative z-10">
      <DigitalCard 
        :balance="walletStore.remainingBudget"
        :total-budget="walletStore.totalBudget"
        card-number="4242 1447 2026 8888"
        :holder-name="gameStore.state.userName || 'MUJAHID RAMADHAN'"
      />
      
      <!-- Edit Budget Trigger -->
      <div class="mt-4 flex justify-center">
        <button 
          @click="isEditingBudget = !isEditingBudget"
          class="text-sm text-secondary-500 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-200 underline underline-offset-4 decoration-dashed transition-colors"
        >
          {{ isEditingBudget ? 'Selesai Edit' : 'Atur Ulang Budget' }}
        </button>
      </div>

      <!-- Quick Budget Input (Collapsible) -->
      <div 
        v-if="isEditingBudget"
        class="mt-4 p-4 bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-100 dark:border-secondary-800 shadow-sm animate-fade-in-down"
      >
        <label class="block text-xs font-bold uppercase tracking-wider text-secondary-500 dark:text-secondary-400 mb-2">
          Set Total Budget
        </label>
        <div class="flex gap-2">
          <input
            v-model.number="budgetInput"
            type="number"
            class="flex-1 px-4 py-2 bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono text-secondary-900 dark:text-white"
            placeholder="0"
          >
          <BaseButton @click="handleSetBudget" class="bg-emerald-600 hover:bg-emerald-700 text-white !rounded-xl">
            Simpan
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Allocation Progress -->
    <BudgetSummary v-if="walletStore.totalBudget > 0" />

    <!-- Allocation List (Modern) -->
    <section v-if="walletStore.totalBudget > 0" class="space-y-4 pb-32">
      <div class="flex items-center justify-between px-1">
        <h3 class="font-bold text-lg text-secondary-900 dark:text-white">Pos Pengeluaran</h3>
        <span class="text-xs text-secondary-400 dark:text-secondary-500 bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded-full">
          {{ walletStore.allocations.filter(a => a.isCompleted).length }}/{{ walletStore.allocations.length }} Selesai
        </span>
      </div>
      
      <div class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-100 dark:border-secondary-800 shadow-sm overflow-hidden divide-y divide-secondary-50 dark:divide-secondary-800">
        <div
          v-for="allocation in walletStore.allocations"
          :key="allocation.id"
          class="p-4 flex items-center justify-between hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors cursor-pointer group active:bg-secondary-100 dark:active:bg-secondary-800"
          @click="walletStore.toggleCompleted(allocation.id)"
        >
          <div class="flex items-center gap-4">
            <!-- Icon Box -->
            <div 
              class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-colors duration-300"
              :class="allocation.isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-secondary-50 dark:bg-secondary-800 text-secondary-400 dark:text-secondary-500 group-hover:bg-white dark:group-hover:bg-secondary-700 group-hover:shadow-md'"
            >
              {{ allocation.icon }}
            </div>
            
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <span 
                  class="font-bold text-secondary-900 dark:text-white transition-colors"
                  :class="{ 'text-emerald-700 dark:text-emerald-400 line-through decoration-emerald-500/30': allocation.isCompleted }"
                >
                  {{ allocation.category }}
                </span>
                <span 
                  v-if="ALLOCATION_PERCENTAGES[allocation.id]"
                  class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-stone-100 dark:bg-secondary-800 text-stone-500 dark:text-secondary-400"
                >
                  {{ ALLOCATION_PERCENTAGES[allocation.id] }}
                </span>
              </div>
              <span class="text-sm font-medium text-secondary-500 dark:text-secondary-400 tabular-nums">
                {{ formatCurrency(allocation.amount) }}
              </span>
            </div>
          </div>

          <!-- Tick / Action -->
          <div class="radio-check relative w-6 h-6 rounded-full border-2 border-secondary-200 dark:border-secondary-700 flex items-center justify-center transition-all duration-300"
            :class="{ 'border-emerald-500 bg-emerald-500 dark:border-emerald-400 dark:bg-emerald-400': allocation.isCompleted, 'group-hover:border-secondary-300 dark:group-hover:border-secondary-600': !allocation.isCompleted }"
          >
            <svg 
              class="w-3.5 h-3.5 text-white transform transition-transform duration-300"
               :class="allocation.isCompleted ? 'scale-100' : 'scale-0'"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <div v-else class="text-center py-12 px-4 opacity-60">
      <div class="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl grayscale">
        💸
      </div>
      <p class="text-secondary-500">Belum ada budget yang diatur.</p>
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
        class="fixed inset-x-0 bottom-0 z-[100] bg-white dark:bg-secondary-900 rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col safe-bottom"
      >
        <div class="p-4 border-b border-stone-100 dark:border-secondary-800 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <span class="text-xl">🧮</span>
            <h3 class="font-bold text-lg text-secondary-900 dark:text-white">Hitung Pecahan Uang</h3>
          </div>
          <button @click="showMoneyBreaker = false" class="p-2 -mr-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 rounded-full hover:bg-stone-50 dark:hover:bg-secondary-800">
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
      <div v-if="showMoneyBreaker" class="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm" @click="showMoneyBreaker = false"></div>
    </Transition>
  </div>
</template>
