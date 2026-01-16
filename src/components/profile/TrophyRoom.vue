<script setup lang="ts">
import { onMounted } from 'vue'
import { useBadges } from '@/composables/useBadges'
import { BaseCard } from '@/components/base'

const { allBadges, checkBadges, unlockedCount } = useBadges()

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
      <div 
        v-for="badge in allBadges" 
        :key="badge.id"
        class="flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300"
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
      </div>
    </div>
  </BaseCard>
</template>
