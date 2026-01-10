import { computed } from 'vue'
import { useWalletStore } from '@/stores/wallet'

/**
 * Composable for wallet/budget logic
 * Separates business logic from components
 */
export function useWallet() {
  const walletStore = useWalletStore()

  // Format currency
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Suggested allocations based on total budget
  function getSuggestedAllocations(total: number) {
    return {
      food: Math.round(total * 0.3),      // 30%
      transport: Math.round(total * 0.1), // 10%
      gift: Math.round(total * 0.2),      // 20%
      clothes: Math.round(total * 0.15),  // 15%
      donation: Math.round(total * 0.1),  // 10% (zakat)
      savings: Math.round(total * 0.15),  // 15%
    }
  }

  // Apply suggested allocations
  function applySuggested(total: number) {
    const suggestions = getSuggestedAllocations(total)
    walletStore.setTotalBudget(total)
    Object.entries(suggestions).forEach(([categoryId, amount]) => {
      walletStore.updateAllocation(categoryId, amount)
    })
  }

  // Get denomination breakdown
  const denominationBreakdown = computed(() => 
    walletStore.getDenominations(walletStore.remainingBudget)
  )

  // Budget health indicator
  const budgetHealth = computed(() => {
    const progress = walletStore.allocationProgress
    if (progress < 50) return { status: 'low', label: 'Baru mulai', color: 'text-secondary-500' }
    if (progress < 80) return { status: 'mid', label: 'Hampir selesai', color: 'text-accent-500' }
    if (progress < 100) return { status: 'high', label: 'Hampir penuh', color: 'text-primary-500' }
    return { status: 'full', label: 'Selesai!', color: 'text-primary-600' }
  })

  return {
    // Store reference
    walletStore,
    // Helpers
    formatCurrency,
    getSuggestedAllocations,
    applySuggested,
    // Computed
    denominationBreakdown,
    budgetHealth,
  }
}
