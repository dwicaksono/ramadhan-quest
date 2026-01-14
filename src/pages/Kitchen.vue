<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import { useGame } from '@/composables/useGame'
import { BaseCard } from '@/components/base'
import RecipeDetail from '@/components/kitchen/RecipeDetail.vue'
import type { Recipe } from '@/types/recipe'
import { useAudio } from '@/composables/useAudio'
import { useHaptics } from '@/composables/useHaptics'

const recipeStore = useRecipeStore()
const { completeCooking } = useGame()
const { playSfx } = useAudio()
const { trigger } = useHaptics()

const recipes = computed(() => recipeStore.filteredRecipes)
const filters = computed(() => recipeStore.filters)

// Detail Modal State
const showDetail = ref(false)
const activeRecipe = ref<Recipe | null>(null)

function openRecipe(recipe: Recipe) {
  activeRecipe.value = recipe
  showDetail.value = true
}

function closeRecipe() {
  showDetail.value = false
  setTimeout(() => {
    activeRecipe.value = null
  }, 300) // Clear after transition
}

function handleFinishCooking() {
  const result = completeCooking()
  if (result) {
    playSfx('action_cook')
    trigger('medium')
  }
  closeRecipe()
}
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-secondary-900 dark:text-white">Dapur 🍳</h1>
        <p class="text-sm text-secondary-500 dark:text-secondary-400">Ide masakan untuk puasa</p>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-2">
      <button
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filters.category === 'all' 
          ? 'bg-primary-500 text-white' 
          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700'"
        @click="recipeStore.setCategory('all')"
      >
        Semua
      </button>
      <button
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filters.category === 'sahur' 
          ? 'bg-primary-500 text-white' 
          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700'"
        @click="recipeStore.setCategory('sahur')"
      >
        Sahur
      </button>
      <button
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filters.category === 'buka' 
          ? 'bg-primary-500 text-white' 
          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700'"
        @click="recipeStore.setCategory('buka')"
      >
        Buka
      </button>
    </div>

    <!-- Recipe Grid -->
    <div v-if="recipes.length > 0" class="grid grid-cols-2 gap-4 pb-24">
      <BaseCard
        v-for="recipe in recipes"
        :key="recipe.id"
        class="!p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all active:scale-95 group relative dark:bg-secondary-800 dark:border-secondary-700"
        @click="openRecipe(recipe)"
      >
        <!-- Image Cover -->
        <div class="aspect-square relative">
          <img 
            :src="recipe.imageUrl" 
            :alt="recipe.name"
            class="w-full h-full object-cover"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <!-- Difficulty Badge -->
          <span class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-black/60 text-stone-700 dark:text-white shadow-sm backdrop-blur-sm">
            {{ recipe.difficulty }}
          </span>
        </div>

        <!-- Content -->
        <div class="p-3">
          <h3 class="font-bold text-sm text-secondary-900 dark:text-white leading-tight line-clamp-2 mb-1">
            {{ recipe.name }}
          </h3>
          <div class="flex items-center gap-2 text-xs text-secondary-500 dark:text-secondary-400">
            <span class="flex items-center gap-1">
              ⏲️ {{ recipe.time }}m
            </span>
            <span v-if="recipe.tags[0]" class="text-primary-600 dark:text-primary-400 font-medium">
              #{{ recipe.tags[0] }}
            </span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Empty State -->
    <div 
      v-else 
      class="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4"
    >
      <div class="w-24 h-24 bg-orange-50 dark:bg-secondary-800 rounded-full flex items-center justify-center text-4xl mb-2">
        🍽️
      </div>
      <div>
        <h3 class="text-lg font-bold text-secondary-900 dark:text-white">Belum ada resep</h3>
        <p class="text-sm text-secondary-500 dark:text-secondary-400 max-w-xs mx-auto">
          Coba ganti kategori filter atau nantikan update resep berikutnya!
        </p>
      </div>
    </div>

    <!-- Detail Modal -->
    <RecipeDetail 
      :is-open="showDetail"
      :recipe="activeRecipe"
      @close="closeRecipe"
      @cook="handleFinishCooking"
    />
  </div>
</template>
