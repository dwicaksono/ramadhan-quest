<script setup lang="ts">
import { computed } from 'vue'
import type { Recipe } from '@/types/recipe'
import { BaseButton } from '@/components/base'

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
      class="fixed inset-0 z-50 flex flex-col bg-white dark:bg-black"
    >
      <!-- Header (Sticky) -->
      <div class="bg-white dark:bg-black border-b border-stone-100 dark:border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm safe-top">
        <button 
          @click="emit('close')"
          class="p-2 -ml-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <span class="font-bold text-lg text-stone-800 dark:text-white line-clamp-1 flex-1 text-center px-4">
          {{ recipe?.name }}
        </span>
        <div class="w-10"></div> <!-- Spacer -->
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto pb-32 bg-stone-50 dark:bg-black">
        <!-- Hero Image -->
        <div class="relative h-64 w-full group">
          <img 
            :src="recipe?.imageUrl" 
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            alt="Recipe Hero"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <!-- Title overlay on image -->
          <div class="absolute bottom-0 left-0 p-4 w-full text-white">
            <h2 class="text-2xl font-bold leading-tight shadow-sm">{{ recipe?.name }}</h2>
          </div>
        </div>

        <div class="p-4 space-y-6">
          <!-- Meta Tags (Chips) -->
          <div class="flex flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1">
            <span class="px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-500/30">
              <span class="text-xs">⏱️</span> {{ recipe?.time }} menit
            </span>
            <span class="px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-sm font-medium flex items-center gap-1.5 border border-amber-200 dark:border-amber-500/30">
              <span class="text-xs">📊</span> {{ recipe?.difficulty }}
            </span>
            <span 
              v-for="tag in recipe?.tags" 
              :key="tag"
              class="px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm font-medium border border-stone-200 dark:border-stone-700"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Ingredients Section -->
          <section>
            <h3 class="text-lg font-bold text-stone-800 dark:text-white mb-3 flex items-center gap-2">
              <span>🥦</span> Bahan-bahan
            </h3>
            
            <!-- Modern List Container -->
            <div class="bg-stone-200/50 dark:bg-stone-900 rounded-xl overflow-hidden shadow-sm border border-stone-200 dark:border-stone-800">
              <div class="divide-y divide-stone-200 dark:divide-stone-800">
                <div 
                  v-for="(ing, idx) in recipe?.ingredients" 
                  :key="idx"
                  class="p-4 flex items-center justify-between group hover:bg-white dark:hover:bg-white/5 transition-colors"
                  :class="idx % 2 === 0 ? 'bg-stone-100/50 dark:bg-white/5' : 'bg-transparent'"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full flex-shrink-0" :class="idx % 3 === 0 ? 'bg-emerald-400' : idx % 3 === 1 ? 'bg-amber-400' : 'bg-rose-400'"></div>
                    <span class="text-stone-700 dark:text-stone-200 font-medium text-sm">{{ ing.item }}</span>
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <span class="text-stone-500 dark:text-stone-400 text-sm font-medium">{{ ing.qty }}</span>
                    <!-- Cart Button for Buying -->
                    <a 
                      v-if="ing.affiliateUrl"
                      :href="ing.affiliateUrl"
                      target="_blank"
                      class="w-8 h-8 flex items-center justify-center bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-full hover:bg-orange-200 dark:hover:bg-orange-500/30 transition-all active:scale-95"
                      @click.stop
                      title="Beli bahan ini"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                      </svg>
                    </a>
                    <div v-else class="w-8 h-8"></div> <!-- Spacer -->
                  </div>
                </div>
              </div>
            </div>
            
            <p v-if="recipe?.ingredients.some(i => i.affiliateUrl)" class="text-[10px] text-stone-400 mt-2 text-center uppercase tracking-wide">
              *Tekan ikon belanja untuk membeli bahan
            </p>
          </section>

          <!-- Steps Section -->
          <section>
            <h3 class="text-lg font-bold text-stone-800 dark:text-white mb-3 flex items-center gap-2">
              <span>👨‍🍳</span> Cara Membuat
            </h3>
            <div class="space-y-4">
              <div 
                v-for="(step, idx) in recipe?.steps" 
                :key="idx"
                class="flex gap-4 group"
              >
                <!-- Number Circle -->
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm ring-4 ring-emerald-50 dark:ring-emerald-900/30 group-hover:scale-110 transition-transform">
                  {{ idx + 1 }}
                </div>
                <p class="text-stone-700 dark:text-stone-300 leading-relaxed pt-1 text-sm md:text-base">{{ step }}</p>
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
