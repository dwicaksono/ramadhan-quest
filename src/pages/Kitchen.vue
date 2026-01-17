<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import { useGame } from '@/composables/useGame'
import RecipeDetail from '@/components/kitchen/RecipeDetail.vue'
import type { Recipe } from '@/types/recipe'
import { useAudio } from '@/composables/useAudio'


const recipeStore = useRecipeStore()
const { completeCooking } = useGame()
const { playSfx } = useAudio()


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

    <!-- Recipe Grid (Modern Masonry-ish Grid) -->
    <div v-if="recipes.length > 0" class="grid grid-cols-2 gap-3 pb-24">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 active:scale-95"
        @click="openRecipe(recipe)"
      >
        <!-- Full Background Image -->
        <img 
          :src="recipe.imageUrl" 
          :alt="recipe.name"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        >
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

        <!-- Top Badge (Difficulty) -->
        <div class="absolute top-2 right-2">
          <span class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md border border-white/10 rounded-lg shadow-sm">
            {{ recipe.difficulty }}
          </span>
        </div>

        <!-- Bottom Content -->
        <div class="absolute bottom-0 left-0 w-full p-3 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
          <!-- Tags -->
          <div v-if="recipe.tags[0]" class="mb-1">
            <span class="text-[10px] font-medium text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
              #{{ recipe.tags[0] }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-white font-bold text-sm leading-tight line-clamp-2 mb-1 drop-shadow-sm">
            {{ recipe.name }}
          </h3>

          <!-- Meta (Time) -->
          <div class="flex items-center gap-2 text-[10px] text-gray-300 font-medium">
            <div class="flex items-center gap-1 bg-black/30 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
              <span>⏱️</span>
              <span>{{ recipe.time }}m</span>
            </div>
            <!-- Cook Energy Indicator -->
             <div class="flex items-center gap-1 bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded-full backdrop-blur-sm border border-yellow-500/20">
              <span>⚡</span>
              <span>+30</span>
            </div>
          </div>
        </div>
      </div>
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
