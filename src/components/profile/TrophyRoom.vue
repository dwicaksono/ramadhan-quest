<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBadges } from '@/composables/useBadges'
import { BaseCard } from '@/components/base'

const { allBadges, checkBadges, unlockedCount } = useBadges()
const selectedBadge = ref<any>(null)

onMounted(() => {
  checkBadges()
})
</script>

<template>
  <BaseCard title="Trophy Room 🏆">
    <div class="mb-4 text-sm text-secondary-500 dark:text-secondary-400">
      Koleksi pencapaianmu selama Ramadhan.
      <span class="font-bold text-primary-600 dark:text-primary-400">{{ unlockedCount }} / {{ allBadges.length }}</span>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <button 
        v-for="badge in allBadges" 
        :key="badge.id"
        @click="selectedBadge = badge"
        class="flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300 w-full"
        :class="[
          badge.isUnlocked 
            ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800' 
            : 'bg-stone-50 dark:bg-white/5 border-stone-100 dark:border-white/5 grayscale opacity-60'
        ]"
      >
        <div class="text-3xl mb-2 filter drop-shadow-sm">
          {{ badge.icon }}
        </div>
        <div class="space-y-1">
          <p class="text-xs font-bold leading-tight" 
             :class="badge.isUnlocked ? 'text-secondary-900 dark:text-white' : 'text-secondary-400 dark:text-secondary-500'">
            {{ badge.name }}
          </p>
          <p v-if="badge.isUnlocked" class="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
            Tercapai!
          </p>
          <p v-else class="text-[10px] text-secondary-400 dark:text-secondary-600">
            ???
          </p>
        </div>
      </button>
    </div>

    <!-- Badge Details Modal -->
    <Teleport to="body">
      <div v-if="selectedBadge" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="selectedBadge = null"></div>
        
        <!-- Content -->
        <div class="relative bg-white dark:bg-secondary-900 rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-secondary-100 dark:border-secondary-800 animate-in zoom-in-95 duration-200">
          <button @click="selectedBadge = null" class="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 dark:hover:text-white">
            <span class="text-xl">✕</span>
          </button>

          <div class="flex flex-col items-center text-center space-y-4">
            <div class="text-6xl filter drop-shadow-md mb-2">
              {{ selectedBadge.icon }}
            </div>
            
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-secondary-900 dark:text-white">
                {{ selectedBadge.name }}
              </h3>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                :class="selectedBadge.isUnlocked ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-secondary-100 text-secondary-500 dark:bg-secondary-800 dark:text-secondary-400'">
                <span v-if="selectedBadge.isUnlocked">✅ Unlocked</span>
                <span v-else>🔒 Locked</span>
              </div>
            </div>

            <p class="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed bg-secondary-50 dark:bg-secondary-800/50 p-4 rounded-xl w-full">
              {{ selectedBadge.description }}
            </p>

            <p v-if="selectedBadge.unlockedAt" class="text-xs text-secondary-400">
              Didapatkan pada: {{ new Date(selectedBadge.unlockedAt).toLocaleDateString('id-ID', { dateStyle: 'long' }) }}
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </BaseCard>
</template>
