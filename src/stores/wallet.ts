import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BudgetAllocation, Denomination } from '@/types/wallet'
import { DEFAULT_CATEGORIES } from '@/types/wallet'

const STORAGE_KEY = 'ramadan-quest-wallet'

interface StoredWalletState {
  totalBudget: number
  allocations: BudgetAllocation[]
}

function getDefaultAllocations(): BudgetAllocation[] {
  return DEFAULT_CATEGORIES.map(cat => ({
    ...cat,
    amount: 0,
    isCompleted: false,
  }))
}

function loadFromStorage(): StoredWalletState {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return { totalBudget: 0, allocations: getDefaultAllocations() }
    }
  }
  return { totalBudget: 0, allocations: getDefaultAllocations() }
}

export const useWalletStore = defineStore('wallet', () => {
  // State
  const storedState = loadFromStorage()
  const totalBudget = ref(storedState.totalBudget)
  const allocations = ref<BudgetAllocation[]>(storedState.allocations)

  // Getters
  const totalAllocated = computed(() => 
    allocations.value.reduce((sum, a) => sum + a.amount, 0)
  )

  const remainingBudget = computed(() => totalBudget.value - totalAllocated.value)

  const allocationProgress = computed(() => 
    totalBudget.value > 0 
      ? Math.round((totalAllocated.value / totalBudget.value) * 100)
      : 0
  )

  // Actions
  function saveToStorage() {
    const state: StoredWalletState = {
      totalBudget: totalBudget.value,
      allocations: allocations.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  function setTotalBudget(amount: number) {
    totalBudget.value = amount
    saveToStorage()
  }

  function updateAllocation(categoryId: string, amount: number) {
    const allocation = allocations.value.find(a => a.id === categoryId)
    if (allocation) {
      allocation.amount = amount
      saveToStorage()
    }
  }

  function toggleCompleted(categoryId: string) {
    const allocation = allocations.value.find(a => a.id === categoryId)
    if (allocation) {
      allocation.isCompleted = !allocation.isCompleted
      saveToStorage()
    }
  }

  function getDenominations(amount: number): Denomination[] {
    const denomValues = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100]
    const denomLabels: Record<number, string> = {
      100000: 'Rp 100.000',
      50000: 'Rp 50.000',
      20000: 'Rp 20.000',
      10000: 'Rp 10.000',
      5000: 'Rp 5.000',
      2000: 'Rp 2.000',
      1000: 'Rp 1.000',
      500: 'Rp 500',
      200: 'Rp 200',
      100: 'Rp 100',
    }

    const result: Denomination[] = []
    let remaining = amount

    for (const value of denomValues) {
      const count = Math.floor(remaining / value)
      if (count > 0) {
        result.push({ value, count, label: denomLabels[value] })
        remaining -= count * value
      }
    }

    return result
  }

  function reset() {
    totalBudget.value = 0
    allocations.value = getDefaultAllocations()
    saveToStorage()
  }

  return {
    // State
    totalBudget,
    allocations,
    // Getters
    totalAllocated,
    remainingBudget,
    allocationProgress,
    // Actions
    setTotalBudget,
    updateAllocation,
    toggleCompleted,
    getDenominations,
    reset,
  }
})
