import { computed } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import type { Recipe } from '@/types/recipe'

/**
 * Composable for recipe logic
 * Separates business logic from components
 */
export function useRecipe() {
  const recipeStore = useRecipeStore()

  // Get random recipe suggestion
  function getRandomRecipe(category?: 'sahur' | 'buka'): Recipe | null {
    const pool = category 
      ? recipeStore.recipes.filter(r => r.category === category)
      : recipeStore.recipes
    
    if (pool.length === 0) return null
    return pool[Math.floor(Math.random() * pool.length)]
  }

  // Get quick recipes (under 10 minutes)
  const quickRecipes = computed(() => 
    recipeStore.recipes.filter(r => r.time <= 10)
  )

  // Get recipes by ingredient availability
  function getRecipesByIngredients(availableIngredients: string[]): Recipe[] {
    const normalized = availableIngredients.map(i => i.toLowerCase())
    
    return recipeStore.recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(i => i.item.toLowerCase())
      // At least 50% of ingredients should match
      const matchCount = recipeIngredients.filter(ing => 
        normalized.some(avail => ing.includes(avail) || avail.includes(ing))
      ).length
      return matchCount >= Math.ceil(recipeIngredients.length * 0.5)
    })
  }

  // Check if current time is sahur or buka time
  const suggestedCategory = computed<'sahur' | 'buka'>(() => {
    const hours = new Date().getHours()
    // Sahur: 03:00 - 05:00, otherwise suggest buka
    if (hours >= 3 && hours < 5) return 'sahur'
    return 'buka'
  })

  // Get affiliate ingredients from recipe
  function getAffiliateIngredients(recipe: Recipe) {
    return recipe.ingredients.filter(ing => 
      ing.affiliateUrl && ing.affiliateUrl !== 'PLACEHOLDER_LINK'
    )
  }

  return {
    // Store reference
    recipeStore,
    // Helpers
    getRandomRecipe,
    getRecipesByIngredients,
    getAffiliateIngredients,
    // Computed
    quickRecipes,
    suggestedCategory,
  }
}
