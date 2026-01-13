<script setup lang="ts">
import { computed } from 'vue'
import type { Recipe } from '@/types/recipe'
import { BaseButton, BaseCard } from '@/components/base'

const props = defineProps<{
  recipe: Recipe | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'cook', recipe: Recipe): void
}>()

const show = computed(() => props.isOpen && props.recipe)

function handleCook() {
  if (props.recipe) {
    emit('cook', props.recipe)
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div 
      v-if="show"
      class="fixed inset-0 z-50 flex flex-col bg-stone-50"
    >
      <!-- Safe Area Top (for mobile status bar) -->
      <div class="h-safe-top bg-white"></div>

      <!-- Header -->
      <div class="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button 
          @click="emit('close')"
          class="p-2 -ml-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <span class="font-bold text-lg text-stone-800 line-clamp-1 flex-1 text-center px-4">
          {{ recipe?.name }}
        </span>
        <div class="w-10"></div> <!-- Spacer for center alignment -->
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto pb-32">
        <!-- Hero Image -->
        <div class="relative h-64 w-full">
          <img 
            :src="recipe?.imageUrl" 
            class="w-full h-full object-cover"
            alt="Recipe Hero"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <!-- Title overlay on image -->
          <div class="absolute bottom-0 left-0 p-4 w-full text-white">
            <h2 class="text-2xl font-bold leading-tight shadow-sm">{{ recipe?.name }}</h2>
          </div>
        </div>

        <div class="p-4 space-y-6">
          <!-- Meta Tags -->
          <div class="flex flex-wrap gap-3">
          <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center gap-1">
            <span>⏱️</span> {{ recipe?.time }} menit
          </span>
          <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium flex items-center gap-1">
            <span>📊</span> {{ recipe?.difficulty }}
          </span>
          <span 
            v-for="tag in recipe?.tags" 
            :key="tag"
            class="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-sm font-medium"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Ingredients Section -->
        <section>
          <h3 class="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span>🥦</span> Bahan-bahan
          </h3>
          <BaseCard class="!p-0 overflow-hidden border border-stone-200">
            <div class="divide-y divide-stone-100">
              <div 
                v-for="(ing, idx) in recipe?.ingredients" 
                :key="idx"
                class="p-3 flex items-center justify-between hover:bg-stone-50 transition-colors"
                :class="{ 'bg-yellow-50/50': ing.affiliateUrl }"
              >
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span class="text-stone-700 font-medium">{{ ing.item }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-stone-500 text-sm">{{ ing.qty }}</span>
                  <a 
                    v-if="ing.affiliateUrl"
                    :href="ing.affiliateUrl"
                    target="_blank"
                    class="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
                    @click.stop
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a6 6 0 012 6m-9 12a1 1 0 10-2 0 1 1 0 002 0zm0 0a1 1 0 10-2 0 1 1 0 002 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </BaseCard>
          <p v-if="recipe?.ingredients.some(i => i.affiliateUrl)" class="text-xs text-stone-400 mt-2 text-center">
            *Tap ikon keranjang untuk beli bahan via E-commerce
          </p>
        </section>

        <!-- Steps Section -->
        <section>
          <h3 class="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span>👨‍🍳</span> Cara Membuat
          </h3>
          <div class="space-y-4">
            <div 
              v-for="(step, idx) in recipe?.steps" 
              :key="idx"
              class="flex gap-4"
            >
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm ring-4 ring-emerald-50">
                {{ idx + 1 }}
              </div>
              <p class="text-stone-700 leading-relaxed pt-1">{{ step }}</p>
            </div>
          </div>
        </section>
        </div>
      </div>

      <!-- Bottom Action -->
      <div class="absolute bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 pb-8 safe-bottom shadow-lg">
        <BaseButton 
          block 
          size="lg" 
          @click="handleCook"
          class="shadow-xl shadow-emerald-200"
        >
          Selesai Masak (+Energy)
        </BaseButton>
      </div>
    </div>
  </Transition>

  <!-- Backdrop -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="show"
      class="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
      @click="emit('close')"
    ></div>
  </Transition>
</template>
