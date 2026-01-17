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

  function getDenominations(amount: number, mode: 'efficient' | 'distribute' = 'efficient'): Denomination[] {
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

    // Strategy Logic
    if (mode === 'distribute') {
      // "Eceran" Mode: Try to ensure we have smaller bills for THR
      // Reserve 40% of budget for smaller bills (< 50k) if possible
      const reserveForSmall = Math.min(remaining * 0.4, 1000000) // Cap reserve at 1jt
      let mainBudget = remaining - reserveForSmall
      
      // Pass 1: Efficiently break the main budget (Big bills)
      for (const value of denomValues) {
        if (value < 20000) continue // Stop at 20k, handle rest later
        const count = Math.floor(mainBudget / value)
        if (count > 0) {
          result.push({ value, count, label: denomLabels[value] })
          mainBudget -= count * value
        }
      }
      
      // Add leftover main budget back to remaining
      remaining = reserveForSmall + mainBudget
      
      // Pass 2: Distribute remaining into smaller bills (20k down to 2k)
      // Force diverse mix by capping max count per denom in this pass? 
      // Simplified: Just run greedy on the small pool, but excluding 100k/50k
      const smallDenoms = denomValues.filter(d => d <= 20000)
      for (const value of smallDenoms) {
        const count = Math.floor(remaining / value)
        if (count > 0) {
          // Merge with existing if any
          const existing = result.find(d => d.value === value)
          if (existing) existing.count += count
          else result.push({ value, count, label: denomLabels[value] })
          
          remaining -= count * value
        }
      }
    } else {
      // "Ringkas" Mode: Standard Greedy
      for (const value of denomValues) {
        const count = Math.floor(remaining / value)
        if (count > 0) {
          result.push({ value, count, label: denomLabels[value] })
          remaining -= count * value
        }
      }
    }

    // Sort by value desc
    return result.sort((a, b) => b.value - a.value)
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
