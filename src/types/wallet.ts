// Budget allocation for THR calculator
export interface BudgetAllocation {
  id: string
  category: string
  amount: number
  isCompleted: boolean
  icon: string
}

// Wallet state interface
export interface WalletState {
  totalBudget: number
  allocations: BudgetAllocation[]
}

// Currency denomination for money breakdown
export interface Denomination {
  value: number
  count: number
  label: string
}

// Default allocation categories
export const DEFAULT_CATEGORIES = [
  { id: 'food', category: 'Makanan & Minuman', icon: '🍽️' },
  { id: 'transport', category: 'Transportasi', icon: '🚗' },
  { id: 'gift', category: 'Hadiah / Bingkisan', icon: '🎁' },
  { id: 'clothes', category: 'Pakaian', icon: '👔' },
  { id: 'donation', category: 'Sedekah / Zakat', icon: '🤲' },
  { id: 'savings', category: 'Tabungan', icon: '💰' },
] as const
