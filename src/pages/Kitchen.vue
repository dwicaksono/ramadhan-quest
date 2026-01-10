<script setup lang="ts">
import { computed } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import { useGame } from '@/composables/useGame'
import { BaseCard, BaseButton } from '@/components/base'

const recipeStore = useRecipeStore()
const { completeCooking } = useGame()

const recipes = computed(() => recipeStore.filteredRecipes)
const filters = computed(() => recipeStore.filters)

function handleCook() {
  const result = completeCooking()
  console.log('Cooked!', result)
}
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-secondary-900">Dapur 🍳</h1>
        <p class="text-sm text-secondary-500">Ide masakan untuk puasa</p>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-2">
      <button
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filters.category === 'all' 
          ? 'bg-primary-500 text-white' 
          : 'bg-secondary-100 text-secondary-600'"
        @click="recipeStore.setCategory('all')"
      >
        Semua
      </button>
      <button
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filters.category === 'sahur' 
          ? 'bg-primary-500 text-white' 
          : 'bg-secondary-100 text-secondary-600'"
        @click="recipeStore.setCategory('sahur')"
      >
        Sahur
      </button>
      <button
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filters.category === 'buka' 
          ? 'bg-primary-500 text-white' 
          : 'bg-secondary-100 text-secondary-600'"
        @click="recipeStore.setCategory('buka')"
      >
        Buka
      </button>
    </div>

    <!-- Recipe list -->
    <div class="space-y-4">
      <BaseCard
        v-for="recipe in recipes.slice(0, 10)"
        :key="recipe.id"
        class="cursor-pointer hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="font-semibold text-secondary-900">{{ recipe.name }}</h3>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded-full">
                ⏱️ {{ recipe.time }} menit
              </span>
              <span class="text-xs bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded-full">
                {{ recipe.difficulty }}
              </span>
            </div>
            <div class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in recipe.tags.slice(0, 3)"
                :key="tag"
                class="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
          <BaseButton size="sm" @click="handleCook">
            Masak
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
