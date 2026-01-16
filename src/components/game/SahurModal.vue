<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton, BaseCard } from '@/components/base'
import { useGameStore } from '@/stores/game'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const gameStore = useGameStore()

const streakCount = computed(() => gameStore.state.sahurStreak || 1)

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div 
      v-if="modelValue" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click="close"
    >
      <BaseCard 
        class="w-full max-w-sm text-center relative overflow-hidden" 
        :rounded="'2xl'" 
        :padding="'lg'"
        @click.stop
      >
        <!-- Background Effects -->
        <div class="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-400/20 blur-3xl rounded-full pointer-events-none"></div>

        <!-- Content -->
        <div class="relative z-10">
          <div class="text-6xl mb-4 animate-bounce">🌙</div>
          
          <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
            Selamat Sahur!
          </h2>
          
          <p class="text-secondary-600 dark:text-gray-300 mb-6">
            MashaAllah, semangat puasanya! Kamu bangun tepat waktu.
          </p>

          <!-- Rewards Box -->
          <div class="bg-stone-50 dark:bg-white/5 rounded-xl p-4 mb-6 border border-stone-100 dark:border-white/10 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-stone-500 dark:text-gray-400">Early Bird Bonus</span>
              <span class="font-bold text-yellow-500">+50 XP</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-stone-500 dark:text-gray-400">Energy Refill</span>
              <span class="font-bold text-green-500">+100 Energy</span>
            </div>
            <div class="pt-3 border-t border-stone-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-sm font-medium text-stone-500 dark:text-gray-400">Sahur Streak</span>
              <div class="flex items-center gap-1">
                <span class="font-bold text-orange-500">{{ streakCount }} Hari</span>
                <span>🔥</span>
              </div>
            </div>
          </div>

          <BaseButton 
            variant="primary" 
            block 
            @click="close"
          >
            Alhamdulillah
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </Transition>
</template>
