// Ingredient type for recipe
export interface Ingredient {
  item: string
  qty: string
  affiliateUrl: string | null
}

// Recipe type
export interface Recipe {
  id: number
  name: string
  category: 'sahur' | 'buka'
  time: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  ingredients: Ingredient[]
  steps: string[]
}

// Recipe filter options
export interface RecipeFilters {
  category: 'sahur' | 'buka' | 'all'
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'all'
  maxTime: number | null
  searchQuery: string
  selectedTags: string[]
}
