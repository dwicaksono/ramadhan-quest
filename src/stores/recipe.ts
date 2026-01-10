import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Recipe, RecipeFilters } from '@/types/recipe'
import recipesData from '@/data/recipes.json'

export const useRecipeStore = defineStore('recipe', () => {
  // State
  const recipes = ref<Recipe[]>(recipesData as Recipe[])
  const filters = ref<RecipeFilters>({
    category: 'all',
    difficulty: 'all',
    maxTime: null,
    searchQuery: '',
    selectedTags: [],
  })
  const selectedRecipeId = ref<number | null>(null)

  // Getters
  const filteredRecipes = computed(() => {
    return recipes.value.filter(recipe => {
      // Category filter
      if (filters.value.category !== 'all' && recipe.category !== filters.value.category) {
        return false
      }

      // Difficulty filter
      if (filters.value.difficulty !== 'all' && recipe.difficulty !== filters.value.difficulty) {
        return false
      }

      // Max time filter
      if (filters.value.maxTime !== null && recipe.time > filters.value.maxTime) {
        return false
      }

      // Search query filter
      if (filters.value.searchQuery) {
        const query = filters.value.searchQuery.toLowerCase()
        const matchesName = recipe.name.toLowerCase().includes(query)
        const matchesTags = recipe.tags.some(tag => tag.toLowerCase().includes(query))
        const matchesIngredient = recipe.ingredients.some(ing => 
          ing.item.toLowerCase().includes(query)
        )
        if (!matchesName && !matchesTags && !matchesIngredient) {
          return false
        }
      }

      // Tags filter
      if (filters.value.selectedTags.length > 0) {
        const hasAnyTag = filters.value.selectedTags.some(tag => 
          recipe.tags.includes(tag)
        )
        if (!hasAnyTag) {
          return false
        }
      }

      return true
    })
  })

  const allTags = computed(() => {
    const tagSet = new Set<string>()
    recipes.value.forEach(recipe => {
      recipe.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  })

  const selectedRecipe = computed(() => 
    selectedRecipeId.value 
      ? recipes.value.find(r => r.id === selectedRecipeId.value) 
      : null
  )

  const sahurRecipes = computed(() => 
    recipes.value.filter(r => r.category === 'sahur')
  )

  const bukaRecipes = computed(() => 
    recipes.value.filter(r => r.category === 'buka')
  )

  // Actions
  function setCategory(category: RecipeFilters['category']) {
    filters.value.category = category
  }

  function setDifficulty(difficulty: RecipeFilters['difficulty']) {
    filters.value.difficulty = difficulty
  }

  function setMaxTime(time: number | null) {
    filters.value.maxTime = time
  }

  function setSearchQuery(query: string) {
    filters.value.searchQuery = query
  }

  function toggleTag(tag: string) {
    const index = filters.value.selectedTags.indexOf(tag)
    if (index > -1) {
      filters.value.selectedTags.splice(index, 1)
    } else {
      filters.value.selectedTags.push(tag)
    }
  }

  function selectRecipe(id: number | null) {
    selectedRecipeId.value = id
  }

  function resetFilters() {
    filters.value = {
      category: 'all',
      difficulty: 'all',
      maxTime: null,
      searchQuery: '',
      selectedTags: [],
    }
  }

  return {
    // State
    recipes,
    filters,
    selectedRecipeId,
    // Getters
    filteredRecipes,
    allTags,
    selectedRecipe,
    sahurRecipes,
    bukaRecipes,
    // Actions
    setCategory,
    setDifficulty,
    setMaxTime,
    setSearchQuery,
    toggleTag,
    selectRecipe,
    resetFilters,
  }
})
